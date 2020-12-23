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
      return { data: parsed.data };
    }
    localStorage.removeItem(key);
    return await wrappedPromise();
  }
  return await wrappedPromise();
};

export default {
  requestWithCache,
};
