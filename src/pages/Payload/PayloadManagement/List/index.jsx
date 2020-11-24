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
      idPayload: null,
      modalLoading: false,
      detailBill: [],
      detailPayload: {},
      options: [],
      payload: {},
      visibleAdd: false,
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
        this.setState({ tables: res.data });
      })

      this.getAllTypePayload();
  }



  showModal = (record) => {
    this.setState({ visible: true });
    
    this.setState({ detailPayload: record });
    this.getDetailPayload(record.id);
  };

  handleOk = e => {
    this.setState({ visible: false })
  };

  handleCancel = e => {
    this.setState({ visible: false })
  };

  
  handleCancelAdd = e => {
    this.setState({ visibleAdd: false })
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

  getAllTypePayload() {
    axios.get(`https://dsd06.herokuapp.com/api/payloadtype`)
      .then(res => {
        const options = res.data.map(payload =>
          ({
            label: payload.name,
            value: payload._id,
          })
        )
        //const persons = res.data;
        this.setState({ Options: options });
      })
    //console.log(this.state.Options.length)
    //alert(this.state.Options)
  }

  getDetailPayload(id) {
    axios.get(`http://dsd06.herokuapp.com/api/payload/` + id)
      .then(res => {
        //const persons = res.data;
        this.setState({ payload: res.data });
      })
  }

  renderModal() {
    //this.getDetailPayload();
    //alert(this.state.detailPayload.id)
    //alert(this.state.detailPayload.id)
    //console.log(this.state.options.length)

    //alert(option.length)
    return <Form onSubmit={this.handleSubmit}  >

      <Form.Item
        label="Mã" onChange={this.handleChange}
        name="code" initialValue={this.state.detailPayload.code}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="username" initialValue={this.state.detailPayload.name}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Loại"
        name="tilting"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >

        <Select options={this.state.Options} defaultValue={this.state.detailPayload.type} />

      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="des" initialValue={this.state.detailPayload.des}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
      </Button>
      </Form.Item>
    </Form>

  }

  showModalAdd() {
    this.setState({ visibleAdd: true });
  }

  renderModalAdd() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return <Form   {...layout}  >

      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Mã"
            name="code"
            rules={[{ required: true, message: 'Please input your mã!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Tên"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Loại"
            name="tilting"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select options={this.state.Options} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label="Mô tả"
            name="des"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Weight">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Nhà sản xuất">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="OpticalZoom">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="DigitalZoom">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Panning min">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Panning max">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tilting min">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Tilting max">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Zooming min">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Zooming max">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Width">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Height">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Length">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
   </Button>
      </Form.Item>
    </Form>
  }

  render() {

    const dataSource = this.state.tables.map(payload =>
      ({
        id: payload._id,
        code: payload.code,
        name: payload.name,
        status: payload.status,
        manufacturer: payload.detail.manufacturer,
        type: payload.type.name,
        des: payload.type.description,
        type_id: payload.type._id,
      })
    )



    const columns = [
      {
        title: 'Mã ',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Nhà sản xuất',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
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

    const { visible, visibleAdd, currentTable, tables } = this.state;

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
          <Button type="primary" className="buttontype" onClick={() => this.showModalAdd()} >Thêm</Button>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
        <Modal
          title="Chi tiết"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          {
            this.renderModal()
          }
        </Modal>

        <Modal
          title="Thêm Payload" width={800}
          visible={visibleAdd}
          onOk={this.handleOkAdd}
          onCancel={this.handleCancelAdd}
          footer={null}
        >
          {
            this.renderModalAdd()
          }
        </Modal>
      </StyleList>
    );
  }
}
export default List; 