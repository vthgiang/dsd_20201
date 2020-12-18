import React, { Component } from "react";
import 'ant-design-pro/dist/ant-design-pro.css';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
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
      visibleDelete: false,
      idPayloadDelete: null,
      status: [
        { value: 'working', label: 'Đang sử dụng' },
        { value: 'idle', label: 'Sẵn có' },
        { value: 'fixing', label: 'Đang sửa' }
      ],

        salesPieData: [
            {
                x: 'Đang hoạt động',
                y: 1,
            },
            {
                x: 'Sẵn có',
                y: 1,
            },
            {
                x: 'Đang sửa',
                y: 1,
            },
        ]
    }
  }


  componentDidMount() {
    this.loadAllPayload();
    this.getAllTypePayload();
  }

  loadAllPayload() {
    axios.get(`http://dsd06.herokuapp.com/api/payload`)
        .then(res => {
          //const persons = res.data;
          this.setState({ tables: res.data });
        })
  }


  handleOk = e => {
    this.setState({ visible: false })
  };

  handleCancel = e => {
    this.setState({ visible: false })
  };


  getAllTypePayload() {
    axios.get(`https://dsd06.herokuapp.com/api/payloadtype`)
        .then(res => {
          const options = res.data.map(payload =>
              ({
                label: payload.name,
                value: payload._id,
              })
          )


          this.setState({ Options: options });
        })

  }




  searchPayload(values) {
    axios.get(`http://dsd06.herokuapp.com/api/payload`, { params: { type: values.type, status: values.status } })
        .then(res => {
          //const persons = res.data;
          this.setState({ tables: res.data });
        })
  }


  componentWillMount() {
      var that = this;
      axios.get(`http://dsd06.herokuapp.com/api/payload`, { params: { status: "working" } })
          .then(res => {
              const data = res.data;
              let { salesPieData } = that.state;
              salesPieData[0].y = data.length;
              this.setState(salesPieData);
          })
      axios.get(`http://dsd06.herokuapp.com/api/payload`, { params: { status: "idle" } })
          .then(res => {
              const data = res.data;
              let { salesPieData } = that.state;
              salesPieData[1].y = data.length;
              this.setState(salesPieData);
          })
      axios.get(`http://dsd06.herokuapp.com/api/payload`, { params: { status: "fixing" } })
          .then(res => {
              const data = res.data;
              let { salesPieData } = that.state;
              salesPieData[2].y = data.length;
              this.setState(salesPieData);
          })
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
          weight: payload.detail.weight,
          opticalZoom: payload.detail.opticalZoom,
          digitalZoom: payload.detail.digitalZoom,
          sizewidth: payload.detail.size.width,
          sizeheight: payload.detail.size.height,
          sizelength: payload.detail.size.length,
          panningmin: payload.detail.panning.min,
          panningmax: payload.detail.panning.max,
          tiltingmin: payload.detail.tilting.min,
          tiltingmax: payload.detail.tilting.max,
          zoommin: payload.detail.zoom.min,
          zoommax: payload.detail.zoom.max,

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
    ];

    const { visible, visibleAdd, visibleDelete, currentTable, tables, salesPieData } = this.state;

    return (
        <StyleList>
          <div>
            <h2>Thống kê Payload theo trạng thái hoạt động</h2>
              <div className="searchtype">
                  <a onClick={() => this.props.history.push('/payload-statistic')}>Thống kê Payload</a> <span>/</span>
                  <a onClick={() => this.props.history.push('/payload-statistic-status')}>Theo trạng thái hoạt động</a>
              </div>
            <Form
                layout="horizontal"
                className="searchtype" onFinish={(values) => this.searchPayload(values)}
            >
                <Row justify="space-around">
                    <Col span={16}>
                        <Pie
                            hasLegend
                            title="Theo trạng thái"
                            subTitle="Theo trạng thái"
                            total={() => (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: (salesPieData.reduce((pre, now) => now.y + pre, 0))+ " payload",
                                    }}
                                />
                            )}
                            data={salesPieData.filter(item => item.y > 0)}
                            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: (val) }} />}
                            height={324}
                        />

                    </Col>
                    <br/>
                </Row>
              <Row justify="space-around">
                  <br/>
                <Col span={9}>
                  <Form.Item label="Trạng thái" name="status">
                    <Select options={this.state.status} />
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Lọc
                  </Button>
                </Col>
              </Row>
            </Form>
            <Table dataSource={dataSource} columns={columns} />;
          </div>




        </StyleList>
    );
  }
}
export default List;