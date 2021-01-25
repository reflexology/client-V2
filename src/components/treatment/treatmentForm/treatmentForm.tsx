import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackTop, Button, Col, Form, Row, Space, Steps } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import isEqual from 'lodash.isequal';

import DragAndDrop from 'components/common/dragAndDrop';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import DiagnosisService from 'services/diagnosesService';
import TreatmentService, { Treatment, TreatmentType } from 'services/treatmentService';
import BloodTestsForm from './bloodTestsForm';
import ReminderStep from './reminderStep';
import StepOne from './stepOne';

import './treatmentForm.scss';

interface TreatmentFormProps {
  onSubmit: (values: Treatment, newDiagnoses: string[], files: RcFile[]) => void;
  submitPartialData: (values: any) => void;
  error: string;
  isLoading: boolean;
  isSavingPartialData: boolean;
  isUploading: boolean;
  initialValues?: Partial<Treatment>;
}

const stepsCount = 3;

const TreatmentForm: React.FC<TreatmentFormProps> = props => {
  const [form] = Form.useForm<Treatment>();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [files, setFiles] = useState<RcFile[]>(
    props.initialValues?.files?.map((file: any) => ({ ...file, uid: file.key })) || []
  );

  const saveButtonText = props.isUploading
    ? Dictionary.treatmentForm.uploadingFiles
    : props.isLoading
    ? Dictionary.treatmentForm.addingTreatment
    : Dictionary.treatmentForm.saveAndExit;

  useEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue({
        ...props.initialValues,
        bloodTests: CommonService.mergeArraysByKey(
          TreatmentService.getBloodTests(),
          props.initialValues?.bloodTests || [],
          'name'
        )
      });
    }
  }, [props.initialValues]);

  useEffect(() => {
    DiagnosisService.getDiagnoses()
      .then(setDiagnoses)
      .catch(err => CommonService.showErrorMessage(err, Dictionary.treatmentForm.errorFetchingDiagnoses));
  }, []);

  const savePartialData = async (nextStep?: number) => {
    try {
      await form.validateFields();

      const values = { ...(form.getFieldsValue(true) as Treatment) };
      values.bloodTests = values.bloodTests.filter(bloodTest => !!bloodTest.value);

      if (!isEqual(values, props.initialValues)) props.submitPartialData?.(values);
      if (nextStep !== undefined) setCurrentStep(nextStep);
    } catch (error) {}
  };

  const nextStep = () => savePartialData(currentStep + 1);
  const prevStep = () => savePartialData(currentStep - 1);

  const onSubmit = () => {
    const values = { ...(form.getFieldsValue(true) as Treatment) };
    values.bloodTests = values.bloodTests.filter(bloodTest => !!bloodTest.value);
    const newDiagnoses = values.diagnoses?.filter(diagnosis => !diagnoses?.includes(diagnosis));
    props.onSubmit(values, newDiagnoses, files);
  };

  const getBackTopTarget = useCallback(() => document.getElementById('treatment-form')!, []);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepOne initialValues={props.initialValues} diagnoses={diagnoses} form={form} />;
      case 1:
        return <BloodTestsForm />;
      case 2:
        return <ReminderStep form={form} />;
    }
  };

  return (
    <Form
      layout='vertical'
      hideRequiredMark
      scrollToFirstError
      form={form}
      initialValues={{
        treatmentType: TreatmentType.Reflexology,
        ...props.initialValues,
        bloodTests: TreatmentService.getBloodTests()
      }}
      onFinish={onSubmit}
    >
      <Row>
        <Col className='right-col flex-vertical' span={4}>
          <h2 style={{ marginBottom: '20px' }}>{Dictionary.addTreatment.header}</h2>
          <Steps size='small' className='steps' current={currentStep} onChange={savePartialData} direction='vertical'>
            <Steps.Step title='כללי' />
            <Steps.Step title='בדיקות דם' />
            <Steps.Step title='תזכורת' />
          </Steps>
          <DragAndDrop files={files} onChange={setFiles} />
          <div className='save-container'>
            <Button loading={props.isSavingPartialData} onClick={() => savePartialData()} type='primary'>
              {Dictionary.treatmentForm.save}
            </Button>
            <Button loading={props.isLoading} type='primary' htmlType='submit'>
              {saveButtonText}
            </Button>
          </div>
        </Col>
        <Col span={20}>
          <div id='treatment-form' className='treatment-form'>
            {renderStep()}
            {props.error && <Alert message={props.error} type='error' showIcon />}

            <BackTop target={getBackTopTarget}></BackTop>
          </div>
          <div className='next-prev-container'>
            <Space>
              <Button disabled={currentStep === 0} onClick={prevStep}>
                {Dictionary.treatmentForm.previous}
              </Button>

              <Button disabled={stepsCount === currentStep + 1} onClick={nextStep} type='primary'>
                {Dictionary.treatmentForm.next}
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default React.memo(TreatmentForm);
