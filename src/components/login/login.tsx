import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import Dictionary from 'dictionary/dictionary';
import AuthService from 'services/authService';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosError } from 'axios';
import CommonService from 'services/commonService';

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
        props.history.push(props.location.state.from || '/');
      })
      .catch((err: AxiosError) => setError(CommonService.getErrorMessage(err)));
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form initialValues={{ username: '', password: '' }} onFinish={onFinish}>
          <Form.Item
            label={Dictionary.login.username}
            name='username'
            rules={[{ required: true, message: Dictionary.login.usernameRequiredMessage }]}
          >
            <Input autoFocus />
          </Form.Item>

          <Form.Item
            label={Dictionary.login.password}
            name='password'
            rules={[{ required: true, message: Dictionary.login.passwordRequiredMessage }]}
          >
            <Input.Password />
          </Form.Item>
          {error && <Alert message={error} type='error' showIcon />}
          <Form.Item>
            <Button loading={isFetching} type='primary' htmlType='submit'>
              {Dictionary.login.submitButton}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
