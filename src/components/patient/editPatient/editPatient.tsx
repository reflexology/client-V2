import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import moment from 'moment';
import { useSetRecoilState } from 'recoil';

import { patientsAtom } from 'atoms/patientAtoms';
import BackButton from 'components/common/backButton/backButton';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import useCurrentPatient from 'hooks/useCurrentPatient';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import PatientForm from '../patientForm/patientForm';

interface EditPatientProps {}

interface LocationState {
  patient: Patient;
  from?: Location;
}

const EditPatient: React.FC<EditPatientProps> = props => {
  const params = useParams<{ patientId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const getPatient = (patient: Patient): Patient | null =>
    patient
      ? {
          ...patient,
          birthday: patient.birthday ? moment(patient.birthday).format(DATE_FORMAT).toString() : undefined
        }
      : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState<Patient | null>(getPatient((location.state as LocationState)?.patient));
  const setPatients = useSetRecoilState(patientsAtom);

  const currentPatient = useCurrentPatient({ patientId: params.patientId });

  useEffect(() => {
    if (currentPatient && !patient) setPatient(currentPatient);
  }, [currentPatient, patient]);

  const handleSubmit = (values: Patient, navigateToAddTreatment: boolean) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    PatientService.editPatient(params.patientId!, values)
      .then(patient => {
        setPatients(patients => {
          const index = patients!.findIndex(p => p._id === patient._id);
          return CommonService.replaceItemAtIndex(patients!, index, patient);
        });
        if (navigateToAddTreatment) {
          navigate(routes.addTreatment.format(patient!._id));
        } else navigate((location.state as LocationState)?.from?.pathname || routes.patients);
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
              <h2>{Dictionary.editPatient.header}</h2>
            </div>
            <PatientForm initialValues={patient!} isLoading={isSubmitting} onSubmit={handleSubmit} error={error} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditPatient;
