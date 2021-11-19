import moment from 'moment';

import { Field, InputType, Width } from 'components/common/formCard';
import Dictionary from 'dictionary/dictionary';
import HttpService from './httpService';

export interface Treatment {
  _id: string;
  treatmentDate?: moment.Moment;
  referredBy?: string;
  visitReason?: string;
  treatmentNumber: number;
  findings?: string;
  remarks?: string;
  treatmentPrice?: number;
  paidPrice?: number;
  reminders?: string;
  reminderDate?: moment.Moment;
  isReminderCompleted?: boolean;
  createdBy?: string;
  diagnoses: string[];
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
  deleteTreatment(treatmentId: string) {
    return HttpService.delete<Treatment>('/treatment/' + treatmentId);
  },

  getGeneralFields(): TreatmentFields[] {
    return [
      {
        name: 'treatmentType',
        inputType: InputType.Radio,
        radioOptions: Object.values(TreatmentType).map(treatmentType => ({
          value: treatmentType,
          label: Dictionary.treatmentTypes[treatmentType.toLowerCase() as keyof typeof Dictionary.treatmentTypes]
        })),
        width: 3,
        formItemProps: {
          rules: [{ required: true }]
        }
      },
      {
        name: 'treatmentDate',
        inputType: InputType.DateTimePicker,
        formItemProps: {
          rules: [{ required: true }]
        }
      },

      { name: 'treatmentNumber', inputType: InputType.FormItem },
      { name: 'referredBy', inputType: InputType.Input, inputProps: { autoComplete: 'referredBy' } },
      { name: 'visitReason', inputType: InputType.TextArea, width: 3 },
      { name: 'diagnoses', inputType: InputType.FormItem },
      { name: 'treatmentPrice', inputType: InputType.FormItem },
      { name: 'paidPrice', inputType: InputType.InputNumber },
      { name: 'findings', inputType: InputType.TextArea, width: 3 }
    ];
  },

  getReminderFields(): TreatmentFields[] {
    return [
      { name: 'reminderDate', inputType: InputType.FormItem, width: 1 },
      { name: 'reminders', inputType: InputType.TextArea, width: 2 }
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
