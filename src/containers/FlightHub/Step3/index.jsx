import React from 'react';
import StyleStep3 from './index.style';
import { Button, Col, Form, Select, Row } from 'antd';
import { VALIDATE_MESSAGES, LAYOUT } from '../config';

const { Option } = Select;

const Step3 = ({ nextStep, prevStep, handleChangeData }) => {
  const onFinish = (values) => {
    handleChangeData(values);
    nextStep();
  };

  const getObjectOptions = () => {
    let data = [
      {
        _id: '1',
        name: 'Rừng đặc dụng',
      },
      {
        _id: '2',
        name: 'Rừng nguyên sinh',
      },
      {
        _id: '3',
        name: 'Rừng phòng hộ',
      },
    ];

    const options = data.map((item) => {
      return <Option value={item._id}>{item.name}</Option>;
    });
    return options;
  };

  const getLocationOptions = () => {
    let data = [
      {
        _id: '1',
        name: 'Tiểu khu A',
      },
      {
        _id: '2',
        name: 'Tiểu khu B',
      },
      {
        _id: '3',
        name: 'Tiểu khu C',
      },
    ];

    const options = data.map((item) => {
      return <Option value={item._id}>{item.name}</Option>;
    });
    return options;
  };

  return (
    <StyleStep3>
      <Form
        {...LAYOUT}
        name="flight-hub-name"
        onFinish={onFinish}
        validateMessages={VALIDATE_MESSAGES}
      >
        <Form.Item
          name="object_id"
          label="Đối tượng giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Chọn đối tượng giám sát"
          >
            {getObjectOptions()}
          </Select>
        </Form.Item>
        ,
        <Form.Item
          name="location"
          label="Miền giám sát"
          rules={[{ type: 'string', required: true }]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Chọn miền giám sát"
          >
            {getLocationOptions()}
          </Select>
        </Form.Item>
        <Col offset={6}>
          <Row>
            <Button type="default" onClick={prevStep}>
              {'<< quay lại'}
            </Button>
            &ensp;
            <Button type="primary" htmlType="submit">
              {'Tiếp theo >>'}
            </Button>
          </Row>
        </Col>
      </Form>
    </StyleStep3>
  );
};

export default Step3;
