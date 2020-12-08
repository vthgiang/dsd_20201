import Axios from 'axios';
import { requestWithCache } from "./index";

export const getDroneOverallMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      'getDroneOverallMetrics',
      () => Axios.get('http://skyrone.cf:6789/drone/getAll')
    );
    const metrics = {};
    metrics.all = data.length;
    metrics.broken = data.filter((item) => !item.used).length;
    metrics.working = metrics.all - metrics.broken;
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getDroneDetailedMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      'getDroneDetailedMetrics',
      () => Axios.get('http://skyrone.cf:6789/droneState/getAllStateNow')
    );
    const metrics = {};
    metrics.idle = data.filter((item) => item.state === 0).length;
    metrics.flying = data.filter((item) => item.state === 1).length;
    metrics.charging = data.filter((item) => item.state === 2).length;
    metrics.maintaining = data.filter((item) => item.state === 3).length;
    metrics.broken = data.filter((item) => item.state === 4).length;
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getIncidentOverallMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      'getIncidentOverallMetrics',
      () => Axios.get('https://distributed-dsd08.herokuapp.com/api/external/report-listing?type=LUOI_DIEN')
    );
    console.log({ data });
    const metrics = {};
    metrics.all = data?.created_tasks_total?.created_total;
    metrics.doing = data?.created_tasks_total?.doing_total;
    metrics.done = data?.created_tasks_total?.done_total;
    metrics.pending = data?.created_tasks_total?.pending_total;
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getIncidentDetailedMetrics = async () => {
  try {
    const results = await Promise.all([
      requestWithCache(
        'getIncidentOverallMetrics',
        () => Axios.get('https://distributed-dsd08.herokuapp.com/api/external/report-listing?type=LUOI_DIEN')
      ),
      requestWithCache(
        'getIncidentDetailedMetrics',
        () => Axios.get('https://distributed-dsd08.herokuapp.com/api/task/incident-listing', {
          headers: {
            'api-token': '4c901bcdba9f440a2a7c31c0bcbd78ec',
            'project-type': 'LUOI_DIEN',
          },
        })
      ),
    ])
    const metrics = {
      overall: results[0].data,
      detailed: results[1].data,
    };
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getUsersMetrics = async () => {
  try {
    const { data: { result } } = await requestWithCache(
      'getUsersMetrics',
      () => Axios.get('https://distributed.de-lalcool.com/api/user?page_id=0&page_size=1000000', {
        headers: {
          'token': '4e3fe3463afd3a705c0be7ec2322c335',
          'project-type': 'LUOI_DIEN',
        },
      })
    );
    const metrics = {};
    metrics.all = result;
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
}
