import React, { useEffect } from 'react';
import { Alert, AutoComplete, Button, DatePicker, Form, InputNumber, Radio, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useRecoilValue } from 'recoil';

import { transactionsDescriptionsSelector } from 'atoms/transactionAtoms';
import Dictionary from 'dictionary/dictionary';
import TransactionService, { Transaction } from 'services/transactionService';
import { DATE_TIME_FORMAT } from 'utils/constants';

export interface TransactionFormProps {
  onSubmit: (values: Transaction) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Partial<Transaction>;
}

const TransactionForm: React.FC<TransactionFormProps> = props => {
  const [form] = Form.useForm();
  const transactionsDescriptions = useRecoilValue(transactionsDescriptionsSelector);

  useEffect(() => form.resetFields(), [props.initialValues]);
  return (
    <Form form={form} initialValues={props.initialValues} onFinish={values => props.onSubmit(values as Transaction)}>
      <Form.Item
        name='description'
        hasFeedback
        rules={[{ required: true, message: Dictionary.transactionForm.descriptionRequired }]}
      >
        <AutoComplete options={transactionsDescriptions} placeholder={Dictionary.transactionForm.description} />
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
          <InputNumber
            type='number'
            style={{ width: '100%' }}
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
            {TransactionService.getTransactionOptions().map(transType => (
              <Radio key={transType.value} value={transType.value}>
                {transType.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Row>
      <Form.Item name='createdAt'>
        <DatePicker
          showTime
          defaultValue={moment()}
          format={DATE_TIME_FORMAT}
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
