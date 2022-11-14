import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getDiscounts() {
  try {
    console.log("In discounts saga");
    const discounts = yield axios.get(`api/discounts`);
    yield put({
      type: "SET_DISCOUNTS",
      payload: discounts.data,
    });
  } catch (err) {
    console.log("Error setting discounts: ", err);
  }
}

function* discountSaga() {
  yield takeLatest("GET_DISCOUNTS", getDiscounts);
}

export default discountSaga;
