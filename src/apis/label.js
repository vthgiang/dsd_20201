// import axiosInstance from './api';

export const addLabelApi = async (data) => {
  // const result = await axiosInstance({
  //   method: 'POST',
  //   url: '/labels',
  //   data
  // });

  // return result;
  return {
    status: 1,
    result: {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Độ ẩm',
      description: 'Độ ẩm của không khí',
      isDefault: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...data,
    },
  };
};

export const getListLabelsApi = async () => {
  // const result = await axiosInstance({
  //   method: 'GET',
  //   url: '/labels',
  // });

  // return result;
  return {
    status: 1,
    result: [
      {
        id: '1234123124124',
        name: 'Tập huấn',
        description: 'Đợt tập huấn phòng cháy chữa cháy',
        createdAt: '2020-08-24 09:16:06.051Z',
        updatedAt: '2020-08-25 09:16:06.051Z',
      },
      {
        id: '156546465465321',
        name: 'Cao điểm mùa nóng',
        description: 'Đợt giám sát cao điểm trong mùa nắng nóng',
        createdAt: '2020-08-24 09:16:06.051Z',
        updatedAt: '2020-08-25 09:16:06.051Z',
      },
    ],
  };
};

// export const getLabelDetailsApi = async id => {
//   const result = await axiosInstance({
//     method: 'GET',
//     url: `/labels/${id}`,
//   });

//   return result;
// };

export const updateLabelApi = async (data) => {
  // const result = await axiosInstance({
  //   method: 'PUT',
  //   url: `/labels/${id}`,
  //   data
  // });

  // return result;
  return {
    status: 1,
    result: {
      id: '1234123124124',
      name: 'Độ ẩm',
      property: 'humidity',
      description: 'Độ ẩm của không khí',
      isDefault: true,
      createdAt: '2020-08-24 09:16:06.051Z',
      updatedAt: new Date(),
      ...data,
    },
  };
};

export const deleteLabelApi = async (id) => {
  // const result = await axiosInstance({
  //   method: 'DELETE',
  //   url: `/labels/${id}`,
  // });

  // return result;
  return {
    status: 1,
  };
};

export default {
  addLabelApi,
  getListLabelsApi,
  updateLabelApi,
  deleteLabelApi,
};
