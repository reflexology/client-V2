import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, List, Tabs, Spin } from 'antd';
import HeaderDropdown from '../headerDropdown/headerDropdown';
import ReminderService, { Reminder as ReminderInterface } from 'services/reminderService';
import Dictionary from 'dictionary/dictionary';
import { useHistory } from 'react-router-dom';
import { routes } from 'components/router/routes';
import { VariableSizeList as VList } from 'react-window';
import Reminder from './reminder';

interface IRemindersProps {}

enum ReminderType {
  All = 'all',
  New = 'new'
}

const Reminders: React.FC<IRemindersProps> = () => {
  const [visible, setVisible] = useState(false);
  const [remindersType, setRemindersType] = useState(ReminderType.New);
  const [reminders, setReminders] = useState<ReminderInterface[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [newRemindersCount, setNewRemindersCount] = useState(0);

  const history = useHistory();

  const basicRowHeight = 70;
  const descriptionLineHeight = 18;

  useEffect(() => {
    if (remindersType === ReminderType.All) setRemindersType(ReminderType.New);
  }, [visible]);

  useEffect(() => {
    fetchReminders();
  }, [remindersType]);

  const fetchReminders = () => {
    if (reminders) setReminders([]);

    if (!isFetching) setIsFetching(true);

    ReminderService.getReminders(remindersType === ReminderType.New)
      .then(reminders => {
        setReminders(reminders);
        if (remindersType === ReminderType.New) setNewRemindersCount(reminders.length);
      })
      .finally(() => setIsFetching(false));
  };

  const handleReminderClick = (reminder: ReminderInterface) => {
    history.push(routes.treatment.format(reminder.treatmentId));
    setVisible(false);
  };

  const rowHeights = reminders.map(
    reminder => basicRowHeight + (reminder.reminders ? (reminder.reminders.length / 50 + 1) * descriptionLineHeight : 0)
  );

  const getRowHeight = (index: number) => rowHeights[index];

  const renderRemindersCount = (tab: ReminderType) =>
    tab === remindersType && !isFetching ? ` (${reminders.length})` : '';

  const remindersMenu = (
    <Spin spinning={isFetching}>
      <List<ReminderInterface> dataSource={reminders}>
        <VList
          direction='rtl'
          className='list'
          height={400}
          width='100%'
          itemCount={reminders.length}
          itemSize={getRowHeight}
        >
          {({ index, style }) => (
            <Reminder
              updateReminders={fetchReminders}
              reminder={reminders[index]}
              listItemStyle={style}
              onClick={handleReminderClick}
            />
          )}
        </VList>
      </List>
      <div className='bottom-bar'>
        <div
          onClick={() => {
            ReminderService.markAllRemindersAsCompleted(reminders.map(reminder => reminder.treatmentId));
          }}
        >
          {Dictionary.reminders.markAllAsRead}
        </div>
      </div>
    </Spin>
  );

  const renderTabs = () => (
    <div>
      <Tabs
        defaultActiveKey={ReminderType.New}
        centered
        onChange={key => {
          setRemindersType(key as ReminderType);
          setIsFetching(true);
        }}
      >
        <Tabs.TabPane
          tab={Dictionary.reminders.showNew + renderRemindersCount(ReminderType.New)}
          key={ReminderType.New}
        >
          <List>{remindersMenu}</List>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={Dictionary.reminders.showAll + renderRemindersCount(ReminderType.All)}
          key={ReminderType.All}
        >
          <List>{remindersMenu}</List>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );

  return (
    <span className='reminders'>
      <HeaderDropdown
        placement='bottomRight'
        overlay={renderTabs()}
        overlayClassName='reminder-popover'
        trigger={['click']}
        visible={visible}
        onVisibleChange={setVisible}
      >
        <span className='action'>
          <Badge count={newRemindersCount} style={{ boxShadow: 'none' }} className='badge'>
            <BellOutlined className='reminder-icon' />
          </Badge>
        </span>
      </HeaderDropdown>
    </span>
  );
};

export default Reminders;
