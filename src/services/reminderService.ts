import HttpService from './httpService';

export interface Reminder {
  firstName: string;
  lastName: string;
  treatmentId: string;
  isReminderCompleted: boolean;
  reminderDate: Date;
  name: string;
  reminder: string;
}

export enum PatientType {
  AllPatients = 'showAllPatients',
  InCredit = 'showInCredit',
  InDebt = 'showInDebt'
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const ReminderService = {
  async getReminders(): Promise<Reminder[]> {
    const reminders = await HttpService.get<Reminder[]>(baseEndPoint + '/reminder');
    return reminders.map(reminder => ({
      ...reminder,
      name: `${reminder.firstName} ${reminder.lastName}`
    }));
  }
};

export default ReminderService;
