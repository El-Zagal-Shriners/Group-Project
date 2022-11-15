import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// Setup config for credentials
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchVendors() {
  try {
    // Store response from axios
    const response = yield axios.get("/api/vendors", config);
    // Send response to reducer
    yield put({ type: "SET_VENDORS", payload: response.data });
  } catch (error) {
    console.log("error caught in FETCH_VENDORS :>> ", error);
  }
} // End fetchVendors

// POST new vendor on ADD_VENDOR
function* addVendor(action) {
  try{
      yield axios.post(`/api/vendors`, action.payload, config);
      yield put({ type: "FETCH_VENDORS" });
  } catch (error){
      console.log('Error in adding vendor', error);
  }
} // End POST new vendor

// PUT to edit an existing vendor
function* editVendor(action) {
  try {
      yield axios.put(`/api/vendors`, action.payload, config);
      yield put({ type: "FETCH_VENDORS" });
  } catch (err) {
      console.log('Error editing existing vendor: ', err);
  }
} // End PUT edit vendor

// DELETE to remove an existing vendor by id
function* removeVendor(action) {
  try {
      yield axios.delete(`api/vendors/${action.payload}`);
      yield put({ type: "FETCH_VENDORS" });
  } catch (err) {
      console.log('Error removing vendor: ', err);
  }
} // End DELETE vendor

function* vendorSaga() {
  yield takeEvery("FETCH_VENDORS", fetchVendors);
  yield takeEvery("ADD_VENDOR", addVendor);
  yield takeEvery("EDIT_VENDOR", editVendor);
  yield takeEvery("REMOVE_VENDOR", removeVendor);
} // End vendorSaga

export default vendorSaga;
