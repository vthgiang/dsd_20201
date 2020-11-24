// NEW COMPONENT

import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import StyleList from '../index.style';


class PayloadStatisticWorking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listPayloadWorking:[]
    }
  }

  

  componentDidMount() {
    console.log("aaaa");
    axios.get('https://dsd06.herokuapp.com/api/payloadStat/feeWorking')
      .then(res => {
        const listPayloadWorking = res.data;
        console.log("aaaa");
        console.log(res.data);
        this.setState =({ listPayloadWorking });
      })
  }

  render() {
    //let history = useHistory();
    const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'Drone',
      dataIndex: 'droneId',
      key: 'droneId',
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
    // const dataSource = []

    const dataSource = 
      this.state.listPayloadWorking.map(payloadWorking =>
        ({
          id: payloadWorking.id,
          payloadCode: payloadWorking.payload.code,
          payloadName: payloadWorking.payload.name,
          type: payloadWorking.type,
          reason: payloadWorking.reason,
          droneId: payloadWorking.droneId,
          startedAt: payloadWorking.startedAt,
          finishedAt: payloadWorking.finishedAt
        })
      )
    
    
    return (
    <StyleList>
      <div>
        <h2>Thống kê Payload theo trạng thái</h2>
        <div className="searchtype">
          {/* <a onClick={() => history.push('/payload-statistic')}>Thống kê Payload</a> <span>/</span> <a onClick={() => history.push('/payload-statistic/drone')}>Theo Drone</a> */}
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
                  <Select.Option value="demo1">Drone TJAS1</Select.Option>
                  <Select.Option value="demo2">Drone TBDMD</Select.Option>
                  <Select.Option value="demo3">Drone YBDH1</Select.Option>
                  <Select.Option value="demo4">Drone YWDVH</Select.Option>
                  <Select.Option value="demo5">Drone HJJDN</Select.Option>
                </Select>
              </Form.Item>
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
export default PayloadStatisticWorking; 
