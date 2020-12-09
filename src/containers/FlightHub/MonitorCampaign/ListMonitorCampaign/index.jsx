import React, { useEffect, useState } from 'react';
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
  notification,
  Spin,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import StyleListMonitorCampaign, { StyleSpinContainer } from './index.style';
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

import { monitorCampaignApi } from '../../../../apis';

const { Option } = Select;
const { RangePicker } = DatePicker;

//data fake
const monitoredObjects = [
  { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
  { id: '5349b4ddd2781d08c0989123', name: 'Lửa trại' },
  { id: '5349b4ddd2781d08c0989234', name: 'Núi lửa phun trào' },
  { id: '5749b4ddd2781d08c0989345', name: 'Đám cháy' },
  { id: '5349b4ddd2781d08c0989456', name: 'Khói' },
];

const monitoredZones = [
  {
    id: '5249b4ddd2781d08c0989123',
    name: 'Cổng Trần Đại Nghĩa, đại học bách khoa Hà Nội',
    geometry: {
      type: 'Point',
      coordinates: [21.00481, 105.845577],
    },
  },
  {
    id: '5249b4ddd2781d08c0989456',
    name: 'Cổng Đại Cồ Việt, trường đại học bách khoa Hà Nội',
    geometry: {
      type: 'Point',
      coordinates: [21.007529, 105.843959],
    },
  },
  {
    id: '5249b4ddd2781d08c0989789',
    name: 'Bệnh viện Bạch Mai',
    geometry: {
      type: 'Point',
      coordinates: [21.00175, 105.841373],
    },
  },
  {
    id: '5249b4ddd2781d08c0989987',
    name: 'Ngã tư Vọng',
    geometry: {
      type: 'Point',
      coordinates: [20.996481, 105.845556],
    },
  },
  {
    id: '5249b4ddd2781d08c0989876',
    name: 'Chợ Mơ',
    geometry: {
      type: 'Point',
      coordinates: [20.99576, 105.85014],
    },
  },
  {
    id: '5249b4ddd2781d08c0989765',
    name: 'Ngã tư Tam Trinh - Minh Khai',
    geometry: {
      type: 'Point',
      coordinates: [20.996181, 105.862641],
    },
  },
  {
    id: '5249b4ddd2781d08c0989654',
    name: 'Ngã tư Thanh Nhàn - Kim Ngưu',
    geometry: {
      type: 'Point',
      coordinates: [21.002992, 105.861696],
    },
  },
  {
    id: '5249b4ddd2781d08c0989543',
    name: 'Ký túc xá B10',
    geometry: {
      type: 'Point',
      coordinates: [21.005656, 105.847427],
    },
  },
  {
    id: '5249b4ddd2781d08c0989432',
    name: 'Điểm dừng bus Lê Thanh Nghị',
    geometry: {
      type: 'Point',
      coordinates: [21.00159, 105.843901],
    },
  },
  {
    id: '5249b4ddd2781d08c0989321',
    name: 'Đại học xây dựng Hà Nội',
    geometry: {
      type: 'Point',
      coordinates: [21.003943, 105.842716],
    },
  },
];

const ListMonitorCampaign = () => {
  const [listMonitorCampaignsData, setListMonitorCampaignsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const fetchListMonitorCampaignsData = async (params) => {
    try {
      setLoading(true);
      const resp = await monitorCampaignApi.getListMonitorCampaigns(params);
      setListMonitorCampaignsData(resp.data.result.monitorCampaigns);
      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại',
      });
    }
  };
  useEffect(() => {
    fetchListMonitorCampaignsData();
  }, []);

  console.log('listMonitorCampaignsData ', listMonitorCampaignsData);

  const handleSearch = () => {
    const newFieldValues = form.getFieldsValue();
    const params = convertFieldValuesToDataSubmit(newFieldValues);
    fetchListMonitorCampaignsData(params);
  };

  const onResetFieldValues = () => {
    form.resetFields();
  };

  const goToUpdateMonitorCampaign = (item) => () => {
    const { _id } = item;
    history.push(`/flight-hub-monitor-campaigns/${_id}`);
  };

  const goToCreate = () => {
    history.push(`/flight-hub-monitor-campaigns/create`);
  };

  const handleDeleteMonitorCampaign = (item, index) => async () => {
    try {
      const resp = await monitorCampaignApi.deleteMonitorCampaign(item._id);
      const newListMonitorCampaignsData = [...listMonitorCampaignsData];
      newListMonitorCampaignsData.splice(index, 1);
      setListMonitorCampaignsData(newListMonitorCampaignsData);
      notification.info({
        message: 'Xóa thành công!',
      });
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại',
      });
    }
  };

  const deleteConfirm = (item, index) => () => {
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
      onOk: handleDeleteMonitorCampaign(item, index),
    });
  };

  const columns = [
    {
      dataIndex: '_id',
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
      dataIndex: 'monitoredObjects',
      title: 'Đối tượng giám sát',
      width: '12.5%',
      sorter: (a, b) => 1,
      render: (data = []) => {
        return data.map((elem) => {
          const { name, createdAt } = elem.content;
          return <div key={createdAt.toString()}>{name}</div>;
        });
      },
    },
    {
      dataIndex: 'monitoredZone',
      title: 'Miền giám sát',
      width: '12.5%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (data) => data && <span>{data.name}</span>,
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
      render: (data) => (
        <span>{data === METADATA_TYPES.VIDEO ? 'Video' : 'Ảnh'}</span>
      ),
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
      width: '10%',
      align: 'center',
      render: (data, record, index) => {
        return (
          <Space size={4}>
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={goToUpdateMonitorCampaign(record)}
            >
              Sửa
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="danger"
              size="small"
              onClick={deleteConfirm(record, index)}
            >
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
        <Button
          icon={<PlusOutlined />}
          type="primary"
          size="middle"
          onClick={goToCreate}
        >
          Tạo đợt giám sát
        </Button>
      </Row>

      <StyleSeparator />

      <StyleSearchForm>
        <Form
          form={form}
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
              <Form.Item name="monitoredObject" label="Đối tượng giám sát">
                <Select allowClear placeholder="Chọn đối tượng giám sát">
                  {monitoredObjects.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="monitoredZone" label="Miền giám sát">
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
          <Col span={8} offset={16}>
            <Col span={13} offset={10}>
              <Row type="flex" justify="end">
                <Button
                  size="middle"
                  icon={<HistoryOutlined />}
                  onClick={onResetFieldValues}
                >
                  Đặt lại
                </Button>
              </Row>
            </Col>
          </Col>
        </Form>
      </StyleSearchForm>

      <StyleSeparator />
      {loading ? (
        <StyleSpinContainer>
          <Spin />
        </StyleSpinContainer>
      ) : (
        <StyleTable>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={listMonitorCampaignsData}
            scroll={{ x: 1560 }}
          />
        </StyleTable>
      )}
    </StyleListMonitorCampaign>
  );
};

export default ListMonitorCampaign;
