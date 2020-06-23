import { Radio, Space } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
import Dictionary from 'dictionary/dictionary';
import React, { useEffect, useState } from 'react';
import ReminderService, { Reminder } from 'services/reminderService';
import TableUtils from 'utils/tableUtils';

import ReminderTable from './reminderTable';

interface ReminderContainerProps {}

const tableUtils = new TableUtils<Reminder>();

const ReminderContainer: React.FC<ReminderContainerProps> = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNew, setShowNew] = useState(true);

  useEffect(() => {
    ReminderService.getReminders(showNew)
      .then(setReminders)
      .finally(() => setIsFetching(false));
  }, [showNew]);

  useEffect(() => setFilteredReminders(reminders), [reminders]);

  const filterPatients = (search: string) =>
    setFilteredReminders(reminders.filter(patient => tableUtils.filter(patient, search, ['treatmentId'])));

  return (
    <div className='reminders-container'>
      <Space>
        <Radio.Group onChange={e => setShowNew(e.target.value)} value={showNew}>
          <Radio value={true}>{Dictionary.reminders.showNew}</Radio>
          <Radio value={false}>{Dictionary.reminders.showAll}</Radio>
        </Radio.Group>
        <DebouncedSearchInput
          onDebounced={text => {
            filterPatients(text);
            setSearchQuery(text);
          }}
          delay={250}
        />
      </Space>
      <ReminderTable
        searchText={searchQuery}
        isFetching={isFetching}
        reminders={filteredReminders.map(reminder => ({ ...reminder, key: reminder.treatmentId }))}
      />
    </div>
  );
};

export default ReminderContainer;
