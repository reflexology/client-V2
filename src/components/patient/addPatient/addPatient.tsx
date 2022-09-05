import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useSetRecoilState } from 'recoil';

import { patientsAtom } from 'atoms/patientAtoms';
import BackButton from 'components/common/backButton/backButton';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';
import PatientForm from '../patientForm/patientForm';

import './addPatient.scss';

const AddPatient: React.FC = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const setPatientsAtom = useSetRecoilState(patientsAtom);

  const handleSubmit = (values: Patient, navigateToAddTreatment: boolean) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    PatientService.addPatient(values)
      .then(patient => {
        setPatientsAtom(patients => [patient, ...(patients || [])]);
        if (navigateToAddTreatment) navigate(routes.addTreatment.format(patient._id));
        else navigate(routes.patients);
      })
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <BackButton />

      <Row justify='center' className='add-patient-container'>
        <Col xl={10} lg={12} md={16} sm={20}>
          <div className='add-patient-card'>
            <div className='add-patient-h2-wrapper'>
              <h2>{Dictionary.addPatient.header}</h2>
            </div>
            <PatientForm isLoading={isSubmitting} onSubmit={handleSubmit} error={error} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddPatient;
