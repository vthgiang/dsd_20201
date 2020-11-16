import React, { useEffect, useState } from 'react';
import { StyleSeparator, StyleTitle } from '../../../themes/default';
import StyleStep2 from './index.style';
import { Button, Row, Table, message } from 'antd';

const originData = [
  {
    key: 1,
    id: 1,
    name: 'Drone A',
    type: 'Loại 1',
    brandName: 'DJI',
  },
  {
    key: 2,
    id: 2,
    name: 'Drone B',
    type: 'Loại 2',
    brandName: 'DJI',
  },
];
const Step2 = ({ nextStep, prevStep, handleChangeData, data }) => {
  const [selectedDrones, setSelectedDrones] = useState([]);
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    // call Api get list drone available
    
    setDrones(originData || []);
  }, []);
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Mã drone',
      width: '10%',
      align: 'center',
    },
    { key: 'name', dataIndex: 'name', title: 'Tên drone', width: '30%' },
    { key: 'type', dataIndex: 'type', title: 'Loại drone', width: '30%' },
    {
      key: 'brandName',
      dataIndex: 'brandName',
      title: 'Nhà sản xuất',
      width: '30%',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedDrones(selectedRows);
    },
  };

  const handleNextStep = () => {
    if (!selectedDrones.length) {
      message.warning('Nhóm drones tham gia không được để trống!');
      return;
    }
    handleChangeData({ drones: selectedDrones });
    nextStep();
  };

  return (
    <StyleStep2>
      <StyleTitle>Danh sách drone sẵn sàng</StyleTitle>
      <StyleSeparator />
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={originData}
      />
      <Row type="flex">
        <Button type="default" onClick={prevStep}>
          Quay lại
        </Button>
        &ensp;
        <Button type="primary" onClick={handleNextStep}>
          Tiếp theo
        </Button>
      </Row>
    </StyleStep2>
  );
};

export default Step2;
