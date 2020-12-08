import React from "react";
import {
  Row,
  Col,
  Table,
  Spin,
} from "antd";
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getDroneDetailedMetrics } from "../../services/statistics";

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
    render: (text, record) => (
      <a href="#">Chi tiết</a>
    ),
  },
];

export default function DroneDashboard() {
  const [droneMetrics, setDroneMetrics] = React.useState(null);
  const chartData = React.useMemo(() => {
    if (!droneMetrics) return [];
    return [
      { name: "Đang rảnh", value: droneMetrics.idle },
      { name: "Đang bay", value: droneMetrics.flying },
      { name: "Đang sạc", value: droneMetrics.charging },
      { name: "Đang bảo trì", value: droneMetrics.maintaining },
      { name: "Đã hỏng", value: droneMetrics.broken },
    ]
  }, [droneMetrics]);
  const tableData = React.useMemo(() => {
    if (!droneMetrics) return [];
    return [
      { status: "Đang rảnh", amount: droneMetrics.idle },
      { status: "Đang bay", amount: droneMetrics.flying },
      { status: "Đang sạc", amount: droneMetrics.charging },
      { status: "Đang bảo trì", amount: droneMetrics.maintaining },
      { status: "Đã hỏng", amount: droneMetrics.broken },
    ]
  }, [droneMetrics]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const drone = await getDroneDetailedMetrics();
      setDroneMetrics(drone);
    }

    fetchAll();
  }, []);

  return (
    <>
      <h1>Drone</h1>
      {!droneMetrics ? (
        <Spin />
      ) : (
        <Row>
          <Col span={10} offset={2}>
            <ResponsiveContainer
              height={300}
              width={300}
              className="alight-item-center"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  margin={{ bottom: 10 }}
                >
                  {chartData.map((entry, index) => (
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
            <Table
              dataSource={tableData}
              columns={columns}
              size="small"
              bordered
            />
          </Col>
        </Row>
      )}
    </>
  );
}
