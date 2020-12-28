import React, { useEffect, useState } from 'react';
import { StyleSeparator, StyleTitle } from '../../../../themes/default';
import StyleStep3, { StyleSpinContainer } from './index.style';
import { Button, Row, Table, message, notification, Select, Spin } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';
import { droneApi, payloadApi } from '../../../../apis';
import { formatMomentDateToDateTimeString } from '../services';
import { convertDronesData } from './service';

const Step3 = ({ nextStep, prevStep, handleChangeData, data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dronesData, setDronesData] = useState([]);

  const [payloadsData, setPayloadsData] = useState([]);
  const [flightPathsData, setFlightPathsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const { timeRange } = data;

  const fetchDronesData = async (params) => {
    setLoading(true);
    try {
      const resp = await droneApi.getDroneAvailable(params);
      setDronesData(resp.data);

      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại.',
      });
    }
  };

  const fetchPayloadsData = async (params) => {
    setLoading(true);
    try {
      const resp = await payloadApi.getAllPayload(params);
      setPayloadsData(resp.data);

      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại.',
      });
    }
  };

  const fetchFlightPathsData = async (params) => {
    setLoading(true);
    const { monitoredZone } = data;
    try {
      const resp = await droneApi.getAllPathBySupervisedArea(monitoredZone);
      setFlightPathsData(resp.data);

      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại.',
      });
    }
  };

  useEffect(() => {
    const timeStart = formatMomentDateToDateTimeString(timeRange[0]);
    const timeEnd = formatMomentDateToDateTimeString(timeRange[1]);
    const params = { timeStart, timeEnd };
    fetchDronesData(params);
    fetchPayloadsData();
    fetchFlightPathsData();
  }, [timeRange]);

  const handleChangeFlightPath = (record, index) => (values) => {
    const newDrones = [...dronesData];
    newDrones[index].flightPaths = values;
    setDronesData(newDrones);

    const indexSelected = selectedRowKeys.findIndex(
      (item) => record.id === item
    );
    if (indexSelected > -1) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows[indexSelected].flightPaths = values;
      setSelectedRows(newSelectedRows);
    }
  };

  const handleChangePayloads = (record, index) => (values) => {
    const newDrones = [...dronesData];
    newDrones[index].payloads = values;
    setDronesData(newDrones);

    const indexSelected = selectedRowKeys.findIndex(
      (item) => record.id === item
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
          (drone) => drone.id === selectedDrone.id
        );
        if (indexSelected !== -1) {
          newDronesData[indexSelected].payloads = selectedDrone.payloads;
          newDronesData[indexSelected].flightPaths = selectedDrone.flightPaths;
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
            mode='multiple'
            value={data}
            onChange={handleChangePayloads(record, index)}
            placeholder='Chọn payloads'>
            {payloadsData.map(({ _id, name }) => (
              <Select.Option key={_id.toString()} value={_id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      dataIndex: 'flightPaths',
      title: 'Đường bay',
      width: '20%',
      align: 'center',
      editable: true,
      render: (data, record, index) => {
        return (
          <Select
            style={{ width: 150 }}
            value={data}
            mode='multiple'
            onChange={handleChangeFlightPath(record, index)}
            placeholder='Chọn đường bay'>
            {flightPathsData.map(({ id, name }) => (
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
    const drones = [...selectedRows];

    if (!drones.length) {
      message.warning('Nhóm drones tham gia không được để trống!');
      return;
    }

    for (const drone of drones) {
      const { payloads, flightPaths } = drone;
      if (!payloads || !payloads.length) {
        message.warning('Bạn chưa chọn payloads đính kèm drone!');
        return;
      }
      if (!flightPaths || !flightPaths.length) {
        message.warning('Bạn chưa chọn đường bay cho drone!');
        return;
      }
    }

    handleChangeData({ drones: convertDronesData(drones) });
    nextStep();
  };

  return (
    <StyleStep3>
      <StyleTitle>
        {'Danh sách drone sẵn sàng từ ' +
          moment(timeRange[0]).format(DATE_TIME_FORMAT) +
          ' đến ' +
          moment(timeRange[1]).format(DATE_TIME_FORMAT)}
      </StyleTitle>
      <StyleSeparator />
      <Table
        loading={loading}
        rowKey='id'
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
      <Row type='flex'>
        <Button
          type='default'
          icon={<StepBackwardOutlined />}
          onClick={prevStep}>
          Quay lại
        </Button>
        &ensp;
        <Button
          type='primary'
          icon={<StepForwardOutlined />}
          onClick={handleNextStep}>
          Tiếp theo
        </Button>
      </Row>
    </StyleStep3>
  );
};

export default Step3;
