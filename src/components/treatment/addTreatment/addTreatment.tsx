import { Col, Row } from 'antd';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonService from 'services/commonService';
import TreatmentService from 'services/treatmentService';

import TreatmentFrom from '../treatmentForm/treatmentFrom';

interface AddTreatmentProps extends RouteComponentProps<{ patientId: string }> {}

const AddTreatment: React.FC<AddTreatmentProps> = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (values: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    TreatmentService.addTreatment(props.match.params.patientId, values)
      .then(() => props.history.push(routes.patients))
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });
  };
  return (
    <Row justify='center' className='add-patient-container'>
      <Col span={10}>
        <div className='add-patient-card'>
          <div className='add-patient-h2-wrapper'>
            <h2>{Dictionary.addTreatment.header}</h2>
          </div>
          <TreatmentFrom isLoading={isSubmitting} onSubmit={handleSubmit} error={error} />
        </div>
      </Col>
    </Row>
  );
};

export default AddTreatment;
