import moment from 'moment';

import { Field, InputType, Width } from 'components/common/formCard';
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

export interface Balance {
  balance: number;
}

export interface TreatmentAndBalance extends Treatment, Balance {}

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

export interface TreatmentFields extends Partial<Field> {
  name: keyof typeof Dictionary.treatmentForm;
  inputType: InputType;
  width?: Width;
}

const TreatmentService = {
  getTreatmentsByPatientId(patientId: string) {
    return HttpService.get<Treatment[]>('/treatment/byPatientId/' + patientId);
  },
  getLastTreatment(patientId: string) {
    return HttpService.get<Treatment>('/treatment/lastTreatment/byPatientId/' + patientId);
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
  addOrEditTreatment(patientId: string, treatment: Treatment) {
    return treatment._id ? this.editTreatment(treatment._id, treatment) : this.addTreatment(patientId, treatment);
  },

  getGeneralFields(isReflexology: boolean): TreatmentFields[] {
    const fields: TreatmentFields[] = [
      {
        name: 'treatmentDate',
        inputType: InputType.DateTimePicker,
        formItemProps: {
          rules: [{ required: true }]
        }
      },
      { name: 'treatmentNumber', inputType: InputType.FormItem },
      { name: 'referredBy', inputType: InputType.Input },
      { name: 'visitReason', inputType: InputType.TextArea, width: 3 },
      { name: 'findings', inputType: InputType.TextArea, width: 3 },
      { name: 'diagnoses', inputType: InputType.FormItem },
      { name: 'treatmentPrice', inputType: InputType.FormItem },
      { name: 'paidPrice', inputType: InputType.InputNumber },
      { name: 'profession', inputType: InputType.Input }
    ];
    if (isReflexology) fields.push({ name: 'recommendations', inputType: InputType.TextArea, width: 3 });

    return fields;
  },

  getDietFields(): TreatmentFields[] {
    return [
      { name: 'mainComplaint', inputType: InputType.TextArea, width: 3 },
      { name: 'medicalPast', inputType: InputType.TextArea, width: 3 },
      { name: 'drugsAndSupplements', inputType: InputType.TextArea, width: 3 },
      { name: 'height', inputType: InputType.InputNumber },
      { name: 'weight', inputType: InputType.InputNumber },
      { name: 'additionalTreatments', inputType: InputType.TextArea, width: 3 },
      { name: 'familyMedicalHistory', inputType: InputType.TextArea, width: 3 },
      { name: 'sleep', inputType: InputType.TextArea, width: 3 },
      { name: 'howWakeUp', inputType: InputType.TextArea },
      { name: 'appetite', inputType: InputType.TextArea },
      { name: 'thirst', inputType: InputType.TextArea },
      { name: 'stimulants', inputType: InputType.TextArea, width: 3 },

      // new
      { name: 'defecation', inputType: InputType.TextArea },
      { name: 'urine', inputType: InputType.TextArea },
      { name: 'sweat', inputType: InputType.TextArea },
      { name: 'women', inputType: InputType.TextArea, width: 3 },
      { name: 'exercise', inputType: InputType.TextArea }
    ];
  },

  getNewDietFields(): TreatmentFields[] {
    return [
      // new
      { name: 'diet', inputType: InputType.TextArea, width: 3 },
      { name: 'snacks', inputType: InputType.TextArea },
      { name: 'crisisHour', inputType: InputType.TextArea },
      { name: 'notLikeToEat', inputType: InputType.TextArea },
      { name: 'blenderExists', inputType: InputType.CheckBox },
      { name: 'juicerExists', inputType: InputType.CheckBox },
      { name: 'recommendations', inputType: InputType.TextArea, width: 3 },
      { name: 'menu', inputType: InputType.TextArea, width: 3 }
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
      { name: 'uric acid', value: null, isImportant: false },
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
      formItem: field.inputType === InputType.FormItem ? getCustomFields(field.name) : undefined,
      width: field.width
    }));
  }
};

export default TreatmentService;
