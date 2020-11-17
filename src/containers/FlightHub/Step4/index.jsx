import React, { useEffect } from 'react';
import StyleStep4 from './index.style';
import { Button, Col, Form, Input, Select, Row, message, Modal } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { convertTimeRangeToData } from '../services';
import { useHistory } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const Step4 = ({ prevStep, data, handleChangeData }) => {
  const history = useHistory();

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const goBack = () => {
    history.goBack();
  };
  const saved = () => {
    message.success('Lưu thành công');
    goBack();
  };

  const handleCreate = (dataSubmit) => () => {
    console.log({ dataSubmit });
    saved();
  };

  const submitConfirm = (dataSubmit) => {
    const { name } = dataSubmit;
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Bạn có muốn tạo đợi giám sát <strong>{name}</strong>?
        </span>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: handleCreate(dataSubmit),
    });
  };

  const onFinish = (values) => {
    handleChangeData(values);
    const { timeRange } = data;
    const timeRangeDate = convertTimeRangeToData(timeRange);
    delete data.timeRange;
    const dataSubmit = { ...data, ...timeRangeDate, ...values };
    submitConfirm(dataSubmit);
  };

  return (
    <StyleStep4>
      <Form
        {...LAYOUT}
        form={form}
        name="flight-hub-storage"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
      >
        <Form.Item
          name="mechanism"
          label="Cơ chế thu thập"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn cơ chế thu thập">
            <Option value="manually">Thủ công</Option>
            <Option value="auto">Tự động</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="metadataType"
          label="Dạng lưu trữ"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn dạng lưu trữ">
            <Option value="photo">Hình ảnh</Option>
            <Option value="video">Video</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="resolution"
          label="Độ phân giải"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn độ phân giải">
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
            placeholder="Để lại lời nhắn..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Col offset={6}>
          <Row>
            <Button type="default" onClick={prevStep}>
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep4>
  );
};

export default Step4;
