import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  MECHANISM,
  METADATA_TYPES,
  RESOLUTION,
  ATTACH_PARAMS,
} from '../../../constants';
import MonitorCampaignForm from './MonitorCampaignForm';
import { convertInitialDataToFieldValues, randomDateTime } from './services';

const monitorObjects = [
  { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
  { id: '5349b4ddd2781d08c0989123', name: 'Lửa trại' },
  { id: '5349b4ddd2781d08c0989234', name: 'Núi lửa phun trào' },
  { id: '5749b4ddd2781d08c0989345', name: 'Đám cháy' },
  { id: '5349b4ddd2781d08c0989456', name: 'Khói' },
];

const monitoredZones = [
  { id: '5249b4ddd2781d08c0989123', name: `Tiểu khu A` },
  { id: '5249b4ddd2781d08c0989456', name: `Tiểu khu B` },
  { id: '5249b4ddd2781d08c0989789', name: `Tiểu khu C` },
];

const initialData = {
  attachParams: [
    ATTACH_PARAMS.UAV_SOURCE,
    ATTACH_PARAMS.COORDINATE,
    ATTACH_PARAMS.TIME,
    ATTACH_PARAMS.HUMIDITY,
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
  monitorObject: { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
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
      monitorObjects={monitorObjects}
      monitoredZones={monitoredZones}
    ></MonitorCampaignForm>
  );
};

export default UpdateMonitorCampaign;
