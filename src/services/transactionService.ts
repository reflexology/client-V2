import Dictionary from 'dictionary/dictionary';
import moment from 'moment';

import HttpService from './httpService';

export interface Transaction {
  _id: string;
  description: string;
  note?: string;
  amount: number;
  createdAt?: Date;
  isFromTreatment: boolean;
  treatmentId: string;
  transactionType: 'Income' | 'Expenditure';
}

export interface Report {
  income: number;
  expenditure: number;
  netAmount: number;
}

const TransactionService = {
  getTransactions() {
    return HttpService.get<Transaction[]>('/incomeAndExpenditure');
  },
  getTransaction(transactionId: string) {
    return HttpService.get<Transaction>('/incomeAndExpenditure' + transactionId);
  },
  addTransaction(transaction: Transaction) {
    if (transaction.transactionType === 'Expenditure') transaction.amount = -1 * transaction.amount;

    return HttpService.post<Transaction>('/incomeAndExpenditure', transaction);
  },
  getTransactionOptions() {
    return [
      { label: Dictionary.transactionForm.income, value: 'Income' },
      { label: Dictionary.transactionForm.expenditure, value: 'Expenditure' }
    ];
  },
  getReport(startDate: moment.Moment, endDate: moment.Moment) {
    return HttpService.get<Report>(
      '/incomeAndExpenditure/report?startDate=' + startDate.toDate() + '&endDate=' + endDate.toDate()
    );
  }
};

export default TransactionService;
