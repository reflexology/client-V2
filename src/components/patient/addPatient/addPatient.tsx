import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';
import { RouteComponentProps } from 'react-router-dom';
import PatientForm from '../patientForm/patientForm';
import { withBack } from 'hoc/withBack/withBack';
import { routes } from 'components/router/routes';
import './addPatient.scss';

interface Props extends RouteComponentProps {}

const AddPatient: React.FC<Props> = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (values: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    PatientService.addPatient(values)
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
            <h2>{Dictionary.addPatient.header}</h2>
          </div>
          <PatientForm isLoading={isSubmitting} onSubmit={handleSubmit} error={error} />
        </div>
      </Col>
    </Row>
  );
};

export default withBack(AddPatient);
