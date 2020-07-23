import React from 'react';
import { Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import AuthService from 'services/authService';
import { useHistory } from 'react-router-dom';
import { routes } from 'components/router/routes';
import HeaderDropdown from 'components/headerDropdown/headerDropdown';

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
    <Menu
      // className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
    >
      <Menu.Item key='center'>
        <UserOutlined />
        פרטי משתמש
      </Menu.Item>

      <Menu.Divider />

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
