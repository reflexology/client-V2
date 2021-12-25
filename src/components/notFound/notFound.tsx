import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import Dictionary from 'dictionary/dictionary';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status='404'
      title={Dictionary.notFound.title}
      subTitle={Dictionary.notFound.subTitle}
      extra={
        <Button onClick={() => navigate('/')} type='primary'>
          {Dictionary.notFound.backButton}
        </Button>
      }
    />
  );
};

export default NotFound;
