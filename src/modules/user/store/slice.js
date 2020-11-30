import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    listUser: [],
    projectType: '',
    isLogin: false,
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
    },
    extraReducers: (builder) => {},
});

export default user;
