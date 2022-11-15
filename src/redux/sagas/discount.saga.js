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
} // End getDiscounts

// POST a new discount to the discount table in database
function* addDiscount(action) {
  try {
    console.log("In add discount");
    yield axios.post(`api/discounts/`, action.payload);
    yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
    console.log("Error adding discount: ", err);
  }
} // End addDiscount

// PUT to edit an existing discount by discount_id
function* editDiscount(action) {
  try {
      console.log('In edit discount with: ', action.payload);
      yield axios.put(`api/discounts`, action.payload);
      yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
      console.log('Error editing discount: ', err);
  }
} // End edit discount

function* discountSaga() {
  yield takeLatest("GET_DISCOUNTS", getDiscounts);
  yield takeLatest("ADD_DISCOUNT", addDiscount);
  yield takeLatest("EDIT_DISCOUNT", editDiscount);
}

export default discountSaga;
