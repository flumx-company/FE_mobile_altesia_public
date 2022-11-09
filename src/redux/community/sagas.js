import { call, takeEvery, put } from 'redux-saga/effects';
import {
  axiosAllCategories, axiosAllIssues, axiosCreateIssueByCommunityId, axiosIssueById, axiosIssuesAllByCommunityId, axiosIssuesMineByCommunityId, axiosMineIssues, axiosRateResponseByIdPost, axiosRateResponseByIdPut, axiosResponseById, axiosResponseByIssueId, axiosResponsesByQuestionId,
} from '../../services/api';
import types from './types';
import {
  allCategoriesSucceed, allCategoriesFailure, questionsByCategoryIdSucceed, questionsByCategoryIdFailure, questionsByCategoryIdSucceedPagination, responsesByQuestionIdSucceed, responsesByQuestionIdFailure, rateResponseByIdFailed, createCommunityIssueFailed, responseIssueDirectFailure, getIssueByIdSucceed, rateResponseByIdSucceed, createCommunityIssueSucceed, responseIssueDirectSucceed, getIssueByIdFailure, responsesByQuestionIdSucceedPagination,
} from './actions';
import errorSaga from '../errorSaga';
import toastMessages from '../../constants/toastMessages';

function* getAllCategoriesWorker() {
  try {
    const categories = yield call(axiosAllCategories);
    yield put(allCategoriesSucceed(categories.data.data));
  } catch (error) {
    yield put(allCategoriesFailure());
    yield call(errorSaga, error);
  }
}

function* issuesByCategoryIdWorker(action) {
  try {
    let issues = [];
    if (action.payload.id === 'all') {
      issues = action.payload.whose === 'all' ? yield call(axiosAllIssues, action.payload) : yield call(axiosMineIssues, action.payload);
    } else {
      issues = action.payload.whose === 'all' ? yield call(axiosIssuesAllByCommunityId, action.payload) : yield call(axiosIssuesMineByCommunityId, action.payload);
    }
    if (action.payload.page) {
      yield put(questionsByCategoryIdSucceedPagination(issues.data.data.items));
    } else {
      yield put(questionsByCategoryIdSucceed(issues.data.data.items));
    }
  } catch (error) {
    yield put(questionsByCategoryIdFailure());
    yield call(errorSaga, error);
  }
}

function* responsesByQuestionIdWorker(action) {
  try {
    const responses = yield call(axiosResponsesByQuestionId, action.payload.id, action.payload.page, action.payload.responseType, action.payload.newest, action.payload.oldest, action.payload.lowestRate, action.payload.highestRate);
    if (action.payload.page !== 1) {
      yield put(responsesByQuestionIdSucceedPagination(responses.data.data.items));
    } else {
      yield put(responsesByQuestionIdSucceed(responses.data.data.items));
    }
  } catch (error) {
    yield put(responsesByQuestionIdFailure());
    yield call(errorSaga, error);
  }
}

function* rateResponseByIdWorker(action) {
  try {
    let rateAfterUpdating = {
      rate: null,
      id: null,
    };
    if (action.payload.isRated) {
      yield call(axiosRateResponseByIdPut, action.payload.idUserRate, action.payload.rate);
      rateAfterUpdating = yield call(axiosResponseById, action.payload.idResponse);
    } else {
      yield call(axiosRateResponseByIdPost, action.payload.idResponse, action.payload.rate);
      rateAfterUpdating = yield call(axiosResponseById, action.payload.idResponse);
    }
    if (rateAfterUpdating.data.data.communityRatings[0]) {
      yield put(rateResponseByIdSucceed(rateAfterUpdating.data.data.averageRating, action.payload.idResponse, rateAfterUpdating.data.data.communityRatings[0].id));
    }else {
      yield put(rateResponseByIdSucceed(rateAfterUpdating.data.data.averageRating, action.payload.idResponse, null));
    }
  } catch (error) {
    yield put(rateResponseByIdFailed());
    yield call(errorSaga, error);
  }
}

function* createIssueWorker(action) {
  try {
    yield call(axiosCreateIssueByCommunityId, action.payload);
    yield put(createCommunityIssueSucceed());
    yield put(createCommunityIssueFailed(null));
    /* eslint-disable-next-line */
    toast.show(toastMessages.createIssueSucceed);
    action.payload.handleRedirect();
  } catch (error) {
    yield put(createCommunityIssueFailed(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

function* responseIssueDirectWorker(action) {
  try {
    yield call(axiosResponseByIssueId, action.payload);
    yield put(responseIssueDirectFailure(null));
    yield put(responseIssueDirectSucceed());
    /* eslint-disable-next-line */
    toast.show(toastMessages.createResponseSucceed);
    action.payload.handleRedirect();
  } catch (error) {
    yield put(responseIssueDirectFailure(error.response.data.data.message));
    yield call(errorSaga, error);
  }
}

function* issueByIdWorker(action) {
  try {
    const issue = yield call(axiosIssueById, action.payload.id);
    yield put(getIssueByIdSucceed(issue.data.data));
  } catch (error) {
    yield put(responseIssueDirectFailure(error.response.data.data.message));
    yield put(getIssueByIdFailure());
    yield call(errorSaga, error);
  }
}

function* communityWatcher() {
  yield takeEvery(types.ALL_CATEGORIES_REQUESTED, getAllCategoriesWorker);
  yield takeEvery(types.QUESTIONS_BY_CATEGORY_ID_REQUESTED, issuesByCategoryIdWorker);
  yield takeEvery(types.RESPONSES_BY_QUESTION_ID_REQUESTED, responsesByQuestionIdWorker);
  yield takeEvery(types.RATE_RESPONSE_REQUESTED, rateResponseByIdWorker);
  yield takeEvery(types.CREATE_COMMUNITY_ISSUE_BY_ID_REQUESTED, createIssueWorker);
  yield takeEvery(types.RESPONSE_ISSUE_DIRECT_REQUESTED, responseIssueDirectWorker);
  yield takeEvery(types.GET_ISSUE_BY_ID_REQUESTED, issueByIdWorker);
}

export default communityWatcher;
