import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};
// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}
// Saga to edit current user
function* editUser(action) {
  try {
    yield axios.put(`api/user/`, action.payload, config);
    yield put({
      type: "FETCH_USER",
    });
  } catch (err) {
    console.log("Error updating user information", err);
  }
}

// Begin function to reset all data on logout
function* unsetAll(action) {
  try {
    yield put({ type: "UNSET_ACCOUNTS" });
    yield put({ type: "UNSET_ADMIN" });
    yield put({ type: "UNSET_CATAGORIES" });
    yield put({ type: "UNSET_DISCOUNTS" });
    yield put({ type: "UNSET_CITIES" });
  } catch (err) {
    console.log("Error unsetting all", err);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("EDIT_USER_INFO", editUser);
  yield takeEvery("UNSET_ALL", unsetAll);
}

export default userSaga;
