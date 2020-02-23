import React from 'react';
import { Result, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

const NotFound: React.FC<Props> = props => (
  <Result
    status='404'
    title='404'
    subTitle='כנראה הגעת לעמוד הזה בטעות'
    extra={
      <Button onClick={() => props.history.push('/')} type='primary'>
        חזרה לדף הבית
      </Button>
    }
  />
);

export default NotFound;
