import { currentPatientAtom, patientsAtom } from 'atoms/patientAtoms';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PatientService from 'services/patientService';

export default function useCurrentPatient({ treatmentId, patientId }: { treatmentId?: string; patientId?: string }) {
  const [currentPatient, setCurrentPatient] = useRecoilState(currentPatientAtom);
  const patients = useRecoilValue(patientsAtom);

  useEffect(() => {
    if (treatmentId) PatientService.getPatientByTreatmentId(treatmentId).then(setCurrentPatient);
    if (patientId) setCurrentPatient(patients?.find(patient => patient._id === patientId));
  }, [patients]);

  return currentPatient;
}
