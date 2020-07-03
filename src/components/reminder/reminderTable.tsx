import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Reminder } from 'services/reminderService';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface ReminderTableProps {
  isFetching: boolean;
  reminders: WithKey<Reminder>[];
  searchText: string;
}

const ReminderTable: React.FC<ReminderTableProps> = props => {
  const history = useHistory();

  const tableUtils = new TableUtils<Reminder>(props.searchText);

  const columns: ColumnsType<Reminder> = [
    tableUtils.getStringColumn(Dictionary.reminders.name, 'name'),
    tableUtils.getNumberColumn(Dictionary.reminders.reminder, 'reminders'),
    tableUtils.getDateColumn(Dictionary.reminders.date, 'reminderDate')
  ];

  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);
  return (
    <Table<Reminder>
      pagination={{ pageSize: 7, showSizeChanger: false }}
      loading={props.isFetching}
      columns={columns}
      showSorterTooltip={false}
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
