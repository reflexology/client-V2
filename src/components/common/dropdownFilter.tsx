import React from 'react';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

interface Option<T> {
  label: string;
  value: T;
}

interface DropdownFilterProps<T = any> {
  onSelect: (option: Option<T>) => void;
  options: Option<T>[];
  selectedOption: Option<T>;
  isLoading: boolean;
}

const DropdownFilter = <T extends React.Key>(props: DropdownFilterProps<T>) => {
  const menu = (
    <Menu
      items={props.options.map(option => ({
        key: option.value,
        onClick: () => (props.selectedOption.value !== option.value ? props.onSelect(option) : null),
        label: option.label
      }))}
    />
  );

  return (
    <Dropdown trigger={['click']} overlay={menu}>
      <Button>
        {props.isLoading && <LoadingOutlined />}
        {props.selectedOption.label}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownFilter;
