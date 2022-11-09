import types from './types';

export const ownFeaturesRequested = (page) => ({
  type: types.OWN_REQUESTS_REQUESTED,
  payload: {
    page,
  },
});

export const ownFeaturesSucceed = (requests) => ({
  type: types.OWN_REQUESTS_SUCCEED,
  payload: {
    requests,
  },
});

export const ownFeaturesSucceedPagination = (requests) => ({
  type: types.OWN_REQUESTS_SUCCEED_PAGINATION,
  payload: {
    requests,
  },
});

export const ownFeaturesFailed = () => ({
  type: types.OWN_REQUESTS_FAILED,
});

// CREATE FEATURE REQUEST

export const createFeatureRequestRequested = (title, description, attachments, redirect) => ({
  type: types.CREATE_FEATURE_REQUEST_REQUESTED,
  payload: {
    title,
    description,
    attachments,
    redirect,
  },
});

export const createFeatureRequestSucceed = () => ({
  type: types.CREATE_FEATURE_REQUEST_SUCCEED,
});

export const createFeatureRequestFailed = (error) => ({
  type: types.CREATE_FEATURE_REQUEST_FAILURE,
  payload: {
    error,
  },
});

// GET REQUEST RESPOND BY ID

export const getRequestRespondById = (id) => ({
  type: types.GET_REQUEST_RESPOND_BY_ID,
  payload: {
    id,
  },
});
