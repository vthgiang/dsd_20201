import React, { useEffect, useState } from 'react';
import StyleStep3 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import WrappedMap from './map';

const { Option } = Select;

const Step3 = ({
  nextStep,
  prevStep,
  data,
  handleChangeData,
  monitorObjects,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  const onChangeLocation = (park) => {
    let formData = data ? data : {};
    formData.monitoredZone = `${park.id}`;
    form.setFieldsValue(formData);
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
          name="monitorObject"
          label="Đối tượng giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select showSearch placeholder="Chọn đối tượng giám sát">
            {monitorObjects.map(({ id, name }) => {
              return (
                <Option key={id} value={id}>
                  {name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="monitoredZone"
          label="Miền giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <WrappedMap
            monitorObjects={monitorObjects}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCV09KQtrmzDnyXYeC_UzB-HAwMKytXRpE"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onChangeLocation={onChangeLocation}
            parkIdInit={data ? data.location : undefined}
          />
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
