import React from 'react';
import MonitorCampaignForm from './MonitorCampaignForm';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { monitorCampaignApi, notificationApi } from '../../../apis';
import { FRONT_END_URL } from '../../../configs';

const CreateMonitorCampaign = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  let persist = JSON.parse(localStorage.getItem('persist:root'));
  persist = JSON.parse(persist.user);
  const { user } = persist;
  const { id } = user;

  const createMonitorCampaign = async (data) => {
    try {
      const response = await monitorCampaignApi.createMonitorCampaign(data);
      const monitorCampaignId = response.data.result.monitorCampaign._id;

      const notificationData = {
        fromUserID: id,
        toUserIDs: ['550', '64', '55'],
        refID: monitorCampaignId,
        refLinkView: `${FRONT_END_URL}flight-hub-monitor-campaigns/${monitorCampaignId}`,
        content: 'Tạo đợt giám sát thành công',
        level: 1,
        ntfType: 4,
        refType: 9,
      };
      // const createdNotification = await notificationApi.createNotification(
      //   notificationData,
      // );

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
      handleSubmit={createMonitorCampaign}
    ></MonitorCampaignForm>
  );
};

export default CreateMonitorCampaign;
