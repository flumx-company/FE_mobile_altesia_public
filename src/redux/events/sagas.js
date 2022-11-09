import {
  call, takeEvery, put, select,
} from 'redux-saga/effects';
import {
  axiosAllEvents,
  axiosAttachEventById,
  axiosDetachEventById, axiosDropDownEventById,
  axiosMineEvents,
} from '../../services/api';
import types from './types';
import {
  allEventsFailed,
  allEventsSucceed,
  allEventsSucceedPagination,
  attachEventFailure,
  attachEventSucceed,
  detachEventFailure,
  detachEventSucceed, dropDownEventFailure, dropDownEventSucceed,
  mineEventsFailed,
  mineEventsSucceed, mineEventsSucceedPagination,
} from './actions';
import toastMessages from '../../constants/toastMessages';
import { getMetaData } from './selectors';
import errorSaga from '../errorSaga';

// GET
function* getAllEventsWorker(action) {
  try {
    const allEvents = yield call(axiosAllEvents, action.payload.page);
    if (action.payload.page) {
      yield put(allEventsSucceedPagination(allEvents.data.data.items, allEvents.data.data.meta));
    } else {
      yield put(allEventsSucceed(allEvents.data.data.items, allEvents.data.data.meta));
    }
  } catch (error) {
    yield put(allEventsFailed());
    yield call(errorSaga, error);
  }
}

function* getMineEventsWorker(action) {
  try {
    const mineEvents = yield call(axiosMineEvents, action.payload.page);
    if (action.payload.page) {
      yield put(mineEventsSucceedPagination(mineEvents.data.data.items));
    } else {
      yield put(mineEventsSucceed(mineEvents.data.data.items));
    }
  } catch (error) {
    yield put(mineEventsFailed());
    yield call(errorSaga, error);
  }
}

// PATH
function* attachEventWorker(action) {
  try {
    const response = yield call(axiosAttachEventById, action.payload.id);
    /* eslint-disable-next-line */
    toast.show(toastMessages.addEventToMine);
    if (response.data.success) {
      yield put(attachEventSucceed(action.payload.id));
    }
  } catch (error) {
    yield put(attachEventFailure());
    yield call(errorSaga, error);
  }
}

function* detachEventWorker(action) {
  try {
    yield call(axiosDetachEventById, action.payload.id);
    yield put(detachEventSucceed(action.payload.id));
    /* eslint-disable-next-line */
    toast.show(toastMessages.removeEventFromMine);
  } catch (error) {
    yield put(detachEventFailure());
    yield call(errorSaga, error);
  }
}

function* dropDownEventWorker(action) {
  try {
    yield call(axiosDropDownEventById, action.payload.id);
    const meta = yield select(getMetaData);
    const isHandlePutDownItem = meta.totalItems < meta.currentPage * meta.itemsPerPage;
    yield put(dropDownEventSucceed(action.payload.id, isHandlePutDownItem));
  } catch (error) {
    yield put(dropDownEventFailure());
    yield call(errorSaga, error);
  }
}

function* eventsWatcher() {
  yield takeEvery(types.ALL_EVENTS_REQUESTED, getAllEventsWorker);
  yield takeEvery(types.MINE_EVENTS_REQUESTED, getMineEventsWorker);
  yield takeEvery(types.ATTACH_EVENT_REQUESTED, attachEventWorker);
  yield takeEvery(types.DETACH_EVENT_REQUESTED, detachEventWorker);
  yield takeEvery(types.DROP_DOWN_EVENT_REQUESTED, dropDownEventWorker);
}

export default eventsWatcher;
