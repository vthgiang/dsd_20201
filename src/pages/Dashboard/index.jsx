import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  DatePicker,
  Space,
  Table,
  Tabs,
  Spin,
} from "antd";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
} from "recharts";
import QueryString from "query-string";

import DroneDashboard from "./DroneDashboard";
import IncidentDashboard from "./IncidentDashboard";
import UsersDashboard from "./UsersDashboard";
import PayloadDashboard from "./PayloadDashboard";
import FlightHubDashboard from "./FlightHubDashboard";
import {
  getDroneOverallMetrics,
  getIncidentOverallMetrics,
  getUsersMetrics,
  getPayloadOverallMetrics,
} from "../../services/statistics";
import MonitorZoneDashboard from "./MonitorZoneDashboard";

const { TabPane } = Tabs;

const dataChart2 = [
  { name: "Admin", value: 4 },
  { name: "NV Giám sát", value: 10 },
  { name: "NV Xử lý sự cố", value: 15 },
  { name: "Khác", value: 5 },
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
  const location = useLocation();
  const history = useHistory();
  const query = QueryString.parse(location);
  const [activeTab, setActiveTab] = React.useState(query.tab);
  const [droneMetrics, setDroneMetrics] = React.useState(null);
  const [incidentMetrics, setIncidentMetrics] = React.useState(null);
  const [usersMetrics, setUsersMetrics] = React.useState(null);
  const [payloadMetrics, setPayloadMetrics] = React.useState(null);

  const onTabChange = React.useCallback((key) => {
    history.push({
      pathname: location.pathname,
      search: QueryString.stringify({
        ...query,
        tab: key,
      }),
    });
    setActiveTab(key);
  }, [history, location]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all([
        getDroneOverallMetrics(),
        getIncidentOverallMetrics(),
        getUsersMetrics(),
        getPayloadOverallMetrics(),
      ]);
      setDroneMetrics(results[0]);
      setIncidentMetrics(results[1]);
      setUsersMetrics(results[2]);
      setPayloadMetrics(results[3]);
    };

    fetchAll();
  }, []);

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
            {!droneMetrics ? (
              <Spin />
            ) : (
              <>
                <div>Tổng: {droneMetrics.all}</div>
                <div>Đang sử dụng: {droneMetrics.working}</div>
                <div>Đang hỏng: {droneMetrics.broken}</div>
              </>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-warning border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Payload</h4>
            {!payloadMetrics ? (
              <Spin />
            ) : (
              <>
                <div>Tổng: {payloadMetrics.all}</div>
                <div>Đang sử dụng: {payloadMetrics.working}</div>
                <div>Đang chờ: {payloadMetrics.idle}</div>
              </>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-danger border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Sự cố</h4>
            {!incidentMetrics ? (
              <Spin />
            ) : (
              <>
                <div>Tổng số sự cố: {incidentMetrics.all}</div>
                <div>Đang khắc phục: {incidentMetrics.doing}</div>
                <div>Đã xử lý: {incidentMetrics.done}</div>
                <div>Đang chờ: {incidentMetrics.pending}</div>
              </>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="u-shadow u-rounded border-success border-top-0 border-right-0 border-bottom-0 u-border-medium"
            style={{ height: "100%" }}
          >
            <h4>Người dùng</h4>
            {!usersMetrics ? (
              <Spin />
            ) : (
              <>
                <div>Tổng: {usersMetrics.all}</div>
                <div>Đang hoạt động: {usersMetrics.active}</div>
                <div>Đang chờ: {usersMetrics.pending}</div>
                <div>Đang không hoạt động: {usersMetrics.inactive}</div>
              </>
            )}
          </Card>
        </Col>
      </Row>
      <Row wrap={false} gutter={[16, 16]}>
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <Tabs
              defaultActiveKey="Drone"
              // activeKey={activeTab}
              onChange={onTabChange}
            >
              <TabPane key="Drone" tab="Drone">
                <DroneDashboard />
              </TabPane>
              <TabPane key="Payload" tab="Payload">
                <PayloadDashboard />
              </TabPane>
              <TabPane key="Tab 2" tab="Sự cố">
                <IncidentDashboard />
              </TabPane>
              <TabPane tab="Người sử dụng" key="Tab 4">
                <UsersDashboard />
              </TabPane>
              <TabPane key="Cảnh báo" tab="Cảnh báo">
                <div />
              </TabPane>
              <TabPane key="Ảnh/Video" tab="Ảnh/Video">
                <div />
              </TabPane>
              <TabPane key="Đợt giám sát" tab="Đợt giám sát">
                <FlightHubDashboard />
              </TabPane>
              <TabPane key="Miền giám sát" tab="Miền giám sát">
                <MonitorZoneDashboard />
              </TabPane>
              <TabPane key="Đối tượng giám sát" tab="Đối tượng giám sát">
                <div />
              </TabPane>
              <TabPane key="Báo cáo" tab="Báo cáo">
                <div />
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
                        margin={{
                          top: 10, right: 30, left: 0, bottom: 0,
                        }}
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
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
