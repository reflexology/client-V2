import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import DiagnosisService from 'services/diagnosesService';
import { Patient } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils, { WithKey } from 'utils/tableUtils';

interface PatientsTableProps {
  isFetching: boolean;
  patients: WithKey<Patient>[];
  searchText: string;
}

const PatientsTable: React.FC<PatientsTableProps> = props => {
  const history = useHistory();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);

  useEffect(() => {
    DiagnosisService.getDiagnoses()
      .then(setDiagnoses)
      .catch(() => message.error(Dictionary.treatmentForm.errorFetchingDiagnoses));
  }, []);

  const tableUtils = new TableUtils<Patient>(props.searchText);
  const columns: ColumnsType<Patient> = [
    tableUtils.getStringColumn(Dictionary.patientForm.lastName, 'lastName'),
    tableUtils.getStringColumn(Dictionary.patientForm.firstName, 'firstName'),
    tableUtils.getStringColumn(Dictionary.patientForm.momName, 'momName'),
    tableUtils.getNumberColumn(Dictionary.patientForm.age, 'calculatedAge', {
      render: (calculatedAge, patient) =>
        patient.birthday ? (
          <Tooltip title={moment(patient.birthday).format(DATE_FORMAT)}>{calculatedAge}</Tooltip>
        ) : (
          calculatedAge
        )
    }),
    tableUtils.getStringColumn(Dictionary.patientForm.phone, 'phone'),
    tableUtils.getBooleanColumn(Dictionary.patientForm.email, 'email', {
      render: email =>
        email ? (
          <CheckOutlined
            className='email-check'
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard.writeText(email);
            }}
          />
        ) : null
    }),
    tableUtils.getDateColumn(Dictionary.patientForm.lastTreatment, 'lastTreatment'),
    tableUtils.getColumn(Dictionary.patientForm.diagnoses, 'diagnoses', {
      filters: diagnoses?.map(diagnosis => ({ value: diagnosis, text: diagnosis })),
      onFilter: (value, record) => !!record.diagnoses?.includes(value.toString()),
      render: (diagnoses: string[]) => (
        <div className='diagnoses-container'>
          {diagnoses?.map(diagnosis => (
            <Tag color='green' key={diagnosis}>
              {diagnosis.toUpperCase()}
            </Tag>
          ))}
        </div>
      )
    }),
    tableUtils.getNumberColumn(Dictionary.patientContainer.balance, 'balance', {
      render: balance => (balance ? <span className={balance > 0 ? 'credit' : 'debt'}>{balance}</span> : null)
    }),

    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, patient: Patient) => (
        <span>
          <Button
            onClick={e => {
              e.stopPropagation();
              history.push(routes.addTreatment.format(patient._id));
            }}
            type='link'
          >
            הוסף טיפול
          </Button>
          <Button
            onClick={e => {
              e.stopPropagation();
              history.push(routes.editPatient.format(patient._id), { patient });
            }}
            type='link'
          >
            ערוך
          </Button>
        </span>
      )
    }
  ];

  return (
    <Table<Patient>
      pagination={{ pageSize: 7, showSizeChanger: false }}
      onRow={record => ({ onClick: () => history.push(routes.treatments.format(record._id)) })}
      loading={props.isFetching}
      showSorterTooltip={false}
      columns={columns}
      dataSource={props.patients}
      scroll={{ x: 'max-content' }}
      rowClassName='clickable'
    />
  );
};

export default React.memo(PatientsTable);
