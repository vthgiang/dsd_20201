import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { message, Table, Tag } from 'antd';
import useBaseHook from '../../../hooks/BaseHooks';
import incidentService from '../../../services/group09/incidentService';
import incidentLevelService from '../../../services/group09/incidentLevelService';
import incidentStatusService from '../../../services/group09/incidentStatusService';
import moment from 'moment';

let status = [];
const Incident = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify, getData } = useBaseHook();
  const [incidents, setIncidents] = useState([]);
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
    },
    // {
    //   title: "Thời gian đã xử lý sự cố",
    //   dataIndex: "loggedTime", //Nhân viên phải log time chi tiết về việc xử lý sự cố: (từ mấy h - đến mấy h, đã làm gì)
    //   key: "loggedTime"
    // }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let [error, [incidents, _levels, _status] = []] = await to(
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
    setIncidents(incidents.incidents || []);
    setLevels(_levels || []);
    setStatus(_status || []);
    setLoading(false);
    console.log('incidents', incidents);
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
