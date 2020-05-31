import { Button, DatePicker, Form, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React from 'react';
import { DATE_FORMAT } from 'utils/constants';

interface ReminderStepProps {
  form: FormInstance;
}

const ReminderStep: React.FC<ReminderStepProps> = props => {
  return (
    <>
      <Form.Item name='reminders' hasFeedback label={Dictionary.treatmentForm.reminders}>
        <TextArea autoSize autoComplete='off' />
      </Form.Item>
      <Form.Item name='reminderDate' label={Dictionary.treatmentForm.reminderDate}>
        <DatePicker
          format={DATE_FORMAT}
          showToday={false}
          renderExtraFooter={() => (
            <Row justify='center'>
              <Button type='link' onClick={() => props.form.setFieldsValue({ reminderDate: moment().add(7, 'days') })}>
                {Dictionary.treatmentForm.inAWeek}
              </Button>
            </Row>
          )}
        />
      </Form.Item>
    </>
  );
};

export default ReminderStep;
