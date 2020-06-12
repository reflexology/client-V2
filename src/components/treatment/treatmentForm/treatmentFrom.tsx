import './treatmentForm.scss';

import { Alert, Button, Col, Form, message, Row, Space, Steps } from 'antd';
import { Store } from 'antd/lib/form/interface';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect, useState } from 'react';
import DiagnosisService from 'services/diagnosesService';
import TreatmentService, { Treatment, TreatmentType } from 'services/treatmentService';

import BloodTestsForm from './bloodTestsForm';
import ReminderStep from './reminderStep';
import StepOne from './stepOne';

interface TreatmentFromProps {
  onSubmit: (values: any, newDiagnoses: string[]) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Partial<Treatment>;
  balance: number;
}

const keyUp = 38;
const keyDown = 40;

const treatmentTypesStepCount: Record<TreatmentType, number> = {
  [TreatmentType.Reflexology]: 2,
  [TreatmentType.Diet]: 5
};

const TreatmentFrom: React.FC<TreatmentFromProps> = props => {
  const [form] = Form.useForm();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);
  const [treatmentType, setTreatmentType] = useState(TreatmentType.Reflexology);
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

  const onSubmit = (values: Store) => {
    const newDiagnoses = (values as Treatment).diagnoses?.filter(diagnosis => !diagnoses?.includes(diagnosis));
    props.onSubmit(values, newDiagnoses);
  };

  return (
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
      </Col>
      <Col span={20}>
        <Form
          className='treatment-form'
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
          <Form.Item>
            {currentStep === 5 && (
              <Button loading={props.isLoading} type='primary' htmlType='submit'>
                {Dictionary.treatmentForm.save}
              </Button>
            )}
          </Form.Item>
        </Form>
        <div className='next-prev-container'>
          <Space>
            {currentStep > 0 && <Button onClick={prevStep}>{Dictionary.treatmentForm.previous}</Button>}
            {treatmentTypesStepCount[treatmentType] !== currentStep && (
              <Button onClick={nextStep} type='primary'>
                {Dictionary.treatmentForm.next}
              </Button>
            )}
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default React.memo(TreatmentFrom);
