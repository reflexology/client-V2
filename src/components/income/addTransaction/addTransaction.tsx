import './addTransaction.scss';

import { Col, Row } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TransactionService from 'services/transactionService';

import TransactionForm from '../transactionForm/transactionForm';

interface Props extends RouteComponentProps {}

const AddTransaction: React.FC<Props> = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (values: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    console.log('Transaction addded');
  };
  return (
    <Row justify='center' className='add-transaction-container'>
      <Col span={10}>
        <div className='add-transaction-card'>
          <div className='add-transaction-h2-wrapper'>
            <h2>{Dictionary.addTransaction.header}</h2>
          </div>
          <TransactionForm isLoading={isSubmitting} onSubmit={handleSubmit} error={error} />
        </div>
      </Col>
    </Row>
  );
};

export default AddTransaction;
