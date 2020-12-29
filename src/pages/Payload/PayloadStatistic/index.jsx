import React from 'react';
import {Form, Row, Col, Tabs, TabPa} from 'antd';
import { Button } from 'antd';
import StyleList from './index.style';
import ListIncidents from "../../../components/IncidentComponents/ListIncidents";
import ListReport from "../../../components/IncidentComponents/ListReport";
import ListStaff from "../../../components/IncidentComponents/ListStaff";
import SettingSchedule from "../../../components/IncidentComponents/SettingSchedule";
import TypeTask from "../../../components/IncidentComponents/TypeTask";
import PayloadStatisticTime from "./PayloadStatisticTime";
import PayloadStatisticDroneFixing from "./PayloadStatisticDroneFixing";
import PayloadStatisticStatus from "./PayloadStatisticStatus";
import PayloadStatisticFrequency from "./PayloadStatisticFrequency";
import PayloadStatisticWorking from "./PayloadStatisticWorking";

const { TabPane } = Tabs;
const PayloadStatistic = ({ history }) => {
  return (
      <StyleList>
        <div>
          <h2>Thống kê Payload</h2>
          <br/>
          <Form>
              <Tabs defaultActiveKey="1">
                  <TabPane tab={<span>Thống kê theo loại Payload</span>} key="1">
                      <PayloadStatisticFrequency />
                  </TabPane>
                  <TabPane tab={<span> Thống kê theo Lịch sử hoạt động</span>} key="2">
                      <PayloadStatisticWorking />
                  </TabPane>
                  <TabPane tab={<span>Thống kê theo trạng thái </span>} key="3">
                      <PayloadStatisticStatus />
                  </TabPane>
                  <TabPane tab={<span> Thống kê theo Lịch sử sửa chữa </span>} key="4">
                      <PayloadStatisticDroneFixing />
                  </TabPane>
              </Tabs>
          </Form>

        </div>
      </StyleList>
      )

};

export default PayloadStatistic;
