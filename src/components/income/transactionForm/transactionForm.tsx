import { Form, Input } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect } from 'react';
import TransactionService, { Transaction } from 'services/transactionService';

export interface TransactionFormProps {
  onSubmit: (values: any) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Transaction;
}

const TransactionForm: React.SFC<TransactionFormProps> = props => {
  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [props.initialValues]);
  return (
    <Form form={form} initialValues={props.initialValues} onFinish={props.onSubmit}>
      <Form.Item
        name='description'
        hasFeedback
        rules={[{ required: true, message: Dictionary.transactionForm.descriptionRequired }]}
      >
        <Input autoFocus autoComplete='off' placeholder={Dictionary.transactionForm.description} />
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
