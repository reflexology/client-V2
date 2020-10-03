import { atom } from 'recoil';
import { Reminder, ReminderType } from 'services/reminderService';

export const remindersAtom = atom<Reminder[]>({
  key: 'reminders',
  default: []
});

export const isFetchingRemindersAtom = atom<boolean>({
  key: 'isFetchingReminders',
  default: true
});

export const remindersTypeAtom = atom<ReminderType>({
  key: 'remindersType',
  default: ReminderType.New
});

export const newRemindersCountAtom = atom<number>({
  key: 'newRemindersCount',
  default: 0
});
