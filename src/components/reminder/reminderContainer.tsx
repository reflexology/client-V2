import { Col, Row } from 'antd';
import DebouncedSearchInput from 'components/common/debouncedSearchInput';
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

  useEffect(() => {
    ReminderService.getReminders()
      .then(setReminders)
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => setFilteredReminders(reminders), [reminders]);

  const filterPatients = (search: string) =>
    setFilteredReminders(reminders.filter(patient => tableUtils.filter(patient, search, ['treatmentId'])));

  return (
    <div className='reminders-container'>
      <Row>
        <Col>
          <DebouncedSearchInput
            onDebounced={text => {
              filterPatients(text);
              setSearchQuery(text);
            }}
            delay={250}
          />
        </Col>
      </Row>
      <ReminderTable
        searchText={searchQuery}
        isFetching={isFetching}
        reminders={filteredReminders.map(reminder => ({ ...reminder, key: reminder.treatmentId }))}
      />
    </div>
  );
};

export default ReminderContainer;
