import React, { useState } from "react";
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
    ComposedChart,
    Legend,
    Line,
} from "recharts";
import moment from "moment";
import { getFlightHubProjectTypeMetrics } from "../../../services/statistics";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";

const columns = [
    {
        title: "Đợt giám sát",
        dataIndex: "name",
        key: "status",
    },
    {
        title: "Thời gian bắt đầu",
        dataIndex: "startTime",
        key: "startTime",
        render: (value) => (
            moment(value).format("HH:mm DD/MM/YYYY")
        )
    },
    {
        title: "Thời gian kết thúc",
        dataIndex: "endTime",
        key: "endTime",
        render: (value) => (
            moment(value).format("HH:mm DD/MM/YYYY")
        )
    },
    {
        title: "Miền giám sát",
        dataIndex: "monitoredZone",
        key: "monitoredZone",
    },
    {
        title: "Đối tượng giám sát",
        dataIndex: "monitoredObjectsList",
        key: "monitoredObjectsList",
        render: (list) => (
            list.map((item, index) => (
                <div>{index + 1}. {item}</div>
            ))
        ),
    },
    {
        title: "Drone sử dụng",
        dataIndex: "dronesList",
        key: "dronesList",
        render: (list) => (
            list.map((item, index) => (
                <div>{index + 1}. {item}</div>
            ))
        ),
    },
];

export default function FlightHubProjectTypeDashboard() {
    const user = useSelector((state) => state.user);
    const [flightHubMetrics, setFlightHubMetrics] = React.useState(null);
    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const startDateFormatted = moment(startDate).format("YYYY-MM-DD");
    const endDateFormatted = moment(endDate).format("YYYY-MM-DD");
    const [startDateRender, setStartDateRender] = useState(moment(startDate).format("DD/MM/YYYY"));
    const [endDateRender, setEndDateRender] = useState(moment(endDate).format("DD/MM/YYYY"));
    const projectType = user.projectType === 'LUOI_DIEN' ? "Điện" : user.projectType === 'DE_DIEU' ? "Đê điều" : user.projectType === 'CHAY_RUNG' ? "Cháy rừng" : "Cây trồng";

    const fetchWithTime = async () => {
        setFlightHubMetrics(null);
        setStartDateRender(moment(startDate).format("DD/MM/YYYY"));
        setEndDateRender(moment(endDate).format("DD/MM/YYYY"));
        const payload = await getFlightHubProjectTypeMetrics(startDateFormatted, endDateFormatted, projectType);
        setFlightHubMetrics(payload);
    };
    const tableData = React.useMemo(() => {
        if (!flightHubMetrics || isEmpty(flightHubMetrics)) return [];
        return flightHubMetrics;
    }, [flightHubMetrics]);
    const chartData = React.useMemo(() => {
        if (!flightHubMetrics || isEmpty(flightHubMetrics)) return [];
        const metricsWithDaysArr = [];
        const deltaDays = Math.floor(moment.duration(endDate.diff(startDate)).asDays());
        const finalDeltaDays = deltaDays === 0 ? deltaDays : deltaDays + 1;
        for (var i = 1, tempDay = startDate.clone(); i <= finalDeltaDays; i++) {
            const tempDayFormatted = tempDay.format("DD/MM");
            metricsWithDaysArr.push({
                name: tempDayFormatted,
                value: flightHubMetrics.filter(item => moment(item.startTime).isSameOrBefore(tempDay) && moment(item.endTime).isSameOrAfter(tempDay)).length
            })
            tempDay.add(1, 'days')
        }
        return metricsWithDaysArr;
    }, [flightHubMetrics]);
    React.useEffect(() => {
        fetchWithTime();
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
                <Col span={18} offset={1}>
                    <h3>Biểu đồ thống kê đợt giám sát {startDateRender === endDateRender ?
                        startDateRender : `${startDateRender} - ${endDateRender}`}</h3>
                    {!flightHubMetrics ? <Spin /> :
                        isEmpty(flightHubMetrics)
                            ? <div>Không có dữ liệu</div>
                            : (
                                <Col style={{ overflowX: 'scroll', width: "900px" }}>
                                    <BarChart
                                        width={(20 + 50) * chartData.length}
                                        height={300}
                                        data={chartData}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="value" barSize={20} fill="#8884d8" label />
                                    </BarChart>
                                </Col>
                            )}
                    <div />
                    <h3 style={{ marginTop: '10px' }}>Bảng thống kê đợt giám sát {startDateRender === endDateRender ?
                        startDateRender : `${startDateRender} - ${endDateRender}`}</h3>
                    {!flightHubMetrics ? <Spin /> :
                        isEmpty(flightHubMetrics)
                            ? <div>Không có dữ liệu</div>
                            : <Table
                                dataSource={tableData}
                                columns={columns}
                                size="small"
                                bordered
                                pagination={false}
                            />}
                    <div />
                </Col>
            </Row>

        </>
    );
}
