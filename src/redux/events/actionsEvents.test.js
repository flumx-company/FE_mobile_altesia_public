import types from './types';
import {
  allEventsFailed, allEventsRequested, allEventsSucceed, allEventsSucceedPagination, attachEventFailure, attachEventRequested, attachEventSucceed, detachEventFailure, detachEventRequested, detachEventSucceed, dropDownEventFailure, dropDownEventRequested, dropDownEventSucceed, mineEventsFailed, mineEventsRequested, mineEventsSucceed, mineEventsSucceedPagination,
} from './actions';

describe('events actions', () => {
  it('allEventsRequested', () => {
    expect(allEventsRequested(123)).toEqual({
      type: types.ALL_EVENTS_REQUESTED,
      payload: {
        page: 123,
      },
    });
  });

  it('allEventsSucceed', () => {
    expect(allEventsSucceed(123, 1234)).toEqual({
      type: types.ALL_EVENTS_SUCCEED,
      payload: {
        events: 123,
        meta: 1234,
      },
    });
  });

  it('allEventsSucceedPagination', () => {
    expect(allEventsSucceedPagination(123, 1234)).toEqual({
      type: types.ALL_EVENTS_SUCCEED_PAGINATION,
      payload: {
        events: 123,
        meta: 1234,
      },
    });
  });

  it('allEventsFailed', () => {
    expect(allEventsFailed()).toEqual({
      type: types.ALL_EVENTS_FAILED,
    });
  });

  it('mineEventsRequested', () => {
    expect(mineEventsRequested(123)).toEqual({
      type: types.MINE_EVENTS_REQUESTED,
      payload: {
        page: 123,
      },
    });
  });

  it('mineEventsSucceed', () => {
    expect(mineEventsSucceed(123)).toEqual({
      type: types.MINE_EVENTS_SUCCEED,
      payload: {
        events: 123,
      },
    });
  });

  it('mineEventsSucceedPagination', () => {
    expect(mineEventsSucceedPagination(123)).toEqual({
      type: types.MINE_EVENTS_SUCCEED_PAGINATION,
      payload: {
        events: 123,
      },
    });
  });

  it('mineEventsFailed', () => {
    expect(mineEventsFailed()).toEqual({
      type: types.MINE_EVENTS_FAILED,
    });
  });

  it('attachEventRequested', () => {
    expect(attachEventRequested(123)).toEqual({
      type: types.ATTACH_EVENT_REQUESTED,
      payload: {
        id: 123,
      },
    });
  });

  it('attachEventSucceed', () => {
    expect(attachEventSucceed(123)).toEqual({
      type: types.ATTACH_EVENT_SUCCEED,
      payload: {
        id: 123,
      },
    });
  });

  it('attachEventFailure', () => {
    expect(attachEventFailure()).toEqual({
      type: types.ATTACH_EVENT_FAILURE,
    });
  });

  it('detachEventRequested', () => {
    expect(detachEventRequested(123)).toEqual({
      type: types.DETACH_EVENT_REQUESTED,
      payload: {
        id: 123,
      },
    });
  });

  it('detachEventSucceed', () => {
    expect(detachEventSucceed(123)).toEqual({
      type: types.DETACH_EVENT_SUCCEED,
      payload: {
        id: 123,
      },
    });
  });

  it('detachEventFailure', () => {
    expect(detachEventFailure()).toEqual({
      type: types.DETACH_EVENT_FAILURE,
    });
  });

  it('dropDownEventRequested', () => {
    expect(dropDownEventRequested(123)).toEqual({
      type: types.DROP_DOWN_EVENT_REQUESTED,
      payload: {
        id: 123,
      },
    });
  });

  it('dropDownEventSucceed', () => {
    expect(dropDownEventSucceed(123, true)).toEqual({
      type: types.DROP_DOWN_EVENT_SUCCEED,
      payload: {
        id: 123,
        isHandlePutDownItem: true,
      },
    });
  });

  it('dropDownEventFailure', () => {
    expect(dropDownEventFailure()).toEqual({
      type: types.DROP_DOWN_EVENT_FAILED,
    });
  });
});
