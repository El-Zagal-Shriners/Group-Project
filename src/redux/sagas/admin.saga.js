import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// saga to update the member's membership number and dues paid date.
function* updateMemberInfo(action) {
  try {
    const memberId = action.payload.memberId;
    const memberInfo = {
      memberNumber: action.payload.memberNumber,
      duesPaid: action.payload.duesPaid,
    };
    yield axios.put(`/api/admin/${memberId}`, memberInfo, config);
    yield put({ type: "GET_ACCOUNTS" });
  } catch (err) {
    console.log("Error updating member info", err);
  }
}

// saga to approve a new member.
function* approveMember(action) {
  try {
    const memberId = action.payload.memberId;
    yield axios.put(
      `/api/admin/verify/${memberId}`,
      {
        verification: action.payload.verification,
        authorized: action.payload.authorized,
      },
      config
    );
    yield put({ type: "GET_ACCOUNTS" });
  } catch (err) {
    console.log("Error approving member", err);
  }
}

// saga to to set member's authorization status
function* authorizeMember(action) {
  try {
    const memberId = action.payload.memberId;
    yield axios.put(
      `/api/admin/authorize/${memberId}`,
      { authorized: action.payload.authorized },
      config
    );
    yield put({ type: "GET_ACCOUNTS" });
  } catch (err) {
    console.log("Error setting authorization status", err);
  }
}

// saga to delete member and their dependents.
function* deleteMember(action) {
  try {
    const memberId = action.payload.memberId;
    yield axios.delete(`/api/admin/${memberId}`, config);
    yield put({ type: "GET_ACCOUNTS" });
  } catch (err) {
    console.log("Error deleting member account", err);
  }
}

function* addToDiscountTracker(action) {
  // console.log("in add to tracker", action);
  try {
    yield axios({
      method: "POST",
      url: `api/admin/tracker/${action.payload.discountId}`,
      data: { discountDate: action.payload.discountDate },
    });
  } catch (err) {
    console.log("Error deleting member account", err);
  }
}

function* toggleAdmin(action) {
  try {
    yield axios.put("api/admin/toggle", action.payload);
    yield put({ type: "GET_ACCOUNTS" });
  } catch (error) {
    console.log("error caught in toggleAdmin :>> ", error);
  }
}

function* adminSaga() {
  yield takeEvery("UPDATE_MEMBER_INFO", updateMemberInfo);
  yield takeEvery("APPROVE_MEMBER", approveMember);
  yield takeEvery("AUTHORIZE_MEMBER", authorizeMember);
  yield takeEvery("ADMIN_DELETE_MEMBER", deleteMember);
  yield takeEvery("ADD_TO_DISCOUNT_TRACKER", addToDiscountTracker);
  yield takeEvery("TOGGLE_ADMIN", toggleAdmin);
}

export default adminSaga;
