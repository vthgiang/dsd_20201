/* eslint-disable no-underscore-dangle */
import Axios from "axios";
import {
  requestWithCache
} from "./utils";

export const getDroneOverallMetrics = async (projectType) => {
  try {
    if (projectType != 'ALL_PROJECT') {
      const {
        data
      } = await requestWithCache(
        "getDroneOverallMetrics",
        () => Axios.get("http://skyrone.cf:6789/drone/getAll"),
      );
      const metrics = {};
      metrics.all = data.length;
      metrics.broken = data.filter((item) => !item.used).length;
      metrics.working = metrics.all - metrics.broken;
      return metrics;
    } else {
      const {
        data
      } = await requestWithCache(
        "getDroneOverallMetrics",
        () => Axios.get("http://skyrone.cf:6789/drone/getAll"),
      );
      const metrics = {};
      // const results = data.filter((item) => item.type)
      metrics.all = data.length;
      metrics.broken = data.filter((item) => !item.used).length;
      metrics.working = metrics.all - metrics.broken;
      return metrics;
    }

  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getDroneDetailedMetrics = async (projectType) => {
  try {
    if (projectType == 'CHAY_RUNG') {
      const {
        data
      } = await requestWithCache(
        "getDroneDetailedMetrics",
        () => Axios.get("http://skyrone.cf:6789/droneState/getAllStateNow"),
      );
      const metrics = {};
      metrics.idle = data.filter((item) => item.state === 0).length;
      metrics.flying = data.filter((item) => item.project === 1).length;
      metrics.charging = data.filter((item) => item.state === 2).length;
      metrics.maintaining = data.filter((item) => item.state === 3).length;
      metrics.broken = data.filter((item) => item.state === 4).length;
      metrics.noProject = data.filter((item) => item.project === 0).length;
      metrics.CR = data.filter((item) => item.project === 1).length;
      metrics.DD = data.filter((item) => item.project === 2).length;
      metrics.LD = data.filter((item) => item.project === 3).length;
      metrics.CT = data.filter((item) => item.project === 4).length;
      return metrics;
    } else if (projectType == 'LUOI_DIEN') {
      const {
        data
      } = await requestWithCache(
        "getDroneDetailedMetrics",
        () => Axios.get("http://skyrone.cf:6789/droneState/getAllStateNow"),
      );
      const metrics = {};
      metrics.idle = data.filter((item) => item.state === 0).length;
      metrics.flying = data.filter((item) => item.project === 3).length;
      metrics.charging = data.filter((item) => item.state === 2).length;
      metrics.maintaining = data.filter((item) => item.state === 3).length;
      metrics.broken = data.filter((item) => item.state === 4).length;
      metrics.noProject = data.filter((item) => item.project === 0).length;
      metrics.CR = data.filter((item) => item.project === 1).length;
      metrics.DD = data.filter((item) => item.project === 2).length;
      metrics.LD = data.filter((item) => item.project === 3).length;
      metrics.CT = data.filter((item) => item.project === 4).length;
      return metrics;
    } else if (projectType == 'CAY_TRONG') {
      const {
        data
      } = await requestWithCache(
        "getDroneDetailedMetrics",
        () => Axios.get("http://skyrone.cf:6789/droneState/getAllStateNow"),
      );
      const metrics = {};
      metrics.idle = data.filter((item) => item.state === 0).length;
      metrics.flying = data.filter((item) => item.project === 4).length;
      metrics.charging = data.filter((item) => item.state === 2).length;
      metrics.maintaining = data.filter((item) => item.state === 3).length;
      metrics.broken = data.filter((item) => item.state === 4).length;
      metrics.noProject = data.filter((item) => item.project === 0).length;
      metrics.CR = data.filter((item) => item.project === 1).length;
      metrics.DD = data.filter((item) => item.project === 2).length;
      metrics.LD = data.filter((item) => item.project === 3).length;
      metrics.CT = data.filter((item) => item.project === 4).length;
      return metrics;
    } else if (projectType == 'DE_DIEU') {
      const {
        data
      } = await requestWithCache(
        "getDroneDetailedMetrics",
        () => Axios.get("http://skyrone.cf:6789/droneState/getAllStateNow"),
      );
      const metrics = {};
      metrics.idle = data.filter((item) => item.state === 0).length;
      metrics.flying = data.filter((item) => item.project === 2).length;
      metrics.charging = data.filter((item) => item.state === 2).length;
      metrics.maintaining = data.filter((item) => item.state === 3).length;
      metrics.broken = data.filter((item) => item.state === 4).length;
      metrics.noProject = data.filter((item) => item.project === 0).length;
      metrics.CR = data.filter((item) => item.project === 1).length;
      metrics.DD = data.filter((item) => item.project === 2).length;
      metrics.LD = data.filter((item) => item.project === 3).length;
      metrics.CT = data.filter((item) => item.project === 4).length;
      return metrics;
    } else {
      const {
        data
      } = await requestWithCache(
        "getDroneDetailedMetrics",
        () => Axios.get("http://skyrone.cf:6789/droneState/getAllStateNow"),
      );
      const metrics = {};
      metrics.idle = data.filter((item) => item.state === 0).length;
      metrics.flying = data.filter((item) => item.state === 1).length;
      metrics.charging = data.filter((item) => item.state === 2).length;
      metrics.maintaining = data.filter((item) => item.state === 3).length;
      metrics.broken = data.filter((item) => item.state === 4).length;
      metrics.noProject = data.filter((item) => item.project === 0).length;
      metrics.CR = data.filter((item) => item.project === 1).length;
      metrics.DD = data.filter((item) => item.project === 2).length;
      metrics.LD = data.filter((item) => item.project === 3).length;
      metrics.CT = data.filter((item) => item.project === 4).length;
      return metrics;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getIncidentOverallMetrics = async () => {
  try {
    const {
      data
    } = await requestWithCache(
      "getIncidentOverallMetrics",
      () => Axios.get("https://distributed-dsd08.herokuapp.com/api/external/report-listing?type=LUOI_DIEN"),
    );
    console.log({
      data
    });
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

export const getIncidentDetailedMetrics = async (project, token) => {
  try {
    if (project != 'ALL_PROJECT') {
      const results = await Promise.all([
        requestWithCache(
          "getIncidentDetailedMetrics",
          () => Axios.get(`https://distributed-dsd08.herokuapp.com/api/external/report-listing?type=${project}`, {
            headers: {
              "api-token": token,
              "project-type": project,
            },
          }),
        ),
        requestWithCache(
          "getIncidentDetailedMetrics",
          () => Axios.get("https://distributed-dsd08.herokuapp.com/api/task/incident-listing", {
            headers: {
              "api-token": token,
              "project-type": project,
            },
          }),
        ),
      ]);
      const metrics = {
        overall: results[0].data,
        detailed: results[1].data.filter(item => item.type.type == project),
      };
      return metrics;
    } else {
      const results = await Promise.all([
        requestWithCache(
          "getIncidentOverallMetrics",
          () => Axios.get("https://distributed-dsd08.herokuapp.com/api/external/report-listing"),
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
    };
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getUsersMetrics = async (projectType) => {
  try {
    if (projectType != 'ALL_PROJECT') {
      const {
        data: {
          result
        }
      } = await requestWithCache(
        "getUsersMetrics",
        () => Axios.get("https://distributed.de-lalcool.com/api/user?page_id=0&page_size=10000", {
          headers: {
            token: "9e35bc1346ffd9113c17af3ac309bf85",
            "project-type": "ALL_PROJECT",
          },
        }),
      );
      console.log(result);
      const datas = result.flat().filter((item) => item.type === projectType);
      console.log(datas);
      const metrics = {};
      metrics.data = datas;
      metrics.all = datas.length;
      metrics.active = datas.filter((item) => item.status === "ACTIVE").length;
      metrics.inactive = datas.filter((item) => item.status === "INACTIVE").length;
      metrics.pending = datas.filter((item) => item.status === "PENDING").length;
      metrics.admin = datas.filter((item) => item.role === "ADMIN");
      metrics.manager = datas.filter((item) => item.role === "MANAGER");
      metrics.droneStaff = datas.filter((item) => item.role === "DRONE_STAFF");
      metrics.incidentStaff = datas.filter((item) => item.role === "INCIDENT_STAFF");
      metrics.supervisor = datas.filter((item) => item.role === "SUPERVISOR");
      return metrics;
    } else {
      const {
        data: {
          result
        }
      } = await requestWithCache(
        "getUsersMetrics",
        () => Axios.get("https://distributed.de-lalcool.com/api/user?page_id=0&page_size=1000000", {
          headers: {
            token: "9e35bc1346ffd9113c17af3ac309bf85",
            "project-type": "ALL_PROJECT",
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
      metrics.superadmin = result.filter((item) => item.role === "SUPER_ADMIN");
      return metrics;
    }

  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getPayloadOverallMetrics = async () => {
  try {
    const {
      data
    } = await requestWithCache(
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

export const getFlightHubProjectTypeMetrics = async (startDate, endDate, projectType) => {
    try {
        const results = await Axios.get(`https://flight-hub-api.herokuapp.com/api/monitor-campaigns?timeFrom=${startDate}&timeTo=${endDate}`);
        const metrics = {};
        console.log('getFlightHubProjectTypeMetrics', results);
        const { monitorCampaigns } = results?.data.result;
        if (monitorCampaigns && monitorCampaigns.length > 0) {
            const monitorProjectTypeFound = monitorCampaigns.filter((item) => item.task === projectType);
            if (monitorProjectTypeFound) {
                return monitorProjectTypeFound.map((monitorProjectTypeFoundItem) => {
                    return {
                        name: monitorProjectTypeFoundItem.name,
                        startTime: monitorProjectTypeFoundItem.startTime,
                        endTime: monitorProjectTypeFoundItem.endTime,
                        monitoredObjectsList: monitorProjectTypeFoundItem.monitoredObjects.map((item) => item.content.name),
                        dronesList: monitorProjectTypeFoundItem.drones.map((item) => item.name),
                        monitoredZone: monitorProjectTypeFoundItem.monitoredZone.name,
                    }
                })
            }
            return metrics;
        }
        return metrics;
    } catch (error) {
        console.error(error);
    }
    return null;
};

export const getNotifyMetrics = async (projectType, token) => {
  try {
    if (projectType == 'CHAY_RUNG') {
      const results = await Promise.all([
        requestWithCache(
          'getNotiIncitdentAll',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=12', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv1',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=1', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv2',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=2', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv3',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=3', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv4',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=4', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv5',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=5', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
      ])

      const metrics = {};
      metrics.all = {
        isTrue: results[0]?.data.data.trueNtf,
        isFalse: results[0]?.data.data.falseNtf,
        total: results[0]?.data.data.totalNtf
      };
      metrics.lv1 = results[1]?.data.data.total;      
      metrics.lv2 = results[2]?.data.data.total;      
      metrics.lv3 = results[3]?.data.data.total;      
      metrics.lv4 = results[4]?.data.data.total;      
      metrics.lv5 = results[5]?.data.data.total;
      return metrics;
    } else if (projectType == 'LUOI_DIEN') {
      const results = await Promise.all([
        requestWithCache(
          'getNotiIncitdentAll',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=10', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv1',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=1', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv2',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=2', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv3',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=3', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv4',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=4', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv5',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=5', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
      ])

      const metrics = {};
      console.log(results[0]?.data.data.trueNtf);
      metrics.all = {
        isTrue: results[0]?.data.data.trueNtf,
        isFalse: results[0]?.data.data.falseNtf,
        total: results[0]?.data.data.totalNtf
      };
      metrics.lv1 = results[1]?.data.data.total;      
      metrics.lv2 = results[2]?.data.data.total;      
      metrics.lv3 = results[3]?.data.data.total;      
      metrics.lv4 = results[4]?.data.data.total;      
      metrics.lv5 = results[5]?.data.data.total;
      return metrics;
    } else if (projectType == 'CAY_TRONG') {
      const results = await Promise.all([
        requestWithCache(
          'getNotiIncitdentAll',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=11', {
            headers: {
              'api-token':token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv1',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=1', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv2',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=2', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv3',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=3', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv4',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=4', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv5',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=5', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
      ])

      const metrics = {};
      console.log(results[0]?.data.data.trueNtf);
      metrics.all = {
        isTrue: results[0]?.data.data.trueNtf,
        isFalse: results[0]?.data.data.falseNtf,
        total: results[0]?.data.data.totalNtf
      };
      metrics.lv1 = results[1]?.data.data.total;      
      metrics.lv2 = results[2]?.data.data.total;      
      metrics.lv3 = results[3]?.data.data.total;      
      metrics.lv4 = results[4]?.data.data.total;      
      metrics.lv5 = results[5]?.data.data.total;
      return metrics;
    } else if (projectType == 'DE_DIEU') {
      const results = await Promise.all([
        requestWithCache(
          'getNotiIncitdentAll',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=13', {
            headers: {
              "api-token": "9e35bc1346ffd9113c17af3ac309bf85",
              "project-type": "ALL_PROJECT",
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv1',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=1', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv2',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=2', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv3',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=3', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv4',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=4', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv5',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=5', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
      ])

      const metrics = {};
      console.log(results[0]?.data.data.trueNtf);
      metrics.all = {
        isTrue: results[0]?.data.data.trueNtf,
        isFalse: results[0]?.data.data.falseNtf,
        total: results[0]?.data.data.totalNtf
      };
      metrics.lv1 = results[1]?.data.data.total;      
      metrics.lv2 = results[2]?.data.data.total;      
      metrics.lv3 = results[3]?.data.data.total;      
      metrics.lv4 = results[4]?.data.data.total;      
      metrics.lv5 = results[5]?.data.data.total;
      return metrics;
    } else {
      const results = await Promise.all([
        requestWithCache(
          'getNotiIncitdentAll',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=14', {
            headers: {
              "api-token": "9e35bc1346ffd9113c17af3ac309bf85",
              "project-type": "ALL_PROJECT",
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLD',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=10', {
            headers: {
              "api-token": "9e35bc1346ffd9113c17af3ac309bf85",
              "project-type": "ALL_PROJECT",
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentCT',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=11', {
            headers: {
              "api-token": "9e35bc1346ffd9113c17af3ac309bf85",
              "project-type": "ALL_PROJECT",
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentCR',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=12', {
            headers: {
              "api-token": "9e35bc1346ffd9113c17af3ac309bf85",
              "project-type": "ALL_PROJECT",
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentDD',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=13', {
            headers: {
              "api-token": "9e35bc1346ffd9113c17af3ac309bf85",
              "project-type": "ALL_PROJECT",
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv1',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=1', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv2',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=2', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv3',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=3', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })

        ),
        requestWithCache(
          'getNotiIncitdentLv4',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=4', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
        requestWithCache(
          'getNotiIncitdentLv5',
          () => Axios.get('https://it4483-dsd04.herokuapp.com/get_list_ntf_level?index=0&count=5&level=5', {
            headers: {
              'api-token': token,
              'project-type': projectType,
            },
          })
        ),
      ])

      const metrics = {};
      console.log(results[0]?.data.data.trueNtf);
      metrics.all = {
        isTrue: results[0]?.data.data.trueNtf,
        isFalse: results[0]?.data.data.falseNtf,
        total: results[0]?.data.data.totalNtf
      };
      metrics.LD = {
        isTrue: results[1]?.data.data.trueNtf,
        isFalse: results[1]?.data.data.falseNtf,
        total: results[1]?.data.data.totalNtf
      };
      metrics.CT = {
        isTrue: results[2]?.data.data.trueNtf,
        isFalse: results[2]?.data.data.falseNtf,
        total: results[2]?.data.data.totalNtf
      };
      metrics.CR = {
        isTrue: results[3]?.data.data.trueNtf,
        isFalse: results[3]?.data.data.falseNtf,
        total: results[3]?.data.data.totalNtf
      };
      metrics.DD = {
        isTrue: results[4]?.data.data.trueNtf,
        isFalse: results[4]?.data.data.falseNtf,
        total: results[4]?.data.data.totalNtf,
      };
      metrics.lv1 = results[5]?.data.data.total;      
      metrics.lv2 = results[6]?.data.data.total;      
      metrics.lv3 = results[7]?.data.data.total;      
      metrics.lv4 = results[8]?.data.data.total;      
      metrics.lv5 = results[9]?.data.data.total;
      return metrics;
    }
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

export const getMonitoreObjectMetrics = async (projectType) => {
  try {
    if (projectType == 'CHAY_RUNG') {
      const metrics = {};
      const results = await Promise.all([
        
        requestWithCache(
          'getObjectByCR',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=CHAY_RUNG', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
        
      ])

      metrics.all = {
        total: results[0]?.data.content.length,
        nomal: results[0]?.data.content.filter((item) => item.status == "1").length,
        break: results[0]?.data.content.filter((item) => item.status == "2").length,
        fixing: results[0]?.data.content.filter((item) => item.status == "3").length,
        listZone: [{
            name: '1'
          },
          {
            name: '2'
          },
        ]
      };

      console.log(metrics);
      return metrics;
    } else if (projectType == 'LUOI_DIEN') {
      const metrics = {};
      const results = await Promise.all([
        
        requestWithCache(
          'getObjectByLD',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=LUOI_DIEN', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
        
      ])

      metrics.all = {
        total: results[0]?.data.content.length,
        nomal: results[0]?.data.content.filter((item) => item.status == "1").length,
        break: results[0]?.data.content.filter((item) => item.status == "2").length,
        fixing: results[0]?.data.content.filter((item) => item.status == "3").length,
      };

      console.log(metrics);
      return metrics;
    } else if (projectType == 'CAY_TRONG') {
      const metrics = {};
      const results = await Promise.all([
        
        requestWithCache(
          'getObjectByCT',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=CAY_TRONG', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
      ])

      metrics.all = {
        total: results[0]?.data.content.length,
        nomal: results[0]?.data.content.filter((item) => item.status == "1").length,
        break: results[0]?.data.content.filter((item) => item.status == "2").length,
        fixing: results[0]?.data.content.filter((item) => item.status == "3").length,
      };

      console.log(metrics);
      return metrics;
    } else if (projectType == 'DE_DIEU') {
      const metrics = {};
      const results = await Promise.all([
        
        requestWithCache(
          'getObjectByDD',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=DE_DIEU', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
      ])

      metrics.all = {
        total: results[0]?.data.content.length,
        nomal: results[0]?.data.content.filter((item) => item.status == "1").length,
        break: results[0]?.data.content.filter((item) => item.status == "2").length,
        fixing: results[0]?.data.content.filter((item) => item.status == "3").length,
      };

      console.log(metrics);
      return metrics;
    } else {
      const metrics = {};
      const results = await Promise.all([
        requestWithCache(
          'getAllMonitoreObject',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
        requestWithCache(
          'getObjectByLD',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=LUOI_DIEN', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
        requestWithCache(
          'getObjectByCT',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=CAY_TRONG', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
        requestWithCache(
          'getObjectByCR',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=CHAY_RUNG', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
        requestWithCache(
          'getObjectByDD',
          () => Axios.get('https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-type?type=DE_DIEU', {
            headers: {
              'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
              'project-type': 'CHAY_RUNG',
            },
          })
        ),
      ])

      metrics.all = {
        total: results[0]?.data.content.length,
        luoiDien: results[1]?.data.content.length,
        cayTrong: results[2]?.data.content.length,
        chayRung: results[3]?.data.content.length,
        deDieu: results[4]?.data.content.length,
        nomal: results[0]?.data.content.filter((item) => item.status == "1").length,
        break: results[0]?.data.content.filter((item) => item.status == "2").length,
        fixing: results[0]?.data.content.filter((item) => item.status == "3").length,

      };

      console.log(metrics);
      return metrics;
    }
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

export const getUserLogAllMetrics = async (startDate, endDate) => {
    try {
        const results = await Promise.all([
            Axios.get(`http://it4883logging.herokuapp.com/api/user?MinDate=${startDate}&MaxDate=${endDate}&projectType=DE_DIEU`),
            Axios.get(`http://it4883logging.herokuapp.com/api/user?MinDate=${startDate}&MaxDate=${endDate}&projectType=CHAY_RUNG`),
            Axios.get(`http://it4883logging.herokuapp.com/api/user?MinDate=${startDate}&MaxDate=${endDate}&projectType=LUOI_DIEN`),
            Axios.get(`http://it4883logging.herokuapp.com/api/user?MinDate=${startDate}&MaxDate=${endDate}&projectType=CAY_TRONG`),
        ]);
        const metrics = {};
        if (results && results.length > 0) {
            metrics.dyke = results[0].data.length;
            metrics.fire = results[1].data.length;
            metrics.electric = results[2].data.length;
            metrics.tree = results[3].data.length;
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

export const getReportsAllMetrics = async (apiToken) => {
    try {
        const results = await Promise.all([
            requestWithCache(
                "getReportsAllDykeMetrics",
                () => Axios.get(`https://dsd07.herokuapp.com/api/user-reports`, {
                    headers: {
                        "api-token": apiToken,
                        "project-type": 'ALL_PROJECT',
                    },
                }),
            ),
        ]);
        return results[0]?.data.data;
    } catch (error) {
        console.error(error);
    }
    return null;
};

export const getReportsWithTypeMetrics = async (projectType, apiToken) => {
    try {
        const results = await Promise.all([
            requestWithCache(
                "getReportsWithTypeMetrics",
                () => Axios.get(`https://dsd07.herokuapp.com/api/user-reports`, {
                    headers: {
                        "api-token": apiToken,
                        "project-type": projectType,
                    },
                }),
            ),
        ]);
        console.log(results[0]?.data.data)
        return results[0]?.data.data;
    } catch (error) {
        console.error(error);
    }
    return null;
};

