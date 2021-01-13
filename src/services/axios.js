import pickBy from "lodash/pickBy";
import axios, { AxiosInstance } from "axios";
import qs from "qs";

export const instance = (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
    timeout: 10000,
    headers: {},
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const apiAxios = instance("http://128.199.79.122:6006/api/");

export function setHeaders(params) {
  const newHeaders = {
    ...apiAxios.defaults.headers.common,
    ...params,
  };
  apiAxios.defaults.headers.common = pickBy(newHeaders, (val) => !!val);
}
