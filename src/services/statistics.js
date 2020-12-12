/* eslint-disable no-underscore-dangle */
import Axios from "axios";
import { requestWithCache } from "./index";

export const getDroneOverallMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      "getDroneOverallMetrics",
      () => Axios.get("http://skyrone.cf:6789/drone/getAll"),
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
      "getDroneDetailedMetrics",
      () => Axios.get("http://skyrone.cf:6789/droneState/getAllStateNow"),
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
      "getIncidentOverallMetrics",
      () => Axios.get("https://distributed-dsd08.herokuapp.com/api/external/report-listing?type=LUOI_DIEN"),
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
};

export const getIncidentDetailedMetrics = async () => {
  try {
    const results = await Promise.all([
      requestWithCache(
        "getIncidentOverallMetrics",
        () => Axios.get("https://distributed-dsd08.herokuapp.com/api/external/report-listing?type=LUOI_DIEN"),
      ),
      requestWithCache(
        "getIncidentDetailedMetrics",
        () => Axios.get("https://distributed-dsd08.herokuapp.com/api/task/incident-listing", {
          headers: {
            "api-token": "4c901bcdba9f440a2a7c31c0bcbd78ec",
            "project-type": "LUOI_DIEN",
          },
        }),
      ),
    ]);
    const metrics = {
      overall: results[0].data,
      detailed: results[1].data,
    };
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getUsersMetrics = async () => {
  try {
    const { data: { result } } = await requestWithCache(
      "getUsersMetrics",
      () => Axios.get("https://distributed.de-lalcool.com/api/user?page_id=0&page_size=1000000", {
        headers: {
          token: "4e3fe3463afd3a705c0be7ec2322c335",
          "project-type": "LUOI_DIEN",
        },
      }),
    );
    const metrics = {};
    metrics.data = result;
    metrics.all = result.length;
    metrics.active = result.filter((item) => item.status === "ACTIVE").length;
    metrics.inactive = result.filter((item) => item.status === "INACTIVE").length;
    metrics.pending = result.filter((item) => item.status === "PENDING").length;
    metrics.admin = result.filter((item) => item.role === "ADMIN");
    metrics.manager = result.filter((item) => item.role === "MANAGER");
    metrics.droneStaff = result.filter((item) => item.role === "DRONE_STAFF");
    metrics.incidentStaff = result.filter((item) => item.role === "INCIDENT_STAFF");
    metrics.supervisor = result.filter((item) => item.role === "SUPERVISOR");
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getPayloadOverallMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      "getPayloadOverallMetrics",
      () => Axios.get("https://dsd06.herokuapp.com/api/payload"),
    );
    const metrics = {};
    metrics.all = data.length;
    metrics.idle = data.filter((item) => item.status !== "working").length;
    metrics.working = metrics.all - metrics.idle;
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getPayloadDetailedMetrics = async () => {
  try {
    const results = await Promise.all([
      requestWithCache(
        "getPayloadOverallMetrics",
        () => Axios.get("https://dsd06.herokuapp.com/api/payload"),
      ),
      requestWithCache(
        "getPayloadFixingMetrics",
        () => Axios.get("https://dsd06.herokuapp.com/api/payloadStat/feeFixing"),
      ),
      requestWithCache(
        "getPayloadWorkingMetrics",
        () => Axios.get("https://dsd06.herokuapp.com/api/payloadStat/feeWorking"),
      ),
    ]);
    const metrics = {};
    metrics.working = results[0]?.data.filter((item) => item.status !== "working").length;
    metrics.idle = results[0]?.data.filter((item) => item.status !== "idle").length;
    metrics.fixing = results[0]?.data.filter((item) => item.status !== "fixing").length;
    metrics.charging = results[0]?.data.filter((item) => item.status !== "charging").length;
    metrics.fee = {
      fixing: results[1].data,
      working: results[2].data,
    };
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getFlightHubMetrics = async (startDate, endDate) => {
  try {
    const results = await Axios.get((startDate && endDate) ? `https://flight-hub-api.herokuapp.com/api/statistics/monitor-campaigns?timeFrom=${startDate}&timeTo=${endDate}`
      : "https://flight-hub-api.herokuapp.com/api/statistics/monitor-campaigns/currently");
    const metrics = {};
    const { statistics } = results?.data.result;
    if (statistics.length > 0 && statistics[0]) {
      const dykeFound = statistics.filter((item) => (item._id === "Đê điều"));
      const fireFound = statistics.filter((item) => (item._id === "Cháy rừng"));
      const electricFound = statistics.filter((item) => (item._id === "Điện"));
      const treeFound = statistics.filter((item) => (item._id === "Cây trồng"));
      metrics.dyke = dykeFound.length > 0 ? dykeFound[0].total : 0;
      metrics.fire = fireFound.length > 0 ? fireFound[0].total : 0;
      metrics.electric = electricFound.length > 0 ? electricFound[0].total : 0;
      metrics.tree = treeFound.length > 0 ? treeFound[0].total : 0;
      return metrics;
    }
    metrics.dyke = 0;
    metrics.fire = 0;
    metrics.electric = 0;
    metrics.tree = 0;
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getMonitorZoneMetrics = async () => {
  try {
    const results = await Promise.all([
      requestWithCache(
        "getAreaFrequencyMetrics",
        () => Axios.get("https://monitoredzoneserver.herokuapp.com/area/statisticFrequency"),
      ),
      requestWithCache(
        "getZoneFrequencyMetrics",
        () => Axios.get("https://monitoredzoneserver.herokuapp.com/monitoredzone/statisticFrequency"),
      ),
    ]);
    const metrics = {
      area: results[0].data.content.data,
      zone: results[1].data.content.data,
    };
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getSystemLogMetrics = async () => {
  try {
    const results = await Promise.all([
      requestWithCache(
        "getSystemLogMetrics",
        () => Axios.get("http://it4883logging.herokuapp.com/api/system/all-logs"),
      ),
    ]);
    const metrics = {};
    if (results && results.length > 0) {
      metrics.dyke = results[0].data.filter((item) => (item.projectType === "DE_DIEU"));
      metrics.fire = results[0].data.filter((item) => (item.projectType === "CHAY_RUNG"));
      metrics.electric = results[0].data.filter((item) => (item.projectType === "LUOI_DIEN"));
      metrics.tree = results[0].data.filter((item) => (item.projectType === "CAY_TRONG"));
      metrics.full = results[0].data;
      return metrics;
    }
    metrics.dyke = [];
    metrics.fire = [];
    metrics.electric = [];
    metrics.tree = [];
    metrics.full = [];
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};
