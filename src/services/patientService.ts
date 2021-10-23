import Dictionary from 'dictionary/dictionary';
import HttpService from './httpService';

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  momName?: string;
  birthday?: Date | string;
  age?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  createdBy: string;
  lastTreatment?: Date;
  gender: 'Male' | 'Female';
  notes?: string;
  calculatedAge: Readonly<string>;
  diagnoses?: string[];
  balance?: number;
}

export enum PatientType {
  AllPatients = 'showAllPatients',
  InCredit = 'showInCredit',
  InDebt = 'showInDebt'
}

const PatientService = {
  getPatients(inCredit?: boolean, inDebt?: boolean) {
    return HttpService.get<Patient[]>(`/patient${inCredit ? '?inCredit=true' : ''}${inDebt ? '?inDebt=true' : ''}`);
  },
  getPatient(patientId: string) {
    return HttpService.get<Patient>('/patient/' + patientId);
  },
  getPatientByTreatmentId(treatmentId: string) {
    return HttpService.get<Patient>('/patient/byTreatmentId/' + treatmentId);
  },
  addPatient(patient: Patient) {
    return HttpService.post<Patient>('/patient', patient);
  },
  editPatient(patientId: string, patient: Patient) {
    return HttpService.patch<Patient>('/patient/' + patientId, patient);
  },
  getGenderOptions() {
    return [
      { label: Dictionary.male, value: 'Male' },
      { label: Dictionary.female, value: 'Female' }
    ];
  }
};

export default PatientService;
