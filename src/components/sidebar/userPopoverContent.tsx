import { LogoutOutlined } from '@ant-design/icons';
import { routes } from 'components/router/routes';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from 'services/authService';

interface Props {}

const UserPopoverContent: React.FC<Props> = () => {
  const history = useHistory();

  const handleLogout = () => {
    AuthService.removeTokens();
    history.push(routes.login);
  };

  return (
    <div className='user-popover-content'>
      <button onClick={handleLogout} className='popover-button'>
        <LogoutOutlined rotate={180} />
        <span className='popover-text'>{Dictionary.sidebar.logout}</span>
      </button>
    </div>
  );
};

export default UserPopoverContent;
