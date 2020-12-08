import Axios from 'axios';
import { requestWithCache } from "./index";

export const getDroneOverallMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      'getDroneOverallMetrics',
      Axios.get('http://skyrone.cf:6789/drone/getAll')
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
      Axios.get('http://skyrone.cf:6789/droneState/getAllStateNow')
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
