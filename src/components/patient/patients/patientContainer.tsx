import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClearOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';
import { Moment } from 'moment';
import { useRecoilState, useRecoilValue } from 'recoil';

import { defaultFilters, filteredPatientsSelector, patientsFiltersAtom } from 'atoms/patientAtoms';
import DebouncedSearchInput, { DebouncedSearchInputRef } from 'components/common/debouncedSearchInput';
import DropdownFilter from 'components/common/dropdownFilter';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import { PatientType } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import PatientsTable from './patientsTable';

import './patient.scss';

interface PatientContainerProps {}

export type Filters = {
  startDate: Moment | undefined;
  endDate: Moment | undefined;
  search: string;
  patientType: PatientType;
};

const PatientContainer: React.FC<PatientContainerProps> = () => {
  const navigate = useNavigate();
  const filteredPatients = useRecoilValue(filteredPatientsSelector);
  const [filters, setFilters] = useRecoilState(patientsFiltersAtom);

  const searchInputRef = useRef<DebouncedSearchInputRef>(null);

  useEffect(() => () => setFilters(defaultFilters), []);

  const resetFilters = () => {
    setFilters(defaultFilters);
    searchInputRef.current?.reset();
  };

  const isResetDisabled = useCallback(
    () => JSON.stringify(filters) === JSON.stringify(defaultFilters),
    [filters, defaultFilters]
  );

  return (
    <div className='patients-container'>
      <Space className='actions-container'>
        <Button icon={<UserAddOutlined />} onClick={() => navigate(routes.addPatient)}>
          {Dictionary.addPatient.header}
        </Button>

        <DebouncedSearchInput
          ref={searchInputRef}
          onDebounced={text => setFilters({ ...filters, search: text })}
          delay={250}
        />

        <DropdownFilter
          options={Object.values(PatientType).map(value => ({ value, label: Dictionary.patientContainer[value] }))}
          selectedOption={{
            value: filters.patientType,
            label: Dictionary.patientContainer[filters.patientType]
          }}
          onSelect={option => setFilters({ ...filters, patientType: option.value })}
          isLoading={false}
        />

        <DatePicker
          showToday={false}
          format={DATE_FORMAT}
          placeholder={Dictionary.patientContainer.fromLastTreatment}
          onChange={date => setFilters({ ...filters, startDate: date! })}
          value={filters.startDate}
        />

        <DatePicker
          showToday={false}
          format={DATE_FORMAT}
          placeholder={Dictionary.patientContainer.toLastTreatment}
          onChange={date => setFilters({ ...filters, endDate: date! })}
          value={filters.endDate}
        />

        <Button type='primary' icon={<ClearOutlined />} disabled={isResetDisabled()} onClick={resetFilters}>
          {Dictionary.patientContainer.resetFilters}
        </Button>
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
