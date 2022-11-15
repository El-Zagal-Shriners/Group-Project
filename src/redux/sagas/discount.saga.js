import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET all discounts will calculated usage stats from database
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

// POST a new discount to the discount table in database
function* addDiscount(action) {
  try {
    console.log("In add discount");
    yield axios.post(`api/discount/`, action.payload);
    yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
    console.log("Error adding discount: ", err);
  }
}

function* discountSaga() {
  yield takeLatest("GET_DISCOUNTS", getDiscounts);
  yield takeLatest("ADD_DISCOUNT", addDiscount);
}

export default discountSaga;
