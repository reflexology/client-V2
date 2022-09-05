import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from 'antd';

import Dictionary from 'dictionary/dictionary';

import './backButton.scss';

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = () => {
  const navigate = useNavigate();

  const handleBackClicked = () => navigate(-1);

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
