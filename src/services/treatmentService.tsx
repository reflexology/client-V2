import DiagnosisService from './diagnosesService';
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
  }
};

export default TreatmentService;
