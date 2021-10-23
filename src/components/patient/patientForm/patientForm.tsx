import React, { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { Alert, Button, Form, Input, Radio, Row, Space, Typography } from 'antd';

import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';

import './patientForm.scss';

interface PatientFormProps {
  onSubmit: (values: Patient, navigateToAddTreatment: boolean) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Patient;
}

const PatientForm: React.FC<PatientFormProps> = props => {
  const [form] = Form.useForm();
  const [navigateToAddTreatment, setNavigateToAddTreatment] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(true);

  useEffect(() => form.resetFields(), [props.initialValues]);

  return (
    <Form
      layout='vertical'
      form={form}
      noValidate
      scrollToFirstError
      initialValues={props.initialValues}
      onFinish={values => props.onSubmit(values as Patient, navigateToAddTreatment)}
    >
      <Form.Item
        name='lastName'
        hasFeedback
        label={Dictionary.patientForm.lastName}
        rules={[{ required: true, message: Dictionary.patientForm.lastNameRequired }]}
      >
        <Input autoFocus autoComplete='off' />
      </Form.Item>

      <Form.Item
        name='firstName'
        hasFeedback
        label={Dictionary.patientForm.firstName}
        rules={[{ required: true, message: Dictionary.patientForm.firstNameRequired }]}
      >
        <Input autoComplete='off' />
      </Form.Item>
      <Form.Item name='momName' label={Dictionary.patientForm.momName} hasFeedback>
        <Input autoComplete='off' />
      </Form.Item>

      <Form.Item
        name='birthday'
        label={Dictionary.patientForm.birthday}
        validateStatus={isBirthdayValid ? '' : 'error'}
        help={isBirthdayValid ? null : Dictionary.patientForm.birthdayInvalid}
        hasFeedback
      >
        <ReactInputMask
          onBlur={e => {
            const age = CommonService.convertDateToAge(e.target.value);
            if (!age && e.target.value) setIsBirthdayValid(false);
            else if (!isBirthdayValid) setIsBirthdayValid(true);

            form.setFieldsValue({ age });
          }}
          className='ltr text-right'
          mask='99/99/9999'
        >
          {(inputProps: HTMLInputElement) => <Input {...(inputProps as any)} />}
        </ReactInputMask>
      </Form.Item>

      <Form.Item label={Dictionary.patientForm.age} name='age' hasFeedback>
        <Input value={30} autoComplete='off' />
      </Form.Item>

      <Form.Item label={Dictionary.patientForm.phone} name='phone' hasFeedback>
        <Input autoComplete='off' type='tel' />
      </Form.Item>

      <Form.Item
        label={Dictionary.patientForm.email}
        name='email'
        hasFeedback
        rules={[{ type: 'email', message: Dictionary.patientForm.wrongEmail }]}
      >
        <Input autoComplete='off' type='email' />
      </Form.Item>

      <Form.Item name='gender' label={Dictionary.patientForm.gender}>
        <Radio.Group>
          {PatientService.getGenderOptions().map(genderType => (
            <Radio key={genderType.value} value={genderType.value}>
              {genderType.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      {props.error && <Alert message={props.error} type='error' showIcon />}

      <Row justify='center'>
        <Space size='large' align='center'>
          <Button loading={!navigateToAddTreatment && props.isLoading} type='primary' htmlType='submit'>
            {Dictionary.patientForm.save}
          </Button>
          <Typography>או</Typography>
          <Button
            loading={navigateToAddTreatment && props.isLoading}
            type='primary'
            onClick={() => {
              setNavigateToAddTreatment(true);
              form.submit();
            }}
          >
            {Dictionary.patientForm.saveAndAddTreatment}
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export default PatientForm;
