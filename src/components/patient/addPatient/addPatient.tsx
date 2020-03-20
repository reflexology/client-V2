import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert, Select, Radio, InputNumber } from 'antd';
import ReactInputMask from 'react-input-mask';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';
import { RouteComponentProps } from 'react-router-dom';
import './addPatient.scss';

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
    <Row justify='center' className='add-patient-container'>
      <Col span={10}>
        <div className='add-patient-card'>
          <div className='add-patient-h2-wrapper'>
            <h2>{Dictionary.patient.header}</h2>
          </div>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name='lastName'
              hasFeedback
              rules={[{ required: true, message: Dictionary.patient.lastNameRequired }]}
            >
              <Input autoFocus autoComplete='off' placeholder={Dictionary.patient.lastName} />
            </Form.Item>
            <Form.Item
              name='firstName'
              hasFeedback
              rules={[{ required: true, message: Dictionary.patient.firstNameRequired }]}
            >
              <Input autoComplete='off' placeholder={Dictionary.patient.firstName} />
            </Form.Item>
            <Form.Item name='monName' hasFeedback>
              <Input autoComplete='off' placeholder={Dictionary.patient.monName} />
            </Form.Item>
            <Form.Item name='birthday' hasFeedback>
              <ReactInputMask
                onBlur={e => {
                  const age = CommonService.convertDateToAge(e.target.value);
                  form.setFieldsValue({ age });
                }}
                className='ltr text-right'
                mask='99/99/9999'
                placeholder={Dictionary.patient.birthday}
              >
                {(inputProps: any) => <Input {...inputProps} />}
              </ReactInputMask>
            </Form.Item>
            <Form.Item name='age' hasFeedback>
              <Input value={30} autoComplete='off' placeholder={Dictionary.patient.age} />
            </Form.Item>
            <Form.Item name='phone' hasFeedback>
              <Input autoComplete='off' placeholder={Dictionary.patient.phone} />
            </Form.Item>
            <Form.Item
              name='email'
              hasFeedback
              rules={[{ pattern: emailRegex, message: Dictionary.patient.wrongEmail }]}
            >
              <Input autoComplete='off' placeholder={Dictionary.patient.email} />
            </Form.Item>
            <Row justify='space-between'>
              <Form.Item
                name='childrenCount'
                hasFeedback
                style={{ display: 'inline-block' }}
                rules={[{ type: 'number', min: 0, message: Dictionary.patient.minChildrenCount }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  autoComplete='off'
                  placeholder={Dictionary.patient.childrenCount}
                />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block' }} name='gender' label={Dictionary.patient.gender}>
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
                  <Select placeholder={Dictionary.patient.maritalStatus}>
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
              <Button block loading={isFetching} type='primary' htmlType='submit'>
                {Dictionary.patient.save}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default AddPatient;
