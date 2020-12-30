const { PUBLIC_URL } = process.env;

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
// const API_DOMAIN = 'https://flight-hub-api.herokuapp.com/';
const API_DOMAIN = 'http://14.248.5.197:16010/';
const FRONT_END_URL = 'http://14.248.5.197:8010/';
const REQUEST_TIMEOUT = 15000;

export {
  PUBLIC_URL,
  DATE_TIME_FORMAT,
  API_DOMAIN,
  REQUEST_TIMEOUT,
  FRONT_END_URL,
};
