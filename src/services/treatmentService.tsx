import moment from 'moment';

import { Field, InputType } from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
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
  bloodTests: BloodTest[];
  treatmentType: TreatmentType;
  files: TreatmentFile[];
}

export interface TreatmentFile {
  key: string;
  name: string;
  location: string;
}

export interface BloodTest {
  name: string;
  value: string | number | null;
  isImportant: boolean;
}

export enum TreatmentType {
  Reflexology = 'Reflexology',
  Diet = 'Diet'
}

export interface TreatmentFields {
  name: keyof typeof Dictionary.treatmentForm;
  inputType: InputType;
}

const TreatmentService = {
  getTreatmentsByPatientId(patientId: string) {
    return HttpService.get<Treatment[]>('/treatment/byPatientId/' + patientId);
  },
  getLastTreatment(patientId: string) {
    return HttpService.get<{ balance: number; lastTreatment: Treatment }>(
      '/treatment/lastTreatment/byPatientId/' + patientId
    );
  },
  getTreatmentById(patientId: string) {
    return HttpService.get<Treatment>('/treatment/' + patientId);
  },
  addTreatment(patientId: string, treatment: Treatment) {
    return HttpService.post<Treatment>('/treatment/patient/' + patientId, treatment);
  },
  editTreatment(treatmentId: string, treatment: Treatment) {
    return HttpService.patch<Treatment>('/treatment/' + treatmentId, treatment);
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

  getReminderFields(): TreatmentFields[] {
    return [
      { name: 'reminders', inputType: InputType.TextArea },
      { name: 'reminderDate', inputType: InputType.DatePicker }
    ];
  },

  getBloodTests(): BloodTest[] {
    return [
      { name: 'glucose', value: null, isImportant: false },
      { name: 'creatinine', value: null, isImportant: false },
      { name: 'urea', value: null, isImportant: false },
      { name: 'uricAei', value: null, isImportant: false },
      { name: 'HDL', value: null, isImportant: false },
      { name: 'LDL', value: null, isImportant: false },
      { name: 'cholesterol', value: null, isImportant: false },
      { name: 'triglycerides', value: null, isImportant: false },
      { name: 'AST', value: null, isImportant: false },
      { name: 'ALT', value: null, isImportant: false },
      { name: 'GGl', value: null, isImportant: false },
      { name: 'B12', value: null, isImportant: false },
      { name: 'VitaminD', value: null, isImportant: false },
      { name: 'TSH', value: null, isImportant: false },
      { name: 'HB', value: null, isImportant: false },
      { name: 'HBA1C', value: null, isImportant: false },
      { name: 'ferritin', value: null, isImportant: false }
    ];
  },

  getFields(
    fields: TreatmentFields[],
    getCustomFields: (fieldName: keyof typeof Dictionary.treatmentForm) => JSX.Element | undefined
  ): Field[] {
    return fields.map(field => ({
      ...field,
      label: Dictionary.treatmentForm[field.name],
      placeholder:
        Dictionary.treatmentForm[(field.name + 'Placeholder') as keyof typeof Dictionary.treatmentForm] || undefined,
      extra: Dictionary.treatmentForm[(field.name + 'Extra') as keyof typeof Dictionary.treatmentForm] || undefined,
      formItem: field.inputType === InputType.FormItem ? getCustomFields(field.name) : undefined
    }));
  }
};

export default TreatmentService;
