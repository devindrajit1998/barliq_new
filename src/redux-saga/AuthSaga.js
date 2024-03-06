import { call, put, takeLatest } from "redux-saga/effects";
import { getApi, postApi } from "../utils/helpers/api";
import {
  getTokenFailure,
  getTokenSuccess,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
} from "../redux/reducers/AuthReducer";

function* loginSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(postApi, "/auth/login", action.payload, header);

    if (response.data.statusCode === 200) {
      yield put(loginSuccess(response.data));
      localStorage.setItem("@barliq_auth", response.data?.token);
    } else {
      yield put(loginFailure(response.data));
    }
  } catch (error) {
    yield put(loginFailure(error.response));
  }
}

function* getTokenSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let token = localStorage.getItem("@barliq_auth");
    let response = yield call(getApi, `/auth/verify?token=${token}`, header);
    if (response.data?.statusCode == 200) {
      yield put(getTokenSuccess({ token, user: response.data }));
    } else {
      yield put(getTokenFailure(response.data));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

function* logoutSaga() {
  try {
    let response = localStorage.removeItem("@barliq_auth");
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure());
  }
}

const watchFunctions = [
  (function* () {
    yield takeLatest("Auth/loginRequest", loginSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/getTokenRequest", getTokenSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/logoutRequest", logoutSaga);
  })(),
];

export default watchFunctions;
