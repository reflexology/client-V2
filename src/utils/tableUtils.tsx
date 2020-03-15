import { ColumnType } from 'antd/lib/table';

class TableUtils<T> {
  getColumn = (title: string, dataIndex: string): ColumnType<T> => ({
    title,
    dataIndex,
    key: dataIndex
  });

  getStringColumn = (title: string, dataIndex: keyof T): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a: any, b: any) => a[dataIndex]?.localeCompare(b[dataIndex], 'he'),
    sortDirections: ['descend', 'ascend']
  });

  getBooleanColumn = (title: string, dataIndex: keyof T): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a: any, b: any) => (!!a[dataIndex] ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  });

  getNumberColumn = (title: string, dataIndex: keyof T): ColumnType<T> => ({
    ...this.getColumn(title, dataIndex as string),
    sorter: (a: any, b: any) => (!a[dataIndex] ? -1 : a[dataIndex] - b[dataIndex]),
    sortDirections: ['descend', 'ascend']
  });

  getDateColumn = (title: string, dataIndex: keyof T): ColumnType<T> => ({
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
}

export default TableUtils;
