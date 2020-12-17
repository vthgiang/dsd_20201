import axiosInstance from './api';

const createMonitorCampaign = async (data) => {
  const result = await axiosInstance({
    method: 'POST',
    url: `/api/monitor-campaigns`,
    data,
  });
  return result;
};

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

const updateMonitorCampaign = async (data) => {
  const result = await axiosInstance({
    method: 'PATCH',
    url: `/api/monitor-campaigns`,
    data,
  });
  return result;
};
const deleteMonitorCampaign = async (monitorCampaignId) => {
  const result = await axiosInstance({
    method: 'DELETE',
    url: `/api/monitor-campaigns`,
    data: { _id: monitorCampaignId },
  });
  return result;
};

export default {
  createMonitorCampaign,
  getListMonitorCampaigns,
  getMonitorCampaign,
  updateMonitorCampaign,
  deleteMonitorCampaign,
};
