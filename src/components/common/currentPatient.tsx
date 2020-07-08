import React from 'react';

import { Patient } from 'services/patientService';

interface CurrentPatientProps {
  patient: Patient | undefined;
}

const CurrentPatient: React.FC<CurrentPatientProps> = props => {
  if (!props.patient) return null;

  const { firstName, lastName, momName, age, phone } = props.patient;
  return (
    <b>
      <span className='ml-6'>
        <span>{firstName}</span> <span>{lastName}</span> {momName && <span>({momName})</span>}
      </span>
      {age && <span className='ml-6'>גיל: {age}</span>}
      {phone && <span className='ml-6'>טלפון: {phone}</span>}
    </b>
  );
};

export default CurrentPatient;
