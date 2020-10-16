import { currentPatientAtom } from 'atoms/patientAtoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import PatientService from 'services/patientService';

export default function useSetCurrentPatient(treatmentId: string) {
  const [currentPatient, setCurrentPatient] = useRecoilState(currentPatientAtom);

  useEffect(() => {
    if (!currentPatient) PatientService.getPatientByTreatmentId(treatmentId).then(setCurrentPatient);
  }, []);
}
