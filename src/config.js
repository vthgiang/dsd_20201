export const clearStorage = () => {
  localStorage.removeItem("currentRole");
  localStorage.removeItem('jwt');
  localStorage.removeItem('userId');
  return true;
};

export const setStorage = (name = 'jwt', value) => {
  return localStorage.setItem(name, value);
};

export const getStorage = (name = 'jwt') => {
  return localStorage.getItem(name);
}