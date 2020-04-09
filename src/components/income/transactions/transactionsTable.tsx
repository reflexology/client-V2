import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
import { Transaction } from 'services/transactionService';
import TableUtils from 'utils/tableUtils';

interface TransactionsTableProps {
  isFetching: boolean;
  transactions: Transaction[];
  searchText: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = props => {
  const { isFetching, transactions } = props;
  const history = useHistory<Transaction>();

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
    tableUtils.getStringColumn(Dictionary.transactionForm.incomeOrExpenditure, 'transactionType', getHighlighter()),
    tableUtils.getNumberColumn(Dictionary.transactionForm.amount, 'amount', getHighlighter()),
    tableUtils.getDateColumn(Dictionary.transactionForm.createdAt, 'createdAt', getHighlighter())
  ];
  return (
    <Table<Transaction> pagination={{ pageSize: 8 }} loading={isFetching} columns={columns} dataSource={transactions} />
  );
};

export default React.memo(TransactionsTable);
