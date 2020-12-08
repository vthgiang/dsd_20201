import axios from 'axios';
export const API_URL = 'https://flight-hub-api.herokuapp.com/';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export default instance;
