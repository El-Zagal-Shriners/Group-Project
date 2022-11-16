import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

function* fetchAllAccounts() {
  try {
    const accounts = yield axios.get("/api/accounts", config);
    console.log("GET accounts", accounts.data);
    yield put({ type: "FETCH_ACCOUNTS", payload: accounts.data });
  } catch (err) {
    console.log("GET accounts error", err);
  }
}

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
}

function* accountsSaga() {
  yield takeEvery("GET_ACCOUNTS", fetchAllAccounts);
  yield takeEvery("GET_DEPENDENTS", getDependents)
}

export default accountsSaga;
