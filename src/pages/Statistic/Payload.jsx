import React from 'react';
import { Breadcrumb, Row, Col, Card, Select, Button } from 'antd';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const { Option } = Select;

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

function Payload() {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16, marginTop: 8, fontSize: 18, fontWeight: 500 }}
      >
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
        <Breadcrumb.Item>Payload</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>Tiêu chí thống kê</span>
              <Select defaultValue="1" style={{ marginRight: 16 }}>
                <Option value="1">Báo cáo tổng quát</Option>
                <Option value="2">Báo cáo payload hỏng hóc</Option>
                <Option value="3">Chi phí sửa chữa payload</Option>
                <Option value="4">Chi phí bảo trì payload</Option>
              </Select>
              <span style={{ fontWeight: 'bold', marginRight: 8 }}>Mẫu biểu đồ</span>
              <Select defaultValue="1">
                <Option value="1">Biểu đồ cột</Option>
                <Option value="2">Biểu đồ tròn</Option>
                <Option value="3">Biểu đồ đường</Option>
                <Option value="4">Dạng bảng</Option>
              </Select>
            </div>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart
                data={data}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <Button type="primary" style={{ float: 'right'}}>In báo cáo</Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Payload;