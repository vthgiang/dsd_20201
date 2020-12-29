import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MonitorCampaignForm from './MonitorCampaignForm';
import { convertInitialDataToFieldValues } from './services';
import { monitorCampaignApi } from '../../../apis';
import { notification } from 'antd';

const UpdateMonitorCampaign = () => {
  const [monitorCampaignData, setMonitorCampaignData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const { id } = params;
    const fetchMonitorCampaignData = async () => {
      try {
        setLoading(true);
        const resp = await monitorCampaignApi.getMonitorCampaign(id);
        setMonitorCampaignData(resp.data.result.monitorCampaign);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      await monitorCampaignApi.updateMonitorCampaign(dataSubmit);

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
      loading={loading}
      initialData={convertInitialDataToFieldValues(monitorCampaignData)}
      title='Sửa đợt giám sát'
      handleSubmit={updateMonitorCampaign}></MonitorCampaignForm>
  );
};

export default UpdateMonitorCampaign;
