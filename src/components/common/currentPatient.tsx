import React from 'react';
import { Patient } from 'services/patientService';

interface CurrentPatientProps {
  patient: Patient | undefined;
}

const CurrentPatient: React.FC<CurrentPatientProps> = props => {
  if (!props.patient) return null;

  const { firstName, lastName, momName, age } = props.patient;
  return (
    <b>
      <span>{firstName}</span> <span>{lastName}</span> <span>{momName ? `(${momName})` : null}</span>{' '}
      <span>גיל: {age}</span>
    </b>
  );
};

export default CurrentPatient;
