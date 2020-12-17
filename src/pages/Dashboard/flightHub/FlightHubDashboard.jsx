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
    ResponsiveContainer,
    Bar,
    Tooltip,
    YAxis,
    XAxis,
    CartesianGrid,
    BarChart,
} from "recharts";
import moment from "moment";
import { getFlightHubMetrics } from "../../../services/statistics";

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
                    <Col offset={4}>
                        <Spin />
                    </Col>
                )
                    : (
                        <>
                            <Col span={8}>
                                <ResponsiveContainer
                                    width={400}
                                    height={300}
                                    className="alight-item-center"
                                >
                                    <BarChart
                                        width={400}
                                        height={300}
                                        data={chartData}
                                    >
                                        <CartesianGrid strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#FF8042" label />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Col>
                            <Col span={8} offset={3}>
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
