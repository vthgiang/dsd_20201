import React, { useState, useEffect } from "react";
import to from "await-to-js";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  TimePicker,
  Menu,
  Popconfirm,
  Spin, Badge, Space, Tabs
} from "antd";
import {
  EyeOutlined,
  BarChartOutlined,
  StockOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  InfoCircleOutlined, MinusCircleOutlined, PlusOutlined
} from '@ant-design/icons'
import useBaseHook from "../../../hooks/BaseHooks";
import incidentService from "../../../services/group09/incidentService";
import incidentLevelService from "../../../services/group09/incidentLevelService";
import incidentStatusService from "../../../services/group09/incidentStatusService";
import moment from "moment";
import {SearchOutlined} from "@ant-design/icons";
import StyleList from "../index.style";
import {useLocation} from "react-router-dom";
import axios from "axios";
import URL_API from "../../../components/IncidentComponents/url";
import PayloadStatisticFrequency from "../../Payload/PayloadStatistic/PayloadStatisticFrequency";
import PayloadStatisticWorking from "../../Payload/PayloadStatistic/PayloadStatisticWorking";
import PayloadStatisticStatus from "../../Payload/PayloadStatistic/PayloadStatisticStatus";
import PayloadStatisticDroneFixing from "../../Payload/PayloadStatistic/PayloadStatisticDroneFixing";
import ImageGallery from "../../Incident/ImageGallery";
import VideoGallery from "../../Incident/VideoGallery";
import TableDrone from '../../TableDrone';
import FlightPath from '../../FlightPath';
import ListMonitorCampaignPage from '../../FlightHub/ListMonitorCampaign'
import ListPayload from '../../Payload/PayloadManagement/List';

let levels = [];
const {TabPane} = Tabs;
const { SubMenu } = Menu;

const DeDieuNcn4 = ({ history }) => {

  return(
      <StyleList>
        <div>
          <br/>
          <h2>Quản lý điều khiển UAV</h2>
          <br/>
          <Form>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span>Danh sách drone</span>} key="1">
                <TableDrone />
              </TabPane>
              <TabPane tab={<span>Quản lý đường bay</span>} key="2">
                <FlightPath />
            </TabPane>
            <TabPane tab={<span>Quản lý đợt giám sát</span>} key="3">
                <ListMonitorCampaignPage />
            </TabPane>
            <TabPane tab={<span>Quản lý payload</span>} key="4">
                <ListPayload />
              </TabPane>
            </Tabs>
          </Form>


        </div>


      </StyleList>

  )
};

export default DeDieuNcn4;
