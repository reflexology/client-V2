import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserAddOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, message, Space } from 'antd';

import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TableUtils from 'utils/tableUtils';
import TreatmentsTable from './treatmentsTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { patientsAtom, currentPatientAtom } from 'atoms/patientAtoms';
import { treatmentsAtom } from 'atoms/treatmentAtoms';

interface TreatmentsContainerProps extends RouteComponentProps<{ patientId: string }> {}

const TreatmentsContainer: React.FC<TreatmentsContainerProps> = props => {
  const [treatments, setTreatments] = useRecoilState(treatmentsAtom);
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPatient, setCurrentPatient] = useRecoilState(currentPatientAtom);
  const patients = useRecoilValue(patientsAtom);

  useEffect(() => setCurrentPatient(patients?.find(patient => patient._id === props.match.params.patientId)), [
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

  useEffect(() => setFilteredTreatments(treatments), [treatments]);

  const filterTreatments = (search: string) =>
    setFilteredTreatments(
      treatments.filter(Treatment =>
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
    <div className='treatments-container'>
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
        <Button icon={<ArrowRightOutlined />} onClick={() => props.history.push(routes.patients)}>
          {Dictionary.back}
        </Button>
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
