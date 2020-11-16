import React from 'react';
import StyleStep1 from './index.style';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';

const { RangePicker } = DatePicker;

const Step1 = ({ nextStep, preStep, data, handleChangeData }) => {
  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };
  return (
    <StyleStep1>
      <Form
        {...LAYOUT}
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
          <Input></Input>
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
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Col offset={6}>
          <Row>
            <Button type="primary" htmlType="submit">
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep1>
  );
};

export default Step1;
