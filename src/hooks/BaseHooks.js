import React from "react";
import _ from "lodash";
import { notification } from "antd";

const useBaseHooks = () => {
  // @obj   object
  // @path   string
  // @defaultValue   default value
  const getData = (obj, path, defaultValue) => {
    let value = _.get(obj, path, defaultValue);
    if (value == null) return defaultValue;
    return value;
  };

  // @message   string
  // @description   string
  // @type   "success" | "error" | "warning"
  const notify = (message, description = "", type) => {
    notification[type]({
      message: message,
      description: description,
      duration: 4
    });
  };

  return {
    getData,
    notify
  };
};
// @obj   object
// @path   string
// @defaultValue   default value
useBaseHooks.getData = (obj, path, defaultValue) => {
  let value = _.get(obj, path, defaultValue);
  if (value == null) return defaultValue;
  return value;
};

export default useBaseHooks;
