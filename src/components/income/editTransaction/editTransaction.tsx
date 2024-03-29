import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'antd';

import BackButton from 'components/common/backButton/backButton';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import TransactionService, { Transaction, TransactionType } from 'services/transactionService';
import TransactionForm from '../transactionForm/transactionForm';

import './editTransaction.scss';

interface EditTransactionProps {}

const EditTransaction: React.FC<EditTransactionProps> = props => {
  const navigate = useNavigate();
  const params = useParams<{ transactionId: string }>();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [transaction, setTransaction] = useState<Transaction>(location.state as Transaction);

  useEffect(() => {
    if (!location.state)
      TransactionService.getTransaction(params.transactionId!)
        .then(setTransaction)
        .catch(err => CommonService.showErrorMessage(err));
  }, []);

  const handleSubmit = (values: Transaction) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    TransactionService.editTransaction(transaction._id, values)
      .then(() => navigate(routes.transactions))
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });
  };

  const initialValues: Transaction | undefined = useMemo(
    () => ({
      ...transaction,
      createdAt: CommonService.getMomentDateFromString(transaction.createdAt),
      transactionType: transaction.amount < 0 ? TransactionType.Expenditure : TransactionType.Income,
      amount: Math.abs(transaction.amount)
    }),
    [transaction]
  );

  return (
    <>
      <BackButton />
      <Row justify='center' className='edit-transaction-container'>
        <Col xl={10} lg={12} md={16} sm={20}>
          <div className='edit-transaction-card'>
            <div className='edit-transaction-h2-wrapper'>
              <h2>{Dictionary.editTransaction.header}</h2>
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

export default EditTransaction;
