import './transaction.scss';

import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Transaction } from 'services/transactionService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils from 'utils/tableUtils';

interface TransactionsTableProps {
  isFetching: boolean;
  transactions: Transaction[];
  searchText: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = props => {
  const { isFetching, transactions } = props;

  const getHighlighter = () => ({
    render: (text: string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[props.searchText]}
        autoEscape
        textToHighlight={text || ''}
      />
    )
  });

  const tableUtils = new TableUtils<Transaction>();
  const columns: ColumnsType<Transaction> = [
    tableUtils.getStringColumn(Dictionary.transactionForm.description, 'description', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.transactionForm.note, 'note', getHighlighter()),
    {
      ...tableUtils.getNumberColumn(Dictionary.transactionForm.amount, 'amount'),
      render: (text: number) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[props.searchText]}
          autoEscape
          textToHighlight={Math.abs(text).toString() || ''}
        />
      )
    },
    {
      ...tableUtils.getDateColumn(Dictionary.transactionForm.createdAt, 'createdAt'),
      render: createdAt =>
        createdAt ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[props.searchText]}
            autoEscape
            textToHighlight={moment(createdAt).format(DATE_FORMAT) || ''}
          />
        ) : null
    }
  ];
  return (
    <Table<Transaction>
      pagination={{ pageSize: 8 }}
      rowClassName={(record, index) => {
        if (record.isFromTreatment) {
          return 'table-row-from-treatment';
        } else if (record.amount > 0) return 'table-row-income';
        return 'table-row-expenditure';
      }}
      loading={isFetching}
      columns={columns}
      dataSource={transactions}
    />
  );
};

export default React.memo(TransactionsTable);
