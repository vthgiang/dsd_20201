import axios from 'axios';
import { API_DOMAIN, REQUEST_TIMEOUT } from '../configs';
const instance = axios.create({
  baseURL: API_DOMAIN,
  responseType: 'json',
  timeout: REQUEST_TIMEOUT,
});

export default instance;
