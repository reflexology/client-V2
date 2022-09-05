import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';

import HeaderDropdown from 'components/headerDropdown/headerDropdown';
import { routes } from 'components/router/routes';
import AuthService from 'services/authService';

interface AvatarDropdownProps {}

const AvatarDropdown: React.FC<AvatarDropdownProps> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.removeTokens();
    navigate(routes.login);
  };

  const onMenuClick = (event: any): void => {
    if (event.key === 'logout') handleLogout();
  };

  const menuHeaderDropdown = (
    <Menu
      selectedKeys={[]}
      onClick={onMenuClick}
      items={[{ key: 'logout', icon: <LogoutOutlined />, label: 'יציאה' }]}
    />
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
