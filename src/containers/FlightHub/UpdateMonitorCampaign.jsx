import React from 'react';
import MonitorCampaignForm from './MonitorCampaignForm';
import { convertInitialDataToFieldValues } from './services';

const initialDataFake = {
  attachParams: [
    'uav_source',
    'time',
    'coordinate',
    'location',
    'journeys',
    'weather',
    'temperature',
  ],
  description: 'Ghi chú',
  drones: [1],
  endTime: new Date(),
  location: '1',
  mechanism: 'manually',
  metadataType: 'photo',
  name: 'Đợt giám sát A',
  objectId: '1',
  resolution: '720p',
  startTime: new Date(),
};

const UpdateMonitorCampaign = ({ initialData = initialDataFake }) => {
  return (
    <MonitorCampaignForm
      initialData={convertInitialDataToFieldValues(initialData)}
      title="Sửa đợt giám sát"
    ></MonitorCampaignForm>
  );
};

export default UpdateMonitorCampaign;
