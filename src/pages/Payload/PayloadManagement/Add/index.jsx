import React, { useState } from 'react';
import { Form, Input, Button, Select} from 'antd';
import StyleEdit from '../Edit/index.style';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddPayload = ({ history }) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyleEdit>
      <div className="searchtype">
        <a onClick={() => history.push('/payload-management')}>Quản lý Payload</a> <span>/</span> <a onClick={() => history.push('/add-payload')}>Thêm Payload</a>
      </div>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3 className="searchtype"  >Thông tin chi tiết</h3>
        <Form.Item
          label="Tên"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại"
          name="tilting"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="zooming"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="zooming"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
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
    </StyleEdit>
  );
};
export default AddPayload;