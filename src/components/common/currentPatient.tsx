import { Space } from 'antd';
import { currentPatientAtom } from 'atoms/patientAtoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

const CurrentPatient: React.FC = () => {
  const currentPatient = useRecoilValue(currentPatientAtom);
  if (!currentPatient) return null;

  const { firstName, lastName, momName, age, phone, balance } = currentPatient;
  return (
    <Space size='large' wrap>
      <span>
        <span>{firstName}</span> <span>{lastName}</span> {!!momName && <span>({momName})</span>}
      </span>
      {!!age && <span>גיל: {age}</span>}
      {!!phone && <span>טלפון: {phone}</span>}
      {!!balance && (
        <span>
          {balance > 0 ? 'זכות' : 'חוב'}: <span className='negative-number'>{balance.toFixed()}</span>
        </span>
      )}
    </Space>
  );
};

export default CurrentPatient;
