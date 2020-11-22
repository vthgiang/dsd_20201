import React, { useEffect } from 'react';
import StyleStep4 from './index.style';
import { Button, Col, Form, Input, Select, Row, message, Modal } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import {
  ExclamationCircleOutlined,
  FormOutlined,
  StepBackwardOutlined,
} from '@ant-design/icons';
import { convertFieldValuesToDataSubmit } from '../services';
import { useHistory } from 'react-router-dom';
import {
  ATTACH_PARAMS,
  MECHANISM,
  METADATA_TYPES,
  RESOLUTION,
} from '../../../../constants';

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
    const fieldValues = { ...data, ...values };
    const dataSubmit = convertFieldValuesToDataSubmit(fieldValues);
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
            <Option value={MECHANISM.AUTO}>Tự động</Option>
            <Option value={MECHANISM.MANUALLY}>Thủ công</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="metadataType"
          label="Dạng lưu trữ"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch allowClear placeholder="Video/Ảnh">
            <Option value={METADATA_TYPES.VIDEO}>Video</Option>
            <Option value={METADATA_TYPES.PHOTO}>Ảnh</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="resolution"
          label="Độ phân giải"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn độ phân giải">
            <Option value={RESOLUTION['480p']}>480p</Option>
            <Option value={RESOLUTION['720p']}>720p</Option>
            <Option value={RESOLUTION['1080p']}>1080p</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="attachParams"
          label="Tham số đính kèm"
          rules={[{ type: 'array', required: true }]}
        >
          <Select
            allowClear
            mode="tags"
            placeholder="Chọn các tham số đính kèm"
          >
            <Option value={ATTACH_PARAMS.UAV_SOURCE}>Nguồn UAV</Option>
            <Option value={ATTACH_PARAMS.TIME}>Thời gian</Option>
            <Option value={ATTACH_PARAMS.COORDINATE}>Tọa độ</Option>
            <Option value={ATTACH_PARAMS.LOCATION}>Vị trí</Option>
            <Option value={ATTACH_PARAMS.JOURNEYS}>Hành trình</Option>
            <Option value={ATTACH_PARAMS.WEATHER}>Thời tiết</Option>
            <Option value={ATTACH_PARAMS.TEMPERATURE}>Nhiệt độ</Option>
            <Option value={ATTACH_PARAMS.HUMIDITY}>Độ ẩm</Option>
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
            <Button
              type="default"
              icon={<StepBackwardOutlined />}
              onClick={prevStep}
            >
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" icon={<FormOutlined />} htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep4>
  );
};

export default Step4;
