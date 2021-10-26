import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import { useRecoilValue } from 'recoil';

import { currentPatientAtom } from 'atoms/patientAtoms';
import { routes } from 'components/router/routes';

const CurrentPatient: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPatient = useRecoilValue(currentPatientAtom);
  if (!currentPatient) return null;

  const { firstName, lastName, momName, calculatedAge, phone, balance } = currentPatient;
  return (
    <Space size='large' wrap>
      <span>
        <span>{firstName}</span> <span>{lastName}</span> {!!momName && <span>({momName})</span>}
      </span>
      {!!calculatedAge && <span>גיל: {calculatedAge}</span>}
      {!!phone && <span>טלפון: {phone}</span>}
      {!!balance && (
        <span>
          {balance > 0 ? 'זכות' : 'חוב'}: <span className='negative-number'>{balance.toFixed()}</span>
        </span>
      )}
      <Button
        onClick={() =>
          history.push(routes.editPatient.format(currentPatient._id), { from: location, patient: currentPatient })
        }
        ghost
      >
        ערוך
      </Button>
    </Space>
  );
};

export default CurrentPatient;
