import types from './types';

const initialState = {
  all: [],
  mine: [],
  metaData: {},
};

const detachEvent = (state, payload) => {
  const mine = state.mine.filter((el) => el.id !== payload.id);
  return { ...state, mine };
};

const attachEvent = (state, payload) => {
  const addedEvent = state.all.find((el) => el.id === payload.id);
  return addedEvent ? { ...state, mine: [...state.mine, addedEvent], all: state.all.filter((el) => el.id !== payload.id) } : state;
};

const dropDownEvent = (state, payload) => {
  const droppedItem = state.all.find((item) => item.id === payload.id);
  const all = state.all.filter((item) => item.id !== payload.id);
  return { ...state, all: payload.isHandlePutDownItem ? [...all, droppedItem] : all };
};

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ALL_EVENTS_SUCCEED:
      return { ...state, all: payload.events, metaData: payload.meta };
    case types.ALL_EVENTS_SUCCEED_PAGINATION:
      return { ...state, all: [...state.all, ...payload.events], metaData: payload.meta };
    case types.MINE_EVENTS_SUCCEED:
      return { ...state, mine: payload.events };
    case types.MINE_EVENTS_SUCCEED_PAGINATION:
      return { ...state, mine: [...state.mine, ...payload.events] };
    case types.DETACH_EVENT_SUCCEED:
      return detachEvent(state, payload);
    case types.ATTACH_EVENT_SUCCEED:
      return attachEvent(state, payload);
    case types.DROP_DOWN_EVENT_SUCCEED:
      return dropDownEvent(state, payload);
    default:
      return state;
  }
};

export default eventsReducer;
