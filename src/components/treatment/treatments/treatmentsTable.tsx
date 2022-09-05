import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { pageSizeAtom } from 'atoms/generalAtoms';
import { treatmentsAtom } from 'atoms/treatmentAtoms';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import { Patient } from 'services/patientService';
import TreatmentService, { Treatment, TreatmentType } from 'services/treatmentService';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface TreatmentsTableProps {
  isFetching: boolean;
  treatments: WithKey<Treatment>[];
  searchText: string;
  currentPatient: Patient | undefined;
}

const TreatmentsTable: React.FC<TreatmentsTableProps> = props => {
  const setTreatments = useSetRecoilState(treatmentsAtom);
  const [pageSize, setPageSize] = useRecoilState(pageSizeAtom);
  const navigate = useNavigate();

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
              navigate(routes.editTreatment.format(props.currentPatient?._id!, record._id));
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
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['7', '10', '15', '20'],
        pageSize: pageSize,
        onShowSizeChange: (current, size) => setPageSize(size)
      }}
      loading={props.isFetching}
      columns={columns}
      dataSource={props.treatments}
      onRow={treatment => ({ onClick: () => navigate(routes.treatment.format(treatment._id), { state: treatment }) })}
      scroll={{ x: 'max-content' }}
      rowClassName='clickable'
      showSorterTooltip={false}
    />
  );
};

export default React.memo(TreatmentsTable);
