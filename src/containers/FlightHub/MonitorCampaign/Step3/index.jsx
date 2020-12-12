import React, { useEffect, useState } from 'react';
import StyleStep3 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';
import WrappedMap from './map';
import { FormOutlined, StepBackwardOutlined } from '@ant-design/icons';
const axios = require('axios');

const { Option } = Select;

const Step3 = ({
  nextStep,
  prevStep,
  data,
  handleChangeData,
  monitoredObjects,
}) => {
  const [form] = Form.useForm();
  const [objectData, setObjectData] = useState([]);

  useEffect(() => {
    if (data && data.monitoredZone) getObjectData(data.monitoredZone);
  }, [data]);

  const getObjectData = (monitoredZone) => {
    axios({
      method: 'GET',
      url: `https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-zone`,
      params: { monitoredZone },
    })
      .then((res) => {
        if (res.data) {
          setObjectData(res.data.content);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const getObjectOptions = () => {
    const options = objectData.map((item) => {
      return (
        <Option key={item._id} value={item._id}>
          {item.name}
        </Option>
      );
    });
    return options;
  };

  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  const onChangeMonitoredZone = (zoneId) => {
    let formData = data ? data : {};
    formData.monitoredZone = zoneId;
    formData.monitoredObject = [];
    form.setFieldsValue(formData);
    //Gọi các đối tượng trong miền
    getObjectData([zoneId]);
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
          name="monitoredZone"
          label="Miền giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <WrappedMap
            monitoredObjects={monitoredObjects}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCV09KQtrmzDnyXYeC_UzB-HAwMKytXRpE"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onChangeMonitoredZone={onChangeMonitoredZone}
            monitoredZoneInit={data ? data.monitoredZone : undefined}
          />
        </Form.Item>

        <Form.Item
          name="monitoredObjects"
          label="Đối tượng giám sát"
          rules={[{ type: 'array', required: true }]}
        >
          <Select
            mode="multiple"
            showSearch
            placeholder="Chọn đối tượng giám sát"
          >
            {getObjectOptions()}
          </Select>
        </Form.Item>

        <Col offset={6}>
          <Row type="flex">
            <Button
              type="default"
              icon={<StepBackwardOutlined />}
              onClick={prevStep}
            >
              Quay lại
            </Button>
            &ensp;
            <Button type="primary" icon={<FormOutlined />} htmlType="submit">
              Tiếp theo
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep3>
  );
};

export default Step3;
