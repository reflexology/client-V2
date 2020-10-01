import { message } from 'antd';
import { patientsAtom } from 'atoms/patientAtoms';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import PatientService from 'services/patientService';

export default function useInitialAtoms() {
  const setPatients = useSetRecoilState(patientsAtom);

  useEffect(() => {
    initializeAtoms();
  }, []);

  const initializeAtoms = () => {
    PatientService.getPatients()
      .then(setPatients)
      .catch(() => {
        message.error('could not load patients');
      });
  };
}
