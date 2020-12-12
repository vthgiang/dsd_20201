/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
import React from "react";
import {
  Row,
  Col,
  Table,
  Spin,
  DatePicker,
  Button,
} from "antd";
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Bar,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  BarChart,
} from "recharts";
import moment from "moment";
import { getFlightHubMetrics } from "../../services/statistics";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.1) return null;

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ff8279"];

const RADIAN = Math.PI / 180;

const columns = [
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Số lượng",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <a href="#">Chi tiết</a>
    ),
  },
];

export default function FlightHubDashboard() {
  const [flightHubMetrics, setFlightHubMetrics] = React.useState(null);
  const [startDate, setStartDate] = React.useState(moment());
  const [endDate, setEndDate] = React.useState(moment());

  const fetchCurrent = async () => {
    const payload = await getFlightHubMetrics();
    setFlightHubMetrics(payload);
  };

  const fetchWithTime = async () => {
    setFlightHubMetrics(null);
    const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
    const endDateFormatted = moment(endDate).format("YYYY-MM-DD");
    const payload = await getFlightHubMetrics(startDateFormatted, endDateFormatted);
    console.log(payload);
    setFlightHubMetrics(payload);
  };

  const chartData = React.useMemo(() => {
    if (!flightHubMetrics) return [];
    return [
      { name: "Đê điều", value: flightHubMetrics.dyke },
      { name: "Cháy rừng", value: flightHubMetrics.fire },
      { name: "Lưới điện", value: flightHubMetrics.electric },
      { name: "Cây trồng", value: flightHubMetrics.tree },
    ];
  }, [flightHubMetrics]);
  const tableData = React.useMemo(() => {
    if (!flightHubMetrics) return [];
    return [
      { status: "Đê điều", amount: flightHubMetrics.dyke },
      { status: "Cháy rừng", amount: flightHubMetrics.fire },
      { status: "Lưới điện", amount: flightHubMetrics.electric },
      { status: "Cây trồng", amount: flightHubMetrics.tree },
    ];
  }, [flightHubMetrics]);
  React.useEffect(() => {
    fetchCurrent();
  }, []);

  return (
    <>
      <h1>Đợt giám sát</h1>
      <Row>
        <Col>
          <div>Ngày bắt đầu</div>
          <DatePicker value={startDate} onChange={setStartDate} style={{ marginBottom: "20px" }} />
          <div>Ngày kết thúc</div>
          <DatePicker value={endDate} onChange={setEndDate} style={{ marginBottom: "20px" }} />
          <div />
          <Button type="primary" onClick={fetchWithTime}>Tìm kiếm</Button>
        </Col>
        {!flightHubMetrics ? (
          <Spin />
        )
          : (
            <>
              <Col span={8} offset={2}>
                <ResponsiveContainer
                  width={300}
                  height={300}
                  className="alight-item-center"
                >
                  <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                  >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col span={8} offset={1}>
                <Table
                  dataSource={tableData}
                  columns={columns}
                  size="small"
                  bordered
                  pagination={false}
                />
              </Col>
            </>
          )}
      </Row>

    </>
  );
}
