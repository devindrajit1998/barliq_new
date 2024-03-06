import { all } from "redux-saga/effects";
import MasterSaga from "./MasterSaga";
import AuthSaga from "./AuthSaga";
import StockSaga from "./StockSaga";

const combinedSaga = [...MasterSaga, ...AuthSaga, ...StockSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
