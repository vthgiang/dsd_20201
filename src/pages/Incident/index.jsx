import React from "react";
import { Tabs } from "antd";
import { UnorderedListOutlined, AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import "./style.css"
import ListIncidents from "../../components/IncidentComponents/ListIncidents"
import ListReport from "../../components/IncidentComponents/ListReport";
import ListSupports from "../../components/IncidentComponents/ListSupports";
import Schedule from "../../components/IncidentComponents/Schedule";
const { TabPane } = Tabs;

const Incident = () => {
  return (
    <div>
      {" "}
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              {/* <UnorderedListOutlined /> */}
              Danh sách công việc xử lý
            </span>
          }
          key="1"
        >
          <ListIncidents />
        </TabPane>
        <TabPane
          tab={
            <span>
              {/* <AndroidOutlined /> */}
            Danh sách báo cáo kết quả
            </span>
          }
          key="2"
        >
          <ListReport />
        </TabPane>
        <TabPane
          tab={
            <span>
              Danh sách yêu cầu hỗ trợ
            </span>
          }
          key="3"
        >
          <ListSupports />
        </TabPane>
        <TabPane
          tab={
            <span>
              Lịch làm việc
            </span>
          }
          key="4"
        >
          <Schedule />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Incident;
