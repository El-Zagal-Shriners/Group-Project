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

// Check if user's token is valid
function* resetTokenCheck(action) {
  try {
    const check = yield axios.get(`/api/reset/${action.payload}`);
    yield put({ type: "SET_RESET_TOKEN_CHECK", payload: check.data });
  } catch (error) {
    console.log("Error in checking password reset token:", error);
  }
}

// Send password reset email
function* sendForgotUsernameEmail(action) {
  try {
    yield axios.post("/api/reset/username", action.payload);
  } catch (error) {
    console.log("Error in saga POST for forgot username email:", error);
  }
}

// Send password reset email
function* sendPasswordResetEmail(action) {
  try {
    yield axios.post("/api/reset/email", action.payload);
  } catch (error) {
    console.log("Error in saga POST for password reset email:", error);
  }
}

// POST to send new password to db
function* resetPassword(action) {
  try {
    yield axios.post("/api/reset", action.payload);
  } catch (error) {
    console.log("Error in saga POST for password reset:", error);
  }
}

// PUT to request a review for user
function* requestReview() {
  try {
    yield axios.put(`api/user/requestreview`, config);
    yield put({
      type: "FETCH_USER",
    });
  } catch (err) {
    console.log("Error requesting a review: ", err);
  }
}

// Begin function to reset all data on logout
function* unsetAll(action) {
  try {
    yield put({ type: "UNSET_ACCOUNTS" });
    yield put({ type: "UNSET_ADMIN" });
    yield put({ type: "UNSET_CATEGORIES" });
    yield put({ type: "UNSET_DISCOUNTS" });
    yield put({ type: "UNSET_CITIES" });
    yield put({ type: "UNSET_VENDORS" });
    yield put({ type: "UNSET_TOKEN_CHECK"});
  } catch (err) {
    console.log("Error unsetting all", err);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("EDIT_USER_INFO", editUser);
  yield takeLatest("RESET_PASSWORD_TOKEN_CHECK", resetTokenCheck);
  yield takeLatest("SEND_USERNAME", sendForgotUsernameEmail)
  yield takeLatest("SEND_RESET_PASSWORD_EMAIL", sendPasswordResetEmail);
  yield takeLatest("RESET_PASSWORD", resetPassword);
  yield takeLatest("REQUEST_REVIEW", requestReview);
  yield takeEvery("UNSET_ALL", unsetAll);
}

export default userSaga;
