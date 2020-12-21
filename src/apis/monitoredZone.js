import axiosInstance from './api';

const getListMonitorCampaigns = async (params) => {
  const result = await axiosInstance({
    method: 'GET',
    url: `/api/monitor-campaigns`,
    params,
  });
  return result;
};

const getMonitorCampaign = async (monitorCampaignId) => {
  const result = await axiosInstance({
    method: 'GET',
    url: `/api/monitor-campaigns/${monitorCampaignId}`,
  });

  return result;
};

export default {
  getListMonitorCampaigns,
  getMonitorCampaign,
};
