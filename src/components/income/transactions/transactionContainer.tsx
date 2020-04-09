import { Button, Col, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import React, { useEffect, useState } from 'react';
import TransactionService, { Transaction } from 'services/transactionService';

import TransactionsTable from './transactionsTable';

export interface TransactionContainerProps {}

const TransactionContainer: React.FC<TransactionContainerProps> = props => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    TransactionService.getTransactions()
      .then(setTransactions)
      .finally(() => setIsFetching(false));
  }, []);
  return (
    <div>
      <Row>
        <Col>
          <Button>הוסף הכנסה/הוצאה</Button>
        </Col>
      </Row>
      <TransactionsTable searchText='temp' isFetching={isFetching} transactions={transactions} />
    </div>
  );
};

export default TransactionContainer;
