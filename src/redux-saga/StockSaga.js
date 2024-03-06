import { call, put, take, takeLatest } from "redux-saga/effects";
import { getApi, postApi } from "../utils/helpers/api";
import {
  dayWiseEntryFailure,
  dayWiseEntrySuccess,
  distributeStockFailure,
  distributeStockSuccess,
  editDayWiseInventoryFailure,
  editDayWiseInventorySuccess,
  getDashboardFailure,
  getDashboardSuccess,
  getReportFailure,
  getReportSuccess,
  loadStockFailure,
  loadStockSuccess,
} from "../redux/reducers/StockReducer";

function* loadStockSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(postApi, "/stock", action.payload, header);
    console.log(response);
    if (response.data?.status === 200) {
      yield put(loadStockSuccess(response.data));
    } else {
      yield put(loadStockFailure(response.data));
    }
  } catch (error) {
    yield put(loadStockFailure(error.response));
  }
}

function* distributeStockSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(
      postApi,
      "/stock/distribute",
      action.payload,
      header
    );
    if (response.data?.statusCode == 200) {
      yield put(distributeStockSuccess(response.data));
    } else {
      yield put(distributeStockFailure(response.data));
    }
  } catch (error) {
    yield put(distributeStockFailure(error.response));
  }
}

function* getReportSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(postApi, "/report", action.payload, header);
    if (response.data?.statusCode == 200) {
      yield put(getReportSuccess(response.data));
    } else {
      yield put(getReportFailure(response.data));
    }
  } catch (error) {
    yield put(getReportFailure(error.response));
  }
}

function* dayWiseEntrySaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(
      postApi,
      "/day-wise-inventory",
      action.payload,
      header
    );
    if (response.data?.statusCode === 200) {
      yield put(dayWiseEntrySuccess(response.data));
    } else {
      yield put(dayWiseEntryFailure(response.data));
    }
  } catch (error) {
    yield put(dayWiseEntryFailure(error.response));
  }
}

function* editDayWiseInventorySaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(
      postApi,
      "/day-wise-inventory/update-count",
      action.payload,
      header
    );
    if (response?.data?.statusCode === 200) {
      yield put(editDayWiseInventorySuccess(response?.data));
    } else {
      yield put(editDayWiseInventoryFailure(response?.data));
    }
  } catch (error) {
    yield put(editDayWiseInventoryFailure(error.response));
  }
}

function* getDashboardReportSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(
      getApi,
      `/report/dashboard?date=${action.payload}`,
      header
    );
    if (response.data?.statusCode === 200) {
      yield put(getDashboardSuccess(response?.data));
    } else {
      yield put(getDashboardFailure(response?.data));
    }
  } catch (error) {
    yield put(getDashboardFailure(error.response));
  }
}

const watchFunctions = [
  (function* () {
    yield takeLatest("Stock/loadStockRequest", loadStockSaga);
  })(),
  (function* () {
    yield takeLatest("Stock/distributeStockRequest", distributeStockSaga);
  })(),
  (function* () {
    yield takeLatest("Stock/getReportRequest", getReportSaga);
  })(),
  (function* () {
    yield takeLatest("Stock/dayWiseEntryRequest", dayWiseEntrySaga);
  })(),
  (function* () {
    yield takeLatest("Stock/getDashboardRequest", getDashboardReportSaga);
  })(),
  (function* () {
    yield takeLatest(
      "Stock/editDayWiseInventoryRequest",
      editDayWiseInventorySaga
    );
  })(),
];

export default watchFunctions;
