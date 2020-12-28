import React, { useEffect, useState } from "react";
import "../Styles/StyleListIncidents.css";
import { Table, Modal, Button, Input, Space, Spin } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import URL_API from "./url";

const ListStaff = () => {
  const [dataEmployee, setdataEmployee] = useState([]);
  const [contentModal, setContentModal] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const { pathname } = useLocation();
  const [dataAPI, setDataAPI] = useState([]);
  const codeIncidents = {
    CHAY_RUNG: { id: "222222", name: "Sự cố  cháy rừng" },
    DE_DIEU: { id: "111111", name: "Sự cố  đê điều" },
    CAY_TRONG: { id: "333333", name: "Sự cố  cây trồng" },
    LUOI_DIEN: { id: "000000", name: "Sự cố lưới điện trên cao" },
  };
  const API_TOKEN =
    localStorage.getItem('token') || '4c901bcdba9f440a2a7c31c0bcbd78ec';
  const CURRENT_TYPE = localStorage.getItem('project-type') || 'LUOI_DIEN';
  const typeIncident = codeIncidents[CURRENT_TYPE];

  const [searchText, setSearchText] = useState()
  const [searchedColumn, setSearchedColumn] = useState()

  useEffect(() => {
    axios({
      method: "get",
      url: URL_API + "/employee/listing",
      // url: URL_API + "/report/listing",
      headers: {
        "api-token": API_TOKEN,
        "project-type": CURRENT_TYPE,
      },
    })
      .then(function (response) {
        //handle success
        setLoadingTable(false)
        setDataAPI(response.data.list)
        // let data = [];
        // response.data.list.map((item) => {
        //   let convertItem = item.employee;
        //   data.push(convertItem);
        //   console.log(data)
        // });
        // setdataEmployee(data)
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });


  }, []);



  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "id",
      render: (text, record) => (<p>{record.employee.id}</p>),
      sorter: (a, b) => b.employee.id - a.employee.id,
      sortDirections: ['descend'],
    },
    {
      title: "Tên nhân viên",
      dataIndex: "full_name",
      render: (text, record) => (<p>{record.employee.full_name}</p>),
      sorter: (a, b) => b.employee.full_name.charCodeAt(0) - a.employee.full_name.charCodeAt(0),
      sortDirections: ['descend'],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (text, record) => (<p>{record.employee.phone}</p>),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => (<p>{record.employee.email}</p>)
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text, record) => (<p>{record.employee.address}</p>),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (text, record) => (<p>{record.employee.role}</p>),
      // sorter: (a, b) => b.employee.role.charCodeAt(0) - a.employee.role.charCodeAt(0),
      // sortDirections: ['descend'],
      filters: [
        {
          text: 'ADMIN',
          value: 'ADMIN',
        },
        {
          text: 'INCIDENT_STAFF',
          value: 'INCIDENT_STAFF',
        },
        {
          text: 'MANAGER',
          value: 'MANAGER',
        },
        {
          text: 'SUPERVISOR',
          value: 'SUPERVISOR',
        },
        {
          text: 'DRONE_STAFT',
          value: 'DRONE_STAFT',
        }
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.employee.role.indexOf(value) === 0,
    },
    {
      title: "Loại sự cố",
      dataIndex: "type",
      render: (text, record) => <p>{record.employee.type == 'CHAY_RUNG' ? 'Sự cố cháy rừng'
        : record.employee.type == 'DE_DIEU' ? 'Sự cố đê điều'
          : record.employee.type == 'CAY_TRONG' ? 'Sự cố cây trồng'
            : 'Sự cố lưới điện cao thế'
      }</p>,
      // sorter: (a, b) => b.employee.type.charCodeAt(0) - a.employee.type.charCodeAt(0),
      // sortDirections: ['descend'],
      filters: [
        {
          text: 'Sự cố cháy rừng',
          value: 'CHAY_RUNG',
        },
        {
          text: 'Sự cố đê điều',
          value: 'DE_DIEU',
        },
        {
          text: 'Sự cố cây trồng',
          value: 'CAY_TRONG',
        },
        {
          text: 'Sự cố lưới điện cao thế',
          value: 'LUOI_DIEN',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.employee.type.indexOf(value) === 0,
    },
    {
      title: "Trạng thái hiện tại",
      dataIndex: "status_activation",
      render: (text, record) => <p>{record.employee.status_activation}</p>,
      filters: [
        {
          text: 'BUSY',
          value: 'BUSY',
        },
        {
          text: 'FREE',
          value: 'FREE',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.employee.status_activation.indexOf(value) === 0,
    },
    {
      title: "",
      key: "operation",
      render: (text, record) => (
        <div>
          <InfoCircleOutlined data-toggle="tooltip" data-placement="top" title="Xem chi tiết"
            onClick={(value) => {
              getInforEmployee(record);
            }}
            style={{ color: "blue", marginLeft: 5 }}
          />
        </div>
      ),
    },
  ];


  const getInforEmployee = (record) => {
    setDetailEmployee(record);
    setVisibleModal(true);
  };


  const handleOk = () => {
    setVisibleModal(false);
  };
  const handleCancel = () => {
    setVisibleModal(false);
  };



  return (
    <div>
      <div className="header" onClick={() => { }}>
        Danh sách nhân viên
      </div>
      <div>
        <Spin spinning={loadingTable} tip="Loading...">
          {
            dataAPI?
            <Table
            rowKey={(record) => record.employee.id}
            columns={columns}
            dataSource={dataAPI}
            size="middle"
          />
          : <Table
          rowKey={(record) => record.employee.id}
          columns={columns}
          dataSource={[]}
          size="middle"
        />
          }
         
        </Spin>
      </div>
      <Modal
        title={`Thông tin công việc của nhân viên: ${detailEmployee ? detailEmployee.employee.full_name : ""}`}
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={loadingModal} tip="Loading...">
          {detailEmployee ? (
            <div style={{ displayL: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flex: '75%' }}>
                <div>
                  <p>Mã nhân viên: {detailEmployee.employee.id}</p>
                  <p>Vai trò: {detailEmployee.employee.role}</p>
                  <p>Loại sự cố: <p>{detailEmployee.employee.type == 'CHAY_RUNG' ? 'Sự cố cháy rừng'
                    : detailEmployee.employee.type == 'DE_DIEU' ? 'Sự cố đê điều'
                      : detailEmployee.employee.type == 'CAY_TRONG' ? 'Sự cố cây trồng'
                        : 'Sự cố lưới điện cao thế'
                  }</p></p>
                </div>
                {
                  detailEmployee.current_task_type ?
                    <div style={{ marginTop: 20 }}>
                      <p>***Công việc hiện tại***</p>
                      <p>Tên công việc: {detailEmployee.current_task_type.name}</p>
                      <p>Mô tả: {detailEmployee.current_task_type.description}</p>
                      <p>Loại sự cố: <p>{detailEmployee.employee.type == 'CHAY_RUNG' ? 'Sự cố cháy rừng'
                        : detailEmployee.employee.type == 'DE_DIEU' ? 'Sự cố đê điều'
                          : detailEmployee.employee.type == 'CAY_TRONG' ? 'Sự cố cây trồng'
                            : 'Sự cố lưới điện cao thế'
                      }</p></p>
                    </div>
                    : <p>***Nhân viên hiện tại không có công việc nào***</p>
                }

                <div style={{ flex: '75%' }}>
                  <img src={detailEmployee.employee.avatar} width={'100%'} height={'100%'} />
                </div>
              </div>
            </div>
          ) : null}
        </Spin>
      </Modal>
    </div>
  );
};

export default ListStaff;

