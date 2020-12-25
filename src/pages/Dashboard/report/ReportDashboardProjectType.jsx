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
    ResponsiveContainer,
    BarChart,
} from "recharts";
import { getReportsWithTypeMetrics } from "../../../services/statistics";
import { useSelector } from "react-redux";

export default function ReportDashboardProjectType() {
    const user = useSelector(state => state.user);
    const { api_token, type, role, full_name } = user.user;
    const [reportMetrics, setReportMetrics] = React.useState(null);
    const chartData = React.useMemo(() => {
        if (!reportMetrics) return [];
        const getMonthData = (month) => reportMetrics.filter((item) => (new Date(item.createdAt)).getMonth() === month);
        const data = Array.from(Array(12).keys()).map((month) => ({
            name: `Th${month + 1}`,
            value: getMonthData(month).length,
        }));
        return data;
    }, [reportMetrics]);

    React.useEffect(() => {
        const fetchAll = async () => {
            const reports = await getReportsWithTypeMetrics(type, api_token);
            setReportMetrics(reports);
        };
        fetchAll();
    }, []);

    return (
        <>
            <h1>Thống kê báo cáo</h1>
            {!reportMetrics ? (
                <Spin />
            ) : (
                    <Row>
                        <Col span="20">
                            <h3>Số lượng báo cáo theo tháng được gửi cho {role} {full_name}</h3>
                            <ResponsiveContainer height={300} width={800}>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={chartData}
                                    margin={{
                                        top: 20, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#91d5ff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                )}
        </>
    );
}
