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

const EditSignupPayloadDrone = ({ history }) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyleEdit>
      <div className="searchtype">
        <a onClick={() => history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> <a onClick={() => history.push('/edit-signup-payload-drone')}>Chỉnh sửa đăng ký</a>
      </div>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h3 className="searchtype"  >Thông tin đăng ký</h3>
        <Form.Item
          label="Thời gian"
          name="time"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <DatePicker/>
          </Form.Item>
        <Form.Item
            label="Loại thiết bị"
            name="payloadId"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Select>
                <option value="camera">Camera</option>
                <option value="micro">Micro</option>
                <option value="sensor">Sensor</option>
            </Select>
                
            
        </Form.Item>
        <Form.Item
          label="Payload"
          name="payloadId"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Select>
                <option>Payload 1</option>
                <option>Payload 2</option>
                <option>Payload 3</option>

            </Select>
          
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Select>
              <option>Hoạt động</option>
              <option>Không hoạt động</option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="status"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <TextArea/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Cập nhật
        </Button>
        </Form.Item>
      </Form>
    </StyleEdit>
  );
};
export default EditSignupPayloadDrone;