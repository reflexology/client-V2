import HttpService from './httpService';
import Dictionary from 'dictionary/dictionary';

export interface Patient {
  firstName: string;
  lastName: string;
  momName?: string;
  birthday?: Date;
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
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const PatientService = {
  getPatients() {
    return HttpService.get<Patient[]>(baseEndPoint + '/patient');
  },
  addPatient(patient: Patient) {
    return HttpService.post<Patient>(baseEndPoint + '/patient', patient);
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
