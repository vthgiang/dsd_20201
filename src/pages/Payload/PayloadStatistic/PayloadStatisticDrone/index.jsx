import React, { useState } from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
import { Button } from 'antd';
import StyleList from '../index.style';

const PayloadStatisticDrone = ({ history }) => {
  const dataSource = [
    {
      stt: '1',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      drone: 'Drone TXGSJ',
      time: '12:00 10/11/2020 - 12:15 10/11/2020',
    },
    {
      stt: '2',
      code: 'PN62523',
      name: 'Camera cảm biến nhiệt',
      type: 'Camera',
      drone: 'Drone TXGSJ',
      time: '12:00 10/11/2020 - 12:15 10/11/2020',
    },
    {
      stt: '3',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      drone: 'Drone TXGSJ',
      time: '12:00 10/11/2020 - 12:15 10/11/2020',
    },
    {
      stt: '4',
      code: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      drone: 'Drone TXGSJ',
      time: '12:00 10/11/2020 - 12:15 10/11/2020',
    },
    {
      stt: '5',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      drone: 'Drone TXGSJ',
      time: '12:00 10/11/2020 - 12:15 10/11/2020',
    },
    {
      stt: '6',
      code: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      drone: 'Drone TXGSJ',
      time: '12:00 10/11/2020 - 12:15 10/11/2020',

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
      title: 'Drone',
      dataIndex: 'drone',
      key: 'drone',
    },
    {
      title: 'Thời gian sử dụng',
      dataIndex: 'time',
      key: 'time',
    },


  ];
  // const [componentSize, setComponentSize] = useState('default');
  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };

  return (
    <StyleList>
      <div>
        <h2>Thống kê Payload theo trạng thái</h2>
        <div className="searchtype">
          <a onClick={() => history.push('/payload-statistic')}>Thống kê Payload</a> <span>/</span> <a onClick={() => history.push('/payload-statistic/drone')}>Theo Drone</a>
        </div>

        <Form
            // layout="horizontal"
            // initialValues={{ size: componentSize }} className="searchtype"
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
        >
          <Row justify="space-around">
            <Col span={4}>
              <Form.Item label="Chọn trạng thái">
                <Select>
                  <Select.Option value="demo">Drone TJAS1</Select.Option>
                  <Select.Option value="demo">Drone TBDMD</Select.Option>
                  <Select.Option value="demo">Drone YBDH1</Select.Option>
                  <Select.Option value="demo">Drone YWDVH</Select.Option>
                  <Select.Option value="demo">Drone HJJDN</Select.Option>
                </Select>
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

export default PayloadStatisticDrone;
