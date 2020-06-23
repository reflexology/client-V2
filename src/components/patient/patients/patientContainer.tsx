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

  const filterPatients = (search: string) => {
    !search
      ? setFilteredPatients(patients)
      : setFilteredPatients(
          patients.filter(patient =>
            tableUtils.filter(patient, search, [
              '_id',
              'maritalStatus',
              'createdAt',
              'createdBy',
              'childrenAges',
              'profession'
            ])
          )
        );
  };

  const handlePatientTypeChanged = (type: PatientType) => setPatientsInDebtOrCredit(type);

  const filterByTreatmentStartDate = (date: any, dateString: string) => {
    console.log(date, dateString);
    setFilteredPatients(
      patients.filter(patient =>
        patient.lastTreatment ? new Date(patient.lastTreatment as any) > new Date(date?.toDate() as any) : patient
      )
    );
  };

  const filterByTreatmentEndDate = (date: any, dateString: string) => {
    setFilteredPatients(
      patients.filter(patient =>
        patient.lastTreatment ? new Date(patient.lastTreatment as any) < new Date(date?.toDate() as any) : patient
      )
    );
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
              filterPatients(text);
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
          מטיפול אחרון
          <DatePicker onChange={filterByTreatmentStartDate} />
        </Col>
        <Col>
          עד טיפול אחרון
          <DatePicker onChange={filterByTreatmentEndDate} />
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
