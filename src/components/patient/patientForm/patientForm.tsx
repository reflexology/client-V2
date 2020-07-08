import React, { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { Alert, Button, Form, Input, InputNumber, Radio, Row, Select, Space, Typography } from 'antd';

import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';

import './patientForm.scss';

interface PatientFormProps {
  onSubmit: (values: any, navigateToAddTreatment: boolean) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Patient;
}

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const PatientForm: React.FC<PatientFormProps> = props => {
  const [form] = Form.useForm();
  const [navigateToAddTreatment, setNavigateToAddTreatment] = useState(false);

  useEffect(() => form.resetFields(), [props.initialValues]);

  return (
    <Form
      noValidate
      form={form}
      initialValues={props.initialValues}
      onFinish={values => props.onSubmit(values, navigateToAddTreatment)}
    >
      <Form.Item
        name='lastName'
        hasFeedback
        rules={[{ required: true, message: Dictionary.patientForm.lastNameRequired }]}
      >
        <Input autoFocus autoComplete='off' placeholder={Dictionary.patientForm.lastName} />
      </Form.Item>

      <Form.Item
        name='firstName'
        hasFeedback
        rules={[{ required: true, message: Dictionary.patientForm.firstNameRequired }]}
      >
        <Input autoComplete='off' placeholder={Dictionary.patientForm.firstName} />
      </Form.Item>

      <Form.Item name='momName' hasFeedback>
        <Input autoComplete='off' placeholder={Dictionary.patientForm.momName} />
      </Form.Item>

      <Form.Item name='profession' hasFeedback>
        <Input autoComplete='off' placeholder={Dictionary.patientForm.profession} />
      </Form.Item>

      <Form.Item name='birthday' hasFeedback>
        <ReactInputMask
          onBlur={e => {
            const age = CommonService.convertDateToAge(e.target.value);
            form.setFieldsValue({ age });
          }}
          className='ltr text-right'
          mask='99/99/9999'
          placeholder={Dictionary.patientForm.birthday}
        >
          {(inputProps: any) => <Input {...inputProps} />}
        </ReactInputMask>
      </Form.Item>

      <Form.Item name='age' hasFeedback>
        <Input value={30} autoComplete='off' placeholder={Dictionary.patientForm.age} />
      </Form.Item>

      <Form.Item name='phone' hasFeedback>
        <Input autoComplete='off' type='tel' placeholder={Dictionary.patientForm.phone} />
      </Form.Item>

      <Form.Item name='email' hasFeedback rules={[{ pattern: emailRegex, message: Dictionary.patientForm.wrongEmail }]}>
        <Input autoComplete='off' type='email' placeholder={Dictionary.patientForm.email} />
      </Form.Item>

      <Row justify='space-between'>
        <Form.Item
          name='childrenCount'
          hasFeedback
          style={{ display: 'inline-block' }}
          rules={[{ type: 'number', min: 0, max: 20, message: Dictionary.patientForm.minChildrenCount }]}
        >
          <InputNumber
            onChange={childrenCount => {
              if (childrenCount !== undefined)
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  childrenAges:
                    childrenCount > 0 && childrenCount < 20 ? Array(childrenCount || 0).fill(undefined!) : []
                });
            }}
            style={{ width: '100%' }}
            autoComplete='off'
            placeholder={Dictionary.patientForm.childrenCount}
          />
        </Form.Item>

        <Form.Item style={{ display: 'inline-block' }} name='gender' label={Dictionary.patientForm.gender}>
          <Radio.Group>
            {PatientService.getGenderOptions().map(genderType => (
              <Radio key={genderType.value} value={genderType.value}>
                {genderType.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Row>

      <Form.List name='childrenAges'>
        {fields => {
          return (
            <Row>
              {fields.map(field => (
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.childrenCount !== currentValues.childrenCount}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    className='ages'
                    style={{ width: '18%', marginLeft: '1%', marginRight: '1%' }}
                    hasFeedback
                    rules={[{ type: 'number', min: 0, message: Dictionary.patientForm.minChildrenCount }]}
                  >
                    <InputNumber placeholder='גיל הילד' style={{ width: '100%' }} autoComplete='off' />
                  </Form.Item>
                </Form.Item>
              ))}
            </Row>
          );
        }}
      </Form.List>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
        {() => (
          <Form.Item name='maritalStatus' hasFeedback>
            <Select placeholder={Dictionary.patientForm.maritalStatus}>
              {PatientService.getMaritalStatusOptions(form.getFieldValue('gender') === 'Male').map(maritalStatus => (
                <Select.Option key={maritalStatus.value} value={maritalStatus.value}>
                  {maritalStatus.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
