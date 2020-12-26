import React, { useEffect, useState } from "react";
import "../Styles/StyleListIncidents.css";
import { Table, Modal, Button, Input, Space, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import URL_API from "./url";
import "../Styles/StyleSchedule.css";
import URL_API from "./url";

const Schedule = () => {
  const [dataWorkings, setDataWorking] = useState([]);
  const [dataPresent, setDataPresent] = useState([]);
  const [value, onChange] = useState(new Date());
  const [loadingTable, setLoadingTable] = useState(true);
  const [inputManv, setInputManv] = useState([]);
  const [inputTennv, setInputTennv] = useState([]);
  // const [day, setDay] = useState(0);
  // const [month, setMonth] = useState(0);
  // const [year, setYear] = useState(0);
  const [curentDate, setCurrentDate] = useState(new Date());

  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();

  const { pathname } = useLocation();
  const codeIncidents = {
    fire: "222222",
    dike: "111111",
    tree: "333333",
    highVoltageGrid: "000000",
  };
  useEffect(() => {
    // console.log(
    //   curentDate.getDate(),
    //   curentDate.getMonth() + 1,
    //   curentDate.getFullYear()
    // );
    axios({
      method: "get",
      url: URL_API + "/schedule/detail-day",
      // url: URL_API + "/report/listing",
      params: {
        day: curentDate.getDate(),
        month: curentDate.getMonth() + 1,
        year: curentDate.getFullYear(),
      },
    })
      .then(function (response) {
        console.log(response);
        //handle success
        setDataWorking(response.data);
        setDataPresent(response.data);
        setLoadingTable(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
          </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
          </Button>
          </Space>
        </div>
      ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
          text
        ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "employee_id",
      sorter: (a, b) => b.employee_id - a.employee_id,
      sortDirections: ["descend"],
      ...getColumnSearchProps("employee_id"),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      sorter: (a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0),
      sortDirections: ["descend"],
      ...getColumnSearchProps("name"),
    },
  ];

  const getListWork = (value, event) => {
    // console.log(value);
    setLoadingTable(true);
    setInputManv("");
    setInputTennv("");
    setCurrentDate(value);
    axios({
      method: "get",
      url: URL_API + "/schedule/detail-day",
      params: {
        day: value.getDate(),
        month: value.getMonth() + 1,
        year: value.getFullYear(),
      },
    })
      .then(function (response) {
        // console.log(response);
        //handle success
        setDataWorking(response.data);
        setDataPresent(response.data);
        setLoadingTable(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  };


  return (
    <div class="flex-container">
      <div class="flex-item-left">
        <div>Chọn ngày làm việc</div>
        <Calendar
          onClickDay={(value, event) => getListWork(value, event)}
          value={value}
        />
      </div>
      <div class="flex-item-right">
        <div class="header" onClick={() => { }}>
          {`Lịch làm việc ngày ${curentDate.getDate()} tháng ${curentDate.getMonth() + 1
            } năm ${curentDate.getFullYear()}`}
        </div>
        <div>
          <Spin spinning={loadingTable} tip="Loading...">
            <Table columns={columns} dataSource={dataWorkings} size="small" />
          </Spin>
        </div>
        {/* <Modal
          title={null}
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         {contentModal}
        </Modal> */}
      </div>
    </div>
  );
};

export default Schedule;
