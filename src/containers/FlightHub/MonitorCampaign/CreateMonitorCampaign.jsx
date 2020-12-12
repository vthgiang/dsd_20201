import React from 'react';
import MonitorCampaignForm from './MonitorCampaignForm';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { monitorCampaignApi } from '../../../apis';

const CreateMonitorCampaign = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const createMonitorCampaign = async (data) => {
    try {
      await monitorCampaignApi.createMonitorCampaign(data);

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
