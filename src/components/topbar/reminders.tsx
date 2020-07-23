import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, List, Tabs, Spin } from 'antd';
import HeaderDropdown from '../headerDropdown/headerDropdown';
import ReminderService, { Reminder } from 'services/reminderService';

interface IRemindersProps {}

type reminderType = 'all' | 'new';

const Reminders: React.FC<IRemindersProps> = () => {
  const [visible, setVisible] = useState(false);
  const [showNew, setShowNew] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    ReminderService.getReminders(showNew)
      .then(setReminders)
      .finally(() => setIsFetching(false));
  }, [showNew]);

  const changeShowNewReminders = (key: string) => setShowNew(key === 'new');

  const remindersMenu = (
    <List>
      {reminders.map(r => {
        return <List.Item key={r.treatmentId}>{r.reminders}</List.Item>;
      })}
    </List>
  );

  const getNotificationBox = () => {
    return (
      <Spin spinning={isFetching} delay={300}>
        <Tabs centered defaultActiveKey='1' onChange={changeShowNewReminders} className='reminders-tabs'>
          <Tabs.TabPane tab='תזכורות חדשות' key='all'>
            {remindersMenu}
          </Tabs.TabPane>
          <Tabs.TabPane tab='כל התזכורות' key='new'>
            {remindersMenu}
          </Tabs.TabPane>
        </Tabs>
      </Spin>
    );
  };
  const notificationBox = getNotificationBox();
  return (
    <span className='reminders'>
      <HeaderDropdown
        placement='bottomRight'
        overlay={notificationBox}
        overlayClassName='reminder-popover'
        trigger={['click']}
        visible={visible}
        onVisibleChange={setVisible}
      >
        <span className='action'>
          <Badge count='2' style={{ boxShadow: 'none' }} className='badge'>
            <BellOutlined className='reminder-icon' />
          </Badge>
        </span>
      </HeaderDropdown>
    </span>
  );
};

export default Reminders;
