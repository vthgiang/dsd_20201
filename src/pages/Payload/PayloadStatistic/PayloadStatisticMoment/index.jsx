import React, { useState } from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col, TimePicker} from 'antd';
import { Button } from 'antd';
import StyleList from '../index.style';

const PayloadStatisticMoment = ({ history }) => {
  const dataSource = [
    {
      stt: '1',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      use_number: '14',
      drone_number: '4',
    },
    {
      stt: '2',
      code: 'PN62523',
      name: 'Camera cảm biến nhiệt',
      type: 'Camera',
      use_number: '1',
      drone_number: '1',
    },
    {
      stt: '3',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      use_number: '4',
      drone_number: '3',
    },
    {
      stt: '4',
      code: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      use_number: '5',
      drone_number: '1',
    },
    {
      stt: '5',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      use_number: '5',
      drone_number: '2',
    },
    {
      stt: '6',
      code: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      use_number: '5',
      drone_number: '2',
    },

  ];
  
  let visible = false ;


  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã Payload',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên Payload',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phân loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Số lượt sử dụng',
      dataIndex: 'use_number',
      key: 'use_number',
    },
    {
      title: 'Số drone được gắn',
      dataIndex: 'drone_number',
      key: 'drone_number',
    },
  ];
  // const [componentSize, setComponentSize] = useState('default');
  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };

  return (
    <StyleList>
      <div>
        <div>Thống kê Payload theo thời điểm sử dụng</div>
        <div className="searchtype">
          <a onClick={() => history.push('/payload-management')}>Thống kê Payload</a> <span>/</span> <a onClick={() => history.push('/edit-payload')}>Chỉnh sửa Payload</a>
        </div>

        <Form
            // layout="horizontal"
            // initialValues={{ size: componentSize }} className="searchtype"
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
        >
          <Row justify="space-around">
            <Col span={4}>
              <Form.Item label="Từ ngày">
                <DatePicker></DatePicker>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Lúc">
                <TimePicker></TimePicker>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Đến ngày">
                <DatePicker></DatePicker>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Lúc">
                <TimePicker></TimePicker>
              </Form.Item>
            </Col>

          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} />;
        </div>

        <Modal
          title="Basic Modal"
          visible={visible}
          //onOk={handleOk}
          //onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </StyleList>
  );
};

export default PayloadStatisticMoment;
