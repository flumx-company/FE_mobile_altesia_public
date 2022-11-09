import types from './types';

// GET ALL EVENTS

export const allEventsRequested = (page) => ({
  type: types.ALL_EVENTS_REQUESTED,
  payload: {
    page,
  },
});

export const allEventsSucceed = (events, meta) => ({
  type: types.ALL_EVENTS_SUCCEED,
  payload: {
    events,
    meta,
  },
});

export const allEventsSucceedPagination = (events, meta) => ({
  type: types.ALL_EVENTS_SUCCEED_PAGINATION,
  payload: {
    events,
    meta,
  },
});

export const allEventsFailed = () => ({
  type: types.ALL_EVENTS_FAILED,
});

// GET MINE EVENTS

export const mineEventsRequested = (page) => ({
  type: types.MINE_EVENTS_REQUESTED,
  payload: {
    page,
  },
});

export const mineEventsSucceed = (events) => ({
  type: types.MINE_EVENTS_SUCCEED,
  payload: {
    events,
  },
});

export const mineEventsSucceedPagination = (events) => ({
  type: types.MINE_EVENTS_SUCCEED_PAGINATION,
  payload: {
    events,
  },
});

export const mineEventsFailed = () => ({
  type: types.MINE_EVENTS_FAILED,
});

// ATTACH EVENT

export const attachEventRequested = (id) => ({
  type: types.ATTACH_EVENT_REQUESTED,
  payload: {
    id,
  },
});

export const attachEventSucceed = (id) => ({
  type: types.ATTACH_EVENT_SUCCEED,
  payload: {
    id,
  },
});

export const attachEventFailure = () => ({
  type: types.ATTACH_EVENT_FAILURE,
});

// DETACH EVENT

export const detachEventRequested = (id) => ({
  type: types.DETACH_EVENT_REQUESTED,
  payload: {
    id,
  },
});

export const detachEventSucceed = (id) => ({
  type: types.DETACH_EVENT_SUCCEED,
  payload: {
    id,
  },
});

export const detachEventFailure = () => ({
  type: types.DETACH_EVENT_FAILURE,
});

// DROP DOWN EVENT

export const dropDownEventRequested = (id) => ({
  type: types.DROP_DOWN_EVENT_REQUESTED,
  payload: {
    id,
  },
});

export const dropDownEventSucceed = (id, isHandlePutDownItem) => ({
  type: types.DROP_DOWN_EVENT_SUCCEED,
  payload: {
    id,
    isHandlePutDownItem,
  },
});

export const dropDownEventFailure = () => ({
  type: types.DROP_DOWN_EVENT_FAILED,
});
