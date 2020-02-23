import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert, Select, Radio } from 'antd';
import ReactInputMask from 'react-input-mask';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';

interface Props {}

const AddPatient: React.FC<Props> = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const onFinish = (values: any) => {
    if (isFetching) return;

    setIsFetching(true);
    setError('');

    PatientService.addPatient(values)
      .then(res => {
        console.log(res);
      })
      .catch(err => setError(CommonService.getErrorMessage(err)))
      .finally(() => setIsFetching(false));
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form form={form} initialValues={{ username: '', password: '' }} onFinish={onFinish}>
          <Form.Item
            label={Dictionary.addPatient.lastName}
            name='lastName'
            hasFeedback
            rules={[{ required: true, message: Dictionary.addPatient.lastNameRequired }]}
          >
            <Input autoFocus autoComplete='off' />
          </Form.Item>
          <Form.Item
            label={Dictionary.addPatient.firstName}
            name='firstName'
            hasFeedback
            rules={[{ required: true, message: Dictionary.addPatient.firstNameRequired }]}
          >
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item label={Dictionary.addPatient.monName} name='monName' hasFeedback>
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item label={Dictionary.addPatient.birthday} name='birthday' hasFeedback>
            <ReactInputMask
              onBlur={e => {
                const age = CommonService.convertDateToAge(e.target.value);
                form.setFieldsValue({ age });
              }}
              className='ltr text-right'
              mask='99/99/9999'
            >
              {(inputProps: any) => <Input {...inputProps} />}
            </ReactInputMask>
          </Form.Item>
          <Form.Item label={Dictionary.addPatient.age} name='age' hasFeedback>
            <Input value={30} autoComplete='off' />
          </Form.Item>
          <Form.Item label={Dictionary.addPatient.phone} name='phone' hasFeedback>
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item
            label={Dictionary.addPatient.email}
            name='email'
            hasFeedback
            rules={[{ pattern: emailRegex, message: Dictionary.addPatient.wrongEmail }]}
          >
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item name='gender' label={Dictionary.addPatient.gender}>
            <Radio.Group>
              {PatientService.getGenderOptions().map(genderType => (
                <Radio key={genderType.value} value={genderType.value}>
                  {genderType.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
            {() => (
              <Form.Item label={Dictionary.addPatient.maritalStatus} name='maritalStatus' hasFeedback>
                <Select>
                  {PatientService.getMaritalStatusOptions(form.getFieldValue('gender') === 'Male').map(
                    maritalStatus => (
                      <Select.Option key={maritalStatus.value} value={maritalStatus.value}>
                        {maritalStatus.label}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            )}
          </Form.Item>

          {error && <Alert message={error} type='error' showIcon />}
          <Form.Item>
            <Button loading={isFetching} type='primary' htmlType='submit'>
              {Dictionary.login.submitButton}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddPatient;
