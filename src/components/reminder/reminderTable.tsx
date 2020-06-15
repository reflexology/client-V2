import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Reminder } from 'services/reminderService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils from 'utils/tableUtils';

interface ReminderTableProps {
  isFetching: boolean;
  reminders: Reminder[];
  searchText: string;
}

const ReminderTable: React.FC<ReminderTableProps> = props => {
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
    tableUtils.getNumberColumn(Dictionary.reminders.reminder, 'reminder', getHighlighter()),
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
      pagination={{ pageSize: 7 }}
      loading={props.isFetching}
      columns={columns}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: selectedRows => setSelectedRows(selectedRows)
      }}
      dataSource={props.reminders}
    />
  );
};

export default React.memo(ReminderTable);
