import React from 'react';
import { useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';

import HeaderDropdown from 'components/headerDropdown/headerDropdown';
import { routes } from 'components/router/routes';
import AuthService from 'services/authService';

interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

interface AvatarDropdownProps {}

const AvatarDropdown: React.FC<AvatarDropdownProps> = () => {
  const history = useHistory();

  const handleLogout = () => {
    AuthService.removeTokens();
    history.push(routes.login);
  };

  const onMenuClick = (event: MenuInfo) => {
    if (event.key === 'logout') handleLogout();
  };

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key='logout'>
        <LogoutOutlined />
        יציאה
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='avatar-dropdown'>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`action account`}>
          <Avatar
            size='small'
            className='avatar'
            src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            alt='avatar'
          />
          <span>{AuthService.getAccessTokenData()?.username}</span>
        </span>
      </HeaderDropdown>
    </div>
  );
};

export default AvatarDropdown;
