import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert, Select, Radio, InputNumber } from 'antd';
import ReactInputMask from 'react-input-mask';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

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
      .then(() => props.history.push('/patients'))
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsFetching(false);
      });
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form form={form} onFinish={onFinish} size='large'>
          <Form.Item
            label={Dictionary.patient.lastName}
            name='lastName'
            hasFeedback
            rules={[{ required: true, message: Dictionary.patient.lastNameRequired }]}
          >
            <Input autoFocus autoComplete='off' />
          </Form.Item>
          <Form.Item
            label={Dictionary.patient.firstName}
            name='firstName'
            hasFeedback
            rules={[{ required: true, message: Dictionary.patient.firstNameRequired }]}
          >
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item label={Dictionary.patient.monName} name='monName' hasFeedback>
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item label={Dictionary.patient.birthday} name='birthday' hasFeedback>
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
          <Form.Item label={Dictionary.patient.age} name='age' hasFeedback>
            <Input value={30} autoComplete='off' />
          </Form.Item>
          <Form.Item label={Dictionary.patient.phone} name='phone' hasFeedback>
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item
            label={Dictionary.patient.email}
            name='email'
            hasFeedback
            rules={[{ pattern: emailRegex, message: Dictionary.patient.wrongEmail }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            label={Dictionary.patient.childrenCount}
            name='childrenCount'
            hasFeedback
            rules={[{ type: 'number', min: 0, message: Dictionary.patient.minChildrenCount }]}
          >
            <InputNumber autoComplete='off' />
          </Form.Item>
          <Form.Item name='gender' label={Dictionary.patient.gender}>
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
              <Form.Item label={Dictionary.patient.maritalStatus} name='maritalStatus' hasFeedback>
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
