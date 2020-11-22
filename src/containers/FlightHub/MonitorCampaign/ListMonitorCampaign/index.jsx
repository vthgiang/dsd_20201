import React, { useState } from 'react';
import {
  Row,
  Input,
  Col,
  Table,
  Modal,
  Space,
  Button,
  Select,
  Form,
  DatePicker,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import StyleListMonitorCampaign from './index.style';
import {
  StyleTitle,
  StyleSeparator,
  StyleTable,
  StyleSearchForm,
} from '../../../../themes/default';
import {
  convertFieldValuesToDataSubmit,
  formatMomentDateToDateTimeString,
} from '../services';
import { randomDateTime } from '../services';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';
import { MECHANISM, METADATA_TYPES, RESOLUTION } from '../../../../constants';

const { Option } = Select;
const { RangePicker } = DatePicker;

const monitorObjects = [
  { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
  { id: '5349b4ddd2781d08c0989123', name: 'Lửa trại' },
  { id: '5349b4ddd2781d08c0989234', name: 'Núi lửa phun trào' },
  { id: '5749b4ddd2781d08c0989345', name: 'Đám cháy' },
  { id: '5349b4ddd2781d08c0989456', name: 'Khói' },
];

const monitoredZones = [
  { id: '5249b4ddd2781d08c0989123', name: `Tiểu khu A` },
  { id: '5249b4ddd2781d08c0989456', name: `Tiểu khu B` },
  { id: '5249b4ddd2781d08c0989789', name: `Tiểu khu C` },
];

const data = [];
for (let i = 1; i <= 20; i++) {
  data.push({
    key: i,
    id: `MC${i < 10 ? '0' + i : i}`,
    drones: [1],
    name: `Đợt giám sát ${i + 1}`,
    startTime: randomDateTime(new Date('2020-11-20'), new Date('2020-11-25')),
    endTime: randomDateTime(new Date('2020-11-25'), new Date('2020-11-29')),
    mechanism: Math.round(Math.random()) ? 'manually' : 'auto',
    resolution: Math.round(Math.random()) ? '720p' : '1080p',
    metadataType: Math.round(Math.random()) ? 'photo' : 'video',
    monitoredZone:
      monitoredZones[Math.floor(Math.random() * monitoredZones.length)],
    monitorObject:
      monitorObjects[Math.floor(Math.random() * monitorObjects.length)],
    attachParams: [
      'uav_source',
      'time',
      'coordinate',
      'monitoredZone',
      'journeys',
      'weather',
      'temperature',
    ],
    description: 'Ghi chú',
  });
}

const ListMonitorCampaign = () => {
  const [fieldValues, setFieldValues] = useState({});
  const history = useHistory();

  const handleSearch = (values) => {
    const newFieldValues = { ...fieldValues, ...values };
    setFieldValues(newFieldValues);
    const dataSubmit = convertFieldValuesToDataSubmit(newFieldValues);
    console.log({ dataSubmit });
  };

  const goToUpdateMonitorCampaign = (item) => () => {
    const { id } = item;
    history.push(`/flight-hub/${id}`);
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
      width: '7.5%',
      align: 'center',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      dataIndex: 'name',
      title: 'Tên đợt giám sát',
      width: '15%',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      dataIndex: 'startTime',
      width: '12.5%',
      title: 'Thời gian bắt đầu',
      align: 'center',
      sorter: (a, b) => moment(a.startTime).diff(moment(b.startTime)),
      render: formatMomentDateToDateTimeString,
    },
    {
      dataIndex: 'endTime',
      width: '12.5%',
      title: 'Thời gian kết thúc',
      align: 'center',
      sorter: (a, b) => moment(a.startTime).diff(moment(b.startTime)),
      render: formatMomentDateToDateTimeString,
    },
    {
      dataIndex: 'monitorObject',
      title: 'Đối tượng giám sát',
      width: '12.5%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: ({ name }) => <span>{name}</span>,
    },
    {
      dataIndex: 'monitoredZone',
      title: 'Miền giám sát',
      width: '12.5%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: ({ name }) => <span>{name}</span>,
    },
    {
      dataIndex: 'mechanism',
      title: 'Chế độ điều khiển',
      width: '7.5%',
      align: 'center',
      sorter: (a, b) => a.mechanism.localeCompare(b.mechanism),
      render: (data) => <span>{data === 'auto' ? 'Tự động' : 'Thủ công'}</span>,
    },
    {
      dataIndex: 'metadataType',
      title: 'Dạng dữ liệu',
      width: '7.5%',
      align: 'center',
      sorter: (a, b) => a.metadataType.localeCompare(b.metadataType),
    },
    {
      dataIndex: 'resolution',
      title: 'Độ phân giải',
      width: '7.5%',
      align: 'center',
      sorter: (a, b) => a.resolution.localeCompare(b.resolution),
    },
    {
      key: 'actions',
      title: 'Hành động',
      width: 'auto',
      align: 'center',
      render: (data, record) => {
        return (
          <Space size={4}>
            <Button size="small" onClick={goToUpdateMonitorCampaign(record)}>
              Sửa
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

      <Row type="flex" justify="end" align="middle">
        <Button type="primary" size="middle" onClick={goToCreate}>
          Tạo đợt giám sát
        </Button>
      </Row>

      <StyleSeparator />

      <StyleSearchForm>
        <Form
          layout="horizontal"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 13 }}
          labelAlign="left"
          onValuesChange={handleSearch}
          size="small"
          // initialValues={initialValues}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                name="id"
                label="Mã đợt giám sát"
                rules={[{ type: 'string' }]}
              >
                <Input placeholder="VD: MC01" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Tên đợt giám sát"
                rules={[{ type: 'string' }]}
              >
                <Input placeholder="Nhập tên đợt giám sát" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="monitorObjectId" label="Đối tượng giám sát">
                <Select allowClear placeholder="Chọn đối tượng giám sát">
                  {monitorObjects.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="monitoredZoneId" label="Miền giám sát">
                <Select allowClear placeholder="Chọn miền giám sát">
                  {monitoredZones.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="mechanism" label="Chế độ điều khiển">
                <Select allowClear placeholder="Tự động/Thủ công">
                  <Option value={MECHANISM.AUTO}>Tự động</Option>
                  <Option value={MECHANISM.MANUALLY}>Thủ công</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="metadataType" label="Dạng dữ liệu">
                <Select allowClear placeholder="Video/Ảnh">
                  <Option value={METADATA_TYPES.VIDEO}>Video</Option>
                  <Option value={METADATA_TYPES.PHOTO}>Ảnh</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="resolution" label="Độ phân giải">
                <Select allowClear placeholder="Chọn độ phân giải">
                  <Option value={RESOLUTION['480p']}>480p</Option>
                  <Option value={RESOLUTION['720p']}>720p</Option>
                  <Option value={RESOLUTION['1080p']}>1080p</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                name="timeRange"
                label="Thời gian"
                labelCol={{ span: 5 }}
                rules={[{ type: 'array' }]}
              >
                <RangePicker showTime format={DATE_TIME_FORMAT} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </StyleSearchForm>

      <StyleSeparator />
      <StyleTable>
        <Table columns={columns} dataSource={data} />
      </StyleTable>
    </StyleListMonitorCampaign>
  );
};

export default ListMonitorCampaign;
