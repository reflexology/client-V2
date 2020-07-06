import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, message, Row, Space, Steps } from 'antd';

import Dictionary from 'dictionary/dictionary';
import DiagnosisService from 'services/diagnosesService';
import TreatmentService, { Treatment, TreatmentType } from 'services/treatmentService';
import BloodTestsForm from './bloodTestsForm';
import ReminderStep from './reminderStep';
import StepOne from './stepOne';

import './treatmentForm.scss';

interface TreatmentFormProps {
  onSubmit: (values: any, newDiagnoses: string[]) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Partial<Treatment>;
  balance?: number;
}

const keyUp = 38;
const keyDown = 40;

const treatmentTypesStepCount: Record<TreatmentType, number> = {
  [TreatmentType.Reflexology]: 3,
  [TreatmentType.Diet]: 6
};

const TreatmentForm: React.FC<TreatmentFormProps> = props => {
  const [form] = Form.useForm();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);
  const [treatmentType, setTreatmentType] = useState(props.initialValues?.treatmentType || TreatmentType.Reflexology);
  const [currentStep, setCurrentStep] = useState(0);

  const isReflexology = treatmentType === TreatmentType.Reflexology;
  const isDiet = treatmentType === TreatmentType.Diet;

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [currentStep]);

  const nextStep = () => setCurrentStep(currentStep => currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep => currentStep - 1);

  const onKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === keyUp && currentStep > 0) prevStep();
    if (e.keyCode === keyDown && currentStep < 3) nextStep();
    e.stopPropagation();
  };

  useEffect(() => {
    if (props.initialValues) form.setFieldsValue(props.initialValues);
  }, [props.initialValues]);

  useEffect(() => {
    DiagnosisService.getDiagnoses()
      .then(setDiagnoses)
      .catch(() => message.error(Dictionary.treatmentForm.errorFetchingDiagnoses));
  }, []);

  const onSubmit = () => {
    const values = { ...(form.getFieldsValue(true) as Treatment) };
    values.bloodTests = values.bloodTests.filter(bloodTest => !!bloodTest.value);
    const newDiagnoses = values.diagnoses?.filter(diagnosis => !diagnoses?.includes(diagnosis));
    props.onSubmit(values, newDiagnoses);
  };

  return (
    <Form
      layout='vertical'
      hideRequiredMark
      form={form}
      initialValues={{
        treatmentType: TreatmentType.Reflexology,
        ...props.initialValues,
        bloodTests: TreatmentService.getBloodTests()
      }}
      onFinish={onSubmit}
    >
      <Row>
        <Col span={4}>
          <h2 style={{ marginBottom: '20px' }}>{Dictionary.addTreatment.header}</h2>

          <Steps current={currentStep} onChange={stepNumber => setCurrentStep(stepNumber)} direction='vertical'>
            <Steps.Step title='כללי' />
            <Steps.Step title='בדיקות דם' />
            <Steps.Step title='תזכורת' />
            {isDiet && (
              <>
                <Steps.Step title='המשך תשאול' />
                <Steps.Step title='תזונה' />
              </>
            )}
          </Steps>
          <Button loading={props.isLoading} type='primary' htmlType='submit'>
            {Dictionary.treatmentForm.save}
          </Button>
        </Col>
        <Col span={20}>
          <div className='treatment-form'>
            {currentStep === 0 && (
              <StepOne
                balance={props.balance}
                initialValues={props.initialValues}
                diagnoses={diagnoses}
                form={form}
                isReflexology={isReflexology}
                setTreatmentType={setTreatmentType}
              />
            )}
            {currentStep === 1 && <BloodTestsForm />}
            {currentStep === 2 && <ReminderStep form={form} />}
            {props.error && <Alert message={props.error} type='error' showIcon />}
          </div>

          <div className='next-prev-container'>
            <Space>
              {currentStep > 0 && <Button onClick={prevStep}>{Dictionary.treatmentForm.previous}</Button>}
              {treatmentTypesStepCount[treatmentType] !== currentStep + 1 ? (
                <Button onClick={nextStep} type='primary'>
                  {Dictionary.treatmentForm.next}
                </Button>
              ) : (
                <Button loading={props.isLoading} type='primary' onClick={form.submit}>
                  {Dictionary.treatmentForm.save}
                </Button>
              )}
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default React.memo(TreatmentForm);
