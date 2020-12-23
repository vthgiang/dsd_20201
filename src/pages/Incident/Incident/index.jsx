import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { message, Table, Tag } from 'antd';
import incidentService from '../../../services/group09/incidentService';
import userService from '../../../services/group09/userService';
import incidentLevelService from '../../../services/group09/incidentLevelService';
import incidentStatusService from '../../../services/group09/incidentStatusService';
import moment from 'moment';
import _ from "lodash";

const Incident = () => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [users, setUsers] = useState({})
  const [levels, setLevels] = useState([]);
  const [status, setStatus] = useState([]);
  const columns = [
    {
      title: 'Tên sự cố',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => <a href={`/incidents/${record._id}`}>{text}</a>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status', // 'open', 'inProcess', 'resolve', 'close'
      key: 'status',
      filters: status.map((item) => {
        return { text: item.name, value: item.code };
      }),
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
      },
    },
    {
      title: 'Mức độ',
      dataIndex: 'level', // 'normal', 'urgency'
      key: 'level',
      filters: levels.map((item) => {
        return { text: item.name, value: item.code };
      }),
      onFilter: (value, record) => Number(record.level.code) === Number(value),
      render: (text) => {
        console.log('text', text);
        switch (text.code) {
          case 0:
            return <Tag color="#2db7f5">{text.name}</Tag>;
          case 1:
            return <Tag color="#f50">{text.name}</Tag>;
        }
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text) => {
        return <div>{users[text]}</div>
      }
    },
    {
      title: 'Hạn dự kiến',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) =>
        moment(a.dueDate).format('YYYYMMDD') -
        moment(b.dueDate).format('YYYYMMDD'),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) =>
        moment(a.createdAt).format('YYYYMMDD') -
        moment(b.createdAt).format('YYYYMMDD'),
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).format('YYYY-MM-DD'),
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const fetchUsers = async (userIds) => {
    let [error, users] = await to(userService().getUserName(userIds))
   let status = _.get(users, "status", "fail");
    if(status!== "Successful"){
      alert("Server nhóm user bị lỗi!!!");
      return;
    };
    users = _.get(users, "result", []);
    let _userObj = {};
    users.map(item => _userObj[item.id] = item.full_name);
    setUsers(_userObj);
  }
  const fetchData = async () => {
    setLoading(true);
    let [error, [incidents = {}, _levels, _status] = []] = await to(
      Promise.all([
        incidentService().index(),
        incidentLevelService().index(),
        incidentStatusService().index(),
      ]),
    );
    if (error){
      message.error('Không thể trả về danh sách sự cố!');
      return
    }
    let _incidents = _.get(incidents, "incidents", []);
    
    setIncidents(_incidents);
    setLevels(_levels || []);
    setStatus(_status || []);
    setLoading(false);
    let userIds = _incidents.map(item => item.createdBy);
    fetchUsers(userIds);
  };
  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={incidents}
      loading={loading}
    />
  );
};

export default Incident;
