/* eslint-disable no-nested-ternary */
import React from "react";
import {
    Row,
    Col,
    Table,
    Spin,
    DatePicker,
    Button,
    TimePicker,
} from "antd";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
} from "recharts";
import moment from "moment";
import { getSystemLogMetrics, getUserLogAllMetrics } from "../../services/statistics";

const columns = [
    {
        title: "Tác nhân",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Loại dự án",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Thời gian",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Hoạt động",
        dataIndex: "description",
        key: "description",
    },
];
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

export default function LogDashboard() {
    const [systemLogMetrics, setSystemLogMetrics] = React.useState(null);
    const [userLogMetrics, setUserLogMetrics] = React.useState(null);
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const [startTime, setStartTime] = React.useState(moment());
    const [endTime, setEndTime] = React.useState(moment());
    const [isButtonFirstClicked, setIsButtonFirstClicked] = React.useState(false);

    const fetchSystemLog = async () => {
        const payload = await getSystemLogMetrics();
        setSystemLogMetrics(payload);
    };

    const fetchUserLog = async () => {
        if (!isButtonFirstClicked) { setIsButtonFirstClicked(true); }
        setUserLogMetrics(null);
        const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
        const endDateFormatted = moment(endDate).format("YYYY-MM-DD");
        const startTimeFormatted = moment(startTime).format("HH:mm:ss");
        const endTimeFormatted = moment(endTime).format("HH:mm:ss");
        const payload = await getUserLogAllMetrics(`${startDateFormatted} ${startTimeFormatted}`, `${endDateFormatted} ${endTimeFormatted}`);
        setUserLogMetrics(payload);
    };

    const chartPieData = React.useMemo(() => {
        if (!systemLogMetrics) return [];
        return [
            { name: "Đê điều", value: systemLogMetrics.dyke.length },
            { name: "Cháy rừng", value: systemLogMetrics.fire.length },
            { name: "Lưới điện", value: systemLogMetrics.electric.length },
            { name: "Cây trồng", value: systemLogMetrics.tree.length },
        ];
    }, [systemLogMetrics]);
    const chartTableData = React.useMemo(() => {
        if (!systemLogMetrics) return [];
        return systemLogMetrics.full.map((item) => ({
            name: item.name || item.link,
            type: item.projectType,
            description: item.description,
            time: moment(item.timestamp).format("YYYY-MM-DD HH:mm:ss"),
        }));
    }, [systemLogMetrics]);
    const chartBarUserData = React.useMemo(() => {
        if (!userLogMetrics) return [];
        return [
            { name: "Đê điều", value: userLogMetrics.dyke },
            { name: "Cháy rừng", value: userLogMetrics.fire },
            { name: "Lưới điện", value: userLogMetrics.electric },
            { name: "Cây trồng", value: userLogMetrics.tree },
        ];
    }, [userLogMetrics]);
    React.useEffect(() => {
        fetchSystemLog();
    }, []);

    return (
        <>
            <h1>Lịch sử hoạt động hệ thống</h1>
            <Row>
                {!systemLogMetrics ? (
                    <Spin />
                )
                    : (
                        <>
                            <Col span={7} offset={1}>
                                <h3>Thống kê hoạt động hệ thống</h3>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={chartPieData}
                                        cx={100}
                                        cy={100}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        margin={{ bottom: 10 }}
                                    >
                                        {chartPieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend style={{ marginTop: 16 }} />
                                </PieChart>
                            </Col>
                            <Col span={14} offset={2}>
                                <h3>Danh sách hoạt động hệ thống</h3>
                                <Table
                                    dataSource={chartTableData}
                                    columns={columns}
                                    size="small"
                                    bordered
                                    pagination={{ defaultPageSize: 5, showSizeChanger: false }}
                                />
                            </Col>
                        </>
                    )}
            </Row>
            <h1>Lịch sử hoạt động những người dùng</h1>
            <Row>
                <Col>
                    <div>Thời điểm bắt đầu</div>
                    <DatePicker value={startDate} onChange={setStartDate} style={{ marginBottom: "20px" }} />
                    <TimePicker value={startTime} onChange={setStartTime} style={{ marginBottom: "20px" }} />
                    <div>Thời điểm kết thúc</div>
                    <DatePicker value={endDate} onChange={setEndDate} style={{ marginBottom: "20px" }} />
                    <TimePicker value={endTime} onChange={setEndTime} style={{ marginBottom: "20px" }} />
                    <div />
                    <Button type="primary" onClick={fetchUserLog}>Tìm kiếm</Button>
                </Col>
                {isButtonFirstClicked ? (
                    !userLogMetrics ? (
                        <Spin />
                    )
                        : (
                            <>
                                <Col span={8} offset={2}>
                                    <BarChart
                                        width={400}
                                        height={300}
                                        data={chartBarUserData}
                                    >
                                        <CartesianGrid strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#FF8042" label />
                                    </BarChart>
                                </Col>
                            </>
                        )
                ) : <div />}
            </Row>
        </>
    );
}
