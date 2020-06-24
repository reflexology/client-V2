import './patient.scss';

import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, message, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PatientService, { Patient, PatientType } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils from 'utils/tableUtils';

import PatientInCreditOrDebt from './patientInCreditOrDebt';
import PatientsTable from './patientsTable';

const tableUtils = new TableUtils<Patient>();

interface PatientContainerProps extends RouteComponentProps {}

const PatientContainer: React.FC<PatientContainerProps> = props => {
  const { patients, setPatients, isDataFetchedOnce } = usePatients();
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isSelectPatientTypeLoading, setIsSelectPatientTypeLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [patientsInDebtOrCredit, setPatientsInDebtOrCredit] = useState(PatientType.AllPatients);
  const [filter, setFilter] = useState<{ startDate: any; endDate: any; search: string }>({
    endDate: null,
    startDate: null,
    search: ''
  });

  useDidUpdateEffect(() => {
    setIsSelectPatientTypeLoading(true);
    PatientService.getPatients(
      patientsInDebtOrCredit === PatientType.InCredit,
      patientsInDebtOrCredit === PatientType.InDebt
    )
      .then(setPatients)
      .catch(() => {
        message.error('could not load patients');
      })
      .finally(() => setIsSelectPatientTypeLoading(false));
  }, [patientsInDebtOrCredit]);

  useEffect(() => setFilteredPatients(patients), [patients]);

  useEffect(() => filterPatients(), [filter]);

  const handlePatientTypeChanged = (type: PatientType) => setPatientsInDebtOrCredit(type);

  const filterPatients = () => {
    let filteredPatients = patients;

    if (filter.search)
      filteredPatients = filteredPatients.filter(patient =>
        tableUtils.filter(patient, filter.search, [
          '_id',
          'maritalStatus',
          'createdAt',
          'createdBy',
          'childrenAges',
          'profession'
        ])
      );

    if (filter.startDate && filter.endDate) {
      filteredPatients = filteredPatients.filter(
        patient =>
          new Date(patient.lastTreatment as any) > new Date(filter.startDate.toDate() as any) &&
          new Date(patient.lastTreatment as any) < new Date(filter.endDate.toDate() as any)
      );
    }

    if (filter.startDate) {
      filteredPatients = filteredPatients.filter(
        patient => new Date(patient.lastTreatment as any) > new Date(filter.startDate as any)
      );
    }
    if (filter.endDate) {
      filteredPatients = filteredPatients.filter(
        patient => new Date(patient.lastTreatment as any) < new Date(filter.endDate.toDate() as any)
      );
    }
    setFilteredPatients(filteredPatients);
  };

  return (
    <div className='patients-container'>
      <Row>
        <Col>
          <Button icon={<UserAddOutlined />} onClick={() => props.history.push(routes.addPatient)}>
            {Dictionary.addPatient.header}
          </Button>
        </Col>
        <Col>
          <DebouncedSearchInput
            onDebounced={text => {
              setFilter({ endDate: filter.endDate, startDate: filter.startDate, search: text });
              filterPatients();
              setSearchQuery(text);
            }}
            delay={250}
          />
        </Col>
        <Col>
          <PatientInCreditOrDebt
            onSelect={handlePatientTypeChanged}
            patientsInDebtOrCredit={patientsInDebtOrCredit}
            isLoading={isSelectPatientTypeLoading}
          />
        </Col>
        <Col>
          <DatePicker
            format={DATE_FORMAT}
            placeholder={Dictionary.patientContainer.fromLastTreatment}
            onChange={date => setFilter({ endDate: date, startDate: filter.startDate, search: filter.search })}
          />
        </Col>
        <Col>
          <DatePicker
            format={DATE_FORMAT}
            placeholder={Dictionary.patientContainer.toLastTreatment}
            onChange={date => setFilter({ startDate: date, endDate: filter.endDate, search: filter.search })}
          />
        </Col>
      </Row>
      <PatientsTable
        searchText={searchQuery}
        isFetching={!isDataFetchedOnce}
        patients={filteredPatients.map(patient => ({ ...patient, key: patient._id }))}
      />
    </div>
  );
};
export default PatientContainer;
