import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
    Breadcrumb,
    Row,
    Col,
    Card,
    Tabs,
    Spin,
} from "antd";
import QueryString from "query-string";

import DroneDashboard from "./DroneDashboard";
import IncidentDashboard from "./IncidentDashboard";
import UsersDashboard from "./UsersDashboard";
import PayloadDashboard from "./PayloadDashboard";
import FlightHubDashboard from "./FlightHubDashboard";
import {
    getDroneOverallMetrics,
    getIncidentOverallMetrics,
    getUsersMetrics,
    getPayloadOverallMetrics,
} from "../../services/statistics";
import MonitorZoneDashboard from "./MonitorZoneDashboard";
import LogDashboard from "./LogDashboard";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function Dashboard() {
    // Role here to detect what to render
    const role = useSelector((state) => state.user.role);

    const location = useLocation();
    const history = useHistory();
    const query = QueryString.parse(location);
    const [activeTab, setActiveTab] = React.useState(query.tab);
    const [droneMetrics, setDroneMetrics] = React.useState(null);
    const [incidentMetrics, setIncidentMetrics] = React.useState(null);
    const [usersMetrics, setUsersMetrics] = React.useState(null);
    const [payloadMetrics, setPayloadMetrics] = React.useState(null);

    const onTabChange = React.useCallback((key) => {
        history.push({
            pathname: location.pathname,
            search: QueryString.stringify({
                ...query,
                tab: key,
            }),
        });
        setActiveTab(key);
    }, [history, location]);

    React.useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.all([
                getDroneOverallMetrics(),
                getIncidentOverallMetrics(),
                getUsersMetrics(),
                getPayloadOverallMetrics(),
            ]);
            setDroneMetrics(results[0]);
            setIncidentMetrics(results[1]);
            setUsersMetrics(results[2]);
            setPayloadMetrics(results[3]);
        };

        fetchAll();
    }, []);

    return (
        <div>
            <Breadcrumb
                style={{
                    marginBottom: 16,
                    marginTop: 8,
                    fontSize: 18,
                    fontWeight: 500,
                }}
            >
                <Breadcrumb.Item>Báo cáo thống kê</Breadcrumb.Item>
                <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
            </Breadcrumb>
            <Row
                justify="space-around"
                align="top"
                gutter={[16, 16]}
                style={{ alignItems: "stretch" }}
            >
                <Col span={6}>
                    <Card
                        className="u-shadow u-rounded border-primary border-top-0 border-right-0 border-bottom-0 u-border-medium"
                        style={{ height: "100%" }}
                    >
                        <h4>Drone</h4>
                        {!droneMetrics ? (
                            <Spin />
                        ) : (
                                <>
                                    <div>Tổng: {droneMetrics.all}</div>
                                    <div>Đang sử dụng: {droneMetrics.working}</div>
                                    <div>Đang hỏng: {droneMetrics.broken}</div>
                                </>
                            )}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        className="u-shadow u-rounded border-warning border-top-0 border-right-0 border-bottom-0 u-border-medium"
                        style={{ height: "100%" }}
                    >
                        <h4>Payload</h4>
                        {!payloadMetrics ? (
                            <Spin />
                        ) : (
                                <>
                                    <div>Tổng: {payloadMetrics.all}</div>
                                    <div>Đang sử dụng: {payloadMetrics.working}</div>
                                    <div>Đang chờ: {payloadMetrics.idle}</div>
                                </>
                            )}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        className="u-shadow u-rounded border-danger border-top-0 border-right-0 border-bottom-0 u-border-medium"
                        style={{ height: "100%" }}
                    >
                        <h4>Sự cố</h4>
                        {!incidentMetrics ? (
                            <Spin />
                        ) : (
                                <>
                                    <div>Tổng số sự cố: {incidentMetrics.all}</div>
                                    <div>Đang khắc phục: {incidentMetrics.doing}</div>
                                    <div>Đã xử lý: {incidentMetrics.done}</div>
                                    <div>Đang chờ: {incidentMetrics.pending}</div>
                                </>
                            )}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        className="u-shadow u-rounded border-success border-top-0 border-right-0 border-bottom-0 u-border-medium"
                        style={{ height: "100%" }}
                    >
                        <h4>Người dùng</h4>
                        {!usersMetrics ? (
                            <Spin />
                        ) : (
                                <>
                                    <div>Tổng: {usersMetrics.all}</div>
                                    <div>Đang hoạt động: {usersMetrics.active}</div>
                                    <div>Đang chờ: {usersMetrics.pending}</div>
                                    <div>Đang không hoạt động: {usersMetrics.inactive}</div>
                                </>
                            )}
                    </Card>
                </Col>
            </Row>
            <Row wrap={false} gutter={[16, 16]}>
                <Col span={24}>
                    <Card className="u-shadow u-rounded">
                        <Tabs
                            defaultActiveKey="Drone"
                            // activeKey={activeTab}
                            onChange={onTabChange}
                        >
                            <TabPane key="Drone" tab="Drone">
                                <DroneDashboard />
                            </TabPane>
                            <TabPane key="Payload" tab="Payload">
                                <PayloadDashboard />
                            </TabPane>
                            <TabPane key="Tab 2" tab="Sự cố">
                                <IncidentDashboard />
                            </TabPane>
                            <TabPane tab="Người sử dụng" key="Tab 4">
                                <UsersDashboard />
                            </TabPane>
                            <TabPane key="Cảnh báo" tab="Cảnh báo">
                                <div />
                            </TabPane>
                            <TabPane key="Ảnh/Video" tab="Ảnh/Video">
                                <div />
                            </TabPane>
                            <TabPane key="Đợt giám sát" tab="Đợt giám sát">
                                <FlightHubDashboard />
                            </TabPane>
                            <TabPane key="Miền giám sát" tab="Miền giám sát">
                                <MonitorZoneDashboard />
                            </TabPane>
                            <TabPane key="Đối tượng giám sát" tab="Đối tượng giám sát">
                                <div />
                            </TabPane>
                            <TabPane key="Báo cáo" tab="Báo cáo">
                                <div />
                            </TabPane>
                            <TabPane key="Tab 3" tab="Lịch sử hoạt động">
                                <LogDashboard />
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
