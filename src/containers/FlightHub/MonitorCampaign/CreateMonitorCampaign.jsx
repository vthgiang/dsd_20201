import React from 'react';
import MonitorCampaignForm from './MonitorCampaignForm';
import { monitorCampaignApi } from '../../../apis';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
const attachParams = [
  {
    id: '5349b4ddd2781d0111111111',
    property: 'uavSource',
    name: 'UAV nguồn',
  },
  {
    id: '5349b4ddd2781d0222222222',
    property: 'time',
    name: 'Thời gian',
  },
  {
    id: '5349b4ddd2781d0855555555',
    property: 'coordinate',
    name: 'Tọa độ',
  },
  {
    id: '5349b4ddd2781d0866666666',
    property: 'location',
    name: 'Vị trí',
  },
  {
    id: '5349b4ddd2781d0877777777',
    property: 'journeys',
    name: 'Hành trình',
  },
  {
    id: '5349b4ddd2781d0888888888',
    property: 'weather',
    name: 'Thời tiết',
  },
  {
    id: '5349b4ddd2781d0999999999',
    property: 'temperature',
    name: 'Nhiệt độ',
  },
  {
    id: '5349b4ddd2781d0999999999',
    property: 'humidity',
    name: 'Độ ẩm',
  },
];

const CreateMonitorCampaign = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const createMonitorCampaign = async (data) => {
    console.log('data ', data);
    try {
      const resp = await monitorCampaignApi.createMonitorCampaign(data);

      notification.success({
        message: 'Tạo thành công!',
      });
      goBack();
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra! Xin thử lại',
      });
    }
  };

  return (
    <MonitorCampaignForm
      title="Tạo đợt giám sát"
      attachParams={attachParams}
      handleSubmit={createMonitorCampaign}
    ></MonitorCampaignForm>
  );
};

export default CreateMonitorCampaign;
