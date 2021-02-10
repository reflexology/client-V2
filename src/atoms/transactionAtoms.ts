import { atom, selector } from 'recoil';

import { Transaction } from 'services/transactionService';
import TableUtils from 'utils/tableUtils';

export type TransactionFilters = {
  search: string;
};
export const defaultFilters = {
  search: ''
};

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
  if (filters.search)
    filteredTransactions = transactions.filter(transaction =>
      TableUtils.filter(transaction, filters.search, ['description', 'note', 'amount', 'createdAt'])
    );

  return filteredTransactions;
};
