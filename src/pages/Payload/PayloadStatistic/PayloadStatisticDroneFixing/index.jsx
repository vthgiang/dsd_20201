
// NEW COMPONENT

import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import StyleList from '../index.style';


class PayloadStatisticDrone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listPayloadFixing:[]
    }
  }

  

  componentDidMount() {
    axios.get('https://dsd06.herokuapp.com/api/payloadStat/feeFixing')
      .then(res => {
        const listPayloadFixing = res.data;
        this.setState({ listPayloadFixing });
      })
  }

  render() {
    //let history = useHistory();
    const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Mã Payload',
      dataIndex: 'payloadCode',
      key: 'payloadCode',
    },
    {
      title: 'Tên Payload',
      dataIndex: 'payloadName',
      key: 'payloadName',
    },
    {
      title: 'Phân loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Chi phí',
      dataIndex: 'fee',
      key: 'fee'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startedAt',
      key: 'startedAt',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'finishedAt',
      key: 'finishedAt',
    },

  ];

    const dataSource = 
      this.state.listPayloadFixing.map(payloadFixing =>
        ({
          // id: payloadFixing._id,
          payloadCode: payloadFixing.payload.code,
          payloadName: payloadFixing.payload.name,
          type: payloadFixing.type,
          reason: payloadFixing.reason,
          fee: payloadFixing.fee,
          startedAt: payloadFixing.startedAt,
          finishedAt: payloadFixing.finishedAt
        })
      )
    
    
    return (
    <StyleList>
      <div>
        <h2>Thống kê lịch sử sửa chữa Payload</h2>
        <div className="searchtype">
          <a onClick={() => this.props.history.push('/payload-statistic')}>Thống kê Payload</a> <span>/</span>
          <a onClick={() => this.props.history.push('/payload-statistic/moment')}>Lịch sử sửa chữa</a>
        </div>

        <Form
            // layout="horizontal"
            // initialValues={{ size: componentSize }} className="searchtype"
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
        >
          <Row justify="space-around">
            <Col span={4}>
              <br/>
              {/*<Form.Item label="Chọn trạng thái">*/}
              {/*  <Select>*/}
              {/*    <Select.Option value="demo1">Drone TJAS1</Select.Option>*/}
              {/*    <Select.Option value="demo2">Drone TBDMD</Select.Option>*/}
              {/*    <Select.Option value="demo3">Drone YBDH1</Select.Option>*/}
              {/*    <Select.Option value="demo4">Drone YWDVH</Select.Option>*/}
              {/*    <Select.Option value="demo5">Drone HJJDN</Select.Option>*/}
              {/*  </Select>*/}
              {/*</Form.Item>*/}
            </Col>

          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} />;
        </div>

        <Modal
          title="Basic Modal"
          // visible={visible}
          //onOk={handleOk}
          //onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </StyleList>
    );
  }
}
export default PayloadStatisticDrone; 
