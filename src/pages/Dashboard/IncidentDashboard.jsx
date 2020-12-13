import React from "react";
import {
  Row,
  Col,
  Spin,
} from "antd";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { getIncidentDetailedMetrics } from "../../services/statistics";

export default function IncidentDashboard() {
  const [incidentMetrics, setIncidentMetrics] = React.useState(null);
  const chartData = React.useMemo(() => {
    if (!incidentMetrics?.detailed) return [];
    const getMonthData = (month) => incidentMetrics.detailed.filter((item) => (new Date(item.createdAt)).getMonth() === month);
    const data = Array.from(Array(12).keys()).map((month) => ({
      name: `Th${month + 1}`,
      normal: getMonthData(month).filter((item) => item.level.code === 0).length,
      urgent: getMonthData(month).filter((item) => item.level.code === 1).length,
    }));
    return data;
  }, [incidentMetrics]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const incident = await getIncidentDetailedMetrics();
      setIncidentMetrics(incident);
    };

    fetchAll();
  }, []);

  return (
    <>
      <h1>Thống kê sự cố</h1>
      {!incidentMetrics ? (
        <Spin />
      ) : (
        <Row>
          <Col span="12">
            <h3>Danh sách sự cố theo tháng</h3>
            <ResponsiveContainer height={300} width="100%">
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="normal" stackId="a" fill="#91d5ff" />
                <Bar dataKey="urgent" stackId="a" fill="#ff7875" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col span={11} offset={1}>
            <h3>Tiến độ xử lý sự cố</h3>
            <h6>Sự cố:</h6>
            <div>Tổng số sự cố: {incidentMetrics.overall?.created_tasks_total?.created_total}</div>
            <div>Đang khắc phục: {incidentMetrics.overall?.created_tasks_total?.doing_total}</div>
            <div>Đã xử lý: {incidentMetrics.overall?.created_tasks_total?.done_total}</div>
            <div>Đang chờ: {incidentMetrics.overall?.created_tasks_total?.pending_total}</div>
            <br />
            <h6>Nhân viên xử lý:</h6>
            <div>Số nhân viên đang xử lý: {incidentMetrics.overall?.joined_employees_total?.joined_total}</div>
            <br />
            <h6>Báo cáo:</h6>
            <div>Đã gửi: {incidentMetrics.overall?.result_reports_total?.sent_total}</div>
            <div>Đã duyệt: {incidentMetrics.overall?.result_reports_total?.accepted_total}</div>
            <div>Đã bị từ chối: {incidentMetrics.overall?.result_reports_total?.accepted_total}</div>
          </Col>
        </Row>
      )}
    </>
  );
}
