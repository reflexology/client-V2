import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DollarCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Location } from 'history';
import { useSetRecoilState } from 'recoil';

import { patientsAtom } from 'atoms/patientAtoms';
import { routes } from 'components/router/routes';
import Topbar from 'components/topbar/topbar';
import Dictionary from 'dictionary/dictionary';
import AuthService from 'services/authService';
import CommonService from 'services/commonService';
import PatientService from 'services/patientService';

import './sidebar.scss';

const collapsedKey = 'sidePanel';

const Sidebar: React.FC<any> = props => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedPage = (location: Location) => location.pathname;

  const [selectedPage, setSelectedPage] = useState(getSelectedPage(location));

  useEffect(() => {
    setSelectedPage(getSelectedPage(location));
  }, [location]);

  const [collapsed, setCollapsed] = useState(localStorage.getItem(collapsedKey) === 'collapsed');
  const toggle = () => setCollapsed(!collapsed);

  const setPatients = useSetRecoilState(patientsAtom);
  useEffect(() => localStorage.setItem(collapsedKey, collapsed ? 'collapsed' : 'expanded'), [collapsed]);

  const colSize = useBreakpoint();
  const isMobile = CommonService.isNotEmpty(colSize) && !colSize.xl && !colSize.md && !colSize.xxl;

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
      style={{ overflow: 'hidden' }}
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
            navigate(routes.patients);
          }}
        >
          <TeamOutlined />
          <span>{Dictionary.sidebar.patients}</span>
        </Menu.Item>
        <Menu.Item key={routes.transactions} onClick={() => navigate(routes.transactions)}>
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
        <Layout.Content className='content'>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Outlet />
  );
};

export default React.memo(Sidebar);
