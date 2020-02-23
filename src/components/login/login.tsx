import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import Dictionary from 'dictionary/dictionary';
import AuthService from 'services/authService';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosError } from 'axios';
import CommonService from 'services/commonService';

interface Props extends RouteComponentProps {}

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC<Props> = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };

  const onFinish = (values: any) => {
    setIsFetching(true);
    AuthService.login(values)
      .then(tokens => {
        AuthService.storeTokens(tokens);
        props.history.push('/');
      })
      .catch((err: AxiosError) => setError(CommonService.getErrorMessage(err)));
  };
  console.log('render');

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
