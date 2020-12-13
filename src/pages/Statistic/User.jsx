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
    title: 'Tên người dùng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Hoạt động',
    key: 'actions',
    dataIndex: 'actions',
  },
];

const data = [
  {
    id: 1,
    name: 'Đào Duy Nam',
    email: 'nam@gmail.com',
    role: 'admin',
    actions: 'Thiết lập đường bay cho drone#32',
  },
  {
    id: 2,
    name: 'Phùng Việt Duy',
    email: 'duy@gmail.com',
    role: 'NV giám sát',
    actions: 'Báo cáo sự cố #41',
  },
  {
    id: 3,
    name: 'Trương Anh Quốc',
    email: 'quoc@gmail.com',
    role: 'NV xử lý sự cố',
    actions: 'Xử lý sự cố #40',
  },
];


function User() {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16, marginTop: 8, fontSize: 18, fontWeight: 500 }}
      >
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
        <Breadcrumb.Item>Người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="space-between" align="top" gutter={[16, 16]}>
        <Col span={6}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#f9f0ff' }}>
            <h1>Quản trị viên</h1>
            <div>100</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#fcffe6' }}>
            <h1>NV Giám sát</h1>
            <div>100</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#e6fffb' }}>
            <h1>NV Xử lý sự cố</h1>
            <div>100</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="u-shadow u-rounded" style={{ backgroundColor: '#fff2e8' }}>
            <h1>Người dùng khác</h1>
            <div>100</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>Tiêu chí thống kê</span>
              <Select defaultValue="2" style={{ marginRight: 16 }}>
                <Option value="1">Thời gian làm việc</Option>
                <Option value="2">Lịch sử hoạt động</Option>
                <Option value="3">Số lượng người dùng theo vai trò</Option>
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

export default User;