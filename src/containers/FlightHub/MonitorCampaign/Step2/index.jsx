import React, { useEffect, useState } from 'react';
import { StyleSeparator, StyleTitle } from '../../../../themes/default';
import StyleStep2 from './index.style';
import { Button, Row, Table, message, notification } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';
import { droneApi } from '../../../../apis';
import { formatMomentDateToDateTimeString } from '../services';
// const initData = [
//   {
//     key: '5349b4ddd2781d08c0981203',
//     id: '5349b4ddd2781d08c0981203',
//     name: 'Drone A',
//     type: 'Loại 1',
//     brandName: 'DJI',
//   },
//   {
//     key: '5349b4ddd2781d08c0981102',
//     id: '5349b4ddd2781d08c0981102',
//     name: 'Drone B',
//     type: 'Loại 2',
//     brandName: 'DJI',
//   },
// ];

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

  const columns = [
    {
      dataIndex: 'id',
      title: 'Mã drone',
      width: '15%',
      align: 'center',
    },
    { dataIndex: 'name', title: 'Tên drone', width: 'auto' },
    { dataIndex: 'dimensions', title: 'Kích thước', width: '15%' },
    { dataIndex: 'color', title: 'Màu', width: '15%' },
    {
      dataIndex: 'brand',
      title: 'Nhà sản xuất',
      width: '15%',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
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
