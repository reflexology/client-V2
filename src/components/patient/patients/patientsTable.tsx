import React from 'react';
import moment from 'moment';
import { Table, Tag, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { CheckOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Patient } from 'services/patientService';
import Dictionary from 'dictionary/dictionary';
import TableUtils from 'utils/tableUtils';

interface PatientsTableProps {
  isFetching: boolean;
  patients: Patient[];
  searchText: string;
}

const PatientsTable: React.FC<PatientsTableProps> = props => {
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
      ...tableUtils.getStringColumn(Dictionary.patient.lastName, 'lastName', getHighlighter())
    },
    tableUtils.getStringColumn(Dictionary.patient.firstName, 'firstName', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.patient.monName, 'momName', getHighlighter()),
    tableUtils.getNumberColumn(Dictionary.patient.age, 'calculatedAge', getHighlighter()),
    tableUtils.getStringColumn(Dictionary.patient.phone, 'phone', getHighlighter()),
    {
      ...tableUtils.getBooleanColumn(Dictionary.patient.email, 'email'),
      render: email => (email ? <CheckOutlined /> : null)
    },
    {
      ...tableUtils.getDateColumn(Dictionary.patient.lastTreatment, 'lastTreatment'),
      render: lastTreatment => (lastTreatment ? moment(lastTreatment).format('DD/MM/YYYY') : null)
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
      render: (text: string, record: any) => (
        <span>
          <Button type='link'>הוסף טיפול</Button>
          <Button type='link'>ערוך</Button>
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
