import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DollarCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';

import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import AuthService from 'services/authService';
import Topbar from 'components/topbar/topbar';

import './sidebar.scss';
import { patientsAtom } from 'atoms/patientAtoms';
import { useSetRecoilState } from 'recoil';
import PatientService from 'services/patientService';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const collapsedKey = 'sidePanel';

const Sidebar: React.FC<any> = props => {
  const history = useHistory();
  const location = useLocation();

  const [selectedPage, setSelectedPage] = useState(
    Object.values(routes).includes(location.pathname as any) ? location.pathname : routes.patients
  );
  const [collapsed, setCollapsed] = useState(localStorage.getItem(collapsedKey) === 'collapsed');
  const toggle = () => setCollapsed(!collapsed);

  const setPatients = useSetRecoilState(patientsAtom);
  useEffect(() => localStorage.setItem(collapsedKey, collapsed ? 'collapsed' : 'expanded'), [collapsed]);

  const colSize = useBreakpoint();
  const isMobile = !colSize.xl && !colSize.md && !colSize.md && !colSize.xxl;

  useEffect(() => {
    if (isMobile && !collapsed) setCollapsed(true);
  }, [isMobile]);

  const SideMenu = () => (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint='lg'
      width={208}
      style={{
        overflow: 'hidden'
      }}
      collapsedWidth={isMobile ? 0 : 80}
    >
      <div className='logo' />
      <Menu
        theme='dark'
        selectedKeys={[selectedPage]}
        onSelect={e => setSelectedPage(e.key as routes)}
        mode='inline'
        style={{ borderLeft: 'none' }}
      >
        <Menu.Item
          key={routes.patients}
          onClick={() => {
            PatientService.getPatients().then(setPatients);
            history.push(routes.patients);
          }}
        >
          <TeamOutlined />
          <span>{Dictionary.sidebar.patients}</span>
        </Menu.Item>
        <Menu.Item key={routes.transactions} onClick={() => history.push(routes.transactions)}>
          <DollarCircleOutlined />
          <span>{Dictionary.sidebar.incomeAndExpense}</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );

  return AuthService.isAuthorized() ? (
    <Layout className='layout-container'>
      {isMobile ? (
        <Drawer
          closeIcon={<></>}
          visible={!collapsed}
          placement='right'
          onClose={() => toggle()}
          getContainer={false}
          style={{ padding: 0 }}
          width={208}
          bodyStyle={{ height: '100vh', padding: 0, display: 'flex', flexDirection: 'row' }}
        >
          <SideMenu />
        </Drawer>
      ) : (
        <SideMenu />
      )}

      <Layout>
        <Topbar collapsed={collapsed} toggle={toggle} />
        <Layout.Content className='content'>{props.children}</Layout.Content>
      </Layout>
    </Layout>
  ) : (
    props.children
  );
};

export default React.memo(Sidebar);
