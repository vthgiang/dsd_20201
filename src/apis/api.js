import axios from 'axios';
import { API_DOMAIN, REQUEST_TIMEOUT } from '../configs';

const instance = axios.create({
  baseURL: API_DOMAIN,
  responseType: 'json',
  timeout: REQUEST_TIMEOUT,
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  const projectType = localStorage.getItem('project-type');

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.projectType = projectType;
  return config;
});

export default instance;
