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
