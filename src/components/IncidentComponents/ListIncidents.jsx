import React, { useEffect, useState } from 'react';
import '../Styles/StyleListIncidents.css';
import { Table, Modal, Button, Input, Space, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  List,
  Avatar,
  Spin,
  Badge,
  Menu,
  Dropdown,
  Popconfirm,
  Select,
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import URL_API from './url';
// import URL_API from "./url";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const ListIncidents = () => {
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
  const API_TOKEN = '4c901bcdba9f440a2a7c31c0bcbd78ec';
  const CURRENT_TYPE = 'LUOI_DIEN';
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
      title: 'Tên sự cố',
      dataIndex: 'name',
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
              <Badge status="warning" text={dataRecord.status} />
            ) : dataRecord.statusCode == 1 ? (
              <Badge status="processing" text={dataRecord.status} />
            ) : (
              <Badge status="success" text={dataRecord.status} />
            )}
          </div>
        );
      },
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
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
      filterMultiple: false,
      onFilter: (value, record) => record.level.indexOf(value) === 0,
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      width: '15%',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      filters: [
        {
          text: 'Sự cố cháy rừng',
          value: 'Sự cố cháy rừng',
        },
        {
          text: 'Sự cố đê điều',
          value: 'Sự cố đê điều',
        },
        {
          text: 'Sự cố cây trồng',
          value: 'Sự cố cây trồng',
        },
        {
          text: 'Sự cố lưới điện cao thế',
          value: 'Sự cố lưới điện cao thế',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      width: '20%',
    },
    {
      title: 'Tác vụ',
      key: 'operation',
      width: '10%',
      render: (record) => (
        <div style={{ textAlign: 'center' }}>
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
              style={{ color: 'blue', marginLeft: 5 }}
            />
          </p>

          <p style={record.statusCode == 0 ? {} : { display: 'none' }}>
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

  const EditableRow = (index) => {
    // const [form] = Form.useForm();
    return (
      // <Form form={form} component={false}>
      //   <EditableContext.Provider value={form}>
      //     <tr {...props} />
      //   </EditableContext.Provider>
      // </Form>
      <div>AAAAAAAAAAAAAA</div>
    );
  };

  return (
    <div>
      <div className="header" onClick={() => {}}>
        Danh sách công việc xử lý sự cố
      </div>
      <div>
        <Input.Search
          style={{ margin: '0 0 10px 0' }}
          placeholder="Search by..."
          enterButton
          onSearch={search}
        />
        <Spin spinning={loadingTable} tip="Loading...">
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            pagination={{ defaultPageSize: 5 }}
            dataSource={filterTable == null ? dataIncidents : filterTable}
            size="middle"
            // expandable={{
            //   expandedRowRender: (record, index, indent, expand) => {
            //     let childData = [];
            //     const childColumns = [
            //       {
            //         title: "Loại công việc xử lý",
            //         dataIndex: "name",
            //       },
            //       {
            //         title: "Nhân viên thực hiện",
            //         dataIndex: "employees",
            //       },
            //       {
            //         title: "Mô tả công việc",
            //         dataIndex: "description",
            //       },
            //       {
            //         title: "",
            //         dataIndex: "operation",
            //         render: (text, record) =>
            //           record.creatNew ? (
            //             <Popconfirm
            //               title="Sure to delete?"
            //             // onConfirm={() => handleDeleteRow(record.key)}
            //             >
            //               <a>Delete</a>
            //             </Popconfirm>
            //           ) : null,
            //       },
            //     ];
            //     if (expand && loadingChildTable == false) {
            //       if (listChildDataRecord.length > 0) {
            //         let child = listChildDataRecord.find(
            //           (item) => item.id == record.id
            //         );
            //         // console.log("Asd213", listChildDataRecord);

            //         if (child) {
            //           child.map((data) => {
            //             let listEmployees = "";
            //             if(data.task_type){
            //               data.employees.map((person, index) => {
            //                 if (index == 0) {
            //                   listEmployees += person.full_name;
            //                 } else {
            //                   listEmployees += ", " + person.full_name;
            //                 }
            //               });
            //               let childDataObject = {
            //                 name: data.task_type.name,
            //                 employees: listEmployees,
            //                 description: data.task_type.description,
            //               };
            //               childData.push(childDataObject);
            //               // console.log("dasd", childDataObject);
            //             }
            //           });
            //         }
            //       }
            //     }
            //     return (
            //       <Spin spinning={loadingChildTable} tip="Loading...">
            //         <Table
            //           rowKey={(record) => record.id}
            //           columns={childColumns}
            //           dataSource={childData}
            //           pagination={false}
            //         />
            //       </Spin>
            //     );
            //   },
            //   onExpand: (expanded, record) => {
            //     if (expanded) {
            //       setLoadingChildTable(true);
            //       getInforIncident(record.id).then((dataIncident) => {
            //         dataIncident.id = record.id;
            //         setListChildDataRecord([
            //           ...listChildDataRecord,
            //           dataIncident,
            //         ]);
            //       });
            //     }
            //   },
            //   rowExpandable: (record) => record.name !== "Not Expandable",
            // }}
          />
        </Spin>
      </div>
      <Modal
        title={'Thêm công việc xử lý'}
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={loadingModal} tip="Loading...">
          {/* <div>
            <Select
              style={{ width: "100%", marginTop: 20 }}
              placeholder="Loại công việc"
              onChange={(value) => {
                setTypeWorkNew(value);
              }}
            >
              {listTypeWork}
            </Select>
            <Select
              style={{ width: "100%", marginTop: 20 }}
              mode="multiple"
              placeholder="Tên nhân viên"
              onChange={(value) => {
                setListEmployeesNew(value);
              }}
            >
              {dataEmployees}
            </Select>
            <Button
              type="primary"
              style={{ marginTop: 20 }}
              onClick={submitCreateNewChildWork}
            >
              Lưu
            </Button>
          </div> */}
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
  );
};

export default ListIncidents;
