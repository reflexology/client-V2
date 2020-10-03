import HttpService from './httpService';

export interface Reminder {
  firstName: string;
  lastName: string;
  treatmentId: string;
  isReminderCompleted: boolean;
  reminderDate: Date;
  name: string;
  reminders: string;
}

export enum ReminderType {
  All = 'all',
  New = 'new'
}

const ReminderService = {
  async getReminders(isNewReminders?: boolean): Promise<Reminder[]> {
    const reminders = await HttpService.get<Reminder[]>(`/reminder${isNewReminders ? '?isNewReminders=true' : ''}`);
    return reminders.map(reminder => ({
      ...reminder,
      name: `${reminder.firstName} ${reminder.lastName}`
    }));
  },

  updateReminder(treatmentId: string, reminder: Reminder) {
    return HttpService.patch('/reminder/' + treatmentId, reminder);
  },

  markAllRemindersAsCompleted(treatmentIds: string[]) {
    return HttpService.patch('/reminder/multiple', treatmentIds);
  }
};

export default ReminderService;
