import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MECHANISM, METADATA_TYPES, RESOLUTION } from '../../../constants';
import MonitorCampaignForm from './MonitorCampaignForm';
import { convertInitialDataToFieldValues, randomDateTime } from './services';

//data fake
const monitoredObjects = [
  { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
  { id: '5349b4ddd2781d08c0989123', name: 'Lửa trại' },
  { id: '5349b4ddd2781d08c0989234', name: 'Núi lửa phun trào' },
  { id: '5749b4ddd2781d08c0989345', name: 'Đám cháy' },
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

// monitorCampaign
const initialData = {
  attachParams: [
    '5349b4ddd2781d0111111111',
    '5349b4ddd2781d0222222222',
    '5349b4ddd2781d0855555555',
    '5349b4ddd2781d0877777777',
  ],
  name: 'Đợt giám sát A',
  drones: [
    {
      id: '5349b4ddd2781d08c0981203',
      name: 'Drone A',
      type: 'Loại 1',
      brandName: 'DJI',
    },
  ],
  monitoredObject: { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
  monitoredZone: { id: '5249b4ddd2781d08c0989123', name: `Tiểu khu A` },
  mechanism: MECHANISM.AUTO,
  metadataType: METADATA_TYPES.VIDEO,
  resolution: RESOLUTION['1080p'],
  startTime: randomDateTime(new Date('2020-11-20'), new Date('2020-11-25')),
  endTime: randomDateTime(new Date('2020-11-25'), new Date('2020-11-29')),
  description: null,
};

const UpdateMonitorCampaign = () => {
  const [data, setData] = useState(initialData || {});
  const params = useParams();
  useEffect(() => {
    const { id } = params;
    // call api get monitor campaign detail
    setData(initialData);
  }, [params]);
  return (
    <MonitorCampaignForm
      initialData={convertInitialDataToFieldValues(data)}
      title="Sửa đợt giám sát"
      monitoredObjects={monitoredObjects}
      monitoredZones={monitoredZones}
      attachParams={attachParams}
    ></MonitorCampaignForm>
  );
};

export default UpdateMonitorCampaign;
