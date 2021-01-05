import { Card, Col, Row, Tabs } from 'antd';
import QueryString from 'query-string';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getDroneOverallMetrics,
  getIncidentOverallMetrics,
  getNotifyMetrics, getPayloadOverallMetrics, getUsersMetrics
} from '../../services/statistics';
import PayloadStatisticDroneFixing from "../Payload/PayloadStatistic/PayloadStatisticDroneFixing";
import PayloadStatisticFrequency from "../Payload/PayloadStatistic/PayloadStatisticFrequency";
import PayloadStatisticStatus from '../Payload/PayloadStatistic/PayloadStatisticStatus';
import PayloadStatisticWorking from "../Payload/PayloadStatistic/PayloadStatisticWorking";


const { TabPane } = Tabs;

export default function StatisticPayload() {
  const user = useSelector((state) => state.user.user);
  const projectType = user.type;
  const role = user.role;

  const location = useLocation();
  const history = useHistory();
  const query = QueryString.parse(location);
  const [activeTab, setActiveTab] = React.useState(query.tab);
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
    // const fetchAll = async () => {
    //   const results = await Promise.all([
    //     getDroneOverallMetrics(projectType),
    //     getIncidentOverallMetrics(),
    //     getUsersMetrics(projectType),
    //     getPayloadOverallMetrics(),
    //     getNotifyMetrics(projectType),
    //   ]);
    //   setDroneMetrics(results[0]);
    //   setIncidentMetrics(results[1]);
    //   setUsersMetrics(results[2]);
    //   setPayloadMetrics(results[3]);
    //   setNotifyMetrics(results[4]);
    // };
    // fetchAll();
  }, []);

  return (
    <div className="payloadStatistic">
      <Row wrap={false} gutter={[16, 16]}>
        <Col span={24}>
          <Card className="u-shadow u-rounded">
            <Tabs
              defaultActiveKey="Drone"
              activeKey={activeTab}
              onChange={onTabChange}
            >
              <TabPane key="History" tab="Lịch sử hoạt động của payload">
                <PayloadStatisticWorking />
              </TabPane>

              <TabPane key="Status" tab="Thống kê payload theo trạng thái">
                <PayloadStatisticStatus />
              </TabPane>

              <TabPane key="Fixing" tab="Lịch sử sửa chữa">
                <PayloadStatisticDroneFixing />
              </TabPane>

              <TabPane key="Type" tab="Thống kê payload theo loại">
                <PayloadStatisticFrequency />
              </TabPane>

            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  )
}