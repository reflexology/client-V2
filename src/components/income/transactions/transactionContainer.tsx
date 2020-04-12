import { DollarOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import { routes } from 'components/router/routes';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TransactionService, { Transaction } from 'services/transactionService';
import TableUtils from 'utils/tableUtils';

import TransactionsTable from './transactionsTable';

const tableUtils = new TableUtils<Transaction>();

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
        tableUtils.filter(transaction, search, [
          '_id',
          'createdAt',
          'isFromTreatment',
          'transactionType',
          'treatmentId'
        ])
      )
    );
  return (
    <div>
      <Row>
        <Col>
          <Button icon={<DollarOutlined />} onClick={() => props.history.push(routes.addTransaction)}>
            הוסף הכנסה/הוצאה
          </Button>
        </Col>
        <Col>
          <DebouncedSearchInput
            onDebounced={text => {
              filterTransactions(text);
              setSearchQuery(text);
            }}
            delay={250}
          />
        </Col>
      </Row>
      <TransactionsTable searchText={searchQuery} isFetching={isFetching} transactions={filteredTransactions} />
    </div>
  );
};

export default TransactionContainer;
