import {
  createFeatureRequestFailed, createFeatureRequestRequested, createFeatureRequestSucceed, getRequestRespondById, ownFeaturesFailed, ownFeaturesRequested, ownFeaturesSucceed, ownFeaturesSucceedPagination,
} from './actions';
import types from './types';

describe('home actions', () => {
  it('ownFeaturesRequested', () => {
    expect(ownFeaturesRequested(1)).toEqual({
      type: types.OWN_REQUESTS_REQUESTED,
      payload: {
        page: 1,
      },
    });
  });

  it('ownFeaturesSucceed', () => {
    expect(ownFeaturesSucceed(123)).toEqual({
      type: types.OWN_REQUESTS_SUCCEED,
      payload: {
        requests: 123,
      },
    });
  });

  it('ownFeaturesSucceedPagination', () => {
    expect(ownFeaturesSucceedPagination(123)).toEqual({
      type: types.OWN_REQUESTS_SUCCEED_PAGINATION,
      payload: {
        requests: 123,
      },
    });
  });

  it('ownFeaturesFailed', () => {
    expect(ownFeaturesFailed()).toEqual({
      type: types.OWN_REQUESTS_FAILED,
    });
  });

  it('createFeatureRequestRequested', () => {
    expect(createFeatureRequestRequested('title', 'description', 'attachments', 'redirect')).toEqual({
      type: types.CREATE_FEATURE_REQUEST_REQUESTED,
      payload: {
        title: 'title',
        description: 'description',
        attachments: 'attachments',
        redirect: 'redirect',
      },
    });
  });

  it('createFeatureRequestSucceed', () => {
    expect(createFeatureRequestSucceed()).toEqual({
      type: types.CREATE_FEATURE_REQUEST_SUCCEED,
    });
  });

  it('createFeatureRequestFailed', () => {
    expect(createFeatureRequestFailed(123)).toEqual({
      type: types.CREATE_FEATURE_REQUEST_FAILURE,
      payload: {
        error: 123,
      },
    });
  });

  it('getRequestRespondById', () => {
    expect(getRequestRespondById(123)).toEqual({
      type: types.GET_REQUEST_RESPOND_BY_ID,
      payload: {
        id: 123,
      },
    });
  });
});
