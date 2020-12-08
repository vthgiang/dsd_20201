import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import StyleList from './index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import axios from 'axios';

class ListTypePayload extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      currentTable: null,
      tables: [],
      idPayloadType: null,
      modalLoading: false,
      detailBill: [],
      detailPayloadType: {},
      options: [],
      payload: {},
      visibleAdd: false,
      visibleDelete: false,
      idPayloadDelete: null,
    }
  }

  handleClick() {
    let history = useHistory();
    history.push("/edit-payloadtype");
  }

  componentDidMount() {
    this.loadAllPayloadType();
  }

  loadAllPayloadType() {
    axios.get(`https://dsd06.herokuapp.com/api/payloadtype`)
      .then(res => {
        //const persons = res.data;
        this.setState({ tables: res.data });
      })
  }


  showModal = (record) => {
    this.setState({ visible: true });

    this.setState({ detailPayloadType: record });
    this.setState({ idPayloadType: record.id })
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

  handleCancelDelete = e => {
    this.setState({ visibleDelete: false })
  }

  handleFormSubmitEdit(values) {
    const data = {
      name: values.name,
      description: values.description,
    };
    axios.put(`https://dsd06.herokuapp.com/api/payload/` + this.state.idPayloadType, data)
      .then(res => {
        console.log(res.data);
        this.setState({ visible: false })
      })

  }

  renderModal() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return <Form   {...layout} onFinish={(values) => this.handleFormSubmitEdit(values)} >

      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item initialValue={this.state.detailPayloadType.name}
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Hãy nhập tên loại payload!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item initialValue={this.state.detailPayloadType.description}
                     label="Mô tả"
                     name="description">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
   </Button>
      </Form.Item>
    </Form>



  }

  showModalAdd() {
    this.setState({ visibleAdd: true });
  }

  handleFormSubmit(values) {
    console.log(values)
    const data = {
      name: values.name,
      description: values.description,
    };
    axios.post(`https://dsd06.herokuapp.com/api/payloadtype`, data)
      .then(res => {
        console.log(res.data);
        this.setState({ visibleAdd: false })
        this.loadAllPayloadType();
      })

  }

  renderModalAdd() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return <Form   {...layout} onFinish={(values) => this.handleFormSubmit(values)} >

      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Hãy nhập tên loại payload!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item
              label="Mô tả"
              name="description">
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

  showModalDelete(record) {
    this.setState({ visibleDelete: true })
    this.setState({ idPayloadDelete: record.id })
  }

  deleteRecord() {
    axios.delete(`https://dsd06.herokuapp.com/api/payloadtype/` + this.state.idPayloadDelete)
      .then(res => {
        console.log(res.data);
        this.setState({ visibleDelete: false })
        this.loadAllPayloadType();
      })
  }

  renderModalDelete() {
    return <div>
      <p>Bạn có chắc xóa bản ghi này?</p>
      <Button type="primary" danger onClick={() => this.deleteRecord()}>Xóa</Button>
    </div>

  }

  render() {

    const dataSource = this.state.tables.map(payloadtype =>
      ({
        id: payloadtype._id,
        description: payloadtype.description,
        name: payloadtype.name,
      })
    )



    const columns = [
      {
        title: 'Tên loại Payload',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
      },

      {
        title: 'Action',
        key: 'operation',
        width: 100,
        render: (text, record) => (

          <Space size="small" >
            {/*  <Button type="link" onClick={() => history.push('/payload-configuration')}>Cấu hình</Button> */}
            <Button type="link" onClick={() => this.showModal(record)} >Sửa</Button>
            <Button danger type="text" onClick={() => this.showModalDelete(record)}>Xóa</Button>
          </Space>
        ),
      },
    ];

    const { visible, visibleAdd, visibleDelete, currentTable, tables } = this.state;

    return (
      <StyleList>
        <div>
          <h2>Quản lý loại Payload</h2>
          <br/>
          <Button type="primary" className="buttontype" onClick={() => this.showModalAdd()} >Thêm loại mới</Button>
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <Modal
          title="Chi tiết"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null} width={800}
        >
          {
            this.renderModal()
          }
        </Modal>

        <Modal
          title="Thêm loại Payload" width={800}
          visible={visibleAdd}
          onOk={this.handleOkAdd}
          onCancel={this.handleCancelAdd}
          footer={null}
        >
          {
            this.renderModalAdd()
          }
        </Modal>

        <Modal
          title="Xóa loại Payload"
          visible={visibleDelete}
          onOk={this.handleOkDelete}
          onCancel={this.handleCancelDelete}
          footer={null}
        >
          {
            this.renderModalDelete()
          }
        </Modal>
      </StyleList>
    );
  }
}
export default ListTypePayload;