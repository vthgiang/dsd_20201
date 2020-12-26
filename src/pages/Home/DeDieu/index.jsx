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
  Spin, Badge, Space
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

  const [dataIncidents, setDataIncidents] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [detailIncident, setDetailIncident] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingChildTable, setLoadingChildTable] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [listChildDataRecord, setListChildDataRecord] = useState([]);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [listTypeWork, setListTypeWork] = useState([]);
  const [typeWorkNew, setTypeWorkNew] = useState(null);
  const [listEmployeesNew, setListEmployeesNew] = useState([]);
  const [childData, setChildData] = useState([]);
  const [idModalIncident, setIdModalIncident] = useState(null);
  const [visibleModalDetailIncident, setVisibleModalDetailIncident] = useState(
      false,
  );

  const { pathname } = useLocation();
  const codeIncidents = {
    CHAY_RUNG: { id: '222222', name: 'Sự cố  cháy rừng' },
    DE_DIEU: { id: '111111', name: 'Sự cố  đê điều' },
    CAY_TRONG: { id: '333333', name: 'Sự cố  cây trồng' },
    LUOI_DIEN: { id: '000000', name: 'Sự cố lưới điện trên cao' },
  };
  const API_TOKEN =
      localStorage.getItem('token') || '4c901bcdba9f440a2a7c31c0bcbd78ec';
  const CURRENT_TYPE = localStorage.getItem('project-type') || 'LUOI_DIEN';
  const typeIncident = codeIncidents[CURRENT_TYPE];

  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();
  const { Option } = Select;
  useEffect(() => {
    getListEmployees();
    getListWork();
    getDataIncidents();
  }, []);

  const getDataIncidents = () => {
    setLoadingTable(true);
    axios({
      method: 'get',
      url: URL_API + '/task/incident-listing',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
        .then(function (response) {
          // console.log(response);
          //handle success
          // setDataIncidents(response.data[0].tasks);
          let data = [];
          response.data.map((item) => {
            let convertItem = {
              id: item._id,
              name: item.name,
              type: item.type.name,
              status: item.status.name,
              statusCode: item.status.code,
              level: item.level.name,
              location: item.location,
              levelCode: item.level.code,
              images: item.images,
              videos: item.videos,
              description: item.description,
            };
            data.push(convertItem);
          });
          setDataIncidents(data);
          setLoadingTable(false);
        })
        .catch(function (err) {
          //handle error
          console.log(err);
          setLoadingTable(false);
        });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

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
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: [
        {
          text: 'In Progress',
          value: 'In Progress',
        },
        {
          text: 'Open',
          value: 'Open',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (value, dataRecord) => {
        return (
            <div>
              {dataRecord.statusCode == 0 ? (
                  <Tag color="default">{dataRecord.status}</Tag>
              ) : dataRecord.statusCode == 1 ? (
                  <Tag color="processing">{dataRecord.status}</Tag>
              ) : (
                  <Tag color="success">{dataRecord.status}</Tag>
                )}
            </div>
        );
      },
    },
    {
      title: "Mức độ",
      dataIndex: "level", // 'normal', 'urgency'
      key: "level",
      filters: [
        {
          text: 'Normal',
          value: 'Normal',
        },
        {
          text: 'Urgency',
          value: 'Urgency',
        },
      ],
      onFilter: (value, record) => record.level.indexOf(value) === 0,
      render: (value, dataRecord) => {
        return (
            <div>
              {dataRecord.levelCode == 0 ? (
                  <Tag color="#2db7f5">{dataRecord.level}</Tag>
              ) : (
                  <Tag color="#f50">{dataRecord.level}</Tag>
              )}
            </div>
        );
      }
    },
    // {
    //   title: "Người tạo",
    //   dataIndex: "createdBy",
    //   key: "createdBy"
    // },
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
    {
      title: 'Tác vụ',
      key: 'operation',
      width: '10%',
      render: (record) => (
          <div style={{textAlign: 'center'}}>
            <p>
              <InfoCircleOutlined
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Xem chi tiết"
                  onClick={(value) => {
                    setLoadingModal(true);
                    setVisibleModalDetailIncident(true);
                    setChildData([]);
                    getInforIncident(record.id)
                        .then((dataIncident) => {
                          let listDetailChild = [];
                          dataIncident.map((data) => {
                            let listEmployees = '';
                            if (data.task_type) {
                              data.employees.map((person, index) => {
                                if (index == 0) {
                                  listEmployees += person.full_name;
                                } else {
                                  listEmployees += ', ' + person.full_name;
                                }
                              });
                              let childDataObject = {
                                name: data.task_type.name,
                                employees: listEmployees,
                                description: data.task_type.description,
                                status: data.status
                              };
                              listDetailChild.push(childDataObject);
                            }
                          });
                          setChildData(listDetailChild);
                          setLoadingModal(false);
                        })
                        .catch((err) => {
                          setLoadingModal(false);
                        });
                  }}
                  style={{color: 'blue', marginLeft: 5}}
              />
            </p>

            <p style={record.statusCode == 0 ? {} : {display: 'none'}}>
              <Button
                  type="primary"
                  onClick={() => {
                    setVisibleModal(true);
                    setTypeWorkNew(null);
                    setListEmployeesNew([]);
                    setIdModalIncident(record.id);
                  }}
              >
                Tiến hành xử lý
              </Button>
            </p>
          </div>
      ),
    },
    // {
    //   title: "Thời gian đã xử lý sự cố",
    //   dataIndex: "loggedTime", //Nhân viên phải log time chi tiết về việc xử lý sự cố: (từ mấy h - đến mấy h, đã làm gì)
    //   key: "loggedTime"
    // }
  ];

  const getInforIncident = (idIncident) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: URL_API + '/task/detail',
        headers: {
          'api-token': API_TOKEN,
          'project-type': CURRENT_TYPE,
        },
        params: { incident_id: idIncident },
      })
          .then(function (response) {
            setLoadingChildTable(false);
            resolve(response.data);
          })
          .catch(function (err) {
            //handle error
            // console.log(err);
            setLoadingChildTable(false);
            message.error(err.response.data.error.message);
            reject(err);
          });
    });
  };

  const getListEmployees = () => {
    axios({
      method: 'get',
      url: URL_API + '/task/employee-listing',
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
        .then(function (response) {
          const children = [];
          response.data.map((item) => {
            children.push(<Option key={item.id}>{item.full_name}</Option>);
          });
          setDataEmployees(children);
        })
        .catch(function (err) {
          //handle error
          console.log(err);
        });
  };

  const getListWork = () => {
    axios({
      method: 'get',
      url: URL_API + '/task-type/listing',
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
        .then(function (response) {
          const children = [];
          response.data.map((item) => {
            children.push(<Option key={item.id}>{item.name}</Option>);
          });
          setListTypeWork(children);
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

  const search = (value) => {
    // console.log("PASS", { value });
    const filterTable = dataIncidents.filter((o) =>
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

  const submitCreateNewChildWork = (value) => {
    setLoadingModal(true);
    let list = '';
    value.listNewWorks.map((childWork, index) => {
      if (index == 0) {
        list = childWork.typeWork + ',' + childWork.listEmployee.toString();
      } else {
        list +=
            ';' + childWork.typeWork + ',' + childWork.listEmployee.toString();
      }
    });
    axios({
      method: 'post',
      url: URL_API + '/task/handler',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
      data: {
        incident_id: idModalIncident,
        list: list,
      },
    })
        .then(function (response) {
          setLoadingModal(false);
          setVisibleModal(false);
          getDataIncidents();
        })
        .catch(function (err) {
          //handle error
          console.log(err);
          message.error(err.response.data.error.message);
          setLoadingModal(false);
        });
  };

  const EditableContext = React.createContext();

  const childColumns = [
    {
      title: 'Loại công việc xử lý',
      dataIndex: 'name',
    },
    {
      title: 'Nhân viên thực hiện',
      dataIndex: 'employees',
    },
    {
      title: 'Mô tả công việc',
      dataIndex: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (text, record) =>
          record.creatNew ? (
              <Popconfirm
                  title="Sure to delete?"
                  // onConfirm={() => handleDeleteRow(record.key)}
              >
                <a>Delete</a>
              </Popconfirm>
          ) : null,
    },
  ];

  return(
      <StyleList>
        <div>
          <br/>
          <h2>Tra cứu thông tin sự cố</h2>
          <br/>
          <Row>
          <Col span={6}>
            <Button type="primary" className="buttontype" onClick={() => window.open('/imageGallery', "_blank")}>Tạo sự cố offline</Button>
          </Col>
          <Col span={6}>
            <Button type="primary" className="buttontype" onClick={() => window.open('/videoGallery', "_blank")}>Tạo sự cố từ stream</Button>
          </Col>
          <Col span={6}>
            <Button type="primary" className="buttontype" onClick={() => window.open('/sucodedieu-statistics', "_blank")}>Thống kê sự cố</Button>
          </Col>
            <Col span={6}>
              <Button type="primary" className="buttontype"  onClick={() => window.open('/handle-problem', "_blank")}>Tiến trình xử lý sự cố</Button>
            </Col>
          </Row>
          <br/>
          <br/>
          <Row justify="space-around">
            <Col span={12}>
              <Input.Search
                  style={{ margin: '0 0 10px 0' }}
                  placeholder="Tra cứu sự cố..."
                  enterButton
                  onSearch={search}
              />
          </Col>
            <Col span={6}>
              <Form.Item label="Tìm theo thời gian" name='time'>
                <TimePicker></TimePicker>
              </Form.Item>
            </Col>
          </Row>
          <br/>
          <Spin spinning={loadingTable} tip="Loading...">
          <Table rowKey={(record) => record.id}
                 columns={columns}
                 pagination={{ defaultPageSize: 5 }}
                 dataSource={filterTable == null ? dataIncidents : filterTable}
                 size="middle"
          />
          </Spin>

          <Modal
              title={'Thêm công việc xử lý'}
              visible={visibleModal}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
          >
            <Spin spinning={loadingModal} tip="Loading...">
              <Form
                  name="dynamic_form_nest_item"
                  onFinish={submitCreateNewChildWork}
                  autoComplete="off"
              >
                <Form.List name="listNewWorks">
                  {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                            <Space
                                key={field.key}
                                style={{ display: 'flex', marginBottom: 8 }}
                                align="baseline"
                            >
                              <Form.Item
                                  {...field}
                                  name={[field.name, 'typeWork']}
                                  fieldKey={[field.fieldKey, 'typeWork']}
                                  rules={[
                                    { required: true, message: 'Thiếu loại công việc' },
                                  ]}
                              >
                                <Select
                                    style={{ minWidth: 200 }}
                                    placeholder="Loại công việc"
                                    onChange={(value) => {
                                      setTypeWorkNew(value);
                                    }}
                                >
                                  {listTypeWork}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                  {...field}
                                  name={[field.name, 'listEmployee']}
                                  fieldKey={[field.fieldKey, 'listEmployee']}
                                  rules={[
                                    { required: true, message: 'Thiếu tên nhân viên' },
                                  ]}
                              >
                                <Select
                                    style={{ minWidth: 200 }}
                                    mode="multiple"
                                    placeholder="Tên nhân viên"
                                    onChange={(value) => {
                                      setListEmployeesNew(value);
                                    }}
                                >
                                  {dataEmployees}
                                </Select>
                              </Form.Item>
                              <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <Form.Item>
                          <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                          >
                            Thêm công việc xử lý mới
                          </Button>
                        </Form.Item>
                      </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Modal>
          <Modal
              title={'Chi tiết công việc xử lý sự cố'}
              visible={visibleModalDetailIncident}
              onCancel={() => {
                setVisibleModalDetailIncident(false);
              }}
              width={'60%'}
              footer={null}
          >
            <Spin spinning={loadingModal} tip="Loading...">
              <Table
                  rowKey={(record) => record.id}
                  columns={childColumns}
                  dataSource={childData}
              />
            </Spin>
          </Modal>
        </div>


      </StyleList>

  )
};

export default HomeDeDieu;
