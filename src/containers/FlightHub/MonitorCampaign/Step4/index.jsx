import React, { useEffect } from 'react';
import StyleStep4 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';

import { MECHANISM, METADATA_TYPES, RESOLUTION } from '../../../../constants';

const { Option } = Select;

const Step4 = ({ prevStep, nextStep, data, handleChangeData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
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
            <Button
              type="primary"
              icon={<StepForwardOutlined />}
              htmlType="submit"
            >
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep4>
  );
};

export default Step4;
