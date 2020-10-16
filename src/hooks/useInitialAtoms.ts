import { message } from 'antd';
import { patientsAtom } from 'atoms/patientAtoms';
import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import PatientService from 'services/patientService';

export default function useInitialAtoms() {
  const setPatients = useSetRecoilState(patientsAtom);
  const resetPatientsAtom = useResetRecoilState(patientsAtom);

  useEffect(() => {
    initializeAtoms();

    return resetAtoms();
  }, []);

  const initializeAtoms = () => {
    PatientService.getPatients()
      .then(setPatients)
      .catch(() => {
        message.error('could not load patients');
      });
  };

  const resetAtoms = () => {
    resetPatientsAtom();
  };
}
