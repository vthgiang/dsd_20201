import axios from 'axios';

const getAllPayload = async (params) => {
  const result = await axios({
    method: 'GET',
    url: 'https://dsd06.herokuapp.com/api/payloadtype',
    params,
  });

  return result;
};

export default { getAllPayload };
