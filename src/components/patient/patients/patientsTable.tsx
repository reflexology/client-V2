import { CheckOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory<Patient>();
  const [diagnoses, setDiagnoses] = useState<string[] | null>(null);

  useEffect(() => {
    DiagnosisService.getDiagnoses()
      .then(setDiagnoses)
      .catch(() => message.error(Dictionary.treatmentForm.errorFetchingDiagnoses));
  }, []);

  const getHighlighter = () => ({
    render: (text: string) => (
      <Highlighter
        highlightClassName='highlighted-text'
        searchWords={[props.searchText]}
        autoEscape
        textToHighlight={text || ''}
      />
    )
  });

  const tableUtils = new TableUtils<Patient>();
  const columns: ColumnsType<Patient> = [
    {
      ...tableUtils.getStringColumn(Dictionary.patientForm.lastName, 'lastName', getHighlighter())
    },
    tableUtils.getStringColumn(Dictionary.patientForm.firstName, 'firstName', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.patientForm.momName, 'momName', getHighlighter()),
    tableUtils.getNumberColumn(Dictionary.patientForm.age, 'calculatedAge', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.patientForm.phone, 'phone', getHighlighter()),
    {
      ...tableUtils.getBooleanColumn(Dictionary.patientForm.email, 'email'),

      render: email =>
        email ? <CheckOutlined className='email-check' onClick={() => navigator.clipboard.writeText(email)} /> : null
    },
    {
      ...tableUtils.getDateColumn(Dictionary.patientForm.lastTreatment, 'lastTreatment'),
      render: lastTreatment =>
        lastTreatment ? (
          <Highlighter
            highlightClassName='highlighted-text'
            searchWords={[props.searchText]}
            autoEscape
            textToHighlight={moment(lastTreatment).format(DATE_FORMAT) || ''}
          />
        ) : null
    },
    {
      title: Dictionary.patientForm.diagnoses,
      key: 'diagnoses',
      dataIndex: 'diagnoses',
      filters: diagnoses?.map(diagnosis => ({ value: diagnosis, text: diagnosis })),
      onFilter: (value, record) => {
        return record.diagnoses?.indexOf(value.toString()) === 0;
      },
      render: (diagnoses: string[]) => (
        <div className='diagnoses-container'>
          {diagnoses?.map(diagnosis => (
            <Tag color='green' key={diagnosis}>
              {diagnosis.toUpperCase()}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, record: Patient) => (
        <span>
          <Button
            onClick={e => {
              history.push(routes.addTreatment.format(record._id));
              e.stopPropagation();
            }}
            type='link'
          >
            הוסף טיפול
          </Button>
          <Button onClick={() => history.push(routes.editPatient.format(record._id), record)} type='link'>
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
      columns={columns}
      dataSource={props.patients}
    />
  );
};

export default React.memo(PatientsTable);
