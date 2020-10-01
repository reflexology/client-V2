import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';

import { filteredPatientsSelector, patientsFiltersAtom } from 'atoms/patientAtoms';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import { DATE_FORMAT } from 'utils/constants';
import PatientInCreditOrDebt from './patientInCreditOrDebt';
import PatientsTable from './patientsTable';

import './patient.scss';
import { PatientType } from 'services/patientService';

interface PatientContainerProps extends RouteComponentProps {}

export type Filters = {
  startDate: string | undefined;
  endDate: string | undefined;
  search: string;
  patientType: PatientType;
};

const PatientContainer: React.FC<PatientContainerProps> = props => {
  const filteredPatients = useRecoilValue(filteredPatientsSelector);
  const [filters, setFilters] = useRecoilState(patientsFiltersAtom);

  return (
    <div className='patients-container'>
      <Space>
        <Button icon={<UserAddOutlined />} onClick={() => props.history.push(routes.addPatient)}>
          {Dictionary.addPatient.header}
        </Button>

        <DebouncedSearchInput onDebounced={text => setFilters({ ...filters, search: text })} delay={250} />

        <PatientInCreditOrDebt
          onSelect={patientType => setFilters({ ...filters, patientType })}
          patientsInDebtOrCredit={filters.patientType}
          isLoading={false}
        />

        <DatePicker
          showToday={false}
          format={DATE_FORMAT}
          placeholder={Dictionary.patientContainer.fromLastTreatment}
          onChange={date => setFilters({ ...filters, endDate: date?.toString() })}
        />

        <DatePicker
          showToday={false}
          format={DATE_FORMAT}
          placeholder={Dictionary.patientContainer.toLastTreatment}
          onChange={date => setFilters({ ...filters, startDate: date?.toString() })}
        />
      </Space>
      <PatientsTable
        searchText={filters.search}
        isFetching={!filteredPatients}
        patients={filteredPatients?.map(patient => ({ ...patient, key: patient._id })) || []}
      />
    </div>
  );
};

export default PatientContainer;
