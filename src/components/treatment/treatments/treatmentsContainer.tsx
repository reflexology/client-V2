import { UserAddOutlined } from '@ant-design/icons';
import { Button, message, Space } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TableUtils from 'utils/tableUtils';

import TreatmentsTable from './treatmentsTable';

interface TreatmentsContainerProps extends RouteComponentProps<{ patientId: string }> {}

const TreatmentsContainer: React.FC<TreatmentsContainerProps> = props => {
  const [Treatments, setTreatments] = useState<Treatment[]>([]);
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { patients, currentPatient, setCurrentPatient } = usePatients();

  useEffect(() => setCurrentPatient(patients.find(patient => patient._id === props.match.params.patientId)), [
    patients
  ]);

  useEffect(() => {
    TreatmentService.getTreatmentsByPatientId(props.match.params.patientId)
      .then(setTreatments)
      .catch(() => {
        message.error('could not load treatments');
      })
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => setFilteredTreatments(Treatments), [Treatments]);

  const filterTreatments = (search: string) =>
    setFilteredTreatments(
      Treatments.filter(Treatment =>
        TableUtils.filter(Treatment, search, [
          'treatmentDate',
          'treatmentNumber',
          'visitReason',
          'findings',
          'recommendations',
          'reminders'
        ])
      )
    );

  return (
    <div className='Treatments-container'>
      <Space>
        <Button
          icon={<UserAddOutlined />}
          onClick={() => props.history.push(routes.addTreatment.format(props.match.params.patientId))}
        >
          {Dictionary.treatments.addTreatment}
        </Button>
        <DebouncedSearchInput
          onDebounced={text => {
            filterTreatments(text);
            setSearchQuery(text);
          }}
          delay={250}
        />
      </Space>
      <TreatmentsTable
        searchText={searchQuery}
        isFetching={isFetching}
        treatments={filteredTreatments.map(Treatment => ({ ...Treatment, key: Treatment._id }))}
        currentPatient={currentPatient}
      />
    </div>
  );
};
export default TreatmentsContainer;
