import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import CurrentPatient from 'components/common/currentPatient';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import { Patient } from 'services/patientService';
import TreatmentService, { Treatment, TreatmentType } from 'services/treatmentService';
import history from 'utils/history';
import TableUtils, { WithKey } from 'utils/tableUtils';
import { treatmentsAtom } from 'atoms/treatmentAtoms';
import { useSetRecoilState } from 'recoil';

interface TreatmentsTableProps {
  isFetching: boolean;
  treatments: WithKey<Treatment>[];
  searchText: string;
  currentPatient: Patient | undefined;
}

const TreatmentsTable: React.FC<TreatmentsTableProps> = props => {
  const setTreatments = useSetRecoilState(treatmentsAtom);

  const tableUtils = new TableUtils<Treatment>(props.searchText);
  const columns: ColumnsType<Treatment> = [
    tableUtils.getStringColumn(Dictionary.treatmentForm.treatmentType, 'treatmentType', {
      render: (value: TreatmentType) => (
        <div className={`treatment-type ${value === TreatmentType.Diet ? 'diet' : 'reflexology'}`}>
          {Dictionary.treatmentTypes[value.toLowerCase() as keyof typeof Dictionary.treatmentTypes]}
        </div>
      ),
      width: '100px'
    }),
    tableUtils.getDateColumn(Dictionary.treatmentForm.treatmentDate, 'treatmentDate', { width: '130px' }),
    tableUtils.getNumberColumn(Dictionary.treatmentForm.treatmentNumber, 'treatmentNumber', { width: '130px' }),
    tableUtils.getStringColumn(Dictionary.treatmentForm.visitReason, 'visitReason'),
    tableUtils.getStringColumn(Dictionary.treatmentForm.findings, 'findings'),
    tableUtils.getStringColumn(Dictionary.treatmentForm.recommendations, 'recommendations'),
    tableUtils.getNumberColumn(Dictionary.treatmentForm.treatmentPrice, 'treatmentPrice', { width: '130px' }),
    tableUtils.getNumberColumn(Dictionary.treatmentForm.paidPrice, 'paidPrice', { width: '132px' }),
    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, record: Treatment) => (
        <>
          <Button
            style={{ paddingRight: '4px' }}
            disabled={!props.currentPatient?._id}
            onClick={e => {
              e.stopPropagation();
              history.push(routes.editTreatment.format(props.currentPatient?._id!, record._id));
            }}
            type='link'
          >
            ערוך
          </Button>
          <Popconfirm
            title='האם אתה בטוח?'
            onCancel={e => e?.stopPropagation()}
            onConfirm={e => {
              e?.stopPropagation();
              TreatmentService.deleteTreatment(record._id).then(() =>
                setTreatments(treatments => treatments.filter(treatment => treatment._id !== record._id))
              );
            }}
          >
            <Button onClick={e => e.stopPropagation()} type='link'>
              מחק
            </Button>
          </Popconfirm>
        </>
      ),
      width: '160px'
    }
  ];

  return (
    <Table<Treatment>
      title={() => <CurrentPatient />}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      loading={props.isFetching}
      columns={columns}
      dataSource={props.treatments}
      onRow={treatment => ({ onClick: () => history.push(routes.treatment.format(treatment._id), treatment) })}
      scroll={{ x: 'max-content' }}
      rowClassName='clickable'
      showSorterTooltip={false}
    />
  );
};

export default React.memo(TreatmentsTable);
