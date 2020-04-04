import { Col, Row, Spin } from 'antd';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonService from 'services/commonService';
import TreatmentService, { Treatment } from 'services/treatmentService';

import TreatmentFrom from '../treatmentForm/treatmentFrom';

interface AddTreatmentProps extends RouteComponentProps<{ patientId: string }> {}

const AddTreatment: React.FC<AddTreatmentProps> = props => {
  const [initialValues, setInitialValues] = useState<Partial<Treatment>>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    TreatmentService.getLastTreatment(props.match.params.patientId)
      .then(treatment =>
        setInitialValues({
          treatmentNumber: (treatment.treatmentNumber || 0) + 1,
          referredBy: treatment.referredBy,
          treatmentPrice: treatment.treatmentPrice
        })
      )
      .finally(() => setIsFetching(false));
  }, []);

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
    <Spin spinning={isFetching}>
      <Row justify='center' className='add-patient-container'>
        <Col span={10}>
          <div className='add-patient-card'>
            <div className='add-patient-h2-wrapper'>
              <h2>{Dictionary.addTreatment.header}</h2>
            </div>
            <TreatmentFrom
              initialValues={initialValues}
              isLoading={isSubmitting}
              onSubmit={handleSubmit}
              error={error}
            />
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default AddTreatment;
