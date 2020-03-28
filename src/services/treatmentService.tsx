import HttpService from './httpService';

export interface Treatment {
  _id: string;
  treatmentDate?: Date;
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
}
const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const TreatmentService = {
  getTreatments() {
    return HttpService.get<Treatment[]>(baseEndPoint + '/treatment');
  },
  getTreatment(treatmentId: string) {
    return HttpService.get<Treatment>(baseEndPoint + '/treatment/' + treatmentId);
  },
  addTreatment(patientId: string, treatment: Treatment) {
    return HttpService.post<Treatment>(baseEndPoint + '/treatment/patient/' + patientId, treatment);
  },
  editTreatment(TreatmentId: string, treatment: Treatment) {
    return HttpService.patch<Treatment>(baseEndPoint + '/treatment/' + TreatmentId, treatment);
  }
};

export default TreatmentService;