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
                  <TabPane tab={<span>Thống kê theo loại Payload</span>} key="6">
                      <PayloadStatisticFrequency />
                  </TabPane>
                  <TabPane tab={<span> Thống kê theo Lịch sử hoạt động</span>} key="1">
                      <PayloadStatisticWorking />
                  </TabPane>
                  <TabPane tab={<span>Thống kê theo trạng thái </span>} key="5">
                      <PayloadStatisticStatus />
                  </TabPane>
                  <TabPane tab={<span> Thống kê theo Lịch sử sửa chữa </span>} key="2">
                      <PayloadStatisticDroneFixing />
                  </TabPane>
              </Tabs>
            {/*<Row justify="space-around">*/}
            {/*  /!* <Col span={4}>*/}
            {/*    <Button type="primary" className="buttontype" onClick={() => history.push('/payload-statistic-frequency')}>Thống kê theo tần suất sử dụng</Button>*/}
            {/*  </Col>*/}
            {/*  <Col span={4}>*/}
            {/*    <Button type="primary" className="buttontype" onClick={() => history.push('/payload-statistic-time')}>Thống kê theo thời gian sử dụng</Button>*/}
            {/*  </Col> *!/*/}
            {/*  <Col span={4}>*/}
            {/*    <Button type="primary" className="buttontype" onClick={() => history.push('/payload-statistic-work')}>Thống kê lịch sử hoạt động của Payload</Button>*/}
            {/*  </Col>*/}
            {/*    <Col span={4}>*/}
            {/*        <Button type="primary" className="buttontype" onClick={() => history.push('/payload-statistic-fix')}>Thống kê lịch sử sửa chữa của Payload</Button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<br/>*/}
            {/*<Row justify="space-around">*/}
            {/*  <Col span={4}>*/}
            {/*    <Button type="primary" className="buttontype" onClick={() => history.push('/payload-statistic-status')}>Thống kê theo trạng thái Payload</Button>*/}
            {/*  </Col>*/}
            {/*    <Col span={4}>*/}
            {/*        <Button type="primary" className="buttontype" onClick={() => history.push('/payload-statistic-type')}>Thống kê theo loại Payload</Button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
          </Form>

        </div>
      </StyleList>
      )

};

export default PayloadStatistic;
