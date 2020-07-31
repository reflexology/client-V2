import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, List, Tabs, Spin } from 'antd';
import HeaderDropdown from '../headerDropdown/headerDropdown';
import ReminderService, { Reminder } from 'services/reminderService';
import Dictionary from 'dictionary/dictionary';
import { useHistory } from 'react-router-dom';
import { routes } from 'components/router/routes';
import { DATE_FORMAT } from 'utils/constants';
import { VariableSizeList as VList } from 'react-window';
import moment from 'moment';

interface IRemindersProps {}

enum ReminderType {
  All = 'all',
  New = 'new'
}

const Reminders: React.FC<IRemindersProps> = () => {
  const [visible, setVisible] = useState(false);
  const [remindersType, setRemindersType] = useState(ReminderType.New);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [newRemindersCount, setNewRemindersCount] = useState(0);

  const history = useHistory();

  const basicRowHeight = 70;
  const descriptionLineHeight = 18;

  useEffect(() => {
    if (reminders) setReminders([]);

    if (!isFetching) setIsFetching(true);

    ReminderService.getReminders(remindersType === ReminderType.New)
      .then(reminders => {
        setReminders(reminders);
        if (remindersType === ReminderType.New) setNewRemindersCount(reminders.length);
      })
      .finally(() => setIsFetching(false));
  }, [remindersType]);

  const handleItemClick = (reminder: Reminder) => {
    history.push(routes.treatment.format(reminder.treatmentId));
    setVisible(false);
  };

  const rowHeights = reminders.map(
    reminder => basicRowHeight + (reminder.reminders ? (reminder.reminders.length / 50 + 1) * descriptionLineHeight : 0)
  );

  const getRowHeight = (index: number) => rowHeights[index];

  const remindersMenu = (
    <Spin spinning={isFetching}>
      <List<Reminder> dataSource={reminders}>
        <VList
          direction='rtl'
          className='list'
          height={400}
          width='100%'
          itemCount={reminders.length}
          itemSize={getRowHeight}
        >
          {({ index, style }) => {
            const reminder = reminders[index];

            return (
              <List.Item onClick={() => handleItemClick(reminder)} className='item' style={style}>
                <List.Item.Meta
                  className='meta'
                  title={<div className='title'>{reminder.firstName + ' ' + reminder.lastName}</div>}
                  description={
                    <div>
                      <div className='description'>{reminder.reminders}</div>
                      <div className='date'>{moment(reminder.reminderDate).format(DATE_FORMAT)}</div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        </VList>
      </List>
    </Spin>
  );

  const renderRemindersCount = (tab: ReminderType) =>
    tab === remindersType && !isFetching ? ` (${reminders.length})` : '';

  const renderTabs = () => {
    return (
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
  };

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
