import { CheckOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
import { Patient } from 'services/patientService';
import { DATE_FORMAT } from 'utils/constants';
import TableUtils from 'utils/tableUtils';

interface PatientsTableProps {
  isFetching: boolean;
  patients: Patient[];
  searchText: string;
}

const PatientsTable: React.FC<PatientsTableProps> = props => {
  const history = useHistory<Patient>();

  const getHighlighter = () => ({
    render: (text: string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[props.searchText]}
            autoEscape
            textToHighlight={moment(lastTreatment).format(DATE_FORMAT) || ''}
          />
        ) : null
    },
    {
      title: 'אבחנות',
      key: 'diagnoses',
      dataIndex: 'diagnoses',
      render: (diagnoses: string[]) => (
        <span>
          {diagnoses?.map(diagnosis => {
            let color = diagnosis.length > 5 ? 'geekblue' : 'green';
            if (diagnosis === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={diagnosis}>
                {diagnosis.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: 'פעולות',
      key: 'action',
      render: (text: string, record: Patient) => (
        <span>
          <Button onClick={() => history.push(routes.addTreatment.format(record._id))} type='link'>
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
      pagination={{ pageSize: 8 }}
      loading={props.isFetching}
      columns={columns}
      dataSource={props.patients}
    />
  );
};

export default React.memo(PatientsTable);
