import { put } from 'redux-saga/effects';
import errorHandler from '../services/errorHandler';
import { loginSucceed } from './auth/action';
import { storageRemoveLoginToken } from '../services/asyncStorage';

function* errorSaga(error) {
  if (error.response && error.response.data.data.statusCode === 401) {
    storageRemoveLoginToken();
    yield put(loginSucceed(null));
  } else {
    errorHandler(error.response.data.data.message);
  }
}

export default errorSaga;
