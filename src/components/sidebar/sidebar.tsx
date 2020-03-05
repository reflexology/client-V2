import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
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

const { Header, Content, Sider } = Layout;
const collapsedKey = 'sidePanel';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(localStorage.getItem(collapsedKey) === 'collapsed');
  const history = useHistory();
  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => localStorage.setItem(collapsedKey, collapsed ? 'collapsed' : 'expanded'), [collapsed]);

  return (
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
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
        </Header>
        <Content className='content'>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
