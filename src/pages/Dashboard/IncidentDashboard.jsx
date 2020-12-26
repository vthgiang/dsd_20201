import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getIncidentDetailedMetrics } from '../../services/statistics';

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
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff8279'];

export default function IncidentDashboard() {
  const [incidentMetrics, setIncidentMetrics] = React.useState(null);
  const users = useSelector((state) => state.user.user);
  const projectType = users.type;
  const token = users.api_token;
  // const role = users.role;
  const chartData = React.useMemo(() => {
    if (!incidentMetrics?.detailed) return [];
    const getMonthData = (month) =>
      incidentMetrics.detailed.filter(
        (item) => new Date(item.createdAt).getMonth() === month,
      );
    const data = Array.from(Array(12).keys()).map((month) => ({
      name: `Th${month + 1}`,
      'Bình thường': getMonthData(month).filter((item) => item.level.code === 0)
        .length,
      'Khẩn cấp': getMonthData(month).filter((item) => item.level.code === 1)
        .length,
    }));
    return data;
  }, [incidentMetrics]);
  const chartData2 = React.useMemo(() => {
    if (!incidentMetrics) return [];
    return [
      {
        name: 'Đang xử lí',
        value: incidentMetrics.overall?.created_tasks_total?.doing_total,
      },
      {
        name: 'Đã xử lí',
        value: incidentMetrics.overall?.created_tasks_total?.done_total,
      },
      {
        name: 'Chưa xử lí',
        value: incidentMetrics.overall?.created_tasks_total?.pending_total,
      },
    ];
  }, [incidentMetrics]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const incident = await getIncidentDetailedMetrics(projectType, token);
      setIncidentMetrics(incident);
    };

    fetchAll();
  }, []);

  return (
    <>
      <h2>Thống kê sự cố</h2>
      {!incidentMetrics ? (
        <Spin />
      ) : (
        <Row>
          <Col span={12} className="mt-5">
            <h3 className="ml-5">Tổng quan xử lí sự cố</h3>
            <ResponsiveContainer
              height={300}
              width={300}
              className="alight-item-center mx-auto mt-5"
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
          </Col>
          <Col span={11} offset={1} className="mt-5">
            <h3>Tiến độ xử lý sự cố</h3>
            <h6>Sự cố:</h6>
            <div>
              Tổng số sự cố:{' '}
              {incidentMetrics.overall?.created_tasks_total?.created_total}
            </div>
            <div>
              Đang khắc phục:{' '}
              {incidentMetrics.overall?.created_tasks_total?.doing_total}
            </div>
            <div>
              Đã xử lý:{' '}
              {incidentMetrics.overall?.created_tasks_total?.done_total}
            </div>
            <div>
              Đang chờ:{' '}
              {incidentMetrics.overall?.created_tasks_total?.pending_total}
            </div>
            <br />
            <h6>Nhân viên xử lý:</h6>
            <div>
              Số nhân viên đang xử lý:{' '}
              {incidentMetrics.overall?.joined_employees_total?.joined_total}
            </div>
            <br />
            <h6>Báo cáo:</h6>
            <div>
              Đã gửi:{' '}
              {incidentMetrics.overall?.result_reports_total?.sent_total}
            </div>
            <div>
              Đã duyệt:{' '}
              {incidentMetrics.overall?.result_reports_total?.accepted_total}
            </div>
            <div>
              Đã bị từ chối:{' '}
              {incidentMetrics.overall?.result_reports_total?.accepted_total}
            </div>
          </Col>
          <Col span="22" className="mt-5">
            <h3 className="ml-5 mb-5">Danh sách sự cố theo tháng</h3>
            <ResponsiveContainer height={600} width="100%">
              <BarChart
                width={800}
                height={600}
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Bình thường" stackId="a" fill="#91d5ff" />
                <Bar dataKey="Khẩn cấp" stackId="a" fill="#ff7875" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      )}
    </>
  );
}
