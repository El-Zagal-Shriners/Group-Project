import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// SAGA to get all accounts
function* fetchAllAccounts() {
  try {
    const accounts = yield axios.get("/api/accounts", config);
    // console.log("GET accounts", accounts.data);
    yield put({ type: "FETCH_ACCOUNTS", payload: accounts.data });
  } catch (err) {
    // console.log("GET accounts error", err);
  }
} // End SAGA to get all accounts

// SAGA to get all dependent accounts for the current user
function* getDependents() {
  try {
  const dependents = yield axios.get(`/api/accounts/dependents`, config);
  yield put({
      type: "SET_DEPENDENTS",
      payload: dependents.data
  });
  } catch (err) {
      console.log('Error getting dependents', err);
  }
} // End GET all dependent accounts for current user

// SAGA to delete a dependent account
function* removeDependent(action) {
  try {
      yield axios.delete(`api/accounts/dependent/${action.payload}`);
      yield put({ type: "GET_DEPENDENTS" });
  } catch (err) {
      console.log('Error removing dependent: ', err);
  }
} // End DELETE dependent

function* accountsSaga() {
  yield takeEvery("GET_ACCOUNTS", fetchAllAccounts);
  yield takeEvery("GET_DEPENDENTS", getDependents);
  yield takeEvery("REMOVE_DEPENDENT", removeDependent);
}

export default accountsSaga;
