import './patient.scss';

import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PatientService, { Patient, PatientType } from 'services/patientService';
import TableUtils from 'utils/tableUtils';

import PatientInCreditOrDebt from './patientInCreditOrDebt';
import PatientsTable from './patientsTable';

const tableUtils = new TableUtils<Patient>();

interface PatientContainerProps extends RouteComponentProps {}

const PatientContainer: React.FC<PatientContainerProps> = props => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [patientsInDebtOrCredit, setPatientsInDebtOrCredit] = useState(PatientType.AllPatients);

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

  const onClickPatientsInDebtOrCredit = (type: PatientType) =>
    PatientService.getPatients(type === PatientType.InCredit, type === PatientType.InDebt)
      .then(setPatients)
      .finally(() => {
        setIsFetching(false);
        setPatientsInDebtOrCredit(type);
      });

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
            inDebtOrCredit={onClickPatientsInDebtOrCredit}
            patientsInDebtOrCredit={patientsInDebtOrCredit}
          />
        </Col>
      </Row>
      <PatientsTable searchText={searchQuery} isFetching={isFetching} patients={filteredPatients} />
    </div>
  );
};
export default PatientContainer;
