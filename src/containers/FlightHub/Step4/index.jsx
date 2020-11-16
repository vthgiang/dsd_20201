import React from 'react';
import StyleStep4 from './index.style';
import {
  Button,
  Col,
  Form,
  Input,
  Select,
  Row,
  Popconfirm,
  message,
} from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';

const { Option } = Select;
const { TextArea } = Input;

const Step4 = ({ nextStep, prevStep, handleChangeData }) => {
  const onFinish = (values) => {
    handleChangeData(values);
  };

  const save = () => {
    message.success('Lưu thành công');
  };
  return (
    <StyleStep4>
      <Form
        {...LAYOUT}
        name="flight-hub-name"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
      >
        <Form.Item
          name="mechanism"
          label="Cơ chế thu thập"
          rules={[{ type: 'string', required: true }]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Chọn cơ chế thu thập"
          >
            <Option value="manually">Thủ công</Option>
            <Option value="auto">Tự động</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="metadataType"
          label="Dạng lưu trữ"
          rules={[{ type: 'string', required: true }]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Chọn dạng lưu trữ"
          >
            <Option value="photo">Hình ảnh</Option>
            <Option value="video">Video</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="resolution"
          label="Độ phân giải"
          rules={[{ type: 'string', required: true }]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Chọn độ phân giải"
          >
            <Option value="480p">480p</Option>
            <Option value="720p">720p</Option>
            <Option value="1080p">1080p</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="attachParams"
          label="Tham số đính kèm"
          rules={[{ type: 'array', required: true }]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            mode="tags"
            placeholder="Chọn Các tham số đính kèm"
          >
            <Option value="uav_source">Nguồn UAV</Option>
            <Option value="time">Thời gian</Option>
            <Option value="coordinate">Tọa độ</Option>
            <Option value="location">Vị trí</Option>
            <Option value="journeys">Hành trình</Option>
            <Option value="weather">Thời tiết</Option>
            <Option value="temperature">Nhiệt độ</Option>
            <Option value="humidity">Độ ẩm</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Ghi chú"
          rules={[{ type: 'string', required: false }]}
        >
          <TextArea
            placeholder="Gõ vào đây bất cứ ghi chú nào bạn muốn nhắn nhủ..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Col offset={6}>
          <Row>
            <Button type="default" onClick={prevStep}>
              {'<< quay lại'}
            </Button>
            &ensp;
            <Popconfirm
              title="Bạn có chắc chắn muốn lưu không?"
              onConfirm={save}
              // onCancel={cancel}
              okText="Lưu"
              cancelText="Hủy"
            >
              <Button type="primary" htmlType="submit">
                {'Lưu'}
              </Button>
            </Popconfirm>
          </Row>
        </Col>
      </Form>
    </StyleStep4>
  );
};

export default Step4;
