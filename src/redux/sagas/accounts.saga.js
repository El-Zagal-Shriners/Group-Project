import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllAccounts(){
    try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
      const accounts=yield axios.get('/api/accounts', config);
      console.log('GET accounts', accounts.data);
      yield put ({type: 'FETCH_ACCOUNTS',
                  payload: accounts.data})
    }catch{
      console.log("GET accounts error")
    }
  }

  function* accountsSaga() {
    yield takeEvery('GET_ACCOUNTS', fetchAllAccounts);
  }

export default accountsSaga;
