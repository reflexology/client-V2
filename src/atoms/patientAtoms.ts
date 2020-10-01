import { atom, selector } from 'recoil';
import { Patient, PatientType } from 'services/patientService';
import TableUtils from 'utils/tableUtils';
import { Filters } from '../components/patient/patients/patientContainer';
import moment from 'moment';

export const patientsAtom = atom<Patient[] | null>({
  key: 'patientsAtom',
  default: null
});

export const patientsFiltersAtom = atom<Filters>({
  key: 'patientsFiltersAtom',
  default: {
    endDate: undefined,
    startDate: undefined,
    search: '',
    patientType: PatientType.AllPatients
  }
});

export const currentPatientAtom = atom<Patient | undefined>({
  key: 'currentPatientAtom',
  default: undefined
});

export const filteredPatientsSelector = selector<Patient[] | null>({
  key: 'filteredPatients',
  get: ({ get }) => {
    const patients = get(patientsAtom);
    return patients ? filterPatients(patients, get(patientsFiltersAtom)) : null;
  }
});

const filterPatients = (patients: Patient[], filters: Filters) => {
  let filteredPatients: Patient[] = [...patients];

  if (filters.patientType !== PatientType.AllPatients)
    filteredPatients = filteredPatients.filter(patient =>
      filters.patientType === PatientType.InCredit ? patient.balance! > 0 : patient.balance! < 0
    );

  if (filters.search)
    filteredPatients = filteredPatients.filter(patient =>
      TableUtils.filter(patient, filters.search, [
        'firstName',
        'lastName',
        'momName',
        'calculatedAge',
        'phone',
        'email',
        'lastTreatment'
      ])
    );

  if (filters.startDate)
    filteredPatients = filteredPatients.filter(patient => moment(patient.lastTreatment) < moment(filters.startDate));

  if (filters.endDate)
    filteredPatients = filteredPatients.filter(patient => moment(patient.lastTreatment) > moment(filters.endDate));

  return filteredPatients;
};
