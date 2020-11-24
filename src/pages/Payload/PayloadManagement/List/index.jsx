import React from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
import { Button } from 'antd';
import StyleList from './index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const List = ({ history }) => {
  const dataSource = [
    {
      stt: '1',
      ID: 'TT73623',
      name: 'Sensor T',
      type: 'Sensor',
      des: '',
      status: ''
    },
    {
      stt: '2',
      ID: 'PN62523',
      name: 'Camera cảm biến nhiệt',
      type: 'Camera',
      des: '',
      status: ''
    },
    {
      stt: '3',
      ID: 'SN04628',
      name: 'Camera SONY 04628',
      type: 'Camera',
      des: '',
      status: ''
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
      title: 'Mã ',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Mô tả',
      dataIndex: 'des',
      key: 'des',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: (text, record) => (
  
        <Space size="small" >
          {/* <Button type="link" onClick={() => history.push('/payload-configuration')}>Cấu hình</Button> */}
          <Button type="link" onClick={() => history.push('/edit-payload')}>Sửa</Button>
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
        <div>Quản lý Payload</div>
        <Form
          layout="horizontal"
          initialValues={{ size: componentSize }} className="searchtype"
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Row justify="space-around">
            <Col span={4}>
              <Form.Item label="Tên">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Loại">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Trạng thái">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<SearchOutlined />}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
        <Button type="primary" className="buttontype" onClick={() => history.push('/add-payload')}>Thêm</Button>
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

export default List;
