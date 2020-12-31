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
  logActivityData.forEach(log => {
    let canPush = true;
    for (let key in filter) {
      if (filter[key] != null && filter[key] != "null" && log[key] != filter[key]) {
        canPush = false;
      }
    }
    if (canPush)
      logs.push(log);
  })
  console.log(logs);
  return logs;
}

export default {
  requestWithCache,
  buildQuery,
  filterLog
};
