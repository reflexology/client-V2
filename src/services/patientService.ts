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
  childrenCount: number;
  gender: 'Male' | 'Female';
  maritalStatus: 'Married' | 'Single' | 'Divorced' | 'Widowed';
  calculatedAge: Readonly<string>;
  profession: string;
  childrenAges: string[];
  diagnoses?: string[];
}

export enum PatientType {
  AllPatients = 'showAllPatients',
  InCredit = 'showInCredit',
  InDebt = 'showInDebt'
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const PatientService = {
  getPatients(inCredit?: boolean, inDebt?: boolean) {
    return HttpService.get<Patient[]>(
      `${baseEndPoint}/patient${inCredit ? '?inCredit=true' : ''}${inDebt ? '?inDebt=true' : ''}`
    );
  },
  getPatient(patientId: string) {
    return HttpService.get<Patient>(baseEndPoint + '/patient/' + patientId);
  },
  addPatient(patient: Patient) {
    return HttpService.post<Patient>(baseEndPoint + '/patient', patient);
  },
  editPatient(patientId: string, patient: Patient) {
    return HttpService.patch<Patient>(baseEndPoint + '/patient/' + patientId, patient);
  },
  getMaritalStatusOptions(isMale: boolean) {
    const maritalStatuses = isMale ? Dictionary.MaritalStatusForMale : Dictionary.MaritalStatusForFemale;
    return [
      { label: maritalStatuses.Widowed, value: 'Widowed' },
      { label: maritalStatuses.Married, value: 'Married' },
      { label: maritalStatuses.Single, value: 'Single' },
      { label: maritalStatuses.Divorced, value: 'Divorced' }
    ];
  },
  getGenderOptions() {
    return [
      { label: Dictionary.male, value: 'Male' },
      { label: Dictionary.female, value: 'Female' }
    ];
  }
};

export default PatientService;
