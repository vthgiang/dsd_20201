import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import StyleEdit from './index.style';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditPayload = ({ history }) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const CustomizedForm = ({ onChange, fields }) => {
  return (
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Username is required!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

  return (

    <StyleEdit>
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
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </StyleEdit>
  );
};
export default EditPayload;