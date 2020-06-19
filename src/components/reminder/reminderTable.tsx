import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
import { Reminder } from 'services/reminderService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface ReminderTableProps {
  isFetching: boolean;
  reminders: WithKey<Reminder>[];
  searchText: string;
}

const ReminderTable: React.FC<ReminderTableProps> = props => {
  const history = useHistory();
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

  const tableUtils = new TableUtils<Reminder>();
  const columns: ColumnsType<Reminder> = [
    tableUtils.getStringColumn(Dictionary.reminders.name, 'name', getHighlighter()),
    tableUtils.getNumberColumn(Dictionary.reminders.reminder, 'reminders', getHighlighter()),
    {
      ...tableUtils.getDateColumn(Dictionary.reminders.date, 'reminderDate'),
      render: lastTreatment =>
        lastTreatment ? (
          <Highlighter
            highlightClassName='highlighted-text'
            searchWords={[props.searchText]}
            autoEscape
            textToHighlight={moment(lastTreatment).format(DATE_FORMAT) || ''}
          />
        ) : null
    }
  ];

  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);
  return (
    <Table<Reminder>
      pagination={{ pageSize: 7, showSizeChanger: false }}
      loading={props.isFetching}
      columns={columns}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: selectedRows => setSelectedRows(selectedRows)
      }}
      dataSource={props.reminders}
      scroll={{ x: 'max-content' }}
      rowClassName='clickable'
      onRow={record => ({ onClick: () => history.push(routes.treatment.format(record.treatmentId)) })}
    />
  );
};

export default React.memo(ReminderTable);
