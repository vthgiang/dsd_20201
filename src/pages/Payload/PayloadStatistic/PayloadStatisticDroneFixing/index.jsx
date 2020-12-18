import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Bar } from 'ant-design-pro/lib/Charts';
import { Button } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import StyleList from '../index.style';


class PayloadStatisticDrone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listPayloadFixing:[],
    }
  }

  

  componentDidMount() {
    axios.get('https://dsd06.herokuapp.com/api/payloadStat/feeFixing')
      .then(res => {
        var listPayloadFixing = res.data;
        listPayloadFixing = listPayloadFixing.filter( x => x.payload != null)
        for( var i = 0; i < listPayloadFixing.length; i++){
          listPayloadFixing[i].startedAt = listPayloadFixing[i].startedAt.replace(/\:([0-9]+)(\.[0-9a-zA-Z]+)?$/g, ':$1').replace(/T/, ' ');;
        }
        this.setState({ listPayloadFixing });
      })
  }


  render() {
    //let history = useHistory();
    const columns = [
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

        <Form>
          <Row justify="space-around">
            <Col span={18}>
              <br/>
            </Col>

          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} />
        </div>

        <Modal
          title="Basic Modal"
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
