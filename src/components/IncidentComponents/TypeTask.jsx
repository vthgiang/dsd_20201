import React, { useEffect, useRef, useState } from 'react';
import '../Styles/StyleListIncidents.css';
import { Table, Modal, Button, Input, Space, Spin, Select ,message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import URL_API from './url';

const { Option } = Select;

const TypeTask = () => {
  const [dataType, setdataType] = useState([]);
  const [contentModal, setContentModal] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const [dataEdit, setDataEdit] = useState({
    name: '',
    description: '',
    employee_number: 0,
    prioritize: 0,
  });
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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: 'get',
      url: URL_API + '/task-type/listing',
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
      .then(function (response) {
        //handle success
        setLoadingTable(false);
        setdataType(response.data);
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  };

  const search = (value) => {
    // console.log("PASS", { value });
    const filterTable = dataType.filter((o) =>
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
      dataIndex: 'name',
      //   ...getColumnSearchProps("title"),
    },
    // {
    //   title: "Mã công việc",
    //   dataIndex: "task_id",
    //   sorter: (a, b) => b.task_id - a.task_id,
    //   sortDirections: ["descend"],
    // //   ...getColumnSearchProps("task_id"),
    // },
    {
      title: 'Nội dung công việc',
      dataIndex: 'description',
      //   ...getColumnSearchProps("description"),
    },
    {
      title: 'Số lượng nhân viên',
      dataIndex: 'employee_number',
      sorter: (a, b) => b.employee_number - a.employee_number,
      sortDirections: ['descend'],
    },
    {
      title: 'Loại sự cố',
      dataIndex: 'project_type',
      render: (text, record) => (
        <p>{codeIncidents[record.project_type].name}</p>
      ),
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
      onFilter: (value, record) => record.project_type.indexOf(value) === 0,
    },
    {
      title: 'Trạng thái ưu tiên',
      dataIndex: 'prioritize',
      render: (value, record) => (
        <p>{record.prioritize == true ? 'true' : 'false'}</p>
      ),
    },
    {
      title: 'Tác vụ',
      key: 'operation',
      render: (record) => (
        <div>
          <EditOutlined
            style={{ fontSize: 22, color: 'orange' }}
            onClick={(e) => editData(record)}
            data-toggle="tooltip"
            data-placement="top"
            title="Sửa công việc"
          />
          <DeleteOutlined
            style={{ fontSize: 22, color: 'red', marginLeft: 30 }}
            onClick={(e) => _delete(record)}
            data-toggle="tooltip"
            data-placement="top"
            title="Xóa công việc"
          />
        </div>
      ),
    },
  ];

  const _delete = (record) => {
    confirmAlert({
      title: 'Xóa công việc',
      message: 'Bạn chắc chắn muốn xóa công việc ' + record.name + '?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios({
              method: 'delete',
              url: URL_API + '/task-type/delete?id=' + record.id,
              // url: URL_API + "/report/listing",
              headers: {
                'api-token': API_TOKEN,
                'project-type': CURRENT_TYPE,
              },
            })
              .then(function (response) {
                //handle success
                message.success("Xóa công việc thành công")
                setLoadingTable(true);
                getData();
              })
              .catch(function (err) {
                //handle error
                console.log(err);
              });
          },
        },
        {
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  };

  const editData = (record) => {
    var mydata = record;
    mydata.prioritize = record.prioritize == true ? 1 : 0;
    setDataEdit(mydata);
    setVisibleModal(true);
  };

  const handleOk = () => {
    setVisibleModal(false);
  };
  const handleCancel = () => {
    setVisibleModal(false);
    setVisibleModal1(false);
  };

  const addData = () => {
    setDataEdit({
      name: '',
      description: '',
      employee_number: 0,
      prioritize: 0,
    });
    setVisibleModal1(true);
  };

  const handleOk1 = () => {
    setVisibleModal1(false);
  };
  const handleCancel1 = () => {
    setVisibleModal1(false);
  };

  const onChangeValue = (key, value) => {
    setDataEdit({
      ...dataEdit,
      [key]: value,
    });
  };

  const submitEditData = () => {
    let id = dataEdit.id;
    let name = dataEdit.name;
    let description = dataEdit.description;
    let employee_number = dataEdit.employee_number;
    let prioritize = dataEdit.prioritize;
    axios({
      method: 'put',
      url:
        URL_API +
        `/task-type/update?id=${id}&name=${name}&description=${description}&employee_number=${employee_number}&prioritize=${prioritize}`,
      // url: URL_API + "/report/listing",
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
    })
      .then(function (response) {
        //handle success
        handleCancel();
        message.success("Sửa chi tiết công việc thành công");
        setLoadingTable(true);
        getData();
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });

  };

  const submitAddData = () => {
    var formData = new FormData();
    formData.append("name", dataEdit.name);
    formData.append("description", dataEdit.description);
    formData.append("employee_number", dataEdit.employee_number);
    formData.append("prioritize", dataEdit.prioritize);
    axios({
      method: 'post',
      url: URL_API + `/task-type/create`,
      headers: {
        'api-token': API_TOKEN,
        'project-type': CURRENT_TYPE,
      },
      data: formData
    })
      .then(function (response) {
        //handle success
        
        handleCancel();
        message.success("Thêm công việc thành công")
        setLoadingTable(true);
        getData();
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  };

  return (
    <div>
      <div className="header" onClick={() => { }}>
        Danh sách các công việc để xử lý sự cố
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
            dataSource={filterTable == null ? dataType : filterTable}
            size="middle"
          />
        </Spin>

        <Button type="primary" onClick={addData} style={{ marginTop: 20 }}>
          Thêm mới
        </Button>
      </div>
      <Modal
        title={'Sửa chi tiết công việc'}
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <p>Tên công việc</p>
        <Input
          value={dataEdit.name}
          onChange={(e) => onChangeValue('name', e.target.value)}
        />

        <p style={{ marginTop: 20 }}>Nội dung công việc</p>
        <Input
          value={dataEdit.description}
          onChange={(e) => onChangeValue('description', e.target.value)}
        />

        <p style={{ marginTop: 20 }}>Số lượng nhân viêc</p>
        <Input
          value={dataEdit.employee_number}
          type="number"
          onChange={(e) => onChangeValue('employee_number', e.target.value)}
        />

        <p style={{ marginTop: 20 }}>Trạng thái ưu tiên</p>
        {/* <Input  value={dataEdit.prioritize} onChange={(e) => onChangeValue("employee_number", e.target.value)} /> */}
        <Select
          defaultValue={dataEdit.prioritize}
          onChange={(e) => onChangeValue('prioritize', e)}
          style={{ width: '100%' }}
        >
          <Option value={1}>true</Option>
          <Option value={0}>false</Option>
        </Select>

        <Button
          type="primary"
          onClick={submitEditData}
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </Modal>

      <Modal
        title={'Thêm chi tiết công việc'}
        visible={visibleModal1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        footer={null}
        width={700}
      >
        <p>Tên công việc</p>
        <Input
          value={dataEdit.name}
          onChange={(e) => onChangeValue('name', e.target.value)}
        />

        <p style={{ marginTop: 20 }}>Nội dung công việc</p>
        <Input
          value={dataEdit.description}
          onChange={(e) => onChangeValue('description', e.target.value)}
        />

        <p style={{ marginTop: 20 }}>Số lượng nhân viêc</p>
        <Input
          value={dataEdit.employee_number}
          type="number"
          onChange={(e) => onChangeValue('employee_number', e.target.value)}
        />

        <p style={{ marginTop: 20 }}>Trạng thái ưu tiên</p>
        {/* <Input  value={dataEdit.prioritize} onChange={(e) => onChangeValue("employee_number", e.target.value)} /> */}
        <Select
          defaultValue={dataEdit.prioritize}
          onChange={(e) => onChangeValue('prioritize', e)}
          style={{ width: '100%' }}
        >
          <Option value={1}>true</Option>
          <Option value={0}>false</Option>
        </Select>

        <Button
          type="primary"
          onClick={submitAddData}
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default TypeTask;
