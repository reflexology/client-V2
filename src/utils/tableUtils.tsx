import React from 'react';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';

import { DATE_FORMAT, VALID_DATE_FORMATS } from './constants';

export type WithKey<T> = T & {
  key: string;
};

export type ColumnConfig<T, Type> = ColumnType<T> & {
  formatHighlighter?: (value: Type) => string;
};

class TableUtils<T extends Record<string, any>> {
  constructor(private textToHighlight: string) {}

  getColumn = (title: string, dataIndex: string, columnConfig?: ColumnConfig<T, any>): ColumnType<T> => {
    const column: ColumnType<T> = {
      title,
      dataIndex,
      key: dataIndex,
      ...columnConfig
    };

    if (!columnConfig?.render)
      column.render = (text: string | number) => {
        return text ? (
          <Highlighter
            highlightClassName='highlighted-text'
            searchWords={[this.textToHighlight]}
            autoEscape
            textToHighlight={
              columnConfig?.formatHighlighter ? columnConfig.formatHighlighter(text) : text.toString() || ''
            }
          />
        ) : null;
      };

    return column;
  };

  getStringColumn = (title: string, dataIndex: keyof T, columnConfig?: ColumnConfig<T, string>): ColumnType<T> => ({
    sorter: (a, b) => (a[dataIndex] as string)?.localeCompare(b[dataIndex], 'he'),
    sortDirections: ['descend', 'ascend'],
    ...this.getColumn(title, dataIndex as string, columnConfig)
  });

  getBooleanColumn = (title: string, dataIndex: keyof T, columnConfig?: ColumnConfig<T, boolean>): ColumnType<T> => ({
    sorter: (a, b) => (!!a[dataIndex] ? 1 : -1),
    sortDirections: ['descend', 'ascend'],
    ...this.getColumn(title, dataIndex as string, columnConfig)
  });

  getNumberColumn = (title: string, dataIndex: keyof T, columnConfig?: ColumnConfig<T, number>): ColumnType<T> => ({
    sorter: (a, b) => (!a[dataIndex] ? -1 : a[dataIndex] - b[dataIndex]),
    sortDirections: ['descend', 'ascend'],
    ...this.getColumn(title, dataIndex as string, columnConfig)
  });

  getDateColumn = (title: string, dataIndex: keyof T, columnConfig?: ColumnConfig<T, string>): ColumnType<T> => ({
    sorter: (a, b) => {
      if (!a[dataIndex]) return -1;
      if (!b[dataIndex]) return 1;
      if (new Date(a[dataIndex]) > new Date(b[dataIndex])) return 1;
      else if (new Date(a[dataIndex]) < new Date(b[dataIndex])) return -1;
      else return 0;
    },
    sortDirections: ['descend', 'ascend'],
    ...this.getColumn(title, dataIndex as string, {
      formatHighlighter: date => moment(date).format(DATE_FORMAT),
      ...columnConfig
    })
  });

  static filter = <T extends Record<string, any>>(
    obj: T,
    searchQuery: string,
    fieldsToFilter: (keyof T)[]
  ): boolean => {
    for (const name in obj) {
      if (!fieldsToFilter.includes(name)) continue;
      if (Array.isArray(obj[name])) return TableUtils.filter<T>(obj[name][0], searchQuery, fieldsToFilter); // TODO return value

      const date = moment(obj[name], VALID_DATE_FORMATS, true);

      if (date.isValid()) {
        const formattedDate = date.format(DATE_FORMAT);

        if (formattedDate.toString().includes(searchQuery)) return true;
      } else if (obj[name]?.toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
    }
    return false;
  };
}

export default TableUtils;
