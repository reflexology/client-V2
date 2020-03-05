import React from 'react';
import Dictionary from 'dictionary/dictionary';
import { LogoutOutlined } from '@ant-design/icons';
import AuthService from 'services/authService';
import { useHistory } from 'react-router-dom';
import { routes } from 'components/router/routes';

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
