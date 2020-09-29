import { atom } from 'recoil';
import { Patient } from 'services/patientService';

export const patientsAtom = atom<Patient[]>({
  key: 'patientsAtom',
  default: []
});

export const currentPatientAtom = atom<Patient | undefined>({
  key: 'currentPatientAtom',
  default: undefined
});
