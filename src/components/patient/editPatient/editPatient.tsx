import { Col, message, Row, Spin } from 'antd';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import { withBack } from 'hoc/withBack/withBack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CommonService from 'services/commonService';
import PatientService, { Patient } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';

import PatientForm from '../patientForm/patientForm';

interface EditPatientProps extends RouteComponentProps<{ patientId: string }, any, Patient> {}

const EditPatient: React.FC<EditPatientProps> = props => {
  const getPatient = (patient: Patient): Patient => ({
    ...patient,
    birthday: patient?.birthday ? moment(patient.birthday).format(DATE_FORMAT).toString() : undefined
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');
  const [patient, setPatient] = useState<Patient>(getPatient(props.location.state));

  useEffect(() => {
    if (!patient) {
      setIsFetching(true);
      PatientService.getPatient(props.match.params.patientId)
        .then(res => setPatient(getPatient(res)))
        .catch(() => {
          message.error(Dictionary.generalErrorAndRefresh);
        })
        .finally(() => setIsFetching(false));
    }
  }, []);

  const handleSubmit = (values: Patient) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    PatientService.editPatient(props.match.params.patientId, values)
      .then(() => {
        if (buttonClicked === Dictionary.patientForm.saveAndAddTreatment) {
          props.history.push(routes.addTreatment.format(patient._id));
        } else props.history.push(routes.patients);
      })
      .catch(err => {
        setError(CommonService.getErrorMessage(err));
        setIsSubmitting(false);
      });
  };

  const handleButtonClick = (buttonClicked: string) => {
    setButtonClicked(buttonClicked);
  };

  return (
    <Spin spinning={isFetching}>
      <Row justify='center' className='add-patient-container'>
        <Col span={10}>
          <div className='add-patient-card'>
            <div className='add-patient-h2-wrapper'>
              <h2>{Dictionary.editPatient.header}</h2>
            </div>
            <PatientForm
              initialValues={patient}
              isLoading={isSubmitting}
              onSubmit={handleSubmit}
              error={error}
              onButtonClick={handleButtonClick}
            />
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default withBack(EditPatient);
