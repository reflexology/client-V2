import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import CurrentPatient from 'components/common/currentPatient';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Patient } from 'services/patientService';
import { Treatment } from 'services/treatmentService';
import { DATE_FORMAT } from 'utils/constants';
import history from 'utils/history';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface TreatmentsTableProps {
  isFetching: boolean;
  treatments: WithKey<Treatment>[];
  searchText: string;
  currentPatient: Patient | undefined;
}

const TreatmentsTable: React.FC<TreatmentsTableProps> = props => {
  const getHighlighter = () => ({
    render: (text: string) => (
      <Highlighter
        highlightClassName='highlighted-text'
        searchWords={[props.searchText]}
        autoEscape
        textToHighlight={text || ''}
      />
    )
  });

  const tableUtils = new TableUtils<Treatment>();
  const columns: ColumnsType<Treatment> = [
    {
      ...tableUtils.getDateColumn(Dictionary.treatmentForm.treatmentDate, 'treatmentDate'),
      render: lastTreatment =>
        lastTreatment ? (
          <Highlighter
            highlightClassName='highlighted-text'
            searchWords={[props.searchText]}
            autoEscape
            textToHighlight={moment(lastTreatment).format(DATE_FORMAT) || ''}
          />
        ) : null
    },
    tableUtils.getNumberColumn(Dictionary.treatmentForm.treatmentNumber, 'treatmentNumber', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.treatmentForm.visitReason, 'visitReason', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.treatmentForm.findings, 'findings', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.treatmentForm.recommendations, 'recommendations', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.treatmentForm.reminders, 'reminders', getHighlighter()),
    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, record: Treatment) => (
        <Button onClick={() => history.push(routes.addPatient.format(record._id), record)} type='link'>
          ערוך
        </Button>
      )
    }
  ];

  return (
    <Table<Treatment>
      title={() => <CurrentPatient patient={props.currentPatient} />}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      loading={props.isFetching}
      columns={columns}
      dataSource={props.treatments}
    />
  );
};

export default React.memo(TreatmentsTable);
