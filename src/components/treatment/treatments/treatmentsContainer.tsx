import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArrowRightOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useRecoilState } from 'recoil';

import { treatmentsAtom } from 'atoms/treatmentAtoms';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import useCurrentPatient from 'hooks/useCurrentPatient';
import CommonService from 'services/commonService';
import TreatmentService, { Treatment } from 'services/treatmentService';
import TableUtils from 'utils/tableUtils';
import TreatmentsTable from './treatmentsTable';

import './treatments.scss';

interface TreatmentsContainerProps extends RouteComponentProps<{ patientId: string }> {}

const TreatmentsContainer: React.FC<TreatmentsContainerProps> = props => {
  const [treatments, setTreatments] = useRecoilState(treatmentsAtom);
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentPatient = useCurrentPatient({ patientId: props.match.params.patientId });

  useEffect(() => {
    TreatmentService.getTreatmentsByPatientId(props.match.params.patientId)
      .then(setTreatments)
      .catch(err => CommonService.showErrorMessage(err, 'could not load treatments'))
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
