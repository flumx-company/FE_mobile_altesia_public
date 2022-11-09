import {
  call, takeEvery, put, select,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  axiosConfirmEmail, axiosLogin, axiosRegister, axiosReSendConfirmCode, axiosResetPassword, axiosResetPasswordComplete, axiosUserPutProfile, axiosUserStatus, axiosVerifyResetPassword,
} from '../../services/api';
import types from './types';
import {
  clearFilledProfile,
  completeResetPasswordFailed,
  completeResetPasswordSucceed, confirmEmailFailed, confirmEmailSucceed, loginFailed, loginSucceed, putProfileSucceed, registerFailed, registerSucceed, reSendConfirmationFailed, reSendConfirmationSucceed, resetPasswordFailed, resetPasswordSucceed, userStatusFailed, userStatusSucceed, verifyResetPasswordFailed, verifyResetPasswordSucceed,
} from './action';
import storagePutToken, { storageRemoveRegisterToken } from '../../services/asyncStorage';
import { profileFailure } from '../profile/actions';
import { getRegistrationEmail } from './selectors';
import toastMessages from '../../constants/toastMessages';
import { getNewProfile } from '../profile/selectors';
import errorSaga from '../errorSaga';

// LOGIN
function* loginWorker(action) {
  try {
    const token = yield call(axiosLogin, action.payload);
    /* eslint-disable-next-line */
    toast.show(toastMessages.loggedSuccessfully);
    loginFailed(null);
    if (token.data.success) {
      yield put(loginSucceed(token.data.data.token));
      storagePutToken(token.data.data.token);
    }
  } catch (error) {
    yield put(loginFailed(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

// REGISTER
function* registerWorker(action) {
  try {
    const status = yield call(axiosRegister, action.payload);
    registerFailed(null);
    if (status.data.success) {
      /* eslint-disable-next-line no-undef */
      toast.show(toastMessages.registeredConfirmCode);
      yield put(registerSucceed(action.payload.email));
      action.payload.redirect();
    }
  } catch (error) {
    yield put(registerFailed(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

function* confirmEmailWorker(action) {
  try {
    const response = yield call(axiosConfirmEmail, action.payload);
    yield put(confirmEmailSucceed(response.data.data.token));
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
    if (response.data.success) {
      action.payload.redirect();
      reSendConfirmationFailed(null);
    }
  } catch (error) {
    yield put(confirmEmailFailed());
    yield put(reSendConfirmationFailed(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

function* reSendConfirmCodeWorker() {
  try {
    const email = yield select(getRegistrationEmail);
    yield call(axiosReSendConfirmCode, email);
    yield put(reSendConfirmationSucceed());
  } catch (error) {
    yield put(reSendConfirmationFailed(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

// RESET PASSWORD

function* forgotPasswordWorker(action) {
  try {
    const status = yield call(axiosResetPassword, action.payload.email);
    if (status.data.success) {
      yield put(resetPasswordSucceed(action.payload.email));
      action.payload.redirect();
    }
  } catch (error) {
    yield put(resetPasswordFailed(error));
    yield call(errorSaga, error);
  }
}

function* verifyResetPasswordWorker(action) {
  try {
    const status = yield call(axiosVerifyResetPassword, action.payload);
    yield put(resetPasswordFailed(null));
    if (status.data.success) {
      yield put(verifyResetPasswordSucceed(action.payload.token));
      action.payload.redirect();
    }
  } catch (error) {
    yield put(resetPasswordFailed(error.response.data.data.message));
    yield put(verifyResetPasswordFailed());
    yield call(errorSaga, error);
  }
}

function* completeResetPasswordWorker(action) {
  try {
    const status = yield call(axiosResetPasswordComplete, action.payload);
    if (status.data.success) {
      yield put(completeResetPasswordSucceed(action.payload.token));
      action.payload.redirect();
      /* eslint-disable-next-line */
      toast.show(toastMessages.resetPasswordSucceed);
    }
  } catch (error) {
    yield put(completeResetPasswordFailed());
    yield put(resetPasswordFailed(error));
    yield call(errorSaga, error);
  }
}

function* getUserStatusWorker() {
  try {
    const response = yield call(axiosUserStatus);
    yield put(userStatusSucceed(response.data.data));
  } catch (error) {
    storageRemoveRegisterToken();
    yield put(putProfileSucceed(null));
    yield put(confirmEmailSucceed(null));
    yield put(putProfileSucceed(null));
    yield put(userStatusFailed());
    yield call(errorSaga, error);
  }
}

function* putProfileWorker(action) {
  try {
    const profile = yield select(getNewProfile);
    yield call(axiosUserPutProfile, profile);
    yield put(putProfileSucceed());
    yield put(clearFilledProfile());
    action.payload.redirect();
  } catch (error) {
    yield put(profileFailure());
    yield call(errorSaga, error);
  }
}

function* loginWatcher() {
  yield takeEvery(types.LOGIN_REQUESTED, loginWorker);
  yield takeEvery(types.REGISTRATION_REQUESTED, registerWorker);
  yield takeEvery(types.CONFIRM_EMAIL_REQUESTED, confirmEmailWorker);
  yield takeEvery(types.RE_SEND_CONFIRMATION_REQUESTED, reSendConfirmCodeWorker);
  yield takeEvery(types.RESET_PASSWORD_REQUESTED, forgotPasswordWorker);
  yield takeEvery(types.VERIFY_RESET_PASSWORD_REQUESTED, verifyResetPasswordWorker);
  yield takeEvery(types.RESET_PASSWORD_COMPLETE_REQUESTED, completeResetPasswordWorker);
  yield takeEvery(types.USER_STATUS_REQUESTED, getUserStatusWorker);
  yield takeEvery(types.PUT_PROFILE_REQUESTED, putProfileWorker);
}

export default loginWatcher;
