import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'antd';
import moment from 'moment';

import BackButton from 'components/common/backButton/backButton';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import TransactionService, { Transaction, TransactionType } from 'services/transactionService';
import TransactionForm from '../transactionForm/transactionForm';

import './addTransaction.scss';

interface Props extends RouteComponentProps {}

const initialValues: Partial<Transaction> = { transactionType: TransactionType.Income, createdAt: moment() };

const AddTransaction: React.FC<Props> = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (values: Transaction) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    TransactionService.addTransaction(values)
      .then(() => props.history.push(routes.transactions))
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <BackButton />
      <Row justify='center' className='add-transaction-container'>
        <Col xl={10} lg={12} md={16} sm={20}>
          <div className='add-transaction-card'>
            <div className='add-transaction-h2-wrapper'>
              <h2>{Dictionary.addTransaction.header}</h2>
            </div>
            <TransactionForm
              initialValues={initialValues}
              isLoading={isSubmitting}
              onSubmit={handleSubmit}
              error={error}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddTransaction;
