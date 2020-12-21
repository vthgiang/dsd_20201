import axios from 'axios';
import { API_DOMAIN, REQUEST_TIMEOUT } from '../configs';

const instance = axios.create({
  baseURL: API_DOMAIN,
  responseType: 'json',
  timeout: REQUEST_TIMEOUT,
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  console.log('token ', token);
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
