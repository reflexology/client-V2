import React from 'react';
import { Card, Col, DatePicker, Form, Input, InputNumber, Row, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'utils/constants';
import { FormItemProps } from 'antd/lib/form';

export enum InputType {
  Input,
  TextArea,
  InputNumber,
  DatePicker,
  DateTimePicker,
  FormItem,
  CheckBox
}

export type Width = 1 | 2 | 3;

export interface Field {
  name: string;
  inputType: InputType;
  label: string;
  width?: Width;
  placeholder?: string;
  extra?: string;
  formItem?: React.ReactElement;
  formItemProps?: FormItemProps;
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
        return (
          <InputNumber type='number' autoComplete='off' style={{ width: '100%' }} placeholder={field.placeholder} />
        );
      case InputType.TextArea:
        return <TextArea autoComplete='off' placeholder={field.placeholder} autoSize />;
      case InputType.DatePicker:
        return <DatePicker format={DATE_FORMAT} style={{ width: '100%' }} />;
      case InputType.DateTimePicker:
        return <DatePicker showTime format={DATE_TIME_FORMAT} style={{ width: '100%' }} />;
      case InputType.CheckBox:
        return <Checkbox style={{ width: '100%' }} />;
    }
  };

  return (
    <Card title={props.title} bordered={false} className='form-card'>
      <Row gutter={16}>
        {props.fields.map(field => (
          <Col key={field.name} lg={(field.width || 1) * 8} md={field.width || 0 > 1 ? 24 : 12} sm={24} xs={24}>
            {field.inputType === InputType.FormItem ? (
              field.formItem
            ) : (
              <Form.Item
                {...field.formItemProps}
                valuePropName={field.inputType === InputType.CheckBox ? 'checked' : 'value'}
                key={field.name}
                name={field.name}
                label={field.label}
                extra={<div style={{ whiteSpace: 'pre-wrap' }}>{field.extra}</div>}
                hasFeedback={field.inputType !== InputType.CheckBox}
              >
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
