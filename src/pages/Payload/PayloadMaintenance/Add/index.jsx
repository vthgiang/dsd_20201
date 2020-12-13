import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker} from 'antd';
import StyleEdit from '../index.style';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

const AddSchedule = ({ history }) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyleEdit>
      <div className="searchtype">
        <a onClick={() => history.push('/payload-maintenance')}>Lịch bảo dưỡng Payload</a> <span>/</span> <a onClick={() => history.push('/edit-payload')}>Thêm lịch bảo dưỡng</a>
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
          label="Thời gian"
          name="time"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <DatePicker/>
        </Form.Item>

        <Form.Item
          label="Địa điểm"
          name="location"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Payload"
          name="payloadId"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Select>
          </Select>
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="status"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <TextArea/>
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
export default AddSchedule;