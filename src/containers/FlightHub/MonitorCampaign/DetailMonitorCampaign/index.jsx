import React, { useEffect, useState } from 'react';
import StyleListMonitorCampaign, { StyleSpinContainer } from './index.style';
import { StyleTitle } from '../../../../themes/default';
import { useParams } from 'react-router-dom';
import { monitorCampaignApi } from '../../../../apis';
import { Descriptions, Badge, Spin } from 'antd';
import moment from 'moment';
import axios from 'axios';

const DetailMonitorCampaign = ({}) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [monitorCampaign, setMonitorCampaign] = useState(null);

  useEffect(() => {
    const getMonitorCampaignById = async (id) => {
      setIsLoading(true);
      const resp = await monitorCampaignApi.getMonitorCampaign(id);

      setMonitorCampaign(resp.data.result.monitorCampaign);
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
            <Descriptions.Item label="Tên đợt giám sát" span={2}>
              {monitorCampaign.name}
            </Descriptions.Item>
            <Descriptions.Item label="Sự cố" span={2}>
              {monitorCampaign.task}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian bắt đầu" span={2}>
              {moment(monitorCampaign.startTime).format(
                'MMMM Do YYYY, h:mm:ss a',
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian kết thúc" span={2}>
              {moment(monitorCampaign.endTime).format(
                'MMMM Do YYYY, h:mm:ss a',
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Miền giám sát" span={6}>
              {monitorCampaign.monitoredZone.name}
            </Descriptions.Item>
            <Descriptions.Item label="Drone sử dụng" span={2}>
              {monitorCampaign.drones.map((drone) => {
                return (
                  <>
                    {drone.name} <br />
                  </>
                );
              })}
            </Descriptions.Item>

            <Descriptions.Item label="Đối tượng giám sát" span={2}>
              {monitorCampaign.monitoredObjects.map((monitoredObject) => {
                return (
                  <>
                    {monitoredObject.name} <br />
                  </>
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Cơ chế thu thập">
              {monitorCampaign.mechanism}
            </Descriptions.Item>
            <Descriptions.Item label="Dạng lưu trữ">
              {monitorCampaign.metadataType}
            </Descriptions.Item>
            <Descriptions.Item label="Độ phân giải">
              {monitorCampaign.resolution}
            </Descriptions.Item>
            <Descriptions.Item label="Nhãn đính kèm" span={6}>
              {monitorCampaign.labels.map((label) => {
                return (
                  <>
                    {label.name} <br />
                  </>
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={6}>
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
