import React, { useEffect, useRef, useState } from 'react';
import '../Styles/StyleListIncidents.css';
import { Table, Modal, Button, Input, Space, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import validator from 'validate-image-url';
import ReactPlayer from 'react-player';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import URL_API from './url';

const ListReport = () => {
  const [dataReport, setDataReport] = useState([]);
  const [contentModal, setContentModal] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const { pathname } = useLocation();
  const codeIncidents = {
    CHAY_RUNG: { id: '222222', name: 'Sự cố  cháy rừng' },
    DE_DIEU: { id: '111111', name: 'Sự cố  đê điều' },
    CAY_TRONG: { id: '333333', name: 'Sự cố  cây trồng' },
    LUOI_DIEN: { id: '000000', name: 'Sự cố lưới điện trên cao' },
  };
  const API_TOKEN = '4c901bcdba9f440a2a7c31c0bcbd78ec';
  const CURRENT_TYPE = 'LUOI_DIEN';
  const typeIncident = codeIncidents[CURRENT_TYPE];

  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();

  const [currentImg, setCurrentImg] = useState();

  useEffect(() => {
    getDataInit();
  }, []);

  const getDataInit = () => {
    axios({
      method: 'get',
      url: URL_API + '/report/listing',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        setDataReport(response.data.list);
        setLoadingTable(false);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  };

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
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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
    setSearchText('');
  };

  const search = (value) => {
    // console.log("PASS", { value });
    const filterTable = dataReport.filter((o) =>
      Object.keys(o).some((k) => {
        // console.log(String(o[k]).toLowerCase() + " - " + value.toLowerCase());
        return (
          k !== 'incident_id' &&
          String(o[k]).normalize().toLowerCase().includes(value.toLowerCase())
        );
      }),
    );
    setFilterTable(filterTable);
  };

  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'title',
      // ...getColumnSearchProps("title"),
    },
    {
      title: 'Mã công việc',
      dataIndex: 'task_id',
      sorter: (a, b) => b.task_id - a.task_id,
      sortDirections: ['descend'],
      // ...getColumnSearchProps("task_id"),
    },
    {
      title: 'Nội dung xử lý sự cố',
      dataIndex: 'content',
      // ...getColumnSearchProps("content"),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: (a, b) => b.status.charCodeAt(0) - a.status.charCodeAt(0),
      sortDirections: ['descend'],
      render: (text, record) =>
        record.status == 'waiting' ? (
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'orange',
                borderRadius: 5,
              }}
            ></div>
            <p style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}>
              {' '}
              {record.status}
            </p>
          </div>
        ) : record.status == 'accept' ? (
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'green',
                borderRadius: 5,
              }}
            ></div>
            <p style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}>
              {' '}
              {'Đã chấp nhận'}
            </p>
          </div>
        ) : (
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'red',
                borderRadius: 5,
              }}
            ></div>
            <p style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}>
              {' '}
              {'Đã từ chối'}
            </p>
          </div>
        ),
    },
    {
      title: 'Loại sự cố',
      dataIndex: 'type',
      render: (text, record) => <p>{codeIncidents[record.type].name}</p>,
      filters: [
        {
          text: 'Sự cố cháy rừng',
          value: 'CHAY_RUNG',
        },
        {
          text: 'Sự cố đê điều',
          value: 'Sự cố đê điều',
        },
        {
          text: 'Sự cố cây trồng',
          value: 'CAY_TRONG',
        },
        {
          text: 'Sự cố lưới điện trên cao',
          value: 'LUOI_DIEN',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    // {
    //   title: "Khởi tạo",
    //   dataIndex: "created_at",
    //   sorter: (a, b) => b.created_at.charCodeAt(0) - a.created_at.charCodeAt(0),
    //   sortDirections: ["descend"],
    //   // ...getColumnSearchProps("created_at"),
    // },
    // {
    //   title: "Cập nhật lần cuối",
    //   dataIndex: "updated_at",
    //   sorter: (a, b) => b.updated_at.charCodeAt(0) - a.updated_at.charCodeAt(0),
    //   sortDirections: ["descend"],
    //   // ...getColumnSearchProps("updated_at"),
    // },
    {
      title: 'Tác vụ',
      key: 'operation',
      render: (text, record) =>
        record.status == 'waiting' ? (
          <div>
            <InfoCircleOutlined
              data-toggle="tooltip"
              data-placement="top"
              title="Xem chi tiết"
              onClick={(value) => {
                getInforReport(record.image);
              }}
              style={{ color: 'blue', marginLeft: 5, fontSize: 22 }}
            />
            <CheckOutlined
              data-toggle="tooltip"
              data-placement="top"
              title="Chấp nhận báo cáo"
              onClick={(value) => {
                acceptReport(record);
              }}
              style={{ color: 'green', marginLeft: 15, fontSize: 22 }}
            />
            <CloseOutlined
              data-toggle="tooltip"
              data-placement="top"
              title="Từ chối báo cáo"
              onClick={(value) => {
                rejectReport(record);
              }}
              style={{ color: 'red', marginLeft: 15, fontSize: 22 }}
            />
          </div>
        ) : (
          <div>
            <InfoCircleOutlined
              data-toggle="tooltip"
              data-placement="top"
              title="Xem chi tiết"
              onClick={(value) => {
                getInforReport(record.image);
              }}
              style={{ color: 'blue', marginLeft: 5, fontSize: 22 }}
            />
          </div>
        ),
    },
  ];

  const getInforReport = (record) => {
    setCurrentImg(record);
    setVisibleModal(true);
  };

  const handleOk = () => {
    setCurrentImg('');
    setVisibleModal(false);
  };
  const handleCancel = () => {
    setCurrentImg('');
    setVisibleModal(false);
  };

  const acceptReport = (record) => {
    confirmAlert({
      title: 'Chấp nhận báo cáo',
      message: 'Bạn chắc chắn muốn chấp nhận báo cáo?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios({
              method: 'post',
              url: URL_API + `/report/accept?id=${record.id}`,
              // url: URL_API + "/report/listing",
              headers: {
                'api-token': API_TOKEN,
                'project-type': CURRENT_TYPE,
              },
            })
              .then(function (response) {
                //handle success
                console.log(response);
                setLoadingTable(true);
                getDataInit();
              })
              .catch(function (err) {
                //handle error
                console.log('error nè', err);
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const rejectReport = (record) => {
    confirmAlert({
      title: 'Từ chối báo cáo',
      message: 'Bạn chắc chắn muốn từ chối báo cáo?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios({
              method: 'post',
              url: URL_API + `/report/reject?id=${record.id}`,
              // url: URL_API + "/report/listing",
              headers: {
                'api-token': API_TOKEN,
                'project-type': CURRENT_TYPE,
              },
            })
              .then(function (response) {
                //handle success
                console.log(response);
                setLoadingTable(true);
                getDataInit();
              })
              .catch(function (err) {
                //handle error
                console.log('error nè', err);
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <div className="header" onClick={() => {}}>
        Danh sách báo cáo kết quả xử lý sự cố
      </div>
      <Input.Search
        style={{ margin: '0 0 10px 0' }}
        placeholder="Search by..."
        enterButton
        onSearch={search}
      />
      <div>
        <Spin spinning={loadingTable} tip="Loading...">
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={filterTable == null ? dataReport : filterTable}
            size="middle"
          />
        </Spin>
      </div>
      <Modal
        title={null}
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={'fit-content'}
      >
        <img width="100%" height="100%" src={currentImg} />
        <ReactPlayer url={currentImg} />
      </Modal>
    </div>
  );
};

export default ListReport;
