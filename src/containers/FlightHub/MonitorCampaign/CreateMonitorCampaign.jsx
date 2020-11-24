import React from 'react';
import MonitorCampaignForm from './MonitorCampaignForm';

const monitorObjects = [
  { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
  { id: '5349b4ddd2781d08c0989123', name: 'Lửa trại' },
  { id: '5349b4ddd2781d08c0989234', name: 'Núi lửa phun trào' },
  { id: '5749b4ddd2781d08c0989345', name: 'Nhiệt độ cao' },
  { id: '5349b4ddd2781d08c0989456', name: 'Khói' },
];

const monitoredZones = [
  { id: '5249b4ddd2781d08c0989123', name: `Tiểu khu A` },
  { id: '5249b4ddd2781d08c0989456', name: `Tiểu khu B` },
  { id: '5249b4ddd2781d08c0989789', name: `Tiểu khu C` },
];

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
  return (
    <MonitorCampaignForm
      title="Tạo đợt giám sát"
      monitorObjects={monitorObjects}
      monitoredZones={monitoredZones}
      attachParams={attachParams}
    ></MonitorCampaignForm>
  );
};

export default CreateMonitorCampaign;
