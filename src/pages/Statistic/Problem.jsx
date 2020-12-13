import React from 'react';
import { Breadcrumb, Row, Col, Card, Select, Button, DatePicker, Table, Tag, Space } from 'antd';

const { Option } = Select;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên sự cố',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Loại sự cố',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Tình trạng',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = 'geekblue';
          if (tag === 'mới') {
            color = 'volcano';
          }
          if (tag === 'đang xử lý') {
            color = 'geekblue';
          }
          if (tag === 'hoàn thành') {
            color = 'green';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Chi tiết</a>
      </Space>
    ),
  },
];

const data = [
  {
    id: 1,
    name: 'Đứt dây điện số 21',
    type: 'đứt dây',
    tags: ['mới'],
  },
  {
    id: 2,
    name: 'Chập điện xã ABC',
    type: 'chập điện',
    tags: ['đang xử lý'],
  },
  {
    id: 3,
    name: 'Mất điện cục bộ xóm 10',
    type: 'mất điện',
    tags: ['hoàn thành'],
  },
];

function Problem() {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16, marginTop: 8, fontSize: 18, fontWeight: 500 }}
      >
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
        <Breadcrumb.Item>Sự cố</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="space-between" align="top" gutter={[16, 16]}>
        <Col span={8}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#fff1f0' }}>
            <h1>Sự cố mới</h1>
            <div>100</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#e6f7ff' }}>
            <h1>Đang xử lý</h1>
            <div>100</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#f6ffed' }}>
            <h1>Đã xong</h1>
            <div>100</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>Tiêu chí thống kê</span>
              <Select defaultValue="1" style={{ marginRight: 16 }}>
                <Option value="1">Thống kê tổng quát</Option>
                <Option value="2">Thiệt hại của sự cố</Option>
                <Option value="3">Số lượng sự cố theo khu vực</Option>
                <Option value="4">Tổng số lượng sự cố theo từng loại</Option>
                <Option value="5">Chi phí xử lý sự cố</Option>
                <Option value="6">Số lượng sự cố theo trạng thái</Option>
              </Select>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>Mẫu biểu đồ</span>
              <Select defaultValue="4" style={{ marginRight: 16 }}>
                <Option value="1">Biểu đồ cột</Option>
                <Option value="2">Biểu đồ tròn</Option>
                <Option value="3">Biểu đồ đường</Option>
                <Option value="4">Dạng bảng</Option>
              </Select>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>Thời gian</span>
              <DatePicker picker="month" />
            </div>
            <Table columns={columns} dataSource={data} bordered />
            <Button type="primary" style={{ float: 'right' }}>In báo cáo</Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Problem;