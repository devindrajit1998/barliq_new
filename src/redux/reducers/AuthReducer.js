import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  openMenu: false,
};

const AuthReducer = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    getTokenRequest(state, action) {
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.status = action.type;
      state.getTokenResponse = action.payload?.token;
      state.user = action.payload?.user?.user;
      state.token = action.payload;
      state.isLoading = false;
    },
    getTokenFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },

    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.status = action.type;
      state.loginResponse = action.payload;
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    },
    loginFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.status = action.type;
      state.token = null;
      state.user = null;
    },
    logoutFailure(state, action) {
      state.status = action.type;
    },

    toggleMenu(state, action) {
      state.openMenu = !state.openMenu;
    },
  },
});

export const {
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  toggleMenu,
} = AuthReducer.actions;

export default AuthReducer.reducer;
