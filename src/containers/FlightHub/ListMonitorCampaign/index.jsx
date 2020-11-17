import React from 'react';
import { Row, Input, Col, Table, Modal, Space, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import StyleListMonitorCampaign from './index.style';
import { StyleTitle, StyleSeparator } from '../../../themes/default';
import { formatMomentDateToDateTimeString } from '../services';
const { Search } = Input;

const initialDataFake = {
  attachParams: [
    'uav_source',
    'time',
    'coordinate',
    'location',
    'journeys',
    'weather',
    'temperature',
  ],
  description: 'Ghi chú',
  drones: [1],
  endTime: new Date(),
  location: '1',
  mechanism: 'manually',
  metadataType: 'photo',
  name: 'Đợt giám sát A',
  objectId: '1',
  resolution: '720p',
  startTime: new Date(),
};

const data = [];
const objectsData = [
  'Rừng nguyên sinh',
  'Rừng đặc dụng',
  'Rừng trồng',
  'Rừng phòng hộ',
  'Rừng phòng hộ',
  'Rừng sản xuất',
];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    id: i,
    ...initialDataFake,
    name: `Đợt giám sát ${i + 1}`,
    objectId: objectsData[Math.floor(Math.random() * objectsData.length)],
    location: `Tiểu khu ${String.fromCharCode(i + 65)}`,
  });
}

const ListMonitorCampaign = () => {
  const history = useHistory();

  const goToMonitorCampaignDetail = (item) => () => {
    const { id } = item;
    history.push(`/flight-hub/${id}`);
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  const goToCreate = () => {
    history.push(`/flight-hub/create`);
  };

  const handleDeleteMonitorCampaign = (item) => () => {
    console.log({ item });
  };

  const deleteConfirm = (item) => () => {
    const { name } = item;
    Modal.confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Bạn có muốn xóa đợt giám sát <strong>{name}</strong> không?
        </span>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: handleDeleteMonitorCampaign(item),
    });
  };

  const columns = [
    {
      dataIndex: 'id',
      title: 'Mã đợt giám sát',
      width: '10%',
      align: 'center',
    },
    {
      dataIndex: 'name',
      title: 'Tên đợt giám sát',
      width: '20%',
    },
    {
      dataIndex: 'startTime',
      width: '15%',
      title: 'Thời gian bắt đầu',
      render: formatMomentDateToDateTimeString,
      align: 'center',
    },
    {
      dataIndex: 'startTime',
      width: '15%',
      title: 'Thời gian kết thúc',
      render: formatMomentDateToDateTimeString,
      align: 'center',
    },
    {
      dataIndex: 'objectId',
      title: 'Đối tượng giám sát',
      width: '15%',
    },
    {
      dataIndex: 'location',
      title: 'Miền giám sát',
      width: '15%',
    },
    {
      key: 'actions',
      title: 'Hành động',
      width: 'auto',
      align: 'center',
      render: (data, record) => {
        return (
          <Space size={8}>
            <Button size="small" onClick={goToMonitorCampaignDetail(record)}>
              Chi tiết
            </Button>
            <Button type="danger" size="small" onClick={deleteConfirm(record)}>
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <StyleListMonitorCampaign>
      <StyleTitle>Danh sách đợt giám sát</StyleTitle>

      <Row type="flex" justify="space-between" align="middle">
        <Col span={8}>
          <Search
            placeholder="Nhập tên đợt giám sát"
            onSearch={handleSearch}
            enterButton
          />
        </Col>
        <Col span={16}>
          <Row type="flex" justify="end">
            <Button type="primary" size="middle" onClick={goToCreate}>
              Tạo đợt giám sát
            </Button>
          </Row>
        </Col>
      </Row>
      <StyleSeparator />
      <Table columns={columns} dataSource={data} />
    </StyleListMonitorCampaign>
  );
};

export default ListMonitorCampaign;
