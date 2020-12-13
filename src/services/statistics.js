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
    metrics.data = result;
    metrics.all = result.length;
    metrics.active = result.filter(item => item.status === 'ACTIVE').length;
    metrics.inactive = result.filter(item => item.status === 'INACTIVE').length;
    metrics.pending = result.filter(item => item.status === 'PENDING').length;
    metrics.admin = result.filter(item => item.role === 'ADMIN');
    metrics.manager = result.filter(item => item.role === 'MANAGER');
    metrics.droneStaff = result.filter(item => item.role === 'DRONE_STAFF');
    metrics.incidentStaff = result.filter(item => item.role === 'INCIDENT_STAFF');
    metrics.supervisor = result.filter(item => item.role === 'SUPERVISOR');
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getPayloadOverallMetrics = async () => {
  try {
    const { data } = await requestWithCache(
      'getPayloadOverallMetrics',
      () => Axios.get('https://dsd06.herokuapp.com/api/payload')
    );
    const metrics = {};
    metrics.all = data.length;
    metrics.idle = data.filter((item) => item.status !== 'working').length;
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
        'getPayloadOverallMetrics',
        () => Axios.get('https://dsd06.herokuapp.com/api/payload')
      ),
      requestWithCache(
        'getPayloadFixingMetrics',
        () => Axios.get('https://dsd06.herokuapp.com/api/payloadStat/feeFixing')
      ),
      requestWithCache(
        'getPayloadWorkingMetrics',
        () => Axios.get('https://dsd06.herokuapp.com/api/payloadStat/feeWorking')
      ),
    ])
    console.log(results);
    const metrics = {};
    metrics.working = results[0]?.data.filter((item) => item.status !== 'working').length;
    metrics.idle = results[0]?.data.filter((item) => item.status !== 'idle').length;
    metrics.fixing = results[0]?.data.filter((item) => item.status !== 'fixing').length;
    metrics.charging = results[0]?.data.filter((item) => item.status !== 'charging').length;
    metrics.fee = {
      fixing: results[1].data,
      working: results[2].data,
    }
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getNotifyMetrics = async() => {
  try {
    const results = await Promise.all([
      requestWithCache(
        'getNotiIncitdentAll',
        () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=14', {
          headers: {
            'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
            'project-type': 'CHAY_RUNG',
          },
        })
      ),
      requestWithCache(
        'getNotiIncitdentLD',
        () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=10', {
          headers: {
            'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
            'project-type': 'CHAY_RUNG',
          },
        })

      ),
      requestWithCache(
        'getNotiIncitdentCT',
        () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=10', {
          headers: {
            'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
            'project-type': 'CHAY_RUNG',
          },
        })
      ),
      requestWithCache(
        'getNotiIncitdentCR',
        () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=10', {
          headers: {
            'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
            'project-type': 'CHAY_RUNG',
          },
        })
      ),
      requestWithCache(
        'getNotiIncitdentDD',
        () => Axios.get('https://it4483-dsd04.herokuapp.com/count_ntf_type?type=10', {
          headers: {
            'api-token': '34ccdf500ab1b25fe1ecd142a52eba79',
            'project-type': 'CHAY_RUNG',
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
    metrics.LD= {
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
      total: results[4]?.data.data.totalNtf
    };
    return metrics;
  } catch (error) {
    console.error(error);
  }
  return null;
}
