import {
  call, takeEvery, put, select,
} from 'redux-saga/effects';
import {
  axiosAlertRespondById,
  axiosAllOpportunities, axiosAttachOpportunityById, axiosCreateAlertOpportunity, axiosDetachOpportunityById, axiosDropDownOpportunityById, axiosMineOpportunities, axiosUsersAlert,
} from '../../services/api';
import types from './types';
import {
  alertRespondByIdFailure,
  alertRespondByIdSucceed,
  allOpportunitiesFailure, allOpportunitiesSucceed, allOpportunitiesSucceedPagination, allUsersAlertsFailure, allUsersAlertsSucceed, allUsersAlertsSucceedPagination, attachOpportunityFailure, attachOpportunitySucceed, createAlertOpportunityByIdFailure, createAlertOpportunityByIdSucceed, detachOpportunityFailure, detachOpportunitySucceed, dropDownOpportunityFailure, dropDownOpportunitySucceed, mineOpportunitiesFailure, mineOpportunitiesSucceed, mineOpportunitiesSucceedPagination,
} from './actions';
import toastMessages from '../../constants/toastMessages';
import { getGetMetaData } from './selectors';
import errorSaga from '../errorSaga';

function* getAllOpportunitiesWorker(action) {
  try {
    const allOpportunities = yield call(axiosAllOpportunities, action.payload.page);
    if (action.payload.page) {
      yield put(allOpportunitiesSucceedPagination(allOpportunities.data.data.items, allOpportunities.data.data.meta));
    } else {
      yield put(allOpportunitiesSucceed(allOpportunities.data.data.items, allOpportunities.data.data.meta));
    }
  } catch (error) {
    yield put(allOpportunitiesFailure());
    yield call(errorSaga, error);
  }
}

function* getMineOpportunitiesWorker(action) {
  try {
    const mineOpportunities = yield call(axiosMineOpportunities, action.payload.page);
    if (action.payload.page) {
      yield put(mineOpportunitiesSucceedPagination(mineOpportunities.data.data.items));
    } else {
      yield put(mineOpportunitiesSucceed(mineOpportunities.data.data.items));
    }
  } catch (error) {
    yield put(mineOpportunitiesFailure());
    yield call(errorSaga, error);
  }
}

function* attachOpportunityWorker(action) {
  try {
    const response = yield call(axiosAttachOpportunityById, action.payload.id);
    /* eslint-disable-next-line */
    toast.show(toastMessages.addOpportunityToMine);
    if (response.data.success) {
      yield put(attachOpportunitySucceed(action.payload.id));
    }
  } catch (error) {
    yield put(attachOpportunityFailure());
    yield call(errorSaga, error);
  }
}

function* detachOpportunityWorker(action) {
  try {
    const response = yield call(axiosDetachOpportunityById, action.payload.id);
    /* eslint-disable-next-line */
    toast.show(toastMessages.removeOpportunityFromMine);
    if (response.data.success) {
      yield put(detachOpportunitySucceed(action.payload.id));
    }
  } catch (error) {
    yield put(detachOpportunityFailure());
    yield call(errorSaga, error);
  }
}

function* dropDownOpportunityWorker(action) {
  try {
    yield call(axiosDropDownOpportunityById, action.payload.id);
    const meta = yield select(getGetMetaData);
    const isHandlePutDownItem = meta.totalItems < meta.currentPage * meta.itemsPerPage;
    yield put(dropDownOpportunitySucceed(action.payload.id, isHandlePutDownItem));
    /* eslint-disable-next-line */
    toast.show(toastMessages.dropDownOpportunity);
  } catch (error) {
    yield put(dropDownOpportunityFailure());
    yield call(errorSaga, error);
  }
}

function* alertsByIdWorker(action) {
  try {
    const alerts = yield call(axiosUsersAlert, action.payload);
    if (action.payload.page) {
      yield put(allUsersAlertsSucceedPagination(alerts.data.data.items));
    } else {
      yield put(allUsersAlertsSucceed(alerts.data.data.items));
    }
  } catch (error) {
    yield put(allUsersAlertsFailure());
    yield call(errorSaga, error);
  }
}

function* createAlertOpportunityWorker(action) {
  try {
    yield call(axiosCreateAlertOpportunity, action.payload);
    yield put(createAlertOpportunityByIdSucceed());
    yield put(createAlertOpportunityByIdFailure(null));
    /* eslint-disable-next-line */
    toast.show(toastMessages.createAlertSucceed);
    action.payload.handleRedirect();
  } catch (error) {
    yield put(createAlertOpportunityByIdFailure(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

function* alertRespondByIdWorker(action) {
  try {
    const response = yield call(axiosAlertRespondById, action.payload.id);
    yield put(alertRespondByIdSucceed(response.data.data));
  } catch (error) {
    yield put(alertRespondByIdFailure());
    yield call(errorSaga, error);
  }
}

function* opportunitiesWatcher() {
  yield takeEvery(types.ALL_OPPORTUNITIES_REQUESTED, getAllOpportunitiesWorker);
  yield takeEvery(types.MINE_OPPORTUNITIES_REQUESTED, getMineOpportunitiesWorker);
  yield takeEvery(types.ATTACH_OPPORTUNITY_REQUESTED, attachOpportunityWorker);
  yield takeEvery(types.DETACH_OPPORTUNITY_REQUESTED, detachOpportunityWorker);
  yield takeEvery(types.GET_ALL_USERS_ALERTS_REQUESTED, alertsByIdWorker);
  yield takeEvery(types.DROP_DOWN_OPPORTUNITY_REQUESTED, dropDownOpportunityWorker);
  yield takeEvery(types.CREATE_ALERT_OPPORTUNITY_REQUESTED, createAlertOpportunityWorker);
  yield takeEvery(types.GET_ALERT_RESPOND_BY_ID_REQUESTED, alertRespondByIdWorker);
}

export default opportunitiesWatcher;
