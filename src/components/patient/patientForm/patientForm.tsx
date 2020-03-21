import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Alert, Select, Radio, InputNumber } from 'antd';
import ReactInputMask from 'react-input-mask';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';

interface PatientFormProps {
  onSubmit: (values: any) => void;
  error: string;
  isLoading: boolean;
  initialValues?: Patient;
}

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const PatientForm: React.FC<PatientFormProps> = props => {
  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [props.initialValues]);

  return (
    <Form form={form} initialValues={props.initialValues} onFinish={props.onSubmit}>
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
        <Input autoComplete='off' placeholder={Dictionary.patientForm.phone} />
      </Form.Item>

      <Form.Item name='email' hasFeedback rules={[{ pattern: emailRegex, message: Dictionary.patientForm.wrongEmail }]}>
        <Input autoComplete='off' placeholder={Dictionary.patientForm.email} />
      </Form.Item>

      <Row justify='space-between'>
        <Form.Item
          name='childrenCount'
          hasFeedback
          style={{ display: 'inline-block' }}
          rules={[{ type: 'number', min: 0, message: Dictionary.patientForm.minChildrenCount }]}
        >
          <InputNumber
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

      <Form.Item>
        <Button block loading={props.isLoading} type='primary' htmlType='submit'>
          {Dictionary.patientForm.save}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientForm;
