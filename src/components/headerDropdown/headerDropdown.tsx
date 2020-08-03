import { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';
import React from 'react';
import './headerDropdown.scss';

export interface HeaderDropdownProps extends DropDownProps {}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={'dropdown-container ' + cls} {...restProps} />
);

export default HeaderDropdown;
