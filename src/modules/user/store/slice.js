import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  listUser: [],
  projectType: '',
  isLogin: false,
  role: '',
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    setProjectType: (state, { payload }) => {
      state.projectType = payload;
    },
    setLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => { },
});

export default user;
