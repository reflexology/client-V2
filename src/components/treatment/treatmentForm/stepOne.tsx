import { Form, InputNumber, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import FormCard, { Field, InputType } from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import TreatmentService, { Treatment, TreatmentFields } from 'services/treatmentService';

interface StepOneProps {
  diagnoses: string[] | null;
  initialValues?: Partial<Treatment>;
  isReflexology: boolean;
  form: FormInstance;
  balance: number;
}

const StepOne: React.FC<StepOneProps> = props => {
  const getFields = (fields: TreatmentFields[]): Field[] =>
    fields.map(field => ({
      ...field,
      label: Dictionary.treatmentForm[field.name],
      placeholder:
        Dictionary.treatmentForm[(field.name + 'Placeholder') as keyof typeof Dictionary.treatmentForm] || undefined,
      extra: Dictionary.treatmentForm[(field.name + 'Extra') as keyof typeof Dictionary.treatmentForm] || undefined,
      formItem: field.inputType === InputType.FormItem ? getCustomFields(field.name) : undefined
    }));

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
              const isTreatmentNumberChanged =
                props.initialValues?.treatmentNumber !== props.form.getFieldValue('treatmentNumber');

              return (
                <Form.Item
                  shouldUpdate={(prevValues, curValues) => prevValues.treatmentNumber !== curValues.treatmentNumber}
                  name='treatmentNumber'
                  label={Dictionary.treatmentForm.treatmentNumber}
                  hasFeedback
                  colon={false}
                  validateStatus={isTreatmentNumberChanged ? 'warning' : 'success'}
                  extra={
                    isTreatmentNumberChanged ? Dictionary.treatmentForm.treatmentNumberChangedWarning.format('1') : ''
                  }
                  rules={[{ type: 'number', min: 1, required: true }]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} autoComplete='off' />
                </Form.Item>
              );
            }}
          </Form.Item>
        );

      case 'treatmentPrice':
        return (
          <Form.Item
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
        );
    }
  };

  return (
    <>
      <FormCard title='כללי' fields={getFields(TreatmentService.getGeneralFields())} />

      {!props.isReflexology && (
        <>
          <FormCard title='תשאול' fields={getFields(TreatmentService.getDietFields())} />
          <FormCard title='צריכה של חומרי גרוי וכמויות ביום' fields={getFields(TreatmentService.getStimulants())} />
        </>
      )}
    </>
  );
};

export default StepOne;
