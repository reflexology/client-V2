import React from 'react';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useSetRecoilState } from 'recoil';

import { transactionsAtom } from 'atoms/transactionAtoms';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import TransactionService, { Transaction } from 'services/transactionService';
import TableUtils, { WithKey } from 'utils/tableUtils';

import './transaction.scss';

interface TransactionsTableProps {
  isFetching: boolean;
  transactions: WithKey<Transaction>[];
  searchText: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = props => {
  const history = useHistory<Transaction>();
  const setTransactions = useSetRecoilState(transactionsAtom);

  const { isFetching, transactions } = props;

  const tableUtils = new TableUtils<Transaction>(props.searchText);

  const columns: ColumnsType<Transaction> = [
    tableUtils.getStringColumn(Dictionary.transactionForm.description, 'description', {
      render: text => (text === 'treatment' ? <span style={{ fontWeight: 500 }}>טיפול</span> : text)
    }),
    tableUtils.getStringColumn(Dictionary.transactionForm.note, 'note'),
    tableUtils.getNumberColumn(Dictionary.transactionForm.amount, 'amount', {
      render(text: number, record) {
        return {
          props: {
            className: `amount-${record.amount > 0 ? 'income' : 'expenditure'}`
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
    }),
    tableUtils.getDateColumn(Dictionary.transactionForm.createdAt, 'createdAt'),
    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, record: Transaction) => (
        <>
          <Button
            disabled={record.isFromTreatment}
            style={{ paddingRight: '4px' }}
            onClick={e => {
              e.stopPropagation();
              history.push(routes.editTransaction.format(record._id), record);
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
              TransactionService.deleteTransaction(record._id).then(() =>
                setTransactions(transactions => transactions!.filter(transaction => transaction._id !== record._id))
              );
            }}
          >
            <Button disabled={record.isFromTreatment} onClick={e => e.stopPropagation()} type='link'>
              מחק
            </Button>
          </Popconfirm>
        </>
      ),
      width: '160px'
    }
  ];

  return (
    <Table<Transaction>
      pagination={{ pageSize: 8, showSizeChanger: false }}
      onRow={record => ({
        onClick: () => (record.isFromTreatment ? history.push(routes.treatment.format(record.treatmentId)) : null)
      })}
      rowClassName={record => (record.isFromTreatment ? 'clickable' : '')}
      loading={isFetching}
      columns={columns}
      dataSource={transactions}
      scroll={{ x: 'max-content' }}
      showSorterTooltip={false}
    />
  );
};

export default React.memo(TransactionsTable);
