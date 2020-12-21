import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import StyleSetting from './index.style';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const PayloadSetting = ({ history }) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyleSetting>
      <div className="searchtype">
        <a  onClick={() => history.push('/payload-management')}>Quản lý Payload</a> <span>/</span> <a  onClick={() => history.push('/payload-configuration')}>Cấu hình Payload</a>
      </div>
      
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3 className="searchtype"  >Thông tin cấu hình</h3>
        <Form.Item
          label="Panning"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tilting"
          name="tilting"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Zooming"
          name="zooming"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </StyleSetting>
  );
};

export default PayloadSetting;
