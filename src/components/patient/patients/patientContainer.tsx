import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, message, Space } from 'antd';
import moment, { Moment } from 'moment';

import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import PatientService, { Patient, PatientType } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils from 'utils/tableUtils';
import PatientInCreditOrDebt from './patientInCreditOrDebt';
import PatientsTable from './patientsTable';

import './patient.scss';

interface PatientContainerProps extends RouteComponentProps {}

interface Filters {
  startDate: Moment | null;
  endDate: moment.Moment | null;
  search: string;
}

const PatientContainer: React.FC<PatientContainerProps> = props => {
  const { patients, setPatients, isDataFetchedOnce } = usePatients();
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isSelectPatientTypeLoading, setIsSelectPatientTypeLoading] = useState(false);
  const [patientsInDebtOrCredit, setPatientsInDebtOrCredit] = useState(PatientType.AllPatients);
  const [filter, setFilter] = useState<Filters>({
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
        TableUtils.filter(patient, filter.search, [
          'firstName',
          'lastName',
          'momName',
          'calculatedAge',
          'phone',
          'email',
          'lastTreatment'
        ])
      );

    if (filter.startDate)
      filteredPatients = filteredPatients.filter(patient => moment(patient.lastTreatment) < filter.startDate!);

    if (filter.endDate)
      filteredPatients = filteredPatients.filter(patient => moment(patient.lastTreatment) > filter.endDate!);

    setFilteredPatients(filteredPatients);
  };

  return (
    <div className='patients-container'>
      <Space>
        <Button icon={<UserAddOutlined />} onClick={() => props.history.push(routes.addPatient)}>
          {Dictionary.addPatient.header}
        </Button>

        <DebouncedSearchInput onDebounced={text => setFilter({ ...filter, search: text })} delay={250} />

        <PatientInCreditOrDebt
          onSelect={handlePatientTypeChanged}
          patientsInDebtOrCredit={patientsInDebtOrCredit}
          isLoading={isSelectPatientTypeLoading}
        />

        <DatePicker
          showToday={false}
          format={DATE_FORMAT}
          placeholder={Dictionary.patientContainer.fromLastTreatment}
          onChange={date => setFilter({ ...filter, endDate: date as moment.Moment })}
        />

        <DatePicker
          showToday={false}
          format={DATE_FORMAT}
          placeholder={Dictionary.patientContainer.toLastTreatment}
          onChange={date => setFilter({ ...filter, startDate: date as moment.Moment })}
        />
      </Space>
      <PatientsTable
        searchText={filter.search}
        isFetching={!isDataFetchedOnce}
        patients={filteredPatients.map(patient => ({ ...patient, key: patient._id }))}
      />
    </div>
  );
};
export default PatientContainer;
