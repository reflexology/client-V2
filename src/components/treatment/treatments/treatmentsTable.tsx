import React from 'react';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import CurrentPatient from 'components/common/currentPatient';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import { Patient } from 'services/patientService';
import { Treatment } from 'services/treatmentService';
import history from 'utils/history';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface TreatmentsTableProps {
  isFetching: boolean;
  treatments: WithKey<Treatment>[];
  searchText: string;
  currentPatient: Patient | undefined;
}

const TreatmentsTable: React.FC<TreatmentsTableProps> = props => {
  const tableUtils = new TableUtils<Treatment>(props.searchText);
  const columns: ColumnsType<Treatment> = [
    tableUtils.getDateColumn(Dictionary.treatmentForm.treatmentDate, 'treatmentDate'),
    tableUtils.getNumberColumn(Dictionary.treatmentForm.treatmentNumber, 'treatmentNumber'),
    tableUtils.getStringColumn(Dictionary.treatmentForm.visitReason, 'visitReason'),
    tableUtils.getStringColumn(Dictionary.treatmentForm.findings, 'findings'),
    tableUtils.getStringColumn(Dictionary.treatmentForm.recommendations, 'recommendations'),
    tableUtils.getNumberColumn(Dictionary.treatmentForm.treatmentPrice, 'treatmentPrice'),
    tableUtils.getNumberColumn(Dictionary.treatmentForm.paidPrice, 'paidPrice'),
    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, record: Treatment) => (
        <Button
          disabled={!props.currentPatient?._id}
          onClick={e => {
            e.stopPropagation();
            history.push(routes.editTreatment.format(props.currentPatient?._id!, record._id));
          }}
          type='link'
        >
          ערוך
        </Button>
      )
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
