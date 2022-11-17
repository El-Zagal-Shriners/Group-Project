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
        }
        yield axios.put(`/admin/${memberId}`, memberInfo, config);
    } catch (err) {
        console.log('Error updating member info', err);
    }
}

// saga to approve a new member.
function* approveMember(action) {
    try {
        const memberId = action.payload.memberId;
        yield axios.put(`/admin/verify/${memberId}`, action.payload.verification, config);
    } catch (err) {
        console.log('Error approving member', err);
    }
}

// saga to to set member's authorization status
function* authorizeMember(action) {
    try {
        const memberId = action.payload.memberId;
        yield axios.put(`/admin/authorize/${memberId}`, action.payload.authorized, config);
    } catch (err) {
        console.log('Error setting authorization status', err);
    }
}

// saga to delete member and their dependents.
function* deleteMember(action) {
    try {
        const memberId = action.payload.memberId;
        yield axios.delete(`/admin/${memberId}`, config);
    } catch (err) {
        console.log('Error deleting member account', err);
    }
}

function* adminSaga() {
    takeEvery('UPDATE_MEMBER_INFO', updateMemberInfo);
    takeEvery('APPROVE_MEMBER', approveMember);
    takeEvery('AUTHORIZE_MEMBER', authorizeMember);
    takeEvery('ADMIN_DELETE_MEMBER', deleteMember);
}

export default adminSaga;