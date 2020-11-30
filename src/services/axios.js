import pickBy from "lodash/pickBy";
import axios, { AxiosInstance } from "axios";
import qs from "qs";
console.log(localStorage.getItem("project-type"));
export const instance = (baseURL) => {
    const axiosInstance = axios.create({
        baseURL,
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        timeout: 10000,
        headers: {
            "token": localStorage.getItem("token"),
            "project-type": localStorage.getItem("project-type"),
        },
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

export const apiAxios = instance("https://distributed.de-lalcool.com/api/");

export function setHeaders(params) {
    const newHeaders = {
        ...apiAxios.defaults.headers.common,
        ...params,
    };
    apiAxios.defaults.headers.common = pickBy(newHeaders, (val) => !!val);
}
