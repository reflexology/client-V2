import './patient.scss';

import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PatientService, { Patient } from 'services/patientService';
import TableUtils from 'utils/tableUtils';

import PatientsTable from './patientsTable';

const tableUtils = new TableUtils<Patient>();

interface PatientContainerProps extends RouteComponentProps {}

const PatientContainer: React.FC<PatientContainerProps> = props => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    PatientService.getPatients()
      .then(setPatients)
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => setFilteredPatients(patients), [patients]);

  const filterPatients = (search: string) =>
    setFilteredPatients(
      patients.filter(patient => tableUtils.filter(patient, search, ['_id', 'maritalStatus', 'createdAt', 'createdBy']))
    );

  return (
    <div className='patients-container'>
      <Row>
        <Col>
          <Button icon={<UserAddOutlined />} onClick={() => props.history.push(routes.addPatient)}>
            הוסף לקוח
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
      </Row>
      <PatientsTable searchText={searchQuery} isFetching={isFetching} patients={filteredPatients} />
    </div>
  );
};
export default PatientContainer;
