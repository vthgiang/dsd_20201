import axios from 'axios';
export const API_URL = 'https://flight-hub-api.herokuapp.com/';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

export default instance;
