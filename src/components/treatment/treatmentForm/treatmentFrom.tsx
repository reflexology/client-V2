import { Alert, Button, DatePicker, Form, Input, InputNumber, message, Row, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import TextArea from 'antd/lib/input/TextArea';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DiagnosisService from 'services/diagnosesService';
import { Treatment } from 'services/treatmentService';

interface TreatmentFromProps {
  onSubmit: (values: any, newDiagnoses: string[]) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Partial<Treatment>;
  balance: number;
}

const TreatmentFrom: React.FC<TreatmentFromProps> = props => {
  const [form] = Form.useForm();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);

  useEffect(() => form.resetFields(), [props.initialValues]);

  useEffect(() => {
    DiagnosisService.getDiagnoses()
      .then(setDiagnoses)
      .catch(() => message.error(Dictionary.treatmentForm.errorFetchingDiagnoses));
  }, []);

  const onSubmit = (values: Store) => {
    const newDiagnoses = (values as Treatment).diagnoses?.filter(diagnosis => !diagnoses?.includes(diagnosis));
    props.onSubmit(values, newDiagnoses);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  return (
    <Form {...formItemLayout} form={form} initialValues={props.initialValues} onFinish={onSubmit}>
      <Form.Item name='treatmentDate' label={Dictionary.treatmentForm.treatmentDate}>
        <DatePicker showTime format='DD/MM/YYYY HH:mm' defaultValue={moment()} />
      </Form.Item>
      <Form.Item
        // style={{ display: 'inline-flex' }}
        name='treatmentNumber'
        label={Dictionary.treatmentForm.treatmentNumber}
        hasFeedback
      >
        <InputNumber style={{ width: '100%' }} autoComplete='off' />
      </Form.Item>
      <Form.Item name='referredBy' label={Dictionary.treatmentForm.referredBy} hasFeedback>
        <Input autoComplete='off' />
      </Form.Item>
      <Form.Item name='visitReason' label={Dictionary.treatmentForm.visitReason} hasFeedback>
        <TextArea autoSize autoComplete='off' />
      </Form.Item>
      <Form.Item name='diagnoses' label={Dictionary.treatmentForm.diagnoses} hasFeedback>
        <Select showArrow loading={!diagnoses} mode='tags'>
          {diagnoses?.map(diagnosis => (
            <Select.Option value={diagnosis} key={diagnosis}>
              {diagnosis}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='findings' label={Dictionary.treatmentForm.findings} hasFeedback>
        <TextArea autoSize autoComplete='off' />
      </Form.Item>
      <Form.Item name='recommendations' label={Dictionary.treatmentForm.recommendations} hasFeedback>
        <TextArea autoSize autoComplete='off' />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-flex', width: '50%' }}
        wrapperCol={{ span: 14 }}
        labelCol={{ span: 10 }}
        name='treatmentPrice'
        extra={Dictionary.treatmentForm.treatmentPriceExtra.format(
          props.balance >= 0 ? Dictionary.treatmentForm.credit : Dictionary.treatmentForm.debt,
          Math.abs(props.balance).toString()
        )}
        hasFeedback
        label={Dictionary.treatmentForm.treatmentPrice}
      >
        <InputNumber style={{ width: '100%' }} autoComplete='off' />
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-flex', width: '50%' }}
        wrapperCol={{ span: 13 }}
        labelCol={{ span: 9, offset: 2 }}
        rules={[{ type: 'number' }]}
        name='paidPrice'
        hasFeedback
        label={Dictionary.treatmentForm.paidPrice}
      >
        <InputNumber style={{ width: '100%' }} autoComplete='off' />
      </Form.Item>
      <Form.Item name='reminders' hasFeedback label={Dictionary.treatmentForm.reminders}>
        <TextArea autoSize autoComplete='off' />
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
      ,{props.error && <Alert message={props.error} type='error' showIcon />}
      <Form.Item>
        <Button {...tailFormItemLayout} block loading={props.isLoading} type='primary' htmlType='submit'>
          {Dictionary.patientForm.save}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TreatmentFrom;
