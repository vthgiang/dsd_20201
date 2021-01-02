const TIMEOUT = 1000 * 60 * 5;

export const requestWithCache = async (key, promiseCreator) => {
  const wrappedPromise = async () => {
    const result = await promiseCreator();
    localStorage.setItem(key, JSON.stringify({
      data: result.data,
      timestamp: Date.now(),
    }));
    return result;
  };
  const cached = localStorage.getItem(key);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < TIMEOUT) {
      console.log("Load from cache: ", parsed.data);
      return {data: parsed.data};
    }
    localStorage.removeItem(key);
    return await wrappedPromise();
  }
  return await wrappedPromise();
};

export const buildQuery = function (url, params) {
  return url + "?" + new URLSearchParams(params).toString();
}


export const filterLog = function (logActivityData, filter) {
  if (logActivityData == null) {
    return logActivityData;
  }
  if (Object.keys(filter).length === 0) {
    return logActivityData;
  }
  let logs = [];
  console.log(logActivityData);
  console.log(filter);
  logActivityData.forEach(log => {
    let canPush = true;
    for (let key in filter) {
      if (filter[key] != null && filter[key] != "null" && log[key] != filter[key]) {
        canPush = false;
        break;
      }
    }
    if (canPush)
      logs.push(log);
  })
  console.log(logs);
  return logs;
}

export const createRangeTime = function (fromDate, toDate, rangeTime) {
  let initialRangeTime = {
    fromDate: "",
    toDate: ""
  };
  if (fromDate && toDate) {
    initialRangeTime = {
      fromDate: fromDate,
      toDate: toDate
    };
  } else if (rangeTime) {
    initialRangeTime = rangeTime;
  }
  return initialRangeTime;
}

export const truncate = function (str, n) {
  return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

export default {
  requestWithCache,
  buildQuery,
  filterLog,
  truncate
};
