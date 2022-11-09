import types from './types';

const initialState = {
  requests: [],
  createFeatureRequest: null,
  requestRespond: {},
};

const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.OWN_REQUESTS_SUCCEED:
      return { ...state, requests: payload.requests };
    case types.OWN_REQUESTS_SUCCEED_PAGINATION:
      return { ...state, requests: [...state.requests, ...payload.requests] };
    case types.CREATE_FEATURE_REQUEST_FAILURE:
      return { ...state, createFeatureRequest: payload.error };
    case types.GET_REQUEST_RESPOND_BY_ID:
      return { ...state, requestRespond: state.requests.filter((item) => item.id === payload.id)[0] };
    default:
      return state;
  }
};

export default homeReducer;
