import moment from 'moment';

import Dictionary from 'dictionary/dictionary';
import HttpService from './httpService';

export interface Transaction {
  _id: string;
  description: string;
  note?: string;
  amount: number;
  createdAt?: Date | moment.Moment;
  isFromTreatment: boolean;
  treatmentId: string;
  transactionType: TransactionType;
}

export interface Report {
  income: number;
  expenditure: number;
  netAmount: number;
}

export enum TransactionType {
  Income = 'Income',
  Expenditure = 'Expenditure'
}

export enum TransactionTypeFilter {
  All = 'showAllTransactions',
  Income = 'showAllIncome',
  Expenditure = 'showAllExpenditure'
}

const TransactionService = {
  getTransactions() {
    return HttpService.get<Transaction[]>('/incomeAndExpenditure');
  },
  getTransaction(transactionId: string) {
    return HttpService.get<Transaction>('/incomeAndExpenditure/' + transactionId);
  },
  addTransaction(transaction: Transaction) {
    if (transaction.transactionType === TransactionType.Expenditure) transaction.amount = -1 * transaction.amount;

    return HttpService.post<Transaction>('/incomeAndExpenditure', transaction);
  },
  editTransaction(transactionId: string, transaction: Transaction) {
    if (transaction.transactionType === TransactionType.Expenditure) transaction.amount = -1 * transaction.amount;

    return HttpService.patch<Transaction>('/incomeAndExpenditure/' + transactionId, transaction);
  },
  getTransactionOptions() {
    return [
      { label: Dictionary.transactionForm.income, value: TransactionType.Income },
      { label: Dictionary.transactionForm.expenditure, value: TransactionType.Expenditure }
    ];
  },
  getReport(startDate: moment.Moment, endDate: moment.Moment) {
    return HttpService.get<Report>(
      '/incomeAndExpenditure/report?startDate=' + startDate.toDate() + '&endDate=' + endDate.toDate()
    );
  },
  deleteTransaction(transactionId: string) {
    return HttpService.delete<Transaction>('/incomeAndExpenditure/' + transactionId);
  }
};

export default TransactionService;
