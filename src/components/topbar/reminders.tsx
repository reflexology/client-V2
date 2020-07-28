import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, List, Tabs, Spin } from 'antd';
import HeaderDropdown from '../headerDropdown/headerDropdown';
import ReminderService, { Reminder } from 'services/reminderService';
import Dictionary from 'dictionary/dictionary';
import { useHistory } from 'react-router-dom';
import { routes } from 'components/router/routes';
import { DATE_FORMAT } from 'utils/constants';
import { AutoSizer, List as VList, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
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
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  );

  const history = useHistory();

  useEffect(() => {
    ReminderService.getReminders(remindersType === ReminderType.New)
      .then(setReminders)
      .finally(() => setIsFetching(false));
  }, [remindersType]);

  const handleItemClick = (reminder: Reminder) => {
    history.push(routes.treatment.format(reminder.treatmentId));
    setVisible(false);
  };

  const remindersMenu = (
    <div style={{ width: '100%', height: '100vh' }}>
      <AutoSizer>
        {({ width, height }) => (
          <VList
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={reminders.length}
            rowRenderer={({ key, index, style, parent }) => {
              const reminder = reminders[index];

              return (
                <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
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
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );

  const renderRemindersCount = (tab: ReminderType) => (tab === remindersType ? ` (${reminders.length})` : '');

  const getNotificationBox = () => {
    return (
      <Spin spinning={isFetching} delay={300}>
        <Tabs centered onChange={key => setRemindersType(key as ReminderType)} className='reminders-tabs'>
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
