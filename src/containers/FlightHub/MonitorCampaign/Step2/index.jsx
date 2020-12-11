import React, { useEffect, useState } from 'react';
import { StyleSeparator, StyleTitle } from '../../../../themes/default';
import StyleStep2 from './index.style';
import { Button, Row, Table, message, notification, Select } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';
import { droneApi } from '../../../../apis';
import { formatMomentDateToDateTimeString } from '../services';

const payloads = [
  {
    id: '3456787979',
    name: 'payload1',
  },
  {
    id: '369852147',
    name: 'payload1',
  },
  {
    id: '987456321',
    name: 'payload1',
  },
];
const flightRoutes = [
  {
    id: '3456787979',
    name: 'flight Route 1',
  },
  {
    id: '369852147',
    name: 'flight Route 1',
  },
  {
    id: '987456321',
    name: 'flight Route 1',
  },
];

const Step2 = ({ nextStep, prevStep, handleChangeData, data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drones, setDrones] = useState([]);
  const { timeRange } = data;

  useEffect(() => {
    const fetchDronesData = async () => {
      const timeStart = formatMomentDateToDateTimeString(timeRange[0]);
      const timeEnd = formatMomentDateToDateTimeString(timeRange[1]);
      try {
        const resp = await droneApi.getDroneAvailable({ timeStart, timeEnd });
        console.log('resp ', resp.data);
        setDrones(resp.data);
      } catch (error) {
        notification.error({
          message: 'Có lỗi xảy ra! Xin thử lại.',
        });
      }
    };
    fetchDronesData();
  }, []);

  useEffect(() => {
    const { drones = [] } = data;
    setSelectedRowKeys(drones);
  }, [data]);

  const handleChangeFlightRoute = (record, index) => (value) => {
    // const newOtherGroupsData = [...otherGroupsData];
    // newOtherGroupsData[index].priority = value;
    // setOtherGroupsData(newOtherGroupsData);

    const indexSelected = selectedRowKeys.findIndex(
      (item) => record.id === item.id,
    );
    if (indexSelected > -1) {
      const newSelectedRows = [...selectedRowKeys];
      newSelectedRows[indexSelected].priority = value;
      setSelectedRowKeys(newSelectedRows);
    }
  };

  const handleChangePayloads = (record, index) => (values) => {
    const indexSelected = selectedRowKeys.findIndex(
      (item) => record.id === item.id,
    );
    if (indexSelected > -1) {
      const newSelectedRows = [...selectedRowKeys];
      newSelectedRows[indexSelected].payloads = values;
      setSelectedRowKeys(newSelectedRows);
    }
  };

  const columns = [
    { dataIndex: 'name', title: 'Tên drone', width: 'auto' },
    { dataIndex: 'dimensions', title: 'Kịch thước', width: '15%' },
    { dataIndex: 'color', title: 'Màu', width: '15%' },
    {
      dataIndex: 'brand',
      title: 'Nhà sản xuất',
      width: '15%',
    },

    {
      dataIndex: 'payloads',
      title: 'Payload',
      width: '20%',
      align: 'center',
      editable: true,
      render: (data, record, index) => {
        return (
          <Select
            style={{ width: 150 }}
            mode="multiple"
            onChange={handleChangePayloads(record, index)}
          >
            {payloads.map(({ id, name }) => (
              <Select.Option key={id.toString()} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      dataIndex: 'flightRoute',
      title: 'Đường bay',
      width: '20%',
      align: 'center',
      editable: true,
      render: (data, record, index) => {
        return (
          <Select
            style={{ width: 150 }}
            onChange={handleChangeFlightRoute(record, index)}
          >
            {flightRoutes.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows);
    },
    selectedRowKeys: selectedRowKeys,
  };

  const handleNextStep = () => {
    if (!selectedRowKeys.length) {
      message.warning('Nhóm drones tham gia không được để trống!');
      return;
    }
    handleChangeData({ drones: selectedRowKeys });
    nextStep();
  };

  return (
    <StyleStep2>
      <StyleTitle>
        {'Danh sách drone sẵn sàng từ ' +
          moment(timeRange[0]).format(DATE_TIME_FORMAT) +
          ' đến ' +
          moment(timeRange[1]).format(DATE_TIME_FORMAT)}
      </StyleTitle>
      <StyleSeparator />
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        rowKey="id"
        selections={true}
        columns={columns}
        dataSource={drones}
      />
      <Row type="flex">
        <Button
          type="default"
          icon={<StepBackwardOutlined />}
          onClick={prevStep}
        >
          Quay lại
        </Button>
        &ensp;
        <Button
          type="primary"
          icon={<StepForwardOutlined />}
          onClick={handleNextStep}
        >
          Tiếp theo
        </Button>
      </Row>
    </StyleStep2>
  );
};

export default Step2;
