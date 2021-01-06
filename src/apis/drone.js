import axios from 'axios';

const getDroneAvailable = async (params) => {
  const result = await axios({
    method: 'GET',
    url: `http://skyrone.cf:6789/droneState/getAllDroneAvailable`,
    params,
  });
  return result;
};
const getAllPath = async (params) => {
  const result = await axios({
    method: 'GET',
    url: `http://skyrone.cf:6789/flightPath/getAllPath`,
    params,
  });
  return result;
};
const getAllPathBySupervisedArea = async (monitoredZoneId) => {
  const result = await axios({
    method: 'GET',
    url: `http://skyrone.cf:6789/flightPath/getAllBySupervisedArea/${monitoredZoneId}`,
  });
  return result;
};

export const logAdd = (data) => {
  axios.post('http://14.248.5.197:5012/api/drones/add', data)
    .then(logRes => {
        console.log('logResponse', logRes);
    })
    .catch(err => {
        console.log('err log', err);
    })
}

export const logEdit = (data) => {
  axios.post('http://14.248.5.197:5012/api/drones/edit', data)
    .then(logRes => {
        console.log('logResponse', logRes);
    })
    .catch(err => {
        console.log('err log', err);
    })
}

export const logDelete = (data) => {
  axios.post('http://14.248.5.197:5012/api/drones/delete', data)
    .then(logRes => {
        console.log('logResponse', logRes);
    })
    .catch(err => {
        console.log('err log', err);
    })
}

export default { getDroneAvailable, getAllPath, getAllPathBySupervisedArea};
