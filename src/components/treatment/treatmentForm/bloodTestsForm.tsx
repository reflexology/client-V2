import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, InputNumber, Row } from 'antd';
import React from 'react';

interface BloodTestsFormProps {}

const BloodTestsForm: React.FC<BloodTestsFormProps> = props => {
  return (
    <>
      <Form.List name='bloodTests'>
        {(fields, { add, remove }) => {
          console.log(fields);

          /**
           * `fields` internal fill with `name`, `key`, `fieldKey` props.
           * You can extends this into sub field to support multiple dynamic fields.
           */
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Col>
                    <Form.Item
                      name={[field.name, 'lastName']}
                      //@ts-ignore
                      fieldKey={[field.fieldKey, 'lastName']}
                    >
                      <InputNumber
                        dir='ltr'
                        placeholder={field.name.toExponential()}
                        style={{ width: '100%' }}
                        autoComplete='off'
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      name={[field.name, 'firstName']}
                      //@ts-ignore
                      fieldKey={[field.fieldKey, 'firstName']}
                    >
                      <InputNumber
                        dir='ltr'
                        placeholder={field.name.toString()}
                        style={{ width: '100%' }}
                        autoComplete='off'
                      />
                    </Form.Item>
                  </Col>
                  <Col flex='none'>
                    <MinusCircleOutlined
                      className='dynamic-delete-button'
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '100%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      {/* {TreatmentService.getBloodTests().map(bloodTest => (
        <Form.Item
          key={bloodTest.name}
          wrapperCol={{ span: 13 }}
          labelCol={{ span: 9, offset: 2 }}
          style={{ display: 'inline-flex', width: '50%' }}
          name={bloodTest.name}
          //   label={bloodTest}
          hasFeedback
        >
          <InputNumber dir='ltr' placeholder={bloodTest.name} style={{ width: '100%' }} autoComplete='off' />
        </Form.Item>
      ))} */}
    </>
  );
};

export default BloodTestsForm;
