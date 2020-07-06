import React from 'react';
import { Button, DatePicker, Form, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';

import FormCard from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
import TreatmentService from 'services/treatmentService';
import { DATE_FORMAT } from 'utils/constants';

interface ReminderStepProps {
  form: FormInstance;
}

const ReminderStep: React.FC<ReminderStepProps> = props => {
  const getCustomFields = (fieldName: keyof typeof Dictionary.treatmentForm) => {
    switch (fieldName) {
      case 'reminderDate':
        return (
          <Form.Item name='reminderDate' label={Dictionary.treatmentForm.reminderDate}>
            <DatePicker
              format={DATE_FORMAT}
              showToday={false}
              renderExtraFooter={() => (
                <Row justify='center'>
                  <Button
                    type='link'
                    onClick={() => props.form.setFieldsValue({ reminderDate: moment().add(7, 'days') })}
                  >
                    {Dictionary.treatmentForm.inAWeek}
                  </Button>
                </Row>
              )}
            />
          </Form.Item>
        );
    }
  };

  return (
    <FormCard
      title='תזכורת'
      fields={TreatmentService.getFields(TreatmentService.getReminderFields(), getCustomFields)}
    />
  );
};

export default ReminderStep;
