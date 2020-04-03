import Dictionary from 'dictionary/dictionary';

import HttpService from './httpService';

export interface Transaction {
  _id: string;
  description: string;
  note?: string;
  amount: number;
  createdAt?: Date;
  transactionType: 'Income' | 'Expenditure';
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const TransactionService = {
  getTransactions() {
    return 'Transaction';
  },
  addTransaction(transaction: Transaction) {
    if (transaction.transactionType === Dictionary.transactionForm.expenditure) {
      transaction.amount = -1 * transaction.amount;
    }
    return HttpService.post<Transaction>(baseEndPoint + '/incomeAndExpenditure', transaction);
  },
  getTransactionOptions() {
    return [
      { label: Dictionary.transactionForm.income, value: 'Income' },
      { label: Dictionary.transactionForm.expenditure, value: 'Expenditure' }
    ];
  }
};

export default TransactionService;