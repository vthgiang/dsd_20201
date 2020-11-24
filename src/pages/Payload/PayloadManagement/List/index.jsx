import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import StyleList from './index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import axios from 'axios';

class List extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      currentTable: null,
      tables: [],
      idPayload : null,
      modalLoading: false,
      detailBill: [],
      detailPayload : null
    }
  }

  handleClick() {
    let history = useHistory();
    history.push("/edit-payload");
  }

  componentDidMount() {
    axios.get(`http://dsd06.herokuapp.com/api/payload`)
      .then(res => {
        //const persons = res.data;
        this.setState({ detailPayload: res.data });
      })
  }

  showModal = (record) => {

    this.setState({ visible: true });
    this.setState({idPayload: record.id})
  };

  handleOk = e => {
    this.setState({ visible: false })
  };

  handleCancel = e => {
    this.setState({ visible: false })
  };

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      name: this.state.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  renderModal = () => {
    axios.get(`http://dsd06.herokuapp.com/api/payload/` + this.state.idPayload)
      .then(res => {
        //const persons = res.data;
        this.setState({ tables: res.data });
      })

    return <Form onSubmit={this.handleSubmit} >
      <Form.Item
        label="Tên"
        name="username"  initialValue="123"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Loại"
        name="tilting"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="zooming"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Trạng thái"
        name="zooming"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
      </Button>
      </Form.Item>
    </Form>

  }

  render() {


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
            <Button type="link" onClick={() => this.showModal(record)} >Sửa</Button>
            <Button danger type="text">Xóa</Button>
          </Space>
        ),
      },
    ];
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
    const { visible, currentTable, tables } = this.state;

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
        <Modal
          title="Chi tiết"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          {/* {
            this.renderModal()
          } */}
        </Modal>
      </StyleList>
    );
  }
}
export default List; 