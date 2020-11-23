// import axiosInstance from './api';

export const addParamApi = async data => {
  // const result = await axiosInstance({
  //   method: 'POST',
  //   url: '/params',
  //   data
  // });

  // return result;
  return {
    status: 1,
    result: {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Độ ẩm',
      description: 'Độ ẩm của không khí',
      mappingField: 'doAm',
      isOther: true,
      createdAt: '2020-08-24 09:16:06.051Z',
      updatedAt: '2020-08-24 09:16:06.051Z',
      ...data
    },
  };
};

export const getListParamsApi = async () => {
  // const result = await axiosInstance({
  //   method: 'GET',
  //   url: '/params',
  // });

  // return result;
  return {
    status: 1,
    result: [
      {
        id: '1234123124124',
        name: 'Độ ẩm',
        description: 'Độ ẩm của không khí',
        mappingField: 'doAm',
        isOther: true,
        createdAt: '2020-08-24 09:16:06.051Z',
        updatedAt: '2020-08-24 09:16:06.051Z',
      },
    ],
  };
};

// export const getParamDetailsApi = async id => {
//   const result = await axiosInstance({
//     method: 'GET',
//     url: `/params/${id}`,
//   });

//   return result;
// };

export const updateParamApi = async data => {
  // const result = await axiosInstance({
  //   method: 'PUT',
  //   url: `/params/${id}`,
  //   data
  // });

  // return result;
  return {
    status: 1,
    result: {
      id: '1234123124124',
      name: 'Độ ẩm',
      description: 'Độ ẩm của không khí',
      mappingField: 'doAm',
      isOther: true,
      createdAt: '2020-08-24 09:16:06.051Z',
      updatedAt: '2020-08-24 09:16:06.051Z',
      ...data
    },
  };
};

export const deleteParamApi = async id => {
  // const result = await axiosInstance({
  //   method: 'DELETE',
  //   url: `/params/${id}`,
  // });

  // return result;
  return {
    status: 1,
  };
};
