import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { message, Table, Tag, Input, Space, Button, Typography } from 'antd';
import incidentService from '../../../services/group09/incidentService';
import userService from '../../../services/group09/userService';
import incidentLevelService from '../../../services/group09/incidentLevelService';
import incidentStatusService from '../../../services/group09/incidentStatusService';
import monitoredService from '../../../services/group09/monitoredService';
import areaService from '../../../services/group09/areaService';

import moment from 'moment';
import _ from "lodash";
import { SearchOutlined } from '@ant-design/icons';

let cacheMonitoreds = []
let cacheAreas = []

const Incident = () => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [users, setUsers] = useState({})
  const [levels, setLevels] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput = null
  console.log('incidents', incidents)
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
              ref={node => {
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      ...getColumnSearchProps('index')
    },
    {
      title: 'Tên sự cố',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => <a href={`/incidents/${record._id}`}>{text}</a>,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render: (text, record) => <Typography.Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Xem tiếp' }}>{text}</Typography.Paragraph>,
    },
    {
      title: 'Đối tượng giám sát',
      dataIndex: 'monitoredIds',
      key: 'monitoredIds',
      filters: cacheMonitoreds.map((item) => {
        return { text: item.name, value: item._id };
      }),
      onFilter: (value, record) => {
        const images = record.images || []
        const monitoredIds = _.uniq(images.map(item => item.monitoredObjectId))
        return monitoredIds.includes(value)
      },
      render: (text, record) => {
        const images = record.images || []
        const monitoredIds = _.uniq(images.map(item => item.monitoredObjectId))
        const monitoreds = cacheMonitoreds.filter(item => monitoredIds.includes(item._id))
        return <div>{
          monitoreds.map(item => <a key={item._id} href={`/monitored-object-management/view/${item._id}`}><Tag>{item.name}</Tag></a>)
        }</div>
      }
    },
    {
      title: 'Miền giám sát',
      dataIndex: 'areaIds',
      key: 'areaIds',
      filters: cacheAreas.map((item) => {
        return { text: item.name, value: item._id };
      }),
      onFilter: (value, record) => {
        const images = record.images || []
        const areaIds = _.uniq(images.map(item => item.idSupervisedArea))
        return areaIds.includes(value)
      },
      render: (text, record) => {
        const images = record.images || []
        const areaIds = _.uniq(images.map(item => item.idSupervisedArea))
        const areas = cacheAreas.filter(item => areaIds.includes(item._id))
        return <div>{
          areas.map(item => <a key={item._id} href={`/surveillance-domain-manage/edit`}><Tag>{item.name}</Tag></a>)
        }</div>
      }
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
      render: (text, record) => {
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
    let [error, [incidents = {}, _levels, _status, monitoreds = {}, areas ={}] = []] = await to(
      Promise.all([
        incidentService().index(),
        incidentLevelService().index(),
        incidentStatusService().index(),
        monitoredService().index(),
        areaService().index()
      ]),
    );
    if (error){
      message.error('Không thể trả về danh sách sự cố!');
      return
    }
    if (!monitoreds.success) {
      message.error(monitoreds.messages)
    }
    if (!areas.success) {
      message.error(areas.messages)
    }
    let _incidents = _.get(incidents, "incidents", []).map((i, index) => {return {...i, index}})
    
    setIncidents(_incidents);
    setLevels(_levels || []);
    setStatus(_status || []);
    cacheMonitoreds = monitoreds.content
    cacheAreas = _.get(areas, 'content.zone', [])
    setLoading(false);
    let userIds = _incidents.map(item => item.createdBy);
    fetchUsers(userIds);
  };
  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={incidents}
      pagination={{
        pageSize: 10,
        total: incidents.length,
        showTotal: (total) => `${total} sự cố`,
        showSizeChanger: false
      }}
      bordered
    />
  );
};

export default Incident;
