import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { ASYNC_ADD } from './constants';
import { add } from './actionCreator';

function* asyncAddCount() {
  const res = yield axios.get('https://api.github.com/');
  const action = add(res.data);
  yield put(action);
}

function* mySaga() {
  yield takeEvery(ASYNC_ADD, asyncAddCount);
}

export default mySaga;
