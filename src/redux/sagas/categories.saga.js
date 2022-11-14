import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getCategories() {
  try {
    console.log("In categories saga");
    const categories = yield axios.get(`api/categories`);
    console.log("Categories back", categories.data);
    yield put({
      type: "SET_CATEGORIES",
      payload: categories.data,
    });
  } catch (err) {
    console.log("Error getting categories: ", err);
  }
}

function* categoriesSaga() {
  yield takeLatest("GET_CATEGORIES", getCategories);
}

export default categoriesSaga;
