import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { filteredTransactionsSelector, transactionsAtom, transactionsFiltersAtom } from 'atoms/transactionAtoms';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import DropdownFilter from 'components/common/dropdownFilter';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import TransactionService, { TransactionTypeFilter } from 'services/transactionService';
import TransactionsTable from './transactionsTable';

interface TransactionContainerProps {}

const TransactionContainer: React.FC<TransactionContainerProps> = props => {
  const navigate = useNavigate();

  const setTransactions = useSetRecoilState(transactionsAtom);
  const filteredTransactions = useRecoilValue(filteredTransactionsSelector);
  const [filters, setFilters] = useRecoilState(transactionsFiltersAtom);

  useEffect(() => {
    TransactionService.getTransactions().then(setTransactions);
  }, []);
  return (
    <>
      <Space>
        <Button icon={<PlusOutlined />} onClick={() => navigate(routes.addTransaction)}>
          {Dictionary.transaction.addTransactionButton}
        </Button>

        <DebouncedSearchInput onDebounced={text => setFilters({ ...filters, search: text })} delay={250} />
        <DropdownFilter
          options={Object.values(TransactionTypeFilter).map(value => ({
            value,
            label: Dictionary.transaction[value]
          }))}
          selectedOption={{
            value: filters.transactionType,
            label: Dictionary.transaction[filters.transactionType]
          }}
          onSelect={option => setFilters({ ...filters, transactionType: option.value })}
          isLoading={false}
        />

        <Button onClick={() => navigate(routes.reports)}>{Dictionary.report.showReport}</Button>
      </Space>
      <TransactionsTable
        searchText={filters.search}
        isFetching={!filteredTransactions}
        transactions={filteredTransactions?.map(transaction => ({ ...transaction, key: transaction._id })) || []}
      />
    </>
  );
};

export default TransactionContainer;
