import React from 'react';
import { Col, Image, Row } from 'antd';
import StyleLogin from './index.style';
import { IMAGES } from '../../constants';
import LoginForm from '../../containers/LoginForm';

const Login = () => {
  return (
    <StyleLogin>
      <Row justify='center' align='middle' className='login-row'>
        <Col span={15}>
          <Row className='login-container'>
            <Col span={12}>
              <Image src={IMAGES.drone} height='100%' />
            </Col>
            <Col className='login-form' span={12}>
              <LoginForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </StyleLogin>
  );
};

export default Login;
