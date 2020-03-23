import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Popover } from 'antd';
import {
  TeamOutlined,
  BellOutlined,
  DollarCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import Dictionary from 'dictionary/dictionary';
import { useHistory } from 'react-router-dom';
import { routes } from 'components/router/routes';
import './sidebar.scss';
import UserPopoverContent from './userPopoverContent';
import AuthService from 'services/authService';

const { Header, Content, Sider } = Layout;
const collapsedKey = 'sidePanel';

const Sidebar: React.FC<any> = props => {
  const [collapsed, setCollapsed] = useState(localStorage.getItem(collapsedKey) === 'collapsed');
  const history = useHistory();
  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => localStorage.setItem(collapsedKey, collapsed ? 'collapsed' : 'expanded'), [collapsed]);

  return AuthService.isAuthorized() ? (
    <Layout dir='rtl' className='layout-container'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' style={{ borderLeft: 'none' }}>
          <Menu.Item key='1' onClick={() => history.push(routes.patients)}>
            <TeamOutlined />
            <span>{Dictionary.sidebar.patients}</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <BellOutlined />
            <span>{Dictionary.sidebar.reminders}</span>
          </Menu.Item>
          <Menu.Item key='3'>
            <DollarCircleOutlined />
            <span>{Dictionary.sidebar.incomeAndExpense}</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='header'>
          <div className='right'>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle
            })}
          </div>
          <div className='left'>
            <Popover placement='bottomLeft' content={<UserPopoverContent />} trigger='click'>
              <Avatar size='large' className='header-user-avatar'>
                {AuthService.getAccessTokenData()?.username.charAt(0).toUpperCase()}
              </Avatar>
            </Popover>
          </div>
        </Header>
        <Content className='content'>{props.children}</Content>
      </Layout>
    </Layout>
  ) : (
    (props.children as any)
  );
};

export default React.memo(Sidebar);
