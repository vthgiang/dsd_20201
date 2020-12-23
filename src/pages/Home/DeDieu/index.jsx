import React, { useState, useEffect } from "react";
import to from "await-to-js";
import {Button, Col, Form, Input, message, Modal, Row, Select, Table, Tag, TimePicker, Menu} from "antd";
import { EyeOutlined, BarChartOutlined, StockOutlined, AppstoreAddOutlined, SettingOutlined } from '@ant-design/icons'
import useBaseHook from "../../../hooks/BaseHooks";
import incidentService from "../../../services/group09/incidentService";
import incidentLevelService from "../../../services/group09/incidentLevelService";
import incidentStatusService from "../../../services/group09/incidentStatusService";
import moment from "moment";
import {SearchOutlined} from "@ant-design/icons";
import StyleList from "../index.style";

let levels = [];
const { SubMenu } = Menu;


const data = [
  {
    title: "Trộm thanh giằng cột tại lưới điện cao thế THANH HÓA",
    description:
      " Đội đường dây chi nhánh phát hiện kẻ gian tháo trộm thanh giằng cột với số lượng lớn (56 thanh)",
    reporter: "Nguyễn Dung",
    assignee: "Việt Anh",
    status: "open",
    level: "normal",
    startAt: "",
    dueDate: "",
    loggedTime: 0,
    createdBy: "Hệ thống"
  },
  {
    title: "Thả diều gây sự cố lưới điện",
    description:
      "Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.",
    reporter: "Nguyễn Dung",
    assignee: "Việt Anh",
    status: "inProcess",
    level: "urgency",
    startAt: "",
    dueDate: "",
    loggedTime: "4h",
    createdBy: "Luân Phùng"
  },
  {
    title: "Cây đổ vào chạm biến áp trên quốc lộ 32 km16",
    description:
      "Lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.",
    reporter: "Nguyễn Dung",
    assignee: "Việt Anh",
    status: "inProcess",
    level: "urgency",
    startAt: "",
    dueDate: "",
    loggedTime: "4h",
    createdBy: "Dung Nguyễn"
  },
  {
    title: "Trộm thanh giằng cột tại lưới điện cao thế THANH HÓA",
    description:
      " Đội đường dây chi nhánh phát hiện kẻ gian tháo trộm thanh giằng cột với số lượng lớn (56 thanh)",
    reporter: "Nguyễn Dung",
    assignee: "Việt Anh",
    status: "open",
    level: "normal",
    startAt: "",
    dueDate: "",
    loggedTime: 0
  },
  {
    title: "Thả diều gây sự cố lưới điện",
    description:
      "Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.",
    reporter: "Nguyễn Dung",
    assignee: "Việt Anh",
    status: "inProcess",
    level: "urgency",
    startAt: "",
    dueDate: "",
    loggedTime: "4h"
  },
  {
    title: "Cây đổ vào Trạm điện cao thế Ngọc Liên",
    description:
      "Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.",
    reporter: "Nguyễn Dung",
    assignee: "Việt Anh",
    status: "inProcess",
    level: "urgency",
    startAt: "",
    dueDate: "",
    loggedTime: "4h"
  }
];


let status = []
const HomeDeDieu = ({ history }) => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify, getData } = useBaseHook();
  const [incidents, setIncidents] = useState([])
  const [levels, setLevels] = useState([])
  const [status, setStatus] = useState([])
  const columns = [
    {
      name: "Tên sự cố",
      dataIndex: "name",
      key: "name",
      width: '20%',
      render: (text, record) => <a href={`/incidents/${record._id}`}>{text}</a>
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: '20%'
    },
    // {
    //   title: "Người phân công",
    //   dataIndex: "reporter",
    //   key: "reporter",
    //   render: (text, record) => record.assignee[0]
    // },
    // {
    //   title: "Người được phân công",
    //   dataIndex: "assignee",
    //   key: "assignee"
    // },
    {
      title: "Trạng thái",
      dataIndex: "status", // 'open', 'inProcess', 'resolve', 'close'
      key: "status",
      filters: status.map(item => {return {text: item.name, value: item.code}}),
      onFilter: (value, record) => Number(record.status.code) === Number(value),
      render: (text) => {
        switch (text.code) {
          case 0:
            return <Tag color="default">{text.name}</Tag>;
          case 1:
            return <Tag color="processing">{text.name}</Tag>;
          case 2:
            return <Tag color="warning">{text.name}</Tag>;
          case 3:
            return <Tag color="success">{text.name}</Tag>;
        }
      }
    },
    {
      title: "Mức độ",
      dataIndex: "level", // 'normal', 'urgency'
      key: "level",
      filters: levels.map(item => {return {text: item.name, value: item.code}}),
      onFilter: (value, record) => Number(record.level.code) === Number(value),
      render: (text) => {
        console.log('text', text)
        switch (text.code) {
          case 0:
            return <Tag color="#2db7f5">{text.name}</Tag>;
          case 1:
            return <Tag color="#f50">{text.name}</Tag>;
        }
      }
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy"
    },
    {
      title: "Hạn dự kiến",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a, b) => moment(a.dueDate).format('YYYYMMDD') - moment(b.dueDate).format('YYYYMMDD'),
      sortDirections: ['descend', 'ascend'],
      render: (text => moment(text).format('YYYY-MM-DD'))
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD'),
      sortDirections: ['descend', 'ascend'],
      render: (text => moment(text).format('YYYY-MM-DD'))
    },
    // {
    //   title: "Thời gian đã xử lý sự cố",
    //   dataIndex: "loggedTime", //Nhân viên phải log time chi tiết về việc xử lý sự cố: (từ mấy h - đến mấy h, đã làm gì)
    //   key: "loggedTime"
    // }
  ];

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
      setLoading(true)
      let [error, [incidents, _levels, _status] = []] = await to(Promise.all([
        incidentService().index(),
        incidentLevelService().index(),
        incidentStatusService().index()
      ]))
      if(error) message.error('Không thể trả về danh sách sự cố!')
      setIncidents(incidents.incidents || [])
      setLevels(_levels || [])
      setStatus(_status || [])
    setLoading(false)
  }

  return(
      <StyleList>
        <Menu  mode="horizontal">
          <Menu.Item key="ncn1" icon={<EyeOutlined />}>
            <a className="margin-left-24" href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Nhóm chức năng 1
              <br/>
              Theo dõi giám sát sự cố
            </a>
          </Menu.Item>
          <Menu.Item key="ncn2" icon={<BarChartOutlined />}>
            <a className="margin-left-24" href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Nhóm chức năng 2
              <br/>
              Dữ liệu, tra cứu, thống kê
            </a>
          </Menu.Item>
          <Menu.Item key="ncn3" icon={<StockOutlined />}>
            <a className="margin-left-24" href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Nhóm chức năng 3
              <br/>
              Phân tích phát hiện sự cố
            </a>
          </Menu.Item>
          <Menu.Item key="ncn4" icon={<AppstoreAddOutlined />}>
            <a className="margin-left-24" href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Nhóm chức năng 4
              <br/>
                Quản lý, điều khiển UAV
            </a>
          </Menu.Item>
          <Menu.Item key="ncn5" icon={<SettingOutlined />}>
            <a className="margin-left-24" href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Nhóm chức năng 5
              <br/>
              Quản trị và nâng cao
            </a>
          </Menu.Item>
        </Menu>
        <div>
          <br/>
          {/*<h2>Theo dõi phát hiện sự cố ĐÊ ĐIỀU</h2>*/}
          {/*<br />*/}
          <h2>Thống kê danh sách sự cố</h2>
          <br/>
          <Row>
          <Col span={6}>
            <Button type="primary" className="buttontype" onClick={() => history.push('/imageGallery')}>Tạo sự cố offline</Button>
          </Col>
          <Col span={6}>
            <Button type="primary" className="buttontype" onClick={() => history.push('/videoGallery')}>Tạo sự cố từ stream</Button>
          </Col>
          </Row>
          <br/>
          <Row justify="space-around">
            <Col span={6}>
            <Form.Item label="Theo mức độ sự cố" name="reason">
              <Input placeholder="Mức độ"></Input>
            </Form.Item>
          </Col>
            <Col span={6}>
              <Form.Item label="Theo vị trí" name="reason">
                <Input placeholder="Vị trí"></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Tìm theo thời gian" name='time'>
                <TimePicker></TimePicker>
              </Form.Item>
            </Col>
          </Row>
          <br/>
          <Table columns={columns} loading={loading} dataSource={incidents} loading={loading} />
        </div>


      </StyleList>

  )
};

export default HomeDeDieu;
