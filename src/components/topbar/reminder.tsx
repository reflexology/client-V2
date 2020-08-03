import React, { useState } from 'react';
import { Checkbox, List } from 'antd';
import ReminderService, { Reminder as ReminderInterface } from 'services/reminderService';
import { DATE_FORMAT } from 'utils/constants';
import moment from 'moment';

interface ReminderProps {
  reminder: ReminderInterface;
  listItemStyle: React.CSSProperties;
  onClick: (reminder: ReminderInterface) => void;
  updateReminders: () => void;
}

const Reminder: React.FC<ReminderProps> = props => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <List.Item
      actions={[
        <Checkbox
          checked={props.reminder.isReminderCompleted}
          disabled={isLoading}
          onClick={e => {
            e.stopPropagation();
            setIsLoading(true);
            ReminderService.updateReminder(props.reminder.treatmentId, {
              ...props.reminder,
              isReminderCompleted: !props.reminder.isReminderCompleted
            }).then(() => {
              setIsLoading(false);
              props.updateReminders();
            });
          }}
        ></Checkbox>
      ]}
      onClick={() => props.onClick(props.reminder)}
      className='item'
      style={props.listItemStyle}
    >
      <List.Item.Meta
        className='meta'
        title={<div className='title'>{props.reminder.firstName + ' ' + props.reminder.lastName}</div>}
        description={
          <div>
            <div className='description'>{props.reminder.reminders}</div>
            <div className='date'>{moment(props.reminder.reminderDate).format(DATE_FORMAT)}</div>
          </div>
        }
      />
    </List.Item>
  );
};

export default Reminder;
