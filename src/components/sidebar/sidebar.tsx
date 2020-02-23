import React, { useState } from 'react';
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

const { Header, Content, Sider } = Layout;

interface Props {}

const Sidebar: React.FC<Props> = props => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout dir='rtl' style={{ minHeight: '100vh' }}>
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
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0, backgroundColor: '#f0f2f' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
