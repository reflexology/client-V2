import React, { useState, useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import { CheckOutlined, UserAddOutlined } from '@ant-design/icons';
import PatientService, { Patient } from 'services/patientService';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
// import Highlighter from 'react-highlight-words';
import Dictionary from 'dictionary/dictionary';
import { RouteComponentProps } from 'react-router-dom';
import { routes } from 'components/router/routes';
import TableUtils from 'utils/tableUtils';

// const getColumnSearchProps = (dataIndex: string): ColumnType<any> => ({
//   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//     <div style={{ padding: 8 }}>
//       <Input
//         ref={node => {
//           this.searchInput = node;
//         }}
//         placeholder={`Search ${dataIndex}`}
//         value={selectedKeys[0]}
//         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//         onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//         style={{ width: 188, marginBottom: 8, display: 'block' }}
//       />
//       <Button
//         type='primary'
//         onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//         icon={<SearchOutlined />}
//         size='small'
//         style={{ width: 90, marginRight: 8 }}
//       >
//         Search
//       </Button>
//       <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
//         Reset
//       </Button>
//     </div>
//   ),
//   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//   onFilter: (value, record) =>
//     record[dataIndex]
//       .toString()
//       .toLowerCase()
//       .includes(value.toLowerCase()),
//   onFilterDropdownVisibleChange: visible => {
//     if (visible) {
//       setTimeout(() => this.searchInput.select());
//     }
//   },
//   render: text =>
//     this.state.searchedColumn === dataIndex ? (
//       <Highlighter
//         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//         searchWords={[this.state.searchText]}
//         autoEscape
//         textToHighlight={text.toString()}
//       />
//     ) : (
//       text
//     )
// });
const tableUtils = new TableUtils<Patient>();
const columns: ColumnsType<Patient> = [
  tableUtils.getStringColumn(Dictionary.patient.lastName, 'lastName'),
  tableUtils.getStringColumn(Dictionary.patient.firstName, 'firstName'),
  tableUtils.getStringColumn(Dictionary.patient.monName, 'momName'),
  tableUtils.getNumberColumn(Dictionary.patient.age, 'calculatedAge'),
  tableUtils.getStringColumn(Dictionary.patient.phone, 'phone'),
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

interface IPatientContainerProps extends RouteComponentProps {}

const PatientContainer: React.FC<IPatientContainerProps> = props => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    PatientService.getPatients()
      .then(setPatients)
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <div>
      <Button icon={<UserAddOutlined />} onClick={() => props.history.push(routes.addPatient)}>
        הוסף לקוח
      </Button>
      <Table<Patient> pagination={{ pageSize: 8 }} loading={isFetching} columns={columns} dataSource={patients} />
    </div>
  );
};
export default PatientContainer;
