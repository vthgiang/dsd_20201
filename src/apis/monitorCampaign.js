import axiosInstance from './api';

const createMonitorCampaign = async (data) => {
  const result = await axiosInstance({
    method: 'POST',
    url: `/api/monitor-campaigns`,
    data,
  });
  return result;
};

export default { createMonitorCampaign };
