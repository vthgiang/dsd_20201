import React from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
import { Button } from 'antd';
import StyleList from '../index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const PayloadMaintenance = ({ history }) => {
  const dataSource = [
    {
      stt: '1',
      time: '20-11-2020',
      location: 'Văn phòng đê 01',
      namePayload: 'Sensor T',
      payloadId: 'TT73623',
      des: '',
    },
    {
      stt: '1',
      time: '21-11-2020',
      location: 'Văn phòng đê 01',
      namePayload: 'Camera cảm biến nhiệt',
      payloadId: 'PN62523',
      des: '',
    },
    {
      stt: '1',
      time: '22-11-2020',
      location: 'Văn phòng đê 01',
      namePayload: 'Camera SONY 04628',
      payloadId: 'SN04628',
      des: '',
    },

  ];
  
  let visible = false ;
  
 /*  function editClick(record){
    visible = true;
    //alert(record.key);
    alert(visible)
    //alert(visible)
  }; */

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Tên Payload',
      dataIndex: 'namePayload',
      key: 'namePayload',
    },
    {
      title: 'Mã Payload',
      dataIndex: 'payloadId',
      key: 'payloadId',
    },
    {
      title: 'Mô tả',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <Space size="small" >
          <Button type="link" onClick={() => history.push('/edit-schedule')}>Sửa</Button>
          <Button danger type="text">Xóa</Button>
        </Space>
      ),
    },
  ];
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <StyleList>
      <div>
        <div>Lịch bảo dưỡng</div>
        <Form
          layout="horizontal"
          initialValues={{ size: componentSize }} className="searchtype"
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Row justify="space-around">
            <Col span={4}>
              <Form.Item label="Từ ngày">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Đến ngày">
               <DatePicker></DatePicker>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Button type="primary" icon={<SearchOutlined />}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
        <Button type="primary" className="buttontype" onClick={() => history.push('/add-schedule')}>Thêm</Button>
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

export default PayloadMaintenance;
