import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// add dependent registration information

function* addDependent (action) {
    try {
      yield axios.post('/api/accounts', action.payload);
      yield put({ type: 'SET_DEPENDENT' });
    } catch (error) {
      console.log('Error POSTING dependent registration:', error);
    }
  }

  function dependentSaga() {
    yield takeEvery('ADD_DEPENDENT', addDependent);
  }

  export default dependentSaga;