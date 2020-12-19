import React from "react";
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  Spin,
} from "antd";
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
} from "recharts";
import { getUsersMetrics } from "../../services/statistics";

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

export default function UsersDashboard() {
  const users = useSelector((state) => state.user.user);
  const projectType = users.type;
  const role = users.role;
  console.log(users)   
  const [usersMetrics, setUsersMetrics] = React.useState(null);
  const chartData = React.useMemo(() => {
    if (!usersMetrics) return [];
    return [
      { name: "Quản trị viên", value: usersMetrics.admin.length },
      { name: "Quản lý", value: usersMetrics.manager.length },
      { name: "Nhân viên Drone", value: usersMetrics.droneStaff.length },
      { name: "Nhân viên Sự cố", value: usersMetrics.incidentStaff.length },
      { name: "Nhân viên Giám sát", value: usersMetrics.supervisor.length },
    ];
  }, [usersMetrics]);
  const barChartData = React.useMemo(() => {
    if (!usersMetrics) return [];
    const data = ["admin", "manager", "droneStaff", "incidentStaff", "supervisor"].map((role) => ({
      name: role,
      active: usersMetrics[role]?.filter((item) => item.status === "ACTIVE").length,
      inactive: usersMetrics[role]?.filter((item) => item.status === "INACTIVE").length,
      pending: usersMetrics[role]?.filter((item) => item.status === "PENDING").length,
    }));
    console.log({ data });
    return data;
  }, [usersMetrics]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const users = await getUsersMetrics(projectType);
      setUsersMetrics(users);
    };

    fetchAll();
  }, []);

  return (
    <>
      <h1>Tổng quan người dùng</h1>
      {!usersMetrics ? (
        <Spin />
      ) : (
        <Row>
          <Col span={8} offset={2}>
            <h3>Tổng quan người dùng</h3>
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
          <Col span={12} offset={2}>
            <h3>Trạng thái người dùng</h3>
            <ResponsiveContainer height={300} width="100%">
              <BarChart
                width={500}
                height={300}
                data={barChartData}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" stackId="a" fill="#a0d911" />
                <Bar dataKey="pending" stackId="a" fill="#fadb14" />
                <Bar dataKey="inactive" stackId="a" fill="#f5222d" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      )}
    </>
  );
}
