import React, { useState } from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
import { Button } from 'antd';
import StyleList from '../index.style';

const PayloadStatisticStatus = ({ history }) => {
  const dataSource = [
    {
      stt: '1',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      status: 'Đang hoạt động',
    },
    {
      stt: '2',
      code: 'PN62523',
      name: 'Camera cảm biến nhiệt',
      type: 'Camera',
      status: 'Đang hoạt động',
    },
    {
      stt: '3',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      status: 'Đang hoạt động',
    },
    {
      stt: '4',
      code: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      status: 'Đang hoạt động',
    },
    {
      stt: '5',
      code: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      status: 'Đang hoạt động',
    },
    {
      stt: '6',
      code: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      status: 'Đang hoạt động',

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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
          <a onClick={() => history.push('/payload-statistic')}>Thống kê Payload</a> <span>/</span> <a onClick={() => history.push('/payload-statistic/status')}>Theo trạng thái</a>
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
                  <Select.Option value="demo">Đang hoạt động</Select.Option>
                  <Select.Option value="demo">Đã gắng - chưa sử dụng</Select.Option>
                  <Select.Option value="demo">Chưa gắn vào drone</Select.Option>
                  <Select.Option value="demo">Cần sửa chữa</Select.Option>
                  <Select.Option value="demo">Hỏng</Select.Option>
                  <Select.Option value="demo">Mất</Select.Option>
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

export default PayloadStatisticStatus;
