import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'antd';

import Dictionary from 'dictionary/dictionary';

import './backButton.scss';

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = () => {
  const history = useHistory();

  const handleBackClicked = () => history.goBack();

  return (
    <PageHeader
      className='page-header'
      onBack={handleBackClicked}
      title={
        <div className='back-text' onClick={handleBackClicked}>
          {Dictionary.back}
        </div>
      }
    />
  );
};

export default BackButton;
