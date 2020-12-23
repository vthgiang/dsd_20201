import React from "react";
import { useSelector } from 'react-redux';
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

const RADIAN = Math.PI / 180;

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
const columns2 = [
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

export default function DroneDashboard() {
  const users = useSelector((state) => state.user.user);
  const projectType = users.type;
  const role = users.role;
  const [droneMetrics, setDroneMetrics] = React.useState(null);
  const chartData = React.useMemo(() => {
    if (!droneMetrics) return [];
    return [
      { name: "Đang rảnh", value: droneMetrics.idle },
      { name: "Đang bay", value: droneMetrics.flying },
      { name: "Đang sạc", value: droneMetrics.charging },
      { name: "Đang bảo trì", value: droneMetrics.maintaining },
      { name: "Đã hỏng", value: droneMetrics.broken },
    ];
  }, [droneMetrics]);
  const chartData2 = React.useMemo(() => {
    if (!droneMetrics) return [];
    return [
      { name: "Cháy rừng", value: droneMetrics.CR },
      { name: "Đê điều", value: droneMetrics.DD },
      { name: "Lưới điện", value: droneMetrics.LD },
      { name: "Cây trồng", value: droneMetrics.CT },
      { name: "Chưa phân công", value: droneMetrics.noProject },
    ];
  }, [droneMetrics]);
  const tableData = React.useMemo(() => {
    if (!droneMetrics) return [];
    return [
      { status: "Đang rảnh", amount: droneMetrics.idle },
      { status: "Đang bay", amount: droneMetrics.flying },
      { status: "Đang sạc", amount: droneMetrics.charging },
      { status: "Đang bảo trì", amount: droneMetrics.maintaining },
      { status: "Đã hỏng", amount: droneMetrics.broken },
      { status: "No project", amount: droneMetrics.noProject},
    ];
  }, [droneMetrics]);

  const tableData2 = React.useMemo(() => {
    if (!droneMetrics) return [];
    if (role != 'SUPER_ADMIN') return [];
    return [
      { status: "Cháy rừng", amount: droneMetrics.CR },
      { status: "Đê điều", amount: droneMetrics.DD },
      { status: "Lưới điện", amount: droneMetrics.LD },
      { status: "Cây trồng", amount: droneMetrics.CT },
      { status: "Chưa phân công", amount: droneMetrics.noProject},
    ];
  }, [droneMetrics]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const drone = await getDroneDetailedMetrics(projectType);
      setDroneMetrics(drone);
    };

    fetchAll();
  }, []);

  return (
    <>
      <h1>Drone</h1>
      {!droneMetrics ? (
        <Spin />
      ) : (
        <Row>
          <Col span={10} offset={2} className='mt-5'>
            <h3 className="ml-5">Tổng quan trạng thái drone</h3>
            <ResponsiveContainer
              height={300}
              width={300}
              className="alight-item-center mt-5 mx-auto"
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
          
          <Col span={11} offset={1} className='mt-5'>
            <h3 className="ml-5">Số lượng từng loại</h3>
            <Table
              className="mt-5"
              dataSource={tableData}
              columns={columns}
              size="small"
              bordered
            />
          </Col>
          {
            role=='SUPER_ADMIN'?
            <Col span={10} offset={2} className='mt-5'>
              <h3 className="ml-5">Tổng quan drone đang bay</h3>
              <ResponsiveContainer
                height={300}
                width={300}
                className="alight-item-center mt-5 mx-auto"
              >
                <PieChart>
                  <Pie
                    data={chartData2}
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
            </Col> : null
          }
          {
            role=='SUPER_ADMIN'?
            <Col span={11} offset={1} className='mt-5'>
              <h3 className="ml-5">Số lượng Drone từng dự án</h3>
              <Table
                className="mt-5"
                dataSource={tableData2}
                columns={columns2}
                size="small"
                bordered
              />
            </Col> : null
          }
        </Row>
      )}
    </>
  );
}
