import React, { useEffect, useState } from 'react';
import StyleListMonitorCampaign, { StyleSpinContainer } from './index.style';
import { StyleTitle } from '../../../../themes/default';
import { useParams } from 'react-router-dom';
import { monitorCampaignApi } from '../../../../apis';
import { Descriptions, notification, Spin } from 'antd';
import { formatMomentDateToDateTimeString } from '../services';

const DetailMonitorCampaign = ({}) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [monitorCampaign, setMonitorCampaign] = useState(null);

  console.log({ monitorCampaign });

  useEffect(() => {
    const getMonitorCampaignById = async (id) => {
      setIsLoading(true);
      try {
        const resp = await monitorCampaignApi.getMonitorCampaign(id);
        setMonitorCampaign(resp.data.result.monitorCampaign);
      } catch (error) {
        notification.error({
          message: 'Có lỗi xảy ra! Xin thử lại',
          description: error.message,
        });
      }
      setIsLoading(false);
    };

    getMonitorCampaignById(params.id);
  }, []);

  return (
    <StyleListMonitorCampaign>
      {!isLoading && monitorCampaign ? (
        <>
          <StyleTitle>Thông tin đợt giám sát</StyleTitle>
          <Descriptions bordered style={{ marginTop: '20px' }}>
            <Descriptions.Item label='Mã đợt giám sát' span={6}>
              {monitorCampaign._id}
            </Descriptions.Item>

            <Descriptions.Item label='Tên đợt giám sát' span={2}>
              {monitorCampaign.name}
            </Descriptions.Item>
            <Descriptions.Item label='Loại sự cố' span={2}>
              {monitorCampaign.task}
            </Descriptions.Item>

            <Descriptions.Item label='Thời gian bắt đầu' span={2}>
              {formatMomentDateToDateTimeString(monitorCampaign.startTime)}
            </Descriptions.Item>
            <Descriptions.Item label='Thời gian kết thúc' span={2}>
              {formatMomentDateToDateTimeString(monitorCampaign.endTime)}
            </Descriptions.Item>

            <Descriptions.Item label='Miền giám sát' span={2}>
              {monitorCampaign.monitoredZone.name}
            </Descriptions.Item>
            <Descriptions.Item label='Đối tượng giám sát' span={2}>
              {monitorCampaign.monitoredObjects.map((monitoredObject) => {
                return (
                  <>
                    {monitoredObject.name} <br />
                  </>
                );
              })}
            </Descriptions.Item>

            <Descriptions.Item label='Drone sử dụng' span={6}>
              {monitorCampaign.drones.map((drone) => {
                return (
                  <>
                    {drone.name} - Payload:
                    {drone.payloads.length !== 0 ? (
                      <>
                        
                        {drone.payloads.map((payload, index) => (
                          <>
                            <span>{payload.name}</span>
                            {index !== drone.payloads.length - 1 && ', '}
                          </>
                        ))}
                      </> 
                    ) : <span> payload nào đó đã bị xoá bất hợp pháp</span>}
                    <br />
                  </>
                );
              })}
            </Descriptions.Item>

            <Descriptions.Item label='Cơ chế thu thập' span={2}>
              {monitorCampaign.mechanism}
            </Descriptions.Item>
            <Descriptions.Item label='Dạng lưu trữ' span={2}>
              {monitorCampaign.metadataType}
            </Descriptions.Item>
            <Descriptions.Item label='Độ phân giải' span={2}>
              {monitorCampaign.resolution}
            </Descriptions.Item>

            <Descriptions.Item label='Nhãn đính kèm' span={2}>
              {monitorCampaign.labels.map((label) => {
                return (
                  <>
                    {label.name} <br />
                  </>
                );
              })}
            </Descriptions.Item>

            <Descriptions.Item label='Mô tả' span={6}>
              {monitorCampaign.description}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <StyleSpinContainer>
          <Spin />
        </StyleSpinContainer>
      )}
    </StyleListMonitorCampaign>
  );
};

export default DetailMonitorCampaign;
