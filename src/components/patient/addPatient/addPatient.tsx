import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'antd';

import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';
import PatientForm from '../patientForm/patientForm';

import './addPatient.scss';

interface Props extends RouteComponentProps {}

const AddPatient: React.FC<Props> = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { addPatient } = usePatients();
  const handleSubmit = (values: any, navigateToAddTreatment: boolean) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    values.childrenAges = values.childrenAges?.filter((childAge: number) => !!childAge);
    PatientService.addPatient(values)
      .then(patient => {
        addPatient(patient);
        if (navigateToAddTreatment) props.history.push(routes.addTreatment.format(patient._id));
        else props.history.push(routes.patients);
      })
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
