let timeout;
const debounce = (func, wait = 500) => {
  return (...args) => {
    const executeFunction = () => {
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
  };
};
export default debounce;
