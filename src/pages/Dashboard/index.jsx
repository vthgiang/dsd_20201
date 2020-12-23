import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Card, Tabs, Spin } from 'antd';
import {
  getDroneOverallMetrics,
  getIncidentOverallMetrics,
  getUsersMetrics,
  getPayloadOverallMetrics,
  getNotifyMetrics,
} from '../../services/statistics';

import QueryString from 'query-string';
import DroneDashboard from './DroneDashboard';
import IncidentDashboard from './IncidentDashboard';
import UsersDashboard from './UsersDashboard';
import PayloadDashboard from './PayloadDashboard';
import NotifyDashboard from './NotifyDashboard';
import MonitoreObjectDashboard from './MonitoreObjectDashboard';
import FlightHubDashboard from './flightHub/FlightHubDashboard';
import MonitorZoneDashboard from './MonitorZoneDashboard';
import LogDashboard from './LogDashboard';
import FlightHubProjectTypeDashboard from './flightHub/FlightHubProjectTypeDashboard';
import ReportDashboard from './report/ReportDashboard';
import ReportDashboardProjectType from './report/ReportDashboardProjectType';

const { TabPane } = Tabs;

function Dashboard() {
  // Role here to detect what to render
  const user = useSelector((state) => state.user.user);
  const projectType = user.type;
  const role = user.role;

  const location = useLocation();
  const history = useHistory();
  const query = QueryString.parse(location);
  const [activeTab, setActiveTab] = React.useState(query.tab);
  const [droneMetrics, setDroneMetrics] = React.useState(null);
  const [incidentMetrics, setIncidentMetrics] = React.useState(null);
  const [usersMetrics, setUsersMetrics] = React.useState(null);
  const [payloadMetrics, setPayloadMetrics] = React.useState(null);
  const [notifyMetrics, setNotifyMetrics] = React.useState(null);

  const onTabChange = React.useCallback(
    (key) => {
      history.push({
        pathname: location.pathname,
        search: QueryString.stringify({
          ...query,
          tab: key,
        }),
      });
      setActiveTab(key);
    },
    [history, location],
  );

  React.useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all([
        getDroneOverallMetrics(projectType),
        getIncidentOverallMetrics(),
        getUsersMetrics(projectType),
        getPayloadOverallMetrics(),
        getNotifyMetrics(projectType),
      ]);
      setDroneMetrics(results[0]);
      setIncidentMetrics(results[1]);
      setUsersMetrics(results[2]);
      setPayloadMetrics(results[3]);
      setNotifyMetrics(results[4]);
    };
    fetchAll();
  }, []);

  return (
    <div>
      {/* <Breadcrumb
      style={{
        marginBottom: 16,
        marginTop: 8,
        fontSize: 18,
        fontWeight: 500,
      }}
    >
      <Breadcrumb.Item>Báo cáo thống kê</Breadcrumb.Item>
      <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
    </Breadcrumb> */}
      <Row
        justify="space-around"
        align="top"
        gutter={[16, 16]}
        style={{ alignItems: 'stretch' }}
      >
        <Col span={6}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '100%' }}
          >
            {!droneMetrics ? (
              <Spin />
            ) : (
                <>
                  <h2 className="text-primary">
                    {droneMetrics.working}/{droneMetrics.all}
                  </h2>
                </>
              )}
            <h2 className="text-center text-primary">Drone</h2>
          </div>
        </Col>
        <Col span={6}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '100%' }}
          >
            {!payloadMetrics ? (
              <Spin />
            ) : (
                <>
                  <h2 className="text-success">
                    {payloadMetrics.working}/{payloadMetrics.all}
                  </h2>
                </>
              )}
            <h2 className="text-success">Payload</h2>
          </div>
        </Col>
        <Col span={6}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '100%' }}
          >
            {!usersMetrics ? (
              <Spin />
            ) : (
                <>
                  <h2 className="text-warning">
                    {usersMetrics.active}/{usersMetrics.all}
                  </h2>
                  {/* <div>Đang hoạt động: {usersMetrics.active}</div>
              <div>Đang chờ: {usersMetrics.pending}</div>
              <div>Đang không hoạt động: {usersMetrics.inactive}</div> */}
                </>
              )}
            <h2 className="text-warning">Người dùng</h2>
          </div>
        </Col>
        <Col span={6}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '220px', width: '220px' }}
          >
            {!incidentMetrics ? (
              <Spin />
            ) : (
                <>
                  <h2 className="text-danger">
                    {incidentMetrics.done}/{incidentMetrics.all}
                  </h2>
                  {/* <div>Đang khắc phục: {incidentMetrics.doing}</div>
              <div>Đã xử lý: {incidentMetrics.done}</div>
              <div>Đang chờ: {incidentMetrics.pending}</div> */}
                </>
              )}
            <h2 className="text-danger">Sự cố</h2>
          </div>
        </Col>
      </Row>
      <Row wrap={false} gutter={[16, 16]}>
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <Tabs
              defaultActiveKey="Drone"
              activeKey={activeTab}
              onChange={onTabChange}
            >
              {role != 'INCIDENT_STAFF' ? (
                <TabPane key="Drone" tab="Drone">
                  <DroneDashboard />
                </TabPane>
              ) : null}
              {role !== 'INCIDENT_STAFF' ? (
                <TabPane key="Payload" tab="Payload">
                  <PayloadDashboard />
                </TabPane>
              ) : null}

              {role == 'ADMIN' || role == 'SUPER_ADMIN' ? (
                <TabPane key="Sự cố" tab="Sự cố">
                  <IncidentDashboard />
                </TabPane>
              ) : null}

              {role == 'SUPER_ADMIN' || role == 'ADMIN' || role == 'MANAGER' ? (
                <TabPane tab="Người sử dụng" key="User">
                  <UsersDashboard />
                </TabPane>
              ) : null}

              {role == 'SUPER_ADMIN' || role == 'ADMIN' || role == 'MANAGER' ? (
                <TabPane key="Notify" tab="Cảnh báo">
                  <NotifyDashboard />
                </TabPane>
              ) : null}
              {role === 'INCIDENT_STAFF' ? null : (
                <TabPane key="MonitoredCampaign" tab="Đợt giám sát">
                  {role === 'SUPER_ADMIN' ? (
                    <FlightHubDashboard />
                  ) : (
                      <FlightHubProjectTypeDashboard />
                    )}
                </TabPane>
              )}

              <TabPane key="MonitoredZone" tab="Miền giám sát">
                <MonitorZoneDashboard />
              </TabPane>

              <TabPane key="MonitorObject" tab="Đối tượng giám sát">
                <MonitoreObjectDashboard />
              </TabPane>
              {role === 'SUPER_ADMIN' ||
                role === 'ADMIN' ||
                role === 'MANAGER' ? (
                  <TabPane key="Report" tab="Báo cáo">
                    {role === 'SUPER_ADMIN' ? (
                      <ReportDashboard />
                    ) : (
                        <ReportDashboardProjectType />
                      )}
                  </TabPane>
                ) : null}
              {role === 'SUPER_ADMIN' ? (
                <TabPane key="Log" tab="Lịch sử hoạt động">
                  <LogDashboard />
                </TabPane>
              ) : null}
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
