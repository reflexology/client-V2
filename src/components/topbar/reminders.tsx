import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VariableSizeList as VList } from 'react-window';
import { BellOutlined } from '@ant-design/icons';
import { Badge, List, Spin, Tabs } from 'antd';
import { useRecoilState } from 'recoil';

import { isFetchingRemindersAtom, newRemindersCountAtom, remindersAtom, remindersTypeAtom } from 'atoms/reminderAtoms';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import CommonService from 'services/commonService';
import ReminderService, { Reminder as ReminderInterface, ReminderType } from 'services/reminderService';
import HeaderDropdown from '../headerDropdown/headerDropdown';
import Reminder from './reminder';

interface IRemindersProps {}

const Reminders: React.FC<IRemindersProps> = () => {
  const [visible, setVisible] = useState(false);

  const [newRemindersCount, setNewRemindersCount] = useRecoilState(newRemindersCountAtom);
  const [isFetching, setIsFetching] = useRecoilState(isFetchingRemindersAtom);
  const [reminders, setReminders] = useRecoilState(remindersAtom);
  const [remindersType, setRemindersType] = useRecoilState(remindersTypeAtom);

  const navigate = useNavigate();

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
      .catch(err => CommonService.showErrorMessage(err))
      .finally(() => setIsFetching(false));
  };

  const handleReminderClick = (reminder: ReminderInterface) => {
    navigate(routes.treatment.format(reminder.treatmentId));
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
            ReminderService.markAllRemindersAsCompleted(reminders.map(reminder => reminder.treatmentId)).then(() =>
              fetchReminders()
            );
            setIsFetching(true);
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
        items={[
          {
            key: ReminderType.New,
            label: Dictionary.reminders.showNew + renderRemindersCount(ReminderType.New),
            children: <List>{remindersMenu}</List>
          },
          {
            key: ReminderType.All,
            label: Dictionary.reminders.showAll + renderRemindersCount(ReminderType.All),
            children: <List>{remindersMenu}</List>
          }
        ]}
      />
    </div>
  );

  return (
    <span className='reminders'>
      <HeaderDropdown
        placement='bottomRight'
        overlay={renderTabs()}
        overlayClassName='reminder-popover'
        trigger={['click']}
        open={visible}
        onOpenChange={setVisible}
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
