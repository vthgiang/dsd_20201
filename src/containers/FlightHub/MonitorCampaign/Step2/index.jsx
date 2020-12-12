import React, { useEffect, useState } from 'react';
import { StyleSeparator, StyleTitle } from '../../../../themes/default';
import StyleStep2, { StyleSpinContainer } from './index.style';
import { Button, Row, Table, message, notification, Select, Spin } from 'antd';
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [dronesData, setDronesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { timeRange } = data;

  useEffect(() => {
    const fetchDronesData = async () => {
      setLoading(true);
      const timeStart = formatMomentDateToDateTimeString(timeRange[0]);
      const timeEnd = formatMomentDateToDateTimeString(timeRange[1]);
      try {
        const resp = await droneApi.getDroneAvailable({ timeStart, timeEnd });
        setDronesData(resp.data);

        setLoading(false);
      } catch (error) {
        notification.error({
          message: 'Có lỗi xảy ra! Xin thử lại.',
        });
      }
    };
    fetchDronesData();
  }, []);

  const handleChangeFlightRoute = (record, index) => (value) => {
    const newDrones = [...dronesData];
    newDrones[index].flightRoute = value;
    setDronesData(newDrones);

    const indexSelected = selectedRowKeys.findIndex(
      (item) => record.id === item,
    );
    if (indexSelected > -1) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows[indexSelected].flightRoute = value;
      setSelectedRows(newSelectedRows);
    }
  };

  const handleChangePayloads = (record, index) => (values) => {
    const newDrones = [...dronesData];
    newDrones[index].payloads = values;
    setDronesData(newDrones);

    const indexSelected = selectedRowKeys.findIndex(
      (item) => record.id === item.id,
    );
    if (indexSelected > -1) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows[indexSelected].payloads = values;
      setSelectedRows(newSelectedRows);
    }
  };

  useEffect(() => {
    const { drones = [] } = data;
    if (dronesData.length) {
      const newDronesData = [...dronesData];
      drones.forEach((selectedDrone) => {
        const indexSelected = newDronesData.findIndex(
          (drone) => drone.id === selectedDrone.id,
        );
        if (indexSelected !== -1) {
          newDronesData[indexSelected].payloads = selectedDrone.payloads;
          newDronesData[indexSelected].flightRoute = selectedDrone.flightRoute;
        }
      });
      setDronesData(newDronesData);
    }

    const rowKeys = drones.map((drone) => drone.id);
    setSelectedRows(drones);
    setSelectedRowKeys(rowKeys);
  }, [data, dronesData.length]);

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
            value={data}
            onChange={handleChangePayloads(record, index)}
            placeholder="Chọn payloads"
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
            value={data}
            onChange={handleChangeFlightRoute(record, index)}
            placeholder="Chọn đường bay"
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

  const handleNextStep = () => {
    if (!selectedRowKeys.length) {
      message.warning('Nhóm drones tham gia không được để trống!');
      return;
    }
    handleChangeData({ drones: selectedRows });
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
      {loading ? (
        <StyleSpinContainer>
          <Spin />
        </StyleSpinContainer>
      ) : (
        <Table
          rowKey="id"
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRows(selectedRows);
              setSelectedRowKeys(selectedRowKeys);
            },
            selectedRowKeys: selectedRowKeys,
          }}
          // selections={true}
          columns={columns}
          dataSource={dronesData}
        />
      )}
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
