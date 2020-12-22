// NEW COMPONENT

import React, { Component } from "react";
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import StyleList from './index.style';
import {Bar} from "ant-design-pro/lib/Charts";


class PayloadStatisticWorking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listPayloadWorking:[],
        workData:[
            {
                x: '2020-12-07',
                y: 0,
            },
            {
                x: '2020-12-08',
                y: 0,
            },
            {
                x: '2020-12-09',
                y: 0,
            },
            {
                x: '2020-12-10',
                y: 0,
            },
            {
                x: '2020-12-11',
                y: 0,
            },
            {
                x: '2020-12-12',
                y: 0,
            },
            {
                x: '2020-12-13',
                y: 0,
            },
            {
                x: '2020-12-05',
                y: 0,
            },
            {
                x: '2020-12-14',
                y: 0,
            },
            {
                x: '2020-12-15',
                y: 0,
            },
        ],
    }
  }


  componentDidMount() {
     axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf?index=0&count=0')
      .then(res => {
          console.log(res.data)
        /* var listPayloadWorking = res.data;
        listPayloadWorking = listPayloadWorking.filter( x => x.payload != null)
                for( var i = 0; i < listPayloadWorking.length; i++){
          listPayloadWorking[i].startedAt = listPayloadWorking[i].startedAt.replace(/\:([0-9]+)(\.[0-9a-zA-Z]+)?$/g, ':$1').replace(/T/, ' ');
          if(listPayloadWorking[i].finishedAt != null){
            listPayloadWorking[i].finishedAt = listPayloadWorking[i].finishedAt.replace(/\:([0-9]+)(\.[0-9a-zA-Z]+)?$/g, ':$1').replace(/T/, ' ');
          }
        }
        this.setState({ listPayloadWorking }); */
      })
  }

    componentWillMount() {
        var that = this;
        axios.get(`https://dsd06.herokuapp.com/api/payloadStat/feeWorking`)
            .then(res => {
                var listPayloadWorking = res.data;
                let { workData } = that.state;
                listPayloadWorking = listPayloadWorking.filter( x => x.payload != null)
                for( var i = 0; i < listPayloadWorking.length; i++){
                    listPayloadWorking[i].startedAt = listPayloadWorking[i].startedAt.split("T")[0];
                    for( var j = 0; j < workData.length; j++ ){
                        if(listPayloadWorking[i].startedAt == workData[j].x){
                            workData[j].y = workData[j].y + 1;
                        }
                    }
                }
                this.setState(workData);
            })
    }

  render() {
    const dataSource = 
      this.state.listPayloadWorking.map(payloadWorking =>
        ({
          id: payloadWorking._id,
          payloadCode: payloadWorking.payload.code,
          payloadName: payloadWorking.payload.name,
          type: payloadWorking.type,
          reason: payloadWorking.reason,
          droneId: payloadWorking.droneId,
          fee: payloadWorking.fee,
          startedAt: payloadWorking.startedAt,
          finishedAt: payloadWorking.finishedAt
        })
      )
      const {  workData } = this.state;
    
    return (
    <StyleList>
      <div>
        <h2>Thống kê sự cố đê điều </h2>

        <Form>
          <Row justify="space-around">
                <Col span={18}>
                    <Bar height={300} title="Thông kê sự cố đê điều" data={workData.filter( item => item.y >= 0)} />
                    <br/>
                </Col>
              <br/>


          </Row>
        </Form>
        </div>
    </StyleList>
    );
  }
}
export default PayloadStatisticWorking; 
