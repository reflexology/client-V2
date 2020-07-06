import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import { AxiosError } from 'axios';

import Dictionary from 'dictionary/dictionary';
import AuthService from 'services/authService';
import CommonService from 'services/commonService';

import './login.scss';

interface Props extends RouteComponentProps<any, any, { from: string }> {}

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC<Props> = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const onFinish = (values: any) => {
    setIsFetching(true);

    AuthService.login(values)
      .then(tokens => {
        AuthService.storeTokens(tokens);
        props.history.push(props.location.state?.from || '/');
      })
      .catch((err: AxiosError) => {
        setError(CommonService.getErrorMessage(err));
        setIsFetching(false);
      });
  };

  return (
    <Row align='middle' justify='center' className='login-container'>
      <Col span={22} sm={20} md={14} lg={9}>
        <img src='' alt='' />
        <div className='login-card'>
          <div className='header-wrapper'>
            <h2>{Dictionary.login.header}</h2>
          </div>

          <Form onFinish={onFinish} size='large'>
            <Form.Item name='username' rules={[{ required: true, message: Dictionary.login.usernameRequiredMessage }]}>
              <Input autoFocus placeholder={Dictionary.login.username} />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: Dictionary.login.passwordRequiredMessage }]}>
              <Input.Password placeholder={Dictionary.login.password} />
            </Form.Item>

            {error && <Alert className='login-error' message={error} type='error' showIcon />}

            <Form.Item>
              <Button block loading={isFetching} type='primary' htmlType='submit'>
                {Dictionary.login.submitButton}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
