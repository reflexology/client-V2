import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import AvatarDropdown from './avatarDropdown';
import './topbar.scss';
import Reminders from './reminders';

interface TopbarProps {
  collapsed: boolean;
  toggle: () => void;
}

const Topbar: React.FC<TopbarProps> = props => {
  return (
    <Layout.Header className='topbar-container header'>
      <div className='right'>
        {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: props.toggle
        })}
      </div>
      <div className='left'>
        <Reminders />
        <AvatarDropdown />
      </div>
    </Layout.Header>
  );
};

export default Topbar;
