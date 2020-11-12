import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import StyleLoginForm from "./index.style";
import { Typography } from "antd";
import { withRouter } from "react-router-dom";

const { Title } = Typography;

const LoginForm = ({ history }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <StyleLoginForm>
      <Title level={2}>Hệ thống giám sát bằng Drone</Title>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lưu tài khoản</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href='#'>
            Quên mật khẩu
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => history.push("/")}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </StyleLoginForm>
  );
};

export default withRouter(LoginForm);
