import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'antd';
import moment from 'moment';

import { routes } from 'components/router/routes';
import usePatients from 'contexts/patientsContexts';
import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import PatientForm from '../patientForm/patientForm';

interface EditPatientProps extends RouteComponentProps<{ patientId: string }, never, Patient> {}

const EditPatient: React.FC<EditPatientProps> = props => {
  const getPatient = (patient: Patient): Patient | null =>
    patient
      ? {
          ...patient,
          birthday: patient.birthday ? moment(patient.birthday).format(DATE_FORMAT).toString() : undefined
        }
      : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState<Patient | null>(getPatient(props.location.state));

  const { patients, setCurrentPatientById, currentPatient, setPatient: editPatient } = usePatients();

  useEffect(() => {
    if (patients.length > 0) setCurrentPatientById(props.match.params.patientId);
  }, [patients, props.match.params.patientId, setCurrentPatientById]);

  useEffect(() => {
    if (currentPatient && !patient) setPatient(currentPatient);
  }, [currentPatient, patient]);

  const handleSubmit = (values: Patient, navigateToAddTreatment: boolean) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    PatientService.editPatient(props.match.params.patientId, values)
      .then(patient => {
        editPatient(patient);
        if (navigateToAddTreatment) {
          props.history.push(routes.addTreatment.format(patient!._id));
        } else props.history.push(routes.patients);
      })
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });
  };

  console.log('render');

  return (
    <Row justify='center' className='add-patient-container'>
      <Col span={10}>
        <div className='add-patient-card'>
          <div className='add-patient-h2-wrapper'>
            <h2>{Dictionary.editPatient.header}</h2>
          </div>
          <PatientForm initialValues={patient!} isLoading={isSubmitting} onSubmit={handleSubmit} error={error} />
        </div>
      </Col>
    </Row>
  );
};

export default withBack(EditPatient);
