import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { MECHANISM, METADATA_TYPES, RESOLUTION } from '../../../constants';
import MonitorCampaignForm from './MonitorCampaignForm';
import { convertInitialDataToFieldValues, randomDateTime } from './services';
import { monitorCampaignApi } from '../../../apis';
import { notification } from 'antd';

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
// const initialData = {
//   attachParams: [
//     '5349b4ddd2781d0111111111',
//     '5349b4ddd2781d0222222222',
//     '5349b4ddd2781d0855555555',
//     '5349b4ddd2781d0877777777',
//   ],
//   name: 'Đợt giám sát A',
//   drones: [
//     {
//       id: '5349b4ddd2781d08c0981203',
//       name: 'Drone A',
//       type: 'Loại 1',
//       brandName: 'DJI',
//     },
//   ],
//   monitoredObject: { id: '5349b4ddd2781d08c0989012', name: 'Người hút thuốc' },
//   monitoredZone: { id: '5249b4ddd2781d08c0989123', name: `Tiểu khu A` },
//   mechanism: MECHANISM.AUTO,
//   metadataType: METADATA_TYPES.VIDEO,
//   resolution: RESOLUTION['1080p'],
//   startTime: randomDateTime(new Date('2020-11-20'), new Date('2020-11-25')),
//   endTime: randomDateTime(new Date('2020-11-25'), new Date('2020-11-29')),
//   description: null,
// };

const UpdateMonitorCampaign = () => {
  const [monitorCampaignData, setMonitorCampaignData] = useState({});
  const params = useParams();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const { id } = params;
    const fetchMonitorCampaignData = async () => {
      try {
        const resp = await monitorCampaignApi.getMonitorCampaign(id);
        setMonitorCampaignData(resp.data);
      } catch (error) {
        notification.error({
          message: 'Có lỗi xảy ra! Xin thử lại',
        });
      }
    };
    fetchMonitorCampaignData();
  }, [params]);

  const updateMonitorCampaign = async (values) => {
    try {
      const { id } = params;
      const dataSubmit = { _id: id, ...values };
      const resp = await monitorCampaignApi.updateMonitorCampaign(dataSubmit);

      notification.success({
        message: 'Cập nhật thành công!',
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
      initialData={convertInitialDataToFieldValues(monitorCampaignData)}
      title="Sửa đợt giám sát"
      handleSubmit={updateMonitorCampaign}
      attachParams={attachParams}
    ></MonitorCampaignForm>
  );
};

export default UpdateMonitorCampaign;
