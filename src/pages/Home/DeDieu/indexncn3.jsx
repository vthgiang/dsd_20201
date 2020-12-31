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

let levels = [];
const {TabPane} = Tabs;
const { SubMenu } = Menu;

const DeDieuNcn3 = ({ history }) => {

  return(
      <StyleList>
        <div>
          <br/>
          <h2>Phân tích phát hiện sự cố</h2>
          <br/>
          <Form>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span>Tạo sự cố Offline</span>} key="1">
                <ImageGallery />
              </TabPane>
              <TabPane tab={<span>Sự cố từ streaming</span>} key="2">
                <VideoGallery />
              </TabPane>
            </Tabs>
          </Form>


        </div>


      </StyleList>

  )
};

export default DeDieuNcn3;
