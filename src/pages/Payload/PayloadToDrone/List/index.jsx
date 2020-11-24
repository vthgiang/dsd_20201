// import React from 'react';

// const PayloadDrone = () => {
//   return <div>Payload - Drone</div>;
// };

// export default PayloadDrone;

import React from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
import { Button } from 'antd';
import StyleList from '../index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const PayloadDrone = ({ history }) => {
  const dataSource = [
    {
      key: '1',
      payloadCode: 'C100',
      name: 'Camera 1',
      typeDevice: 'Camera',
      drone: "Drone 32",
      createdTime: '16/11/2020',
    },
    {
      key: '2',
      payloadCode: 'M100',
      name: 'Micro 1',
      typeDevice: 'Micro',
      drone: "Drone 32",
      createdTime: '16/11/2020',
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
      dataIndex: 'key',
      key: 'name',
    },
    {
      title: 'Mã payload',
      dataIndex: 'payloadCode',
      key: 'payloadCode',
    },
    {
      title: 'Tên payload',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại thiết bị',
      dataIndex: 'typeDevice',
      key: 'typeDevice',
    },
    {
      title: 'Tên Drone',
      dataIndex: 'drone',
      key: 'drone',
    },
    
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: 'Hành động',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <Space size="small" >
          <Button type="link" onClick={() => history.push('/edit-signup-payload-drone')}>Sửa</Button>
          <Button danger type="text">Xóa</Button>
        </Space>
      ),
    },
  ];
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const typeDeviceOption = [
    { value: 'camera', label: 'Camera' },
    { value: 'micro', label: 'Micro' },
    { value: 'sensor', label: 'Sensor' }
  ]

  return (
    <StyleList>
      <div>
        <h1 style={{fontWeight:'bold', fontSize:16}}>Danh sách đăng ký payload drone</h1>
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
              <Form.Item label="Loại thiết bị">
               <Select options = {typeDeviceOption}/>
              </Form.Item>
            </Col>

            <Col span={3}>
              <Button type="primary" icon={<SearchOutlined />}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
        <Button type="primary" className="buttontype" onClick={() => history.push('/add-signup-payload-drone')}>Đăng ký mới</Button>
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

export default PayloadDrone;
