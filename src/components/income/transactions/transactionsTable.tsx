import './transaction.scss';

import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
import { Transaction } from 'services/transactionService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface TransactionsTableProps {
  isFetching: boolean;
  transactions: WithKey<Transaction>[];
  searchText: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = props => {
  const history = useHistory<Transaction>();
  const { isFetching, transactions } = props;

  const getHighlighter = () => ({
    render(text: string) {
      return (
        <Highlighter
          highlightClassName='highlighted-text'
          searchWords={[props.searchText]}
          autoEscape
          textToHighlight={text || ''}
        />
      );
    }
  });

  const tableUtils = new TableUtils<Transaction>();

  const columns: ColumnsType<Transaction> = [
    tableUtils.getStringColumn(Dictionary.transactionForm.description, 'description', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.transactionForm.note, 'note', getHighlighter()),
    {
      ...tableUtils.getNumberColumn(Dictionary.transactionForm.amount, 'amount'),
      render(text: number, record) {
        return {
          props: {
            className: `amount-${record.isFromTreatment ? 'treatment' : record.amount > 0 ? 'income' : 'expenditure'}`
          },
          children: (
            <Highlighter
              highlightClassName='highlighted-text'
              searchWords={[props.searchText]}
              autoEscape
              textToHighlight={Math.abs(text).toString() || ''}
            />
          )
        };
      }
    },
    {
      ...tableUtils.getDateColumn(Dictionary.transactionForm.createdAt, 'createdAt'),
      render: createdAt =>
        createdAt ? (
          <Highlighter
            highlightClassName='highlighted-text'
            searchWords={[props.searchText]}
            autoEscape
            textToHighlight={moment(createdAt).format(DATE_FORMAT) || ''}
          />
        ) : null
    }
  ];

  return (
    <Table<Transaction>
      pagination={{ pageSize: 8, showSizeChanger: false }}
      onRow={record => ({
        onClick: () => (record.isFromTreatment ? history.push(routes.addTreatment) : null)
      })}
      rowClassName={record => (record.isFromTreatment ? 'clickable-row' : '')}
      loading={isFetching}
      columns={columns}
      dataSource={transactions}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default React.memo(TransactionsTable);
