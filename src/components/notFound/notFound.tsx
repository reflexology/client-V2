import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Result } from 'antd';

import Dictionary from 'dictionary/dictionary';

interface Props extends RouteComponentProps {}

const NotFound: React.FC<Props> = props => (
  <Result
    status='404'
    title={Dictionary.notFound.title}
    subTitle={Dictionary.notFound.subTitle}
    extra={
      <Button onClick={() => props.history.push('/')} type='primary'>
        {Dictionary.notFound.backButton}
      </Button>
    }
  />
);

export default NotFound;
