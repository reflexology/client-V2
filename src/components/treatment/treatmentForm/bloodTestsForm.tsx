import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';

import Dictionary from 'dictionary/dictionary';
import TreatmentService from 'services/treatmentService';

interface BloodTestsFormProps {}

const BloodTestsForm: React.FC<BloodTestsFormProps> = props => {
  const originalBloodTestsCount = TreatmentService.getBloodTests().length;

  return (
    <Card title={Dictionary.treatmentForm.bloodTestHeader} bordered={false} className='form-card'>
      <Form.List name='bloodTests'>
        {(fields, { add }) => (
          <>
            <Row gutter={16}>
              {fields.map((field, index) => (
                <Col key={field.name} lg={12} md={12} sm={24}>
                  <Row gutter={16} key={field.key}>
                    <Col style={{ padding: '0' }} xl={6} lg={8}>
                      {index < originalBloodTestsCount ? (
                        <Form.Item shouldUpdate noStyle>
                          {({ getFieldValue }) => <div>{getFieldValue('bloodTests')[field.key].name}</div>}
                        </Form.Item>
                      ) : (
                        <Form.Item name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']}>
                          <Input autoComplete='off' />
                        </Form.Item>
                      )}
                    </Col>
                    <Col xl={12} lg={10}>
                      <Form.Item name={[field.name, 'value']} fieldKey={[field.fieldKey, 'value']}>
                        <InputNumber style={{ width: '100%' }} autoComplete='off' />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name={[field.name, 'isImportant']}
                        fieldKey={[field.fieldKey, 'isImportant']}
                        valuePropName='checked'
                      >
                        <Checkbox>{Dictionary.treatmentForm.isImportant}</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>

            <Form.Item>
              <Button type='dashed' onClick={() => add()}>
                <PlusOutlined /> {Dictionary.treatmentForm.addBloodTest}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default BloodTestsForm;
