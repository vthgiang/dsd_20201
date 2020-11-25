import React, { useEffect, useState } from "react";
import "./Styles/StyleListIncidents.css";
import { Table, Modal, Button } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";
import { List, Avatar } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import URL_API from "./url";

const ListIncidents = () => {
  const [dataIncidents, setDataIncidents] = useState([]);
  const [contentModal, setContentModal] = useState(null);
  const [detailIncident, setDetailIncident] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const { pathname } = useLocation();
  const codeIncidents = {
    fire: { id: "222222", name: "Sự cố  cháy rừng" },
    dike: { id: "111111", name: "Sự cố  đê điều" },
    tree: { id: "333333", name: "Sự cố  cây trồng" },
    highVoltageGrid: { id: "000000", name: "Sự cố lưới điện trên cao" },
  };
  const currentType = `${pathname.split(/[/,/]+/)[1]}`;
  console.log(codeIncidents)
  const typeIncident = codeIncidents['highVoltageGrid'];
  useEffect(() => {
    axios({
      method: "get",
      url: URL_API + "/task/listing",
      params: { id: typeIncident.id },
    })
      .then(function (response) {
        console.log(response)
        //handle success
        // setDataIncidents(response.data[0].tasks);
        setDataIncidents(response.data.tasks);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  }, []);

  const data = [
    {
      id: 3,
      name: "Sự cố lưới điện ZZZ 5008",
      type: "000000",
      captain_id: null,
      status: "Đang xử lý",
      level: "Sự cố cấp I",
      incident_id: null,
      priority: null,
      created_at: "2020-11-15 17:57:46",
      updated_at: "2020-11-15 17:57:46",
    },
    {
      id: 4,
      name: "Sự cố lưới điện ZZZ 9713",
      type: "000000",
      captain_id: null,
      status: "Đang xử lý",
      level: "Sự cố cấp I",
      incident_id: null,
      priority: null,
      created_at: "2020-11-15 17:58:04",
      updated_at: "2020-11-15 17:58:04",
    },
    {
      id: 5,
      name: "Sự cố lưới điện ZZZ 9633",
      type: "000000",
      captain_id: null,
      status: "Đang xử lý",
      level: "Sự cố cấp I",
      incident_id: null,
      priority: null,
      created_at: "2020-11-15 17:58:07",
      updated_at: "2020-11-15 17:58:07",
    },
    {
      id: 6,
      name: "Sự cố lưới điện ZZZ 1616",
      type: "000000",
      captain_id: null,
      status: "Đang xử lý",
      level: "Sự cố cấp I",
      incident_id: null,
      priority: null,
      created_at: "2020-11-15 17:58:40",
      updated_at: "2020-11-15 17:58:40",
    },
    {
      id: 2,
      name: "Sự cố lưới điện ZZZ 8579",
      type: "000000",
      captain_id: null,
      status: "Đang xử lý",
      level: "Sự cố cấp I",
      incident_id: null,
      priority: null,
      created_at: "2020-11-15 17:38:12",
      updated_at: "2020-11-15 17:38:12",
    },
    {
      id: 7,
      name: "Sự cố lưới điện ZZZ 8199",
      type: "000000",
      captain_id: 999,
      status: "Đang xử lý",
      level: "Sự cố cấp I",
      incident_id: 124,
      priority: "1",
      created_at: "2020-11-15 18:06:05",
      updated_at: "2020-11-15 18:06:05",
    },
  ];

  const columns = [
    {
      title: "Tên sự cố",
      dataIndex: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Mức độ",
      dataIndex: "level",
    },
    {
      title: "Đội trưởng",
      dataIndex: "captain_id",
    },
    {
      title: "",
      key: "operation",
      render: (record) => (
        <div>
          <CheckOutlined
            // onClick={() => {
            //   setVisibleModal(true);
            //   setContentModal("Xác nhận xử lý xong sự cố ?");
            // }}
            style={{ color: "green", marginLeft: 5 }}
          />
          <CloseOutlined
            // onClick={() => {
            //   setVisibleModal(true);
            //   setContentModal("Từ chối xử lý sự cố ?");
            // }}
            style={{ color: "red", marginLeft: 5 }}
          />
          <InfoCircleOutlined
            onClick={(value) => {
              getInforIncidents(record);
            }}
            style={{ color: "blue", marginLeft: 5 }}
          />
        </div>
      ),
    },
  ];

  const getListIncidents = () => {
    console.log(process.env.REACT_APP_DOMAIN_API);
  };

  const getInforIncidents = (record) => {
    axios({
      method: "get",
      url:URL_API + "/task/detail",
      params: { id: record.id },
    })
      .then(function (response) {
        setVisibleModal(true);
        setDetailIncident(response.data);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  };

  const handleOk = () => {
    setVisibleModal(false);
  };
  const handleCancel = () => {
    setVisibleModal(false);
  };
  return (
    <div>
      <div className="header" onClick={() => {}}>
        Danh sách công việc xử lý sự cố
      </div>
      <div>
        <Table columns={columns} dataSource={dataIncidents} size="middle" />
      </div>
      <Modal
        title={null}
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {detailIncident ? (
          <div>
            <div className="header">Thông tin chi tiết sự cố</div>
            <p>Tên sự cố: {detailIncident.task.name}</p>
            <p>Loại sự cố: {typeIncident.name}</p>
            <p>Cấp độ: {detailIncident.task.level}</p>
            <div className="header">Danh sách nhân viên đang xử lý</div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={detailIncident.doing_employees}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={
                        <a href="https://ant.design">{item.name}</a>
                      }
                      description="Descripttion"
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className="header">Danh sách nhân viên dự kiến xử lý</div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={detailIncident.pending_employees}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={
                        <a href="https://ant.design">{item.name}</a>
                      }
                      description="Descripttion"
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default ListIncidents;
