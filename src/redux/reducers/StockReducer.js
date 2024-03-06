import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: {},
};

const StockReducer = createSlice({
  name: "Stock",
  initialState,
  reducers: {
    loadStockRequest(state, action) {
      state.status = action.type;
    },
    loadStockSuccess(state, action) {
      state.status = action.type;
      state.loadStockResponse = action.payload;
    },
    loadStockFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    distributeStockRequest(state, action) {
      state.status = action.type;
    },
    distributeStockSuccess(state, action) {
      state.status = action.type;
      state.distributeStockResponse = action.payload;
    },
    distributeStockFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    getReportRequest(state, action) {
      state.status = action.type;
    },
    getReportSuccess(state, action) {
      state.status = action.type;
      state.getReportResponse = action.payload;
    },
    getReportFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    dayWiseEntryRequest(state, action) {
      state.status = action.type;
    },
    dayWiseEntrySuccess(state, action) {
      state.status = action.type;
      state.dayWiseEntryResponse = action.payload;
    },
    dayWiseEntryFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    editDayWiseInventoryRequest(state, action) {
      state.status = action.type;
    },
    editDayWiseInventorySuccess(state, action) {
      state.status = action.type;
      state.editDayWiseInventoryResponse = action.payload;
    },
    editDayWiseInventoryFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    getDashboardRequest(state, action) {
      state.status = action.type;
    },
    getDashboardSuccess(state, action) {
      state.status = action.type;
      state.getDashboardResponse = action.payload;
    },
    getDashboardFailure(state, action) {
      state.status = action.type;
    },
  },
});

export const {
  loadStockRequest,
  loadStockSuccess,
  loadStockFailure,

  distributeStockRequest,
  distributeStockSuccess,
  distributeStockFailure,

  getReportRequest,
  getReportSuccess,
  getReportFailure,

  dayWiseEntryRequest,
  dayWiseEntrySuccess,
  dayWiseEntryFailure,

  editDayWiseInventoryRequest,
  editDayWiseInventorySuccess,
  editDayWiseInventoryFailure,

  getDashboardRequest,
  getDashboardSuccess,
  getDashboardFailure,
} = StockReducer.actions;

export default StockReducer.reducer;
