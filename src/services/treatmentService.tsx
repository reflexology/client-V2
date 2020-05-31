import { InputType } from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';

import HttpService from './httpService';

export interface Treatment {
  _id: string;
  treatmentDate?: Date | moment.Moment;
  referredBy?: string;
  visitReason?: string;
  treatmentNumber: number;
  findings?: string;
  recommendations?: string;
  remarks?: string;
  treatmentPrice?: number;
  paidPrice?: number;
  reminders?: string;
  reminderDate?: Date;
  isReminderCompleted?: boolean;
  createdBy?: string;
  diagnoses: string[];
}

export enum TreatmentType {
  Reflexology = 'Reflexology',
  Diet = 'Diet'
}

export interface TreatmentFields {
  name: keyof typeof Dictionary.treatmentForm;
  inputType: InputType;
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const TreatmentService = {
  getTreatmentsByPatientId(patientId: string) {
    return HttpService.get<Treatment[]>(baseEndPoint + '/treatment/byPatientId/' + patientId);
  },
  getLastTreatment(patientId: string) {
    return HttpService.get<{ balance: number; lastTreatment: Treatment }>(
      baseEndPoint + '/treatment/lastTreatment/byPatientId/' + patientId
    );
  },
  addTreatment(patientId: string, treatment: Treatment) {
    return HttpService.post<Treatment>(baseEndPoint + '/treatment/patient/' + patientId, treatment);
  },
  editTreatment(TreatmentId: string, treatment: Treatment) {
    return HttpService.patch<Treatment>(baseEndPoint + '/treatment/' + TreatmentId, treatment);
  },

  getGeneralFields(): TreatmentFields[] {
    return [
      { name: 'treatmentDate', inputType: InputType.DateTimePicker },
      { name: 'treatmentNumber', inputType: InputType.FormItem },
      { name: 'referredBy', inputType: InputType.Input },
      { name: 'visitReason', inputType: InputType.TextArea },
      { name: 'diagnoses', inputType: InputType.FormItem },
      { name: 'findings', inputType: InputType.TextArea },
      { name: 'recommendations', inputType: InputType.TextArea },
      { name: 'treatmentPrice', inputType: InputType.FormItem },
      { name: 'paidPrice', inputType: InputType.InputNumber }
    ];
  },

  getDietFields(): TreatmentFields[] {
    return [
      { name: 'mainComplaint', inputType: InputType.TextArea },
      { name: 'secondaryComplaint', inputType: InputType.TextArea },
      { name: 'medicalPast', inputType: InputType.TextArea },
      { name: 'drugsAndSupplements', inputType: InputType.TextArea },
      { name: 'height', inputType: InputType.InputNumber },
      { name: 'weight', inputType: InputType.InputNumber },
      { name: 'additionalTreatments', inputType: InputType.TextArea },
      { name: 'familyMedicalHistory', inputType: InputType.TextArea },
      { name: 'sleep', inputType: InputType.TextArea },
      { name: 'howWakeUp', inputType: InputType.TextArea },
      { name: 'appetite', inputType: InputType.TextArea },
      { name: 'thirst', inputType: InputType.TextArea }
    ];
  },

  getStimulants(): TreatmentFields[] {
    return [
      { name: 'coffee', inputType: InputType.Input },
      { name: 'softDrinks', inputType: InputType.Input },
      { name: 'salt', inputType: InputType.Input },
      { name: 'spices', inputType: InputType.Input },
      { name: 'spicy', inputType: InputType.Input },
      { name: 'sweets', inputType: InputType.Input },
      { name: 'snacks', inputType: InputType.Input },
      { name: 'alcohol', inputType: InputType.Input },
      { name: 'drugs', inputType: InputType.Input },
      { name: 'cleaners', inputType: InputType.Input },
      { name: 'screenTime', inputType: InputType.Input },
      { name: 'pollutedAir', inputType: InputType.Input },
      { name: 'smoking', inputType: InputType.Input },
      { name: 'cosmetics', inputType: InputType.Input }
    ];
  },

  getBloodTests() {
    return [
      { name: 'glucose', value: null },
      { name: 'creatinine', value: null },
      { name: 'urea', value: null },
      { name: 'uricAei', value: null },
      { name: 'HDL', value: null },
      { name: 'LDL', value: null },
      { name: 'cholesterol', value: null },
      { name: 'triglycerides', value: null },
      { name: 'AST', value: null },
      { name: 'ALT', value: null },
      { name: 'GGl', value: null },
      { name: 'B12', value: null },
      { name: 'VitaminD', value: null },
      { name: 'TSH', value: null },
      { name: 'HB', value: null },
      { name: 'HBA1C', value: null },
      { name: 'ferritin', value: null }
    ];
  }
};

export default TreatmentService;
