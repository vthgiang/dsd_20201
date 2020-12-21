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

export default { getDroneAvailable, getAllPath };
