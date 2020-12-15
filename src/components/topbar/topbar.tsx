import React from 'react';
import { useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

import CurrentPatient from 'components/common/currentPatient';
import AvatarDropdown from './avatarDropdown';
import Reminders from './reminders';

import './topbar.scss';

interface TopbarProps {
  collapsed: boolean;
  toggle: () => void;
}

const Topbar: React.FC<TopbarProps> = props => {
  const location = useLocation();

  return (
    <Layout.Header className='topbar-container header'>
      <div className='right'>
        {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: props.toggle
        })}
      </div>
      <div className='center'>{location.pathname.includes('treatment') && <CurrentPatient />} </div>
      <div className='left'>
        <Reminders />
        <AvatarDropdown />
      </div>
    </Layout.Header>
  );
};

export default Topbar;
