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
  Tag,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
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
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';
import {
  MECHANISM,
  METADATA_TYPES,
  RESOLUTION,
  TASK,
} from '../../../../constants';

import { monitorCampaignApi } from '../../../../apis';
import debounce from '../../../../utils/debounce';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListMonitorCampaign = () => {
  const [listMonitorCampaignsData, setListMonitorCampaignsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const projectType = useSelector((state) => state.user.projectType);
  const isAdmin = projectType === 'ALL_PROJECT';

  const fetchListMonitorCampaignsData = async (params = {}) => {
    try {
      setLoading(true);
      const resp = await monitorCampaignApi.getListMonitorCampaigns(params);
      let { monitorCampaigns } = resp.data.result;
      monitorCampaigns = monitorCampaigns
        .map((monitorCampaign) => {
          const isValidMonitorCampaign = checkTask(monitorCampaign);
          return isValidMonitorCampaign;
        })
        .filter((elem) => !!elem);

      setListMonitorCampaignsData(monitorCampaigns);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) return;
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại',
        description: error.message
      });
    }
  };

  useEffect(() => {
    fetchListMonitorCampaignsData();
  }, [location]);

  const handleSearch = () => {
    const newFieldValues = form.getFieldsValue();
    const params = convertFieldValuesToDataSubmit(newFieldValues);
    debounce(fetchListMonitorCampaignsData)(params);
  };

  const onResetFieldValues = () => {
    form.resetFields();
    debounce(fetchListMonitorCampaignsData)();
  };

  const goToUpdateMonitorCampaign = (item) => () => {
    const { _id } = item;
    history.push(`/flight-hub-monitor-campaigns/update/${_id}`);
  };

  const goToDetailMonitorCampaign = (item) => () => {
    const { _id } = item;
    history.push(`/flight-hub-monitor-campaigns/${_id}`);
  };

  const goToCreate = () => {
    history.push(`/flight-hub-monitor-campaigns/create`);
  };

  const handleDeleteMonitorCampaign = (item) => async () => {
    try {
      await monitorCampaignApi.deleteMonitorCampaign(item._id);
      let newListMonitorCampaignsData = [...listMonitorCampaignsData];
      newListMonitorCampaignsData = newListMonitorCampaignsData.filter(
        (elem) => elem._id !== item._id
      );
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

  const checkTask = (monitorCampaign) => {
    const { startTime, endTime, task } = monitorCampaign;
    const now = Date.now();
    const COLORS = {
      success: 'success',
      processing: 'processing',
      error: 'error',
      default: 'default',
      warning: 'warning',
    };
    monitorCampaign.status =
      moment(now).diff(startTime) < 0
        ? { color: COLORS.default, content: 'Chưa diễn ra' }
        : moment(now).diff(endTime) <= 0
        ? { color: COLORS.success, content: 'Đang diễn ra' }
        : { color: COLORS.warning, content: 'Đã đóng' };

    const taskValue = form.getFieldValue('task');
    if (taskValue && task !== taskValue) return null;
    return monitorCampaign;
  };

  const renderStatus = (status) => {
    return status && <Tag color={status.color}>{status.content}</Tag>;
  };

  const columns = [
    {
      dataIndex: '_id',
      title: 'Mã đợt giám sát',
      width: '7.5%',
      align: 'center',
      // sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      dataIndex: 'name',
      title: 'Tên đợt giám sát',
      width: '15%',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      dataIndex: 'task',
      title: 'Loại sự cố',
      width: '10%',
      sorter: (a, b) => a.task.localeCompare(b.task),
    },
    {
      dataIndex: 'status',
      title: 'Trạng thái',
      width: '10%',
      sorter: (a, b) => {
        return a.status.content.localeCompare(b.status.content);
      },
      render: renderStatus,
    },
    // {
    //   dataIndex: 'monitoredObjects',
    //   title: 'Đối tượng giám sát',
    //   width: '12.5%',
    //   sorter: (a, b) => 1,
    //   render: (data = []) => {
    //     return data.map((elem) => {
    //       const { name, _id } = elem;
    //       return <div key={_id}>{name}</div>;
    //     });
    //   },
    // },
    // {
    //   dataIndex: 'monitoredZone',
    //   title: 'Miền giám sát',
    //   width: '12.5%',
    //   sorter: (a, b) => a.name.localeCompare(b.name),
    //   render: (data) => data && <span>{data.name}</span>,
    // },
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
      sorter: (a, b) => moment(a.endTime).diff(moment(b.endTime)),
      render: formatMomentDateToDateTimeString,
    },
    {
      key: 'actions',
      title: 'Hành động',
      width: '10%',
      align: 'center',
      fixed: 'right',
      render: (data, record, index) => {
        return (
          <Space size={4}>
            <Button
              size='small'
              type='primary'
              onClick={goToDetailMonitorCampaign(record)}>
              Chi tiết
            </Button>
            <Button
              icon={<EditOutlined />}
              size='small'
              onClick={goToUpdateMonitorCampaign(record)}>
              Sửa
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type='danger'
              size='small'
              onClick={deleteConfirm(record, index)}>
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <StyleListMonitorCampaign>
      <Row type='flex' justify='space-between' align='middle'>
        <StyleTitle>Danh sách đợt giám sát</StyleTitle>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          size='middle'
          onClick={goToCreate}>
          Tạo đợt giám sát
        </Button>
      </Row>

      <StyleSeparator />

      <StyleSearchForm>
        <Form
          form={form}
          layout='horizontal'
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 13 }}
          labelAlign='left'
          onValuesChange={handleSearch}
          size='small'
          // initialValues={initialValues}
        >
          <Row>
            <Col span={16} offset={8} pull={8}>
              <Form.Item
                name='timeRange'
                label='Thời gian'
                labelCol={{ span: 5 }}
                rules={[{ type: 'array' }]}>
                <RangePicker showTime format={DATE_TIME_FORMAT} />
              </Form.Item>
            </Col>

            {isAdmin && (
              <Col span={8}>
                <Form.Item
                  name='task'
                  label='Loại sự cố'
                  rules={[
                    {
                      type: 'string',
                    },
                  ]}>
                  <Select allowClear placeholder='Chọn loại sự cố'>
                    {Object.keys(TASK).map((key) => {
                      return (
                        <Select.Option key={key} value={TASK[key]}>
                          {TASK[key]}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            )}

            <Col span={8}>
              <Form.Item
                name='name'
                label='Tên đợt giám sát'
                rules={[{ type: 'string' }]}>
                <Input placeholder='Nhập tên đợt giám sát' />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name='mechanism' label='Chế độ điều khiển'>
                <Select allowClear placeholder='Tự động/Thủ công'>
                  <Option value={MECHANISM.AUTO}>Tự động</Option>
                  <Option value={MECHANISM.MANUALLY}>Thủ công</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name='metadataType' label='Dạng dữ liệu'>
                <Select allowClear placeholder='Video/Ảnh'>
                  <Option value={METADATA_TYPES.VIDEO}>Video</Option>
                  <Option value={METADATA_TYPES.PHOTO}>Ảnh</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name='resolution' label='Độ phân giải'>
                <Select allowClear placeholder='Chọn độ phân giải'>
                  <Option value={RESOLUTION['480p']}>480p</Option>
                  <Option value={RESOLUTION['720p']}>720p</Option>
                  <Option value={RESOLUTION['1080p']}>1080p</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} offset={isAdmin ? 0 : 8}>
              <Col span={13} offset={10}>
                <Row type='flex' justify='end'>
                  <Button
                    size='middle'
                    icon={<HistoryOutlined />}
                    onClick={onResetFieldValues}>
                    Đặt lại
                  </Button>
                </Row>
              </Col>
            </Col>
          </Row>
        </Form>
      </StyleSearchForm>

      <StyleSeparator />
      <StyleTable>
        <Table
          loading={loading}
          rowKey='_id'
          columns={columns}
          dataSource={listMonitorCampaignsData}
        />
      </StyleTable>
    </StyleListMonitorCampaign>
  );
};

export default ListMonitorCampaign;
