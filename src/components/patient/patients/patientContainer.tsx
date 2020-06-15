import './patient.scss';

import { UserAddOutlined } from '@ant-design/icons';
import { Button, Col, message, Row } from 'antd';
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
    setIsFetching(true);
    PatientService.getPatients(
      patientsInDebtOrCredit === PatientType.InCredit,
      patientsInDebtOrCredit === PatientType.InDebt
    )
      .then(setPatients)
      .catch(() => {
        message.error('could not load patients');
      })
      .finally(() => setIsFetching(false));
  }, [patientsInDebtOrCredit]);

  useEffect(() => setFilteredPatients(patients), [patients]);

  const filterPatients = (search: string) =>
    setFilteredPatients(
      patients.filter(patient => tableUtils.filter(patient, search, ['_id', 'maritalStatus', 'createdAt', 'createdBy']))
    );

  const handlePatientTypeChanged = (type: PatientType) => setPatientsInDebtOrCredit(type);

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
            isLoading={patients.length > 0 && isFetching}
          />
        </Col>
      </Row>
      <PatientsTable
        searchText={searchQuery}
        isFetching={isFetching && patients.length === 0}
        patients={filteredPatients.map(patient => ({ ...patient, key: patient._id }))}
      />
    </div>
  );
};
export default PatientContainer;
