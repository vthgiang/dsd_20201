import React, { useEffect } from 'react';
import StyleStep3 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';

const { Option } = Select;

const Step3 = ({
  nextStep,
  prevStep,
  data,
  handleChangeData,
  monitorObjects,
  monitoredZones,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  return (
    <StyleStep3>
      <Form
        {...LAYOUT}
        form={form}
        name="flight-hub-object"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
        initialValues={data}
      >
        <Form.Item
          name="monitorObjectId"
          label="Đối tượng giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select allowClear placeholder="Chọn đối tượng giám sát">
            {monitorObjects.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="monitoredZoneId"
          label="Miền giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select allowClear placeholder="Chọn miền giám sát">
            {monitoredZones.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Col offset={6}>
          <Row type="flex">
            <Button type="default" onClick={prevStep}>
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" htmlType="submit">
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep3>
  );
};

export default Step3;
