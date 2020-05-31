import { Card, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

export enum InputType {
  Input,
  TextArea,
  InputNumber,
  DatePicker,
  DateTimePicker,
  FormItem
}

export interface Field {
  name: string;
  inputType: InputType;
  label: string;
  placeholder?: string;
  extra?: string;
  formItem?: React.ReactElement;
}

interface FormCardProps {
  title: string;
  fields: Field[];
}

const FormCard: React.FC<FormCardProps> = props => {
  const renderField = (field: Field) => {
    switch (field.inputType) {
      case InputType.Input:
        return <Input autoComplete='off' placeholder={field.placeholder} />;
      case InputType.InputNumber:
        return <InputNumber autoComplete='off' style={{ width: '100%' }} placeholder={field.placeholder} />;
      case InputType.TextArea:
        return <TextArea autoComplete='off' placeholder={field.placeholder} autoSize />;
      case InputType.DatePicker:
        return <DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />;
      case InputType.DateTimePicker:
        return <DatePicker showTime format='DD/MM/YYYY HH:mm' style={{ width: '100%' }} />;
    }
  };

  return (
    <Card title={props.title} bordered={false} className='form-card'>
      <Row gutter={16}>
        {props.fields.map(field => (
          <Col key={field.name} lg={8} md={12} sm={24}>
            {field.inputType === InputType.FormItem ? (
              field.formItem
            ) : (
              <Form.Item key={field.name} name={field.name} label={field.label} extra={field.extra} hasFeedback>
                {renderField(field)}
              </Form.Item>
            )}
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default React.memo(FormCard);
