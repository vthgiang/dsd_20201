import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import StyleList from './index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      currentTable: null,
      tables: [],
      modalLoading: false,
      detailBill: []
    }
  }

  componentDidMount() {
    axios.get(`http://dsd06.herokuapp.com/api/payload`)
    .then(res => {
      //const persons = res.data;
      this.setState({ tables : res.data });
    })
  }

  render() {
    //let history = useHistory();
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
           {/*  <Button type="link" onClick={() => history.push('/payload-configuration')}>Cấu hình</Button> */}
            <Button type="link" >Sửa</Button>
            <Button danger type="text">Xóa</Button>
          </Space>
        ),
      },
    ];
    const dataSource = []
    
    return (
      <StyleList>
        <div>
          <div>Quản lý Payload</div>
          <Form
            layout="horizontal"
            className="searchtype"
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
          <Button type="primary" className="buttontype" >Thêm</Button>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
      </StyleList>
    );
  }
}
export default List; 