import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TransactionService, { Transaction } from 'services/transactionService';
import TableUtils from 'utils/tableUtils';

import TransactionsTable from './transactionsTable';

interface TransactionContainerProps extends RouteComponentProps {}

const TransactionContainer: React.FC<TransactionContainerProps> = props => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    TransactionService.getTransactions()
      .then(setTransactions)
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => setFilteredTransactions(transactions), [transactions]);

  const filterTransactions = (search: string) =>
    setFilteredTransactions(
      transactions.filter(transaction =>
        TableUtils.filter(transaction, search, ['description', 'note', 'amount', 'createdAt'])
      )
    );

  return (
    <div>
      <Space>
        <Button icon={<PlusOutlined />} onClick={() => props.history.push(routes.addTransaction)}>
          {Dictionary.transaction.addTransactionButton}
        </Button>
        <DebouncedSearchInput
          onDebounced={text => {
            filterTransactions(text);
            setSearchQuery(text);
          }}
          delay={250}
        />
        <Button onClick={() => props.history.push(routes.reports)}>{Dictionary.report.showReport}</Button>
      </Space>
      <TransactionsTable
        searchText={searchQuery}
        isFetching={isFetching}
        transactions={filteredTransactions.map(transaction => ({ ...transaction, key: transaction._id }))}
      />
    </div>
  );
};

export default TransactionContainer;
