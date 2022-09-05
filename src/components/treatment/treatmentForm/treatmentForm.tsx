import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackTop, Button, Form, Space } from 'antd';
import isEqual from 'lodash.isequal';

import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import { Treatment } from 'services/treatmentService';
import StepOne from './stepOne';

import './treatmentForm.scss';

interface TreatmentFormProps {
  onSubmit: (values: Treatment, newDiagnoses: string[]) => void;
  submitPartialData: (values: any) => void;
  error: string;
  isLoading: boolean;
  isSavingPartialData: boolean;
  initialValues?: Partial<Treatment>;
}

const TreatmentForm: React.FC<TreatmentFormProps> = props => {
  const [form] = Form.useForm<Treatment>();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);

  const saveButtonText = props.isLoading
    ? Dictionary.treatmentForm.addingTreatment
    : Dictionary.treatmentForm.saveAndExit;

  useEffect(() => {
    if (props.initialValues) form.setFieldsValue(props.initialValues);
  }, [props.initialValues]);

  useEffect(() => {
    DiagnosisService.getDiagnoses()
      .then(setDiagnoses)
      .catch(err => CommonService.showErrorMessage(err, Dictionary.treatmentForm.errorFetchingDiagnoses));
  }, []);

  const savePartialData = async () => {
    try {
      await form.validateFields();

      const values = { ...(form.getFieldsValue(true) as Treatment) };

      if (!isEqual(values, props.initialValues)) props.submitPartialData?.(values);
    } catch (error) {}
  };

  const onSubmit = () => {
    const values = { ...(form.getFieldsValue(true) as Treatment) };
    const newDiagnoses = values.diagnoses?.filter(diagnosis => !diagnoses?.includes(diagnosis));
    props.onSubmit(values, newDiagnoses);
  };

  const getBackTopTarget = useCallback(() => document.getElementById('treatment-form')!, []);

  return (
    <Form
      layout='vertical'
      hideRequiredMark
      scrollToFirstError
      form={form}
      initialValues={props.initialValues}
      onFinish={onSubmit}
    >
      <div id='treatment-form' className='treatment-form'>
        <h2>{Dictionary.addTreatment.header}</h2>
        <StepOne initialValues={props.initialValues} diagnoses={diagnoses} form={form} />
        {props.error && <Alert message={props.error} type='error' showIcon />}
        <BackTop target={getBackTopTarget}></BackTop>
      </div>
      <div className='next-prev-container'>
        <Space>
          <Button loading={props.isSavingPartialData} onClick={() => savePartialData()} type='primary'>
            {Dictionary.treatmentForm.save}
          </Button>
          <Button loading={props.isLoading} type='primary' htmlType='submit'>
            {saveButtonText}
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default React.memo(TreatmentForm);
