import React, { useState, useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import PatientService, { Patient } from 'services/patientService';
import { ColumnsType, ColumnType } from 'antd/lib/table';
import moment from 'moment';
// import Highlighter from 'react-highlight-words';
import Dictionary from 'dictionary/dictionary';

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

const getStringColumn = (title: string, dataIndex: string): ColumnType<Patient> => ({
  title,
  dataIndex,
  key: dataIndex,
  sorter: (a: any, b: any) => a[dataIndex]?.localeCompare(b[dataIndex], 'he'),
  sortDirections: ['descend', 'ascend']
});

const getBooleanColumn = (title: string, dataIndex: string): ColumnType<Patient> => ({
  title,
  dataIndex,
  key: dataIndex,
  sorter: (a: any, b: any) => (!!a[dataIndex] ? 1 : -1),
  sortDirections: ['descend', 'ascend']
});

const getNumberColumn = (title: string, dataIndex: string): ColumnType<Patient> => ({
  title,
  dataIndex,
  key: dataIndex,
  sorter: (a: any, b: any) => (!a[dataIndex] ? -1 : a[dataIndex] - b[dataIndex]),
  sortDirections: ['descend', 'ascend']
});
const columns: ColumnsType<Patient> = [
  {
    title: 'שם משפחה',
    dataIndex: 'lastName',
    key: 'lastName',
    onFilter: (value, record) => record.lastName.includes(value),
    sorter: (a, b) => a.lastName?.localeCompare(b.lastName, 'he'),
    sortDirections: ['descend', 'ascend']
  },

  getStringColumn(Dictionary.patient.firstName, 'firstName'),
  getStringColumn(Dictionary.patient.monName, 'monName'),
  getNumberColumn(Dictionary.patient.age, 'calculatedAge'),
  getStringColumn(Dictionary.patient.phone, 'phone'),

  {
    ...getBooleanColumn(Dictionary.patient.email, 'email'),
    render: email => (email ? <CheckOutlined /> : null)
  },
  {
    title: 'טיפול אחרון',
    dataIndex: 'lastTreatment',
    key: 'lastTreatment',
    render: lastTreatment => (lastTreatment ? moment(lastTreatment).format('DD/MM/YYYY') : null),
    sorter: (a, b) => {
      if (!a.lastTreatment) return -1;
      if (!b.lastTreatment) return 1;
      if (new Date(a.lastTreatment!) > new Date(b.lastTreatment!)) return 1;
      else if (new Date(a.lastTreatment!) < new Date(b.lastTreatment!)) return -1;
      else return 0;
    },
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags?.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
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

interface IPatientContainerProps {}

const PatientContainer: React.FC<IPatientContainerProps> = props => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    PatientService.getPatients()
      .then(setPatients)
      .finally(() => setIsFetching(false));
  }, []);

  return <Table<Patient> pagination={{ pageSize: 8 }} loading={isFetching} columns={columns} dataSource={patients} />;
};
export default PatientContainer;
