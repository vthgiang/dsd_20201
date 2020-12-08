import React, { useEffect, useState } from 'react';
import { StyleSeparator, StyleTitle } from '../../../../themes/default';
import StyleStep2 from './index.style';
import { Button, Row, Table, message } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../configs';

const initData = [
  {
    key: '5349b4ddd2781d08c0981203',
    id: '5349b4ddd2781d08c0981203',
    name: 'Drone A',
    type: 'Loại 1',
    brandName: 'DJI',
  },
  {
    key: '5349b4ddd2781d08c0981102',
    id: '5349b4ddd2781d08c0981102',
    name: 'Drone B',
    type: 'Loại 2',
    brandName: 'DJI',
  },
];

const Step2 = ({ nextStep, prevStep, handleChangeData, data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drones, setDrones] = useState([]);
  const { timeRange = [new Date(), new Date(Date.now() + 24 * 60000)] } = data;

  useEffect(() => {
    const { drones = [] } = data;
    setSelectedRowKeys(drones);
  }, [data]);

  useEffect(() => {
    // call Api get list drones available
    setDrones(initData || []);
  }, []);

  const columns = [
    {
      dataIndex: 'id',
      title: 'Mã drone',
      width: '10%',
      align: 'center',
    },
    { dataIndex: 'name', title: 'Tên drone', width: '30%' },
    { dataIndex: 'type', title: 'Loại drone', width: '30%' },
    {
      dataIndex: 'brandName',
      title: 'Nhà sản xuất',
      width: '30%',
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
