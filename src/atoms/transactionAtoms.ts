import { atom, selector } from 'recoil';

import { Transaction, TransactionTypeFilter } from 'services/transactionService';
import TableUtils from 'utils/tableUtils';

export type TransactionFilters = {
  search: string;
  transactionType: TransactionTypeFilter;
};
export const defaultFilters = {
  search: '',
  transactionType: TransactionTypeFilter.All
};

export const currentTransactionsPageAtom = atom<number>({
  key: 'currentTransactionsPageAtom',
  default: 1
});

export const transactionsAtom = atom<Transaction[] | null>({
  key: 'transactionsAtom',
  default: null
});

export const transactionsFiltersAtom = atom<TransactionFilters>({
  key: 'transactionsFiltersAtom',
  default: defaultFilters
});

export const filteredTransactionsSelector = selector<Transaction[] | undefined>({
  key: 'filteredTransactions',
  get: ({ get }) => {
    const transactions = get(transactionsAtom);
    return transactions ? filterTransactions(transactions, get(transactionsFiltersAtom)) : undefined;
  }
});

export const transactionsDescriptionsSelector = selector<{ value: string }[] | undefined>({
  key: 'transactionsDescriptionsSelector',
  get: ({ get }) => {
    const transactions = get(transactionsAtom);
    return [
      ...new Set(
        transactions?.filter(transaction => !transaction.isFromTreatment).map(transaction => transaction.description)
      )
    ].map(description => ({
      value: description
    }));
  }
});

const filterTransactions = (transactions: Transaction[], filters: TransactionFilters) => {
  let filteredTransactions = [...transactions];

  if (filters.transactionType !== TransactionTypeFilter.All)
    filteredTransactions = filteredTransactions.filter(transaction =>
      filters.transactionType === TransactionTypeFilter.Income ? transaction.amount > 0 : transaction.amount < 0
    );

  if (filters.search)
    filteredTransactions = transactions.filter(transaction =>
      TableUtils.filter(transaction, filters.search, ['description', 'note', 'amount', 'createdAt'])
    );

  return filteredTransactions;
};
