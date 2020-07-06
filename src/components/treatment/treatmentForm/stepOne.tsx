import React from 'react';
import { Form, InputNumber, Radio, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

import FormCard from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
import TreatmentService, { Treatment, TreatmentType } from 'services/treatmentService';

interface StepOneProps {
  diagnoses: string[] | null;
  initialValues?: Partial<Treatment>;
  isReflexology: boolean;
  form: FormInstance;
  balance?: number;
  setTreatmentType: (treatmentType: TreatmentType) => void;
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
            <InputNumber style={{ width: '100%' }} autoComplete='off' />
          </Form.Item>
        );
    }
  };

  return (
    <>
      <Form.Item name='treatmentType' label={Dictionary.treatmentForm.treatmentType}>
        <Radio.Group onChange={e => props.setTreatmentType(e.target.value)}>
          {Object.values(TreatmentType).map(treatmentType => (
            <Radio key={treatmentType} value={treatmentType}>
              {Dictionary.treatmentTypes[treatmentType.toLowerCase() as keyof typeof Dictionary.treatmentTypes]}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <FormCard
        title='כללי'
        fields={TreatmentService.getFields(TreatmentService.getGeneralFields(), getCustomFields)}
      />

      {!props.isReflexology && (
        <>
          <FormCard
            title='תשאול'
            fields={TreatmentService.getFields(TreatmentService.getDietFields(), getCustomFields)}
          />
          <FormCard
            title='צריכה של חומרי גרוי וכמויות ביום'
            fields={TreatmentService.getFields(TreatmentService.getStimulants(), getCustomFields)}
          />
        </>
      )}
    </>
  );
};

export default StepOne;
