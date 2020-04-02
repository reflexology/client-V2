import { Form, Input, InputNumber, Radio, Row } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect } from 'react';
import ReactInputMask from 'react-input-mask';
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
      <Form.Item name='note' hasFeedback>
        <Input autoFocus autoComplete='off' placeholder={Dictionary.transactionForm.note} />
      </Form.Item>
      <Row justify='space-between'>
        <Form.Item
          name='transactionAmount'
          hasFeedback
          style={{ display: 'inline-block' }}
          rules={[{ required: true, type: 'number', min: 0, message: Dictionary.transactionForm.minAmountCount }]}
        >
          <InputNumber
            style={{ width: '50%' }}
            autoFocus
            autoComplete='off'
            placeholder={Dictionary.transactionForm.amount}
          />
        </Form.Item>

        <Form.Item
          style={{ display: 'inline-block' }}
          name='transactionType'
          label={Dictionary.transactionForm.transactionType}
        >
          <Radio.Group>
            <Radio value={Dictionary.transactionForm.income}>{Dictionary.transactionForm.income}</Radio>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Form.Item name='createdAt' hasFeedback>
        <ReactInputMask className='ltr text-right' mask='99/99/9999' placeholder={Dictionary.transactionForm.createdAt}>
          {(inputProps: any) => <Input {...inputProps} />}
        </ReactInputMask>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
