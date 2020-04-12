import { Alert, Button, DatePicker, Form, Input, InputNumber, Radio, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useEffect } from 'react';
import TransactionService, { Transaction } from 'services/transactionService';

export interface TransactionFormProps {
  onSubmit: (values: any) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Partial<Transaction>;
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
        <TextArea autoSize autoComplete='off' placeholder={Dictionary.transactionForm.note} />
      </Form.Item>
      <Row justify='space-between'>
        <Form.Item
          name='amount'
          hasFeedback
          style={{ display: 'inline-block' }}
          rules={[
            { type: 'number', min: 0, message: Dictionary.transactionForm.minAmountCount },
            { required: true, message: Dictionary.transactionForm.amountRequired }
          ]}
        >
          <InputNumber style={{ width: '100%' }} autoComplete='off' placeholder={Dictionary.transactionForm.amount} />
        </Form.Item>

        <Form.Item
          style={{ display: 'inline-block' }}
          name='transactionType'
          label={Dictionary.transactionForm.transactionType}
        >
          <Radio.Group>
            {TransactionService.getTransactionOptions().map(transType => (
              <Radio key={transType.value} value={transType.value}>
                {transType.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Row>
      <Form.Item name='createdAt' hasFeedback>
        <DatePicker
          showTime
          defaultValue={moment()}
          format='DD/MM/YYYY'
          placeholder={Dictionary.transactionForm.createdAt}
        />
      </Form.Item>

      {props.error && <Alert message={props.error} type='error' showIcon />}

      <Form.Item>
        <Button block loading={props.isLoading} type='primary' htmlType='submit'>
          {Dictionary.patientForm.save}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;