import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  BellOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Popover, List, Tabs, Badge } from 'antd';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import AuthService from 'services/authService';
import UserPopoverContent from './userPopoverContent';
import HeaderDropdown from '../headerDropdown/headerDropdown';

import './sidebar.scss';
import ReminderService, { Reminder } from 'services/reminderService';

const { Header, Content, Sider } = Layout;

const collapsedKey = 'sidePanel';

const Sidebar: React.FC<any> = props => {
  const history = useHistory();
  const location = useLocation();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([]);
  const [showNew, setShowNew] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedPage, setSelectedPage] = useState(
    Object.values(routes).includes(location.pathname as any) ? location.pathname : routes.patients
  );
  const [collapsed, setCollapsed] = useState(localStorage.getItem(collapsedKey) === 'collapsed');
  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => localStorage.setItem(collapsedKey, collapsed ? 'collapsed' : 'expanded'), [collapsed]);

  useEffect(() => {
    ReminderService.getReminders(showNew)
      .then(setReminders)
      .finally(() => setIsFetching(false));
  }, [showNew]);

  useEffect(() => setFilteredReminders(reminders), [reminders]);

  const changeShowNewReminders = () => {
    setShowNew(!showNew);
  };

  const remindersMenu = (
    <List>
      {reminders.map(r => {
        return <List.Item key={r.treatmentId}>{r.reminders}</List.Item>;
      })}
    </List>
  );

  const getNotificationBox = (): React.ReactNode => {
    return (
      <>
        <Tabs defaultActiveKey='1' onChange={changeShowNewReminders} className='reminders-tabs'>
          <Tabs.TabPane tab='תזכורות חדשות' key='1'>
            {remindersMenu}
          </Tabs.TabPane>
          <Tabs.TabPane tab='כל התזכורות' key='2'>
            {remindersMenu}
          </Tabs.TabPane>
        </Tabs>
      </>
    );
  };
  const [visible, setVisible] = useState<boolean>(false);
  const notificationBox = getNotificationBox();
  const trigger = (
    <Badge count='2' style={{ boxShadow: 'none' }} className='badge'>
      <BellOutlined className='reminder-icon' />
    </Badge>
  );

  return AuthService.isAuthorized() ? (
    <Layout className='layout-container'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          theme='dark'
          selectedKeys={[selectedPage]}
          onSelect={e => setSelectedPage(e.key as routes)}
          mode='inline'
          style={{ borderLeft: 'none' }}
        >
          <Menu.Item key={routes.patients} onClick={() => history.push(routes.patients)}>
            <TeamOutlined />
            <span>{Dictionary.sidebar.patients}</span>
          </Menu.Item>
          <Menu.Item key={routes.reminders} onClick={() => history.push(routes.reminders)}>
            <BellOutlined />
            <span>{Dictionary.sidebar.reminders}</span>
          </Menu.Item>
          <Menu.Item key={routes.transactions} onClick={() => history.push(routes.transactions)}>
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
            <HeaderDropdown
              placement='bottomRight'
              overlay={notificationBox}
              overlayClassName='reminder-popover'
              trigger={['click']}
              visible={visible}
              onVisibleChange={setVisible}
            >
              {trigger}
            </HeaderDropdown>
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
