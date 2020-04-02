import Dictionary from 'dictionary/dictionary';

import HttpService from './httpService';

export interface Transaction {
  _id: string;
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const TransactionService = {
  getTransactions() {
    return 'Transaction';
  },
  getGenderOptions() {
    return [
      { label: Dictionary.male, value: 'Male' },
      { label: Dictionary.female, value: 'Female' }
    ];
  }
};

export default TransactionService;
