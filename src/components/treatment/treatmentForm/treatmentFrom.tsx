import { Alert, Button, DatePicker, Form, Input, InputNumber, Row, Select, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Treatment } from 'services/treatmentService';

interface TreatmentFromProps {
  onSubmit: (values: any) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Partial<Treatment>;
}

const TreatmentFrom: React.FC<TreatmentFromProps> = props => {
  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [props.initialValues]);
  const tagRender = (props: any) => {
    console.log(props);

    const { label, value, closable, onClose } = props;

    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  };

  const options = [
    { value: 'gold', label: 'תזונה' },
    { value: 'lime', label: 'סוכר' },
    { value: 'green', label: 'רפלקסולוגיה' },
    { value: 'cyan', label: 'someword' }
  ];

  return (
    <Form form={form} initialValues={props.initialValues} onFinish={props.onSubmit}>
      <Form.Item name='treatmentDate'>
        <DatePicker
          showTime
          format='DD/MM/YYYY HH:mm'
          placeholder={Dictionary.treatmentForm.treatmentDate}
          defaultValue={moment()}
        />
      </Form.Item>
      <Form.Item name='referredBy' hasFeedback>
        <Input autoComplete='off' placeholder={Dictionary.treatmentForm.referredBy} />
      </Form.Item>
      <Form.Item name='visitReason' hasFeedback>
        <TextArea autoSize autoComplete='off' placeholder={Dictionary.treatmentForm.visitReason} />
      </Form.Item>
      <Form.Item name='findings' hasFeedback>
        <TextArea autoSize autoComplete='off' placeholder={Dictionary.treatmentForm.findings} />
      </Form.Item>
      <Form.Item name='recommendations' hasFeedback>
        <TextArea autoSize autoComplete='off' placeholder={Dictionary.treatmentForm.recommendations} />
      </Form.Item>
      <Row justify='space-between'>
        <Form.Item style={{ display: 'inline-block' }} name='treatmentNumber' hasFeedback>
          <InputNumber
            style={{ width: '100%' }}
            autoComplete='off'
            placeholder={Dictionary.treatmentForm.treatmentNumber}
          />
        </Form.Item>
        <Form.Item style={{ display: 'inline-block' }} name='treatmentPrice' hasFeedback>
          <InputNumber
            style={{ width: '100%' }}
            autoComplete='off'
            placeholder={Dictionary.treatmentForm.treatmentPrice}
          />
        </Form.Item>
        <Form.Item rules={[{ type: 'number' }]} style={{ display: 'inline-block' }} name='paidPrice' hasFeedback>
          <InputNumber style={{ width: '100%' }} autoComplete='off' placeholder={Dictionary.treatmentForm.paidPrice} />
        </Form.Item>
      </Row>
      <Form.Item name='reminders' hasFeedback>
        <TextArea autoSize autoComplete='off' placeholder={Dictionary.treatmentForm.reminders} />
      </Form.Item>
      <Form.Item name='reminderDate' label={Dictionary.treatmentForm.reminderDate}>
        <DatePicker
          format='YYYY-MM-DD'
          showToday={false}
          renderExtraFooter={() => (
            <Row justify='center'>
              <Button type='link' onClick={() => form.setFieldsValue({ reminderDate: moment().add(7, 'days') })}>
                {Dictionary.treatmentForm.inAWeek}
              </Button>
            </Row>
          )}
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
        {() => (
          <Form.Item name='maritalStatus' hasFeedback>
            <Select
              placeholder={Dictionary.treatmentForm.diagnoses}
              mode='tags'
              tagRender={tagRender}
              style={{ width: '100%' }}
              options={options}
            />
          </Form.Item>
        )}
      </Form.Item>
      ,{props.error && <Alert message={props.error} type='error' showIcon />}
      <Form.Item>
        <Button block loading={props.isLoading} type='primary' htmlType='submit'>
          {Dictionary.patientForm.save}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TreatmentFrom;
