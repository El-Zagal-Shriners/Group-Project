import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// GET all discounts for use in member discount page
// Includes relevent vendor and category information as well
function* getMemberDiscounts() {
  try {
    // console.log("In member discounts saga");
    const discounts = yield axios.get(`api/discounts/member`);
    yield put({
      type: "SET_MEMBER_DISCOUNTS",
      payload: discounts.data,
    });
  } catch (err) {
    console.log("Error setting member discounts: ", err);
  }
} // End getAdminDiscounts

// GET all discounts will calculated usage stats from database
function* getAdminDiscounts() {
  try {
    // console.log("In admin discounts saga");
    const discounts = yield axios.get(`api/discounts/admin`);
    yield put({
      type: "SET_ADMIN_DISCOUNTS",
      payload: discounts.data,
    });
  } catch (err) {
    console.log("Error settin admin discounts: ", err);
  }
} // End getAdminDiscounts

// POST a new discount to the discount table in database
function* addDiscount(action) {
  try {
    // console.log("In add discount", action.payload);
    yield axios.post(`api/discounts/`, action.payload);
    yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
    console.log("Error adding discount: ", err);
  }
} // End addDiscount

// PUT to edit an existing discount by discount_id
function* editDiscount(action) {
  try {
    // console.log("In edit discount with: ", action.payload);
    yield axios.put(`api/discounts`, action.payload);
    yield put({ type: "GET_ADMIN_DISCOUNTS" });
  } catch (err) {
    console.log("Error editing discount: ", err);
  }
} // End edit discount

// PUT to toggle discount is_shown by discount_id
function* toggleActiveDiscount(action) {
  try {
    console.log("In toggle discount with: ", action.payload);
    yield axios.put(`api/discounts/active`, action.payload);
    yield put({ type: "GET_ADMIN_DISCOUNTS" });
  } catch (err) {
    console.log("Error editing discount: ", err);
  }
} // End edit discount

// DELETE to remove a discount by id
function* removeDiscount(action) {
  try {
    // console.log("In remove discount with: ", action.payload);
    yield axios.delete(`api/discounts/${action.payload}`);
    yield put({ type: "GET_ADMIN_DISCOUNTS" });
  } catch (err) {
    console.log("Error removing discount: ", err);
  }
} // End remove a discount

function* discountSaga() {
  yield takeLatest("GET_MEMBER_DISCOUNTS", getMemberDiscounts);
  yield takeLatest("GET_ADMIN_DISCOUNTS", getAdminDiscounts);
  yield takeLatest("ADD_DISCOUNT", addDiscount);
  yield takeLatest("EDIT_DISCOUNT", editDiscount);
  yield takeLatest("TOGGLE_ACTIVE_DISCOUNT", toggleActiveDiscount);
  yield takeLatest("REMOVE_DISCOUNT", removeDiscount);
}

export default discountSaga;
