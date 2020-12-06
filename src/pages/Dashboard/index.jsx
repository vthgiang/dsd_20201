import React from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  DatePicker,
  Space,
  Table,
  Tabs,
} from "antd";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Text,
  AreaChart,
} from "recharts";

const { TabPane } = Tabs;

const dataChart1 = [
  {
    name: "Th1",
    error: 590,
    pass: 800,
    amt: 1400,
  },
  {
    name: "Th2",
    error: 868,
    pass: 967,
    amt: 1506,
  },
  {
    name: "Th3",
    error: 1397,
    pass: 1098,
    amt: 989,
  },
  {
    name: "Th4",
    error: 1480,
    pass: 1200,
    amt: 1228,
  },
  {
    name: "Th5",
    error: 1520,
    pass: 1108,
    amt: 1100,
  },
  {
    name: "Th6",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
  {
    name: "Th7",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
  {
    name: "Th8",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
  {
    name: "Th9",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
  {
    name: "Th10",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
  {
    name: "Th11",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
  {
    name: "Th12",
    error: 1400,
    pass: 680,
    amt: 1700,
  },
];

const dataChart2 = [
  { name: "Admin", value: 4 },
  { name: "NV Giám sát", value: 10 },
  { name: "NV Xử lý sự cố", value: 15 },
  { name: "Khác", value: 5 },
];

const dataDB = [
  { name: "Drone", num: "100", used: "20" },
  { name: "Sự cố", num: "100", used: "20" },
  { name: "Đối tượng giám sát", num: "100", used: "20" },
  { name: "Người dùng", num: "100", used: "20" },
];

const dataChart3 = [
  {
    name: "Tháng 1",
    error: 400,
    pass: 2400,
    amt: 2400,
  },
  {
    name: "Tháng 2",
    error: 300,
    pass: 1398,
    amt: 2210,
  },
  {
    name: "Tháng 3",
    error: 200,
    pass: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 4",
    error: 270,
    pass: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 5",
    error: 180,
    pass: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 6",
    error: 230,
    pass: 3800,
    amt: 2500,
  },
  {
    name: "Tháng 7",
    error: 340,
    pass: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 8",
    error: 340,
    pass: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 9",
    error: 90,
    pass: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 10",
    error: 30,
    pass: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 11",
    error: 390,
    pass: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 12",
    error: 349,
    pass: 4300,
    amt: 2100,
  },
];

// Table
const dataSource = [
  {
    key: "1",
    name: "Admin",
    age: "10:11:05 25-11-2020",
    status: "error",
  },
  {
    key: "2",
    name: "John",
    age: "10:11:05 25-11-2020",
    status: "pass",
  },
  {
    key: "3",
    name: "John",
    age: "10:11:05 25-11-2020",
    status: "pass",
  },
  {
    key: "4",
    name: "John",
    age: "10:11:05 25-11-2020",
    status: "pass",
  },
  {
    key: "5",
    name: "John",
    age: "10:11:05 25-11-2020",
    status: "pass",
  },
];

const columns = [
  {
    title: "Tác nhân",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Thời gian",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Hành động",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Chi tiết</a>
      </Space>
    ),
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function onChange(date, dateString) {
  console.log(date, dateString);
}

function callback(key) {
  console.log(key);
}

function Dashboard() {
  return (
    <div>
      <Breadcrumb
        style={{
          marginBottom: 16,
          marginTop: 8,
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        <Breadcrumb.Item>Báo cáo thống kê</Breadcrumb.Item>
        <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        justify="space-around"
        align="top"
        gutter={[16, 16]}
        style={{ alignItems: "stretch" }}
      >
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-primary border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Drone</h4>
            <div>Tổng: 500</div>
            <div>Đang sử dụng: 450</div>
            <div>Dự phòng: 50</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-danger border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Sự cố</h4>
            <div>Sự cố mới trong tháng: 100</div>
            <div>Đang khắc phục: 30</div>
            <div>Đã sửa chữa: 70</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-warning border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Lịch sử hoạt động</h4>
            <div>Hoạt động được thực hiện: 2000</div>
            <div>Lỗi hệ thống: 20</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-success border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Người dùng</h4>
            <div>Tổng: 20</div>
            <div>Admin: 5</div>
            <div>Đang hoạt động: 15</div>
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
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane key="Tab 1" tab="Drone">
                <h1>Drone</h1>
                <ResponsiveContainer height={300} width="100%">
                  <ComposedChart
                    data={dataChart1}
                    margin={{
                      top: 16,
                      right: 16,
                      bottom: 16,
                      left: 16,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="error" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="error" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabPane>
              <TabPane key="Tab 2" tab="Sự cố">
                <h1>Thống kê sự cố theo tháng</h1>
                <Row>
                  <Col span="12">
                    <h3>Danh sách sự cố theo thángtháng</h3>
                    <ResponsiveContainer height={500} width="100%">
                      <ComposedChart
                        data={dataChart1}
                        margin={{
                          top: 16,
                          right: 16,
                          bottom: 16,
                          left: 16,
                        }}
                      >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="error" barSize={20} fill="#413ea0" />
                        <Line
                          type="monotone"
                          dataKey="error"
                          stroke="#ff7300"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col span={11} offset={1}>
                    <h3>Danh sách sự cố</h3>
                    <Table dataSource={dataSource} columns={columns} />;
                  </Col>
                </Row>
              </TabPane>
              <TabPane key="Tab 3" tab="Lịch sử hoạt động">
                <h1>Lịch sử hoạt động của hệ thống</h1>
                <Row>
                  <Col span={12}>
                    <h3>Thống kê hoạt động của hệ thống</h3>
                    <div className="d-flex justify-content-around mb-4">
                      <h3 className="align-self-center mb-1">Năm:</h3>
                      <Space direction="vertical" className="align-self-center">
                        <DatePicker onChange={onChange} picker="year" />
                      </Space>
                    </div>
                    <ResponsiveContainer height={300} width="100%">
                      <AreaChart
                        data={dataChart3}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorerror"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorpass"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#82ca9d"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#82ca9d"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="error"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorerror)"
                        />
                        <Area
                          type="monotone"
                          dataKey="pass"
                          stroke="#82ca9d"
                          fillOpacity={1}
                          fill="url(#colorpass)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col span={11} offset={1}>
                    <h3>Hoạt động</h3>
                    <Table dataSource={dataSource} columns={columns} />;
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Người sử dụng" key="Tab 4">
                <h1>Tổng quan người dùng</h1>
                <Row>
                  <Col span={10} offset={2}>
                    <h3 className="mb-5">Tỉ lệ người dùng</h3>
                    <ResponsiveContainer
                      height={300}
                      width="80%"
                      className="alight-item-center"
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
                          {dataChart2.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend style={{ marginTop: 16 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col span={11} offset={1}>
                    <h3>Danh sách người dùng</h3>
                    <Table dataSource={dataSource} columns={columns} />;
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
