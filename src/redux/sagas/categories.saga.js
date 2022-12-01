import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// SAGA to get all categories
function* getCategories() {
  try {
    const categories = yield axios.get(`api/categories`);
    yield put({
      type: "SET_CATEGORIES",
      payload: categories.data,
    });
  } catch (err) {
    console.log("Error getting categories: ", err);
  }
} // End SAGA to get categories

function* categoriesSaga() {
  yield takeLatest("GET_CATEGORIES", getCategories);
}

export default categoriesSaga;
