import axios from 'axios';

const token = localStorage.getItem('token');
const projectType = localStorage.getItem('project-type');
const headers = {
  'api-token': token,
  'project-type': projectType,
};

const createNotification = async (data) => {
  const result = await axios({
    method: 'POST',
    url: `https://it4483-dsd04.herokuapp.com/create_ntf_2`,
    data,
    headers,
  });
  return result;
};

export default { createNotification };
