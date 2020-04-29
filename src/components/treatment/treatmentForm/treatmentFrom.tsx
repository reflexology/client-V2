import { Alert, Button, DatePicker, Form, Input, InputNumber, message, Radio, Row, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import TextArea from 'antd/lib/input/TextArea';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DiagnosisService from 'services/diagnosesService';
import { Treatment, TreatmentType } from 'services/treatmentService';
import { DATE_FORMAT } from 'utils/constants';

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

  useEffect(() => {
    if (props.initialValues) form.setFieldsValue(props.initialValues);
  }, [props.initialValues]);

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

  return (
    <Form
      {...formItemLayout}
      form={form}
      initialValues={{ treatmentType: TreatmentType.Reflexology, ...props.initialValues }}
      onFinish={onSubmit}
    >
      <Form.Item name='treatmentType' label={Dictionary.treatmentForm.treatmentType}>
        <Radio.Group>
          {Object.values(TreatmentType).map(treatmentType => (
            <Radio key={treatmentType} value={treatmentType}>
              {Dictionary.treatmentTypes[treatmentType.toLowerCase() as keyof typeof Dictionary.treatmentTypes]}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        style={{ display: 'inline-flex', width: '50%' }}
        wrapperCol={{ span: 14 }}
        labelCol={{ span: 10 }}
        name='treatmentDate'
        label={Dictionary.treatmentForm.treatmentDate}
      >
        <DatePicker showTime format='DD/MM/YYYY HH:mm' />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.treatmentNumber !== curValues.treatmentNumber}
      >
        {() => {
          const isTreatmentNumberChanged =
            props.initialValues?.treatmentNumber !== form.getFieldValue('treatmentNumber');

          return (
            <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues.treatmentNumber !== curValues.treatmentNumber}
              wrapperCol={{ span: 13 }}
              labelCol={{ span: 9, offset: 2 }}
              style={{ display: 'inline-flex', width: '50%' }}
              name='treatmentNumber'
              label={Dictionary.treatmentForm.treatmentNumber}
              hasFeedback
              colon={false}
              validateStatus={isTreatmentNumberChanged ? 'warning' : 'success'}
              extra={isTreatmentNumberChanged ? Dictionary.treatmentForm.treatmentNumberChangedWarning.format('1') : ''}
              rules={[{ type: 'number', min: 1, required: true }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} autoComplete='off' />
            </Form.Item>
          );
        }}
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
          format={DATE_FORMAT}
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
        <Button block loading={props.isLoading} type='primary' htmlType='submit'>
          {Dictionary.patientForm.save}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(TreatmentFrom);
