import { currentPatientAtom } from 'atoms/patientAtoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

const CurrentPatient: React.FC = () => {
  const currentPatient = useRecoilValue(currentPatientAtom);
  if (!currentPatient) return null;

  const { firstName, lastName, momName, age, phone, balance } = currentPatient;
  return (
    <>
      <span className='ml-6'>
        <span>{firstName}</span> <span>{lastName}</span> {momName && <span>({momName})</span>}
      </span>
      {age && <span className='ml-6'>גיל: {age}</span>}
      {phone && <span className='ml-6'>טלפון: {phone}</span>}
      {balance && (
        <span className='ml-6'>
          {balance > 0 ? 'זכות' : 'חוב'}: <span className='negative-number'>{balance.toFixed()}</span>
        </span>
      )}
    </>
  );
};

export default CurrentPatient;
