import React from 'react';
import { Breadcrumb, Row, Col, Card } from 'antd';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Sector, Cell,
  Text,
} from 'recharts';

const dataChart1 = [
  {
    name: 'Th1', uv: 590, pv: 800, amt: 1400,
  },
  {
    name: 'Th2', uv: 868, pv: 967, amt: 1506,
  },
  {
    name: 'Th3', uv: 1397, pv: 1098, amt: 989,
  },
  {
    name: 'Th4', uv: 1480, pv: 1200, amt: 1228,
  },
  {
    name: 'Th5', uv: 1520, pv: 1108, amt: 1100,
  },
  {
    name: 'Th6', uv: 1400, pv: 680, amt: 1700,
  },
  {
    name: 'Th7', uv: 1400, pv: 680, amt: 1700,
  },
  {
    name: 'Th8', uv: 1400, pv: 680, amt: 1700,
  },
  {
    name: 'Th9', uv: 1400, pv: 680, amt: 1700,
  },
  {
    name: 'Th10', uv: 1400, pv: 680, amt: 1700,
  },
  {
    name: 'Th11', uv: 1400, pv: 680, amt: 1700,
  },
  {
    name: 'Th12', uv: 1400, pv: 680, amt: 1700,
  },
];

const dataChart2 = [
  { name: 'Admin', value: 4 },
  { name: 'NV Giám sát', value: 10 },
  { name: 'NV Xử lý sự cố', value: 15 },
  { name: 'Khác', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Dashboard() {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16, marginTop: 8, fontSize: 18, fontWeight: 500 }}
      >
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
        <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="space-between" align="top" gutter={[16, 16]}>
        <Col span={6}>
          <Card className="u-shadow u-rounded">
            <h1>Drone</h1>
            <div>Tổng: 100</div>
            <div>Đang sử dụng: 30</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="u-shadow u-rounded">
            <h1>Drone</h1>
            <div>Tổng: 100</div>
            <div>Đang sử dụng: 30</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="u-shadow u-rounded">
            <h1>Drone</h1>
            <div>Tổng: 100</div>
            <div>Đang sử dụng: 30</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="u-shadow u-rounded">
            <h1>Drone</h1>
            <div>Tổng: 100</div>
            <div>Đang sử dụng: 30</div>
          </Card>
        </Col>
        {/* <Col span={4}>
          <Card className="u-shadow u-rounded">
            <h1>Drone</h1>
            <div>Tổng: 100</div>
            <div>Đang sử dụng: 30</div>
          </Card>
        </Col> */}
      </Row>
      <Row wrap={false} gutter={[16, 16]}>
        <Col flex="auto">
          <Card className="u-shadow u-rounded">
            <h1>Thống kê sự cố theo tháng</h1>
            <ResponsiveContainer
              height={300}
              width="100%"
            >
              <ComposedChart
                data={dataChart1}
                margin={{
                  top: 16, right: 16, bottom: 16, left: 16,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col flex="none">
          <Card className="u-shadow u-rounded">
            <h1>Tổng quan người dùng</h1>
            <ResponsiveContainer
              height={300}
              width={210}
            >
              <PieChart>
                <Pie
                  data={dataChart2}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  margin={{ bottom: 10 }}
                >
                  {
                    dataChart2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                <Legend style={{ marginTop: 16 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard;