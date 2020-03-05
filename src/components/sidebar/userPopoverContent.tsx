import React from 'react';
import Dictionary from 'dictionary/dictionary';
import { LogoutOutlined } from '@ant-design/icons';

interface Props {}

const UserPopoverContent: React.FC<Props> = () => {
  return (
    <div className='user-popover-content'>
      <button className='popover-button'>
        <LogoutOutlined rotate={180} />
        <span className='popover-text'>{Dictionary.sidebar.logout}</span>
      </button>
    </div>
  );
};

export default UserPopoverContent;
