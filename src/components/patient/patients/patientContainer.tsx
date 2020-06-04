import './patient.scss';

import { DownOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
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
  const [patientsInDebtOrCredit, setPatientsInDebtOrCredit] = useState(Dictionary.patientContainer.showAllPatients);

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

  const patientsInDebtOrCreditMenu = (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => {
          PatientService.getPatientsInCredit()
            .then(setPatients)
            .finally(() => {
              setIsFetching(false);
              setPatientsInDebtOrCredit(Dictionary.patientContainer.showInCredit);
            });
        }}
      >
        {Dictionary.patientContainer.showInCredit}
      </Menu.Item>
      <Menu.Item
        key='2'
        onClick={() => {
          PatientService.getPatientsInDebt()
            .then(setPatients)
            .finally(() => {
              setIsFetching(false);
              setPatientsInDebtOrCredit(Dictionary.patientContainer.showInDebt);
            });
        }}
      >
        {Dictionary.patientContainer.showInDebt}
      </Menu.Item>
      <Menu.Item
        key='3'
        onClick={() => {
          PatientService.getPatients()
            .then(setPatients)
            .finally(() => {
              setIsFetching(false);
              setPatientsInDebtOrCredit(Dictionary.patientContainer.showAllPatients);
            });
        }}
      >
        {Dictionary.patientContainer.showAllPatients}
      </Menu.Item>
    </Menu>
  );

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
          <Dropdown overlay={patientsInDebtOrCreditMenu}>
            <Button>
              {patientsInDebtOrCredit} <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <PatientsTable searchText={searchQuery} isFetching={isFetching} patients={filteredPatients} />
    </div>
  );
};
export default PatientContainer;
