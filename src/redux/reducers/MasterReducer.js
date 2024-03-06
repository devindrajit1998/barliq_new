import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  subCategory: [],
  error: {},
};

const MasterReducer = createSlice({
  name: "Master",
  initialState,
  reducers: {
    addBarRequest(state, action) {
      state.status = action.type;
    },
    addBarSuccess(state, action) {
      state.status = action.type;
      state.addBarResponse = action.payload;
    },
    addBarFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    editBarRequest(state, action) {
      state.status = action.type;
    },
    editBarSuccess(state, action) {
      state.status = action.type;
      state.editBarResponse = action.payload;
    },
    editBarFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    deleteBarRequest(state, action) {
      state.status = action.type;
    },
    deleteBarSuccess(state, action) {
      state.status = action.type;
      state.deleteBarResponse = action.payload;
    },
    deleteBarFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    getBarRequest(state, action) {
      state.status = action.type;
    },
    getBarSuccess(state, action) {
      state.status = action.type;
      state.getBarResponse = action.payload;
    },
    getBarFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    addSubcategoryRequest(state, action) {
      state.status = action.type;
    },
    addSubcategorySuccess(state, action) {
      state.status = action.type;
      state.addSubcategoryResponse = action.payload;
    },
    addSubcategoryFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    editSubCategoryRequest(state, action) {
      state.status = action.type;
    },
    editSubCategorySuccess(state, action) {
      state.status = action.type;
      state.editSubCategoryResponse = action.payload;
    },
    editSubCategoryFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    deleteSubCategoryRequest(state, action) {
      state.status = action.type;
    },
    deleteSubCategorySuccess(state, action) {
      state.status = action.type;
      state.deleteSubCategoryResponse = action.payload;
    },
    deleteSubCategoryFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    getSubCategoryRequest(state, action) {
      state.status = action.type;
    },
    getSubCategorySuccess(state, action) {
      state.status = action.type;
      state.getSubCategoryResponse = action.payload;
      state.subCategory = action.payload?.data;
    },
    getSubCategoryFailure(state, action) {
      state.status = action.type;
    },

    addItemRequest(state, action) {
      state.status = action.type;
    },
    addItemSuccess(state, action) {
      state.status = action.type;
      state.addItemResponse = action.payload;
    },
    addItemFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    editItemRequest(state, action) {
      state.status = action.type;
    },
    editItemSuccess(state, action) {
      state.status = action.type;
      state.editItemResponse = action.payload;
    },
    editItemFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    deleteItemRequest(state, action) {
      state.status = action.type;
    },
    deleteItemSuccess(state, action) {
      state.status = action.type;
      state.deleteItemResponse = action.payload;
    },
    deleteItemFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    getItemRequest(state, action) {
      state.status = action.type;
      state.getItemSuccess = { data: [] };
    },
    getItemSuccess(state, action) {
      state.status = action.type;
      state.getItemSuccess = action.payload;
    },
    getItemFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    clearItem(state, action) {
      state.status = action.payload;
      state.getItemSuccess = null
    },

    clearStatus(state, action) {
      state.status = action.type;
    },

    addUserRequest(state, action) {
      state.status = action.type;
    },
    addUserSuccess(state, action) {
      state.status = action.type;
      state.addUserResponse = action.payload;
    },
    addUserFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    editUserRequest(state, action) {
      state.status = action.type;
    },
    editUserSuccess(state, action) {
      state.status = action.type;
      state.editUserResponse = action.payload;
    },
    editUserFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    deleteUserRequest(state, action) {
      state.status = action.type;
    },
    deleteUserSuccess(state, action) {
      state.status = action.type;
      state.deleteUserResponse = action.payload;
    },
    deleteUserFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },

    getUserRequest(state, action) {
      state.status = action.type;
    },
    getUserSuccess(state, action) {
      state.status = action.type;
      state.getUserResponse = action.payload;
    },
    getUserFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
  },
});

export const {
  addBarRequest,
  addBarSuccess,
  addBarFailure,

  editBarRequest,
  editBarSuccess,
  editBarFailure,

  deleteBarRequest,
  deleteBarSuccess,
  deleteBarFailure,

  getBarRequest,
  getBarSuccess,
  getBarFailure,

  addItemRequest,
  addItemSuccess,
  addItemFailure,
  
  editItemRequest,
  editItemSuccess,
  editItemFailure,

  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,

  getItemRequest,
  getItemSuccess,
  getItemFailure,

  addSubcategoryRequest,
  addSubcategorySuccess,
  addSubcategoryFailure,

  editSubCategoryRequest,
  editSubCategorySuccess,
  editSubCategoryFailure,

  deleteSubCategoryRequest,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,

  getSubCategoryRequest,
  getSubCategorySuccess,
  getSubCategoryFailure,
  clearItem,

  clearStatus,

  addUserRequest,
  addUserSuccess,
  addUserFailure,

  editUserRequest,
  editUserSuccess,
  editUserFailure,

  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,

  getUserRequest,
  getUserSuccess,
  getUserFailure,
} = MasterReducer.actions;

export default MasterReducer.reducer;
