const { PUBLIC_URL } = process.env;

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
// const API_DOMAIN = 'https://flight-hub-api.herokuapp.com/';
const API_DOMAIN = 'http://123.30.235.196:5598/';
const FRONT_END_URL = 'http://123.30.235.196:5599/';
const REQUEST_TIMEOUT = 15000;

export {
  PUBLIC_URL,
  DATE_TIME_FORMAT,
  API_DOMAIN,
  REQUEST_TIMEOUT,
  FRONT_END_URL,
};
