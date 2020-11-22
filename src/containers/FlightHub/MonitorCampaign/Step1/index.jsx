import React, { useEffect } from 'react';
import StyleStep1 from './index.style';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import { DATE_TIME_FORMAT } from '../../../../configs';
import { StepForwardOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const Step1 = ({ nextStep, data, handleChangeData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  return (
    <StyleStep1>
      <Form
        {...LAYOUT}
        form={form}
        name="flight-hub-name"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
        initialValues={data}
      >
        <Form.Item
          name="name"
          label="Tên đợt giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Input placeholder="VD: Đọt giám sát rừng phòng hộ quý 1"></Input>
        </Form.Item>
        <Form.Item
          name="timeRange"
          label="Thời gian"
          rules={[
            {
              type: 'array',
              required: true,
            },
          ]}
        >
          <RangePicker showTime format={DATE_TIME_FORMAT} />
        </Form.Item>

        <Col offset={6}>
          <Row>
            <Button
              icon={<StepForwardOutlined />}
              type="primary"
              htmlType="submit"
            >
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep1>
  );
};

export default Step1;
