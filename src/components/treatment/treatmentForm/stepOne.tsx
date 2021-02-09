import React from 'react';
import { Button, DatePicker, Form, InputNumber, Row, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';

import FormCard from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment } from 'services/treatmentService';
import { DATE_FORMAT } from 'utils/constants';

interface StepOneProps {
  diagnoses: string[] | null;
  initialValues?: Partial<Treatment>;
  form: FormInstance;
  balance?: number;
}

const StepOne: React.FC<StepOneProps> = props => {
  const getCustomFields = (fieldName: keyof typeof Dictionary.treatmentForm) => {
    switch (fieldName) {
      case 'diagnoses':
        return (
          <Form.Item name='diagnoses' label={Dictionary.treatmentForm.diagnoses} hasFeedback>
            <Select showArrow loading={!props.diagnoses} mode='tags'>
              {props.diagnoses?.map(diagnosis => (
                <Select.Option value={diagnosis} key={diagnosis}>
                  {diagnosis}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'treatmentNumber':
        return (
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) => prevValues.treatmentNumber !== curValues.treatmentNumber}
          >
            {() => {
              const treatmentNumber = props.initialValues?.treatmentNumber;
              const isTreatmentNumberChanged =
                treatmentNumber && treatmentNumber !== props.form.getFieldValue('treatmentNumber');
              return (
                <Form.Item
                  shouldUpdate={(prevValues, curValues) => prevValues.treatmentNumber !== curValues.treatmentNumber}
                  name='treatmentNumber'
                  label={Dictionary.treatmentForm.treatmentNumber}
                  hasFeedback
                  colon={false}
                  validateStatus={isTreatmentNumberChanged ? 'warning' : 'success'}
                  extra={
                    isTreatmentNumberChanged
                      ? Dictionary.treatmentForm.treatmentNumberChangedWarning.format((treatmentNumber! - 1).toString())
                      : ''
                  }
                  rules={[{ type: 'number', min: 1, required: true }]}
                >
                  <InputNumber type='number' min={1} style={{ width: '100%' }} autoComplete='off' />
                </Form.Item>
              );
            }}
          </Form.Item>
        );

      case 'treatmentPrice':
        return (
          <Form.Item
            name='treatmentPrice'
            extra={
              typeof props.balance !== 'undefined'
                ? Dictionary.treatmentForm.treatmentPriceExtra.format(
                    props.balance >= 0 ? Dictionary.treatmentForm.credit : Dictionary.treatmentForm.debt,
                    Math.abs(props.balance).toString()
                  )
                : null
            }
            hasFeedback
            label={Dictionary.treatmentForm.treatmentPrice}
          >
            <InputNumber type='number' style={{ width: '100%' }} autoComplete='off' />
          </Form.Item>
        );

      case 'reminderDate':
        return (
          <Form.Item name='reminderDate' label={Dictionary.treatmentForm.reminderDate}>
            <DatePicker
              style={{ width: '100%' }}
              format={DATE_FORMAT}
              showToday={false}
              renderExtraFooter={() => (
                <Row justify='center'>
                  <Button
                    type='link'
                    onClick={() => props.form.setFieldsValue({ reminderDate: moment().add(7, 'days') })}
                  >
                    {Dictionary.treatmentForm.inAWeek}
                  </Button>
                </Row>
              )}
            />
          </Form.Item>
        );
    }
  };

  return (
    <>
      <FormCard
        title='כללי'
        fields={TreatmentService.getFields(TreatmentService.getGeneralFields(), getCustomFields)}
      />
      <FormCard
        title='תזכורת'
        fields={TreatmentService.getFields(TreatmentService.getReminderFields(), getCustomFields)}
      />
    </>
  );
};

export default React.memo(
  StepOne,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.initialValues) === JSON.stringify(nextProps.initialValues) &&
    JSON.stringify(prevProps.diagnoses) === JSON.stringify(nextProps.diagnoses)
);
