import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { DATE_FORMAT } from './constants';

class TableUtils<T extends { [key: string]: any }> {
  formats = [moment.ISO_8601, DATE_FORMAT];

  getColumn = (title: string, dataIndex: string): ColumnType<T> => ({
    title,
    dataIndex,
    key: dataIndex
  });

  getStringColumn = (title: string, dataIndex: keyof T, rest?: ColumnType<T>): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a: any, b: any) => a[dataIndex]?.localeCompare(b[dataIndex], 'he'),
    sortDirections: ['descend', 'ascend'],
    ...rest
  });

  getBooleanColumn = (title: string, dataIndex: keyof T, rest?: ColumnType<T>): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a: any, b: any) => (!!a[dataIndex] ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  });

  getNumberColumn = (title: string, dataIndex: keyof T, rest?: ColumnType<T>): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a: any, b: any) => (!a[dataIndex] ? -1 : a[dataIndex] - b[dataIndex]),
    sortDirections: ['descend', 'ascend']
  });

  getDateColumn = (title: string, dataIndex: keyof T, rest?: ColumnType<T>): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a, b) => {
      if (!a[dataIndex]) return -1;
      if (!b[dataIndex]) return 1;
      if (new Date(a[dataIndex] as any) > new Date(b[dataIndex] as any)) return 1;
      else if (new Date(a[dataIndex] as any) < new Date(b[dataIndex] as any)) return -1;
      else return 0;
    },
    sortDirections: ['descend', 'ascend']
  });

  filter = (obj: T, searchQuery: string, excludedFields: (keyof T)[]): boolean => {
    for (const name in obj) {
      if (excludedFields.includes(name)) continue;

      if (Array.isArray(obj[name])) {
        return this.filter(obj[name][0], searchQuery, excludedFields);
      }

      const date = moment(obj[name], this.formats, true);
      if (date.isValid()) {
        const formattedDate = date.format(DATE_FORMAT);

        if (formattedDate.toString().includes(searchQuery)) return true;
        else continue;
      } else if (obj[name]?.toString().toLowerCase().includes(searchQuery)) return true;
    }
    return false;
  };
}

export default TableUtils;
