import { call, takeEvery, put } from 'redux-saga/effects';
import { axiosAllFeatures, axiosFeatureRequest } from '../../services/api';
import types from './types';
import {
  createFeatureRequestFailed, createFeatureRequestSucceed, ownFeaturesFailed, ownFeaturesSucceed, ownFeaturesSucceedPagination,
} from './actions';
import errorSaga from '../errorSaga';
import toastMessages from '../../constants/toastMessages';

/* eslint-disable no-empty */
function* ownFeaturesWorker(action) {
  try {
    const features = yield call(axiosAllFeatures, action.payload.page);
    if (action.payload.page) {
      yield put(ownFeaturesSucceedPagination(features.data.data.items));
    } else {
      yield put(ownFeaturesSucceed(features.data.data.items));
    }
  } catch (error) {
    yield put(ownFeaturesFailed());
    yield call(errorSaga, error);
  }
}

function* featureRequestWorker(action) {
  try {
    yield call(axiosFeatureRequest, action.payload);
    yield put(createFeatureRequestSucceed());
    yield put(createFeatureRequestFailed(null));
    /* eslint-disable-next-line */
    toast.show(toastMessages.createFeatureRequest);
    action.payload.redirect();
  } catch (error) {
    yield put(createFeatureRequestFailed(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

function* homeWatcher() {
  yield takeEvery(types.OWN_REQUESTS_REQUESTED, ownFeaturesWorker);
  yield takeEvery(types.CREATE_FEATURE_REQUEST_REQUESTED, featureRequestWorker);
}

export default homeWatcher;
