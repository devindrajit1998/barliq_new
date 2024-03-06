import { call, put, takeLatest } from "redux-saga/effects";
import { deleteApi, getApi, patchApi, postApi } from "../utils/helpers/api";
import {
  addBarFailure,
  addBarSuccess,
  addItemFailure,
  addItemSuccess,
  addSubcategoryFailure,
  addSubcategorySuccess,
  addUserFailure,
  addUserSuccess,
  clearItem,
  deleteBarFailure,
  deleteBarSuccess,
  deleteItemFailure,
  deleteItemSuccess,
  deleteSubCategoryFailure,
  deleteSubCategorySuccess,
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  editBarFailure,
  editBarSuccess,
  editItemFailure,
  editItemSuccess,
  editSubCategoryFailure,
  editSubCategorySuccess,
  editUserFailure,
  editUserRequest,
  editUserSuccess,
  getBarFailure,
  getBarSuccess,
  getItemFailure,
  getItemSuccess,
  getSubCategoryFailure,
  getSubCategorySuccess,
  getUserFailure,
  getUserSuccess,
} from "../redux/reducers/MasterReducer";

function* getBarSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(getApi, "/bar", header);
    console.log("GET Bar", response);
    if (response.data.statusCode == 200) {
      yield put(getBarSuccess(response.data));
    } else {
      yield put(getBarFailure(response.data));
    }
  } catch (error) {
    console.log("GET Bar", error);
    yield put(getBarFailure(error.response));
  }
}

function* addBarSaga(action) {
  let header = {
    Accept: "application/json",
  };
  try {
    let response = yield call(postApi, "/bar", action.payload, header);
    if (response.data.statusCode == 200) {
      yield put(addBarSuccess(response.data));
    } else {
      yield put(addBarFailure(response.data));
    }
  } catch (error) {
    yield put(addBarFailure(error.response));
  }
}

function* addItemSaga(action) {
  let header = {
    Accept: "application/json",
  };
  try {
    let response = yield call(postApi, "/item", action.payload, header);

    if (response.data.statusCode == 200) {
      yield put(addItemSuccess(response.data));
    } else {
      yield put(addItemFailure(response.data));
    }
  } catch (error) {
    yield put(addItemFailure(error.response));
  }
}

function* addSubCategorySaga(action) {
  let header = {
    Accept: "application/json",
  };
  try {
    let response = yield call(postApi, "/sub-category", action.payload, header);

    if (response.data.statusCode == 200) {
      yield put(addSubcategorySuccess(response.data));
    } else {
      yield put(addSubcategoryFailure(response.data));
    }
  } catch (error) {
    yield put(addSubcategoryFailure(error.response));
  }
}

function* getSubCategorySaga(action) {
  let header = {
    Accept: "application/json",
  };
  try {
    let response = yield call(
      getApi,
      `/sub-category?category=${action.payload}`,
      header
    );

    if (response.data.statusCode == 200) {
      yield put(getSubCategorySuccess(response.data));
      // yield put(clearItem());
    } else {
      yield put(getSubCategoryFailure(response.data));
    }
  } catch (error) {
    yield put(getSubCategoryFailure(error.response));
  }
}

function* getItemSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(
      getApi,
      `/item?subcategory=${action.payload}`,
      header
    );
    if (response.data?.statusCode === 200) {
      yield put(getItemSuccess(response.data));
    } else {
      yield put(getItemFailure(response.data));
    }
  } catch (error) {
    yield put(getItemFailure(error.response));
  }
}

function* addUserSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(postApi, "/user", action.payload, header);
    if (response?.data?.statusCode === 200) {
      yield put(addUserSuccess(response.data));
    } else {
      yield put(addUserFailure(response.data));
    }
  } catch (error) {
    yield put(addUserFailure(error.response));
  }
}

function* getUserSaga() {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(getApi, "/user", header);
    if (response?.data?.statusCode === 200) {
      yield put(getUserSuccess(response?.data));
    } else {
      yield put(getUserFailure(response?.data));
    }
  } catch (error) {}
}

function* editBarSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let barId = action.payload?.id;
    delete action.payload?.id;
    let response = yield call(
      patchApi,
      `/bar/${barId}`,
      action.payload,
      header
    );
    if (response?.data?.statusCode === 200) {
      yield put(editBarSuccess(response?.data));
    } else {
      yield put(editBarFailure(response?.data));
    }
  } catch (error) {
    yield put(editBarFailure(error.response));
  }
}

function* deleteBar(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(deleteApi, `/bar/${action.payload}`, header);
    if (response.data?.statusCode === 200) {
      yield put(deleteBarSuccess(response?.data));
    } else {
      yield put(deleteBarFailure(response?.data));
    }
  } catch (error) {
    yield put(deleteBarFailure(error.response));
  }
}

function* editSubCategorySaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let id = action.payload?.id;
    delete action.payload?.id;
    let response = yield call(
      patchApi,
      `/sub-category/${id}`,
      action.payload,
      header
    );
    if (response.data?.statusCode === 200) {
      yield put(editSubCategorySuccess(response?.data));
    } else {
      yield put(editSubCategoryFailure(response?.data));
    }
  } catch (error) {
    yield put(editSubCategoryFailure(error.response));
  }
}

function* deleteSubCategorySaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(
      deleteApi,
      `/sub-category/${action.payload}`,
      header
    );
    if (response.data?.statusCode === 200) {
      yield put(deleteSubCategorySuccess(response?.data));
    } else {
      yield put(deleteSubCategoryFailure(response?.data));
    }
  } catch (error) {
    yield put(deleteSubCategoryFailure(error.response));
  }
}

function* editUserSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let id = action.payload?.id;
    delete action.payload?.id;
    let response = yield call(patchApi, `/user/${id}`, action.payload, header);
    if (response?.data?.statusCode === 200) {
      yield put(editUserSuccess(response?.data));
    } else {
      yield put(editUserFailure(response?.data));
    }
  } catch (error) {
    yield put(editUserFailure(error.response));
  }
}

function* deleteUserSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(deleteApi, `/user/${action.payload}`, header);
    if (response?.data?.statusCode === 200) {
      yield put(deleteUserSuccess(response?.data));
    } else {
      yield put(deleteUserFailure(response?.data));
    }
  } catch (error) {
    yield put(deleteUserFailure(error.response));
  }
}

function* editItemSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let id = action.payload?.id;
    delete action.payload?.id;
    let response = yield call(patchApi, `/item/${id}`, action.payload, header);
    if (response?.data?.statusCode === 200) {
      yield put(editItemSuccess(response?.data));
    } else {
      yield put(editItemFailure(response?.data));
    }
  } catch (error) {
    yield put(editItemFailure(error.response));
  }
}

function* deleteItemSaga(action) {
  try {
    let header = {
      Accept: "application/json",
    };
    let response = yield call(deleteApi, `/item/${action.payload}`, header);
    if (response?.data?.statusCode === 200) {
      yield put(deleteItemSuccess(response?.data));
    } else {
      yield put(deleteItemFailure(response?.data));
    }
  } catch (error) {
    yield put(deleteItemFailure(error.response));
  }
}

const watchFunctions = [
  (function* () {
    yield takeLatest("Master/addBarRequest", addBarSaga);
  })(),
  (function* () {
    yield takeLatest("Master/addSubcategoryRequest", addSubCategorySaga);
  })(),
  (function* () {
    yield takeLatest("Master/addItemRequest", addItemSaga);
  })(),
  (function* () {
    yield takeLatest("Master/getSubCategoryRequest", getSubCategorySaga);
  })(),
  (function* () {
    yield takeLatest("Master/getBarRequest", getBarSaga);
  })(),
  (function* () {
    yield takeLatest("Master/getItemRequest", getItemSaga);
  })(),
  (function* () {
    yield takeLatest("Master/addUserRequest", addUserSaga);
  })(),
  (function* () {
    yield takeLatest("Master/getUserRequest", getUserSaga);
  })(),
  (function* () {
    yield takeLatest("Master/editBarRequest", editBarSaga);
  })(),
  (function* () {
    yield takeLatest("Master/deleteBarRequest", deleteBar);
  })(),
  (function* () {
    yield takeLatest("Master/editSubCategoryRequest", editSubCategorySaga);
  })(),
  (function* () {
    yield takeLatest("Master/deleteSubCategoryRequest", deleteSubCategorySaga);
  })(),
  (function* () {
    yield takeLatest("Master/editUserRequest", editUserSaga);
  })(),
  (function* () {
    yield takeLatest("Master/deleteUserRequest", deleteUserSaga);
  })(),
  (function* () {
    yield takeLatest("Master/editItemRequest", editItemSaga);
  })(),
  (function* () {
    yield takeLatest("Master/deleteItemRequest", deleteItemSaga);
  })(),
];

export default watchFunctions;
