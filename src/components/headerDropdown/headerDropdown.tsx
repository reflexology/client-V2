import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';

import './headerDropdown.scss';

export interface HeaderDropdownProps extends DropDownProps {}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown trigger={['click']} overlayClassName={'dropdown-container ' + cls} {...restProps} />
);

export default HeaderDropdown;
