import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import AuthReducer from "./reducers/AuthReducer";
import MasterReducer from "./reducers/MasterReducer";
import RootSaga from "../redux-saga/RootSaga";
import StockReducer from "./reducers/StockReducer";


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Master: MasterReducer,
    Stock: StockReducer,
  },
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(RootSaga);
