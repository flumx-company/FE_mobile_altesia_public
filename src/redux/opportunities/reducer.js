import types from './types';

const initialState = {
  all: [],
  mine: [],
  alerts: [],
  selectedOpportunityId: null,
  createAlertOpportunityError: null,
  alertRespond: {},
  metaData: {},
};

const attachOpportunity = (state, payload) => {
  const all = state.all.filter((item) => item.id !== payload.id);
  return { ...state, all };
};

const dropDownOpportunity = (state, payload) => {
  const droppedItem = state.all.find((item) => item.id === payload.id);
  const all = state.all.filter((item) => item.id !== payload.id);
  return { ...state, all: payload.isHandlePutDownItem ? [...all, droppedItem] : all };
};

const opportunitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ALL_OPPORTUNITIES_SUCCEED:
      return { ...state, all: payload.opportunities, metaData: payload.meta };
    case types.ALL_OPPORTUNITIES_SUCCEED_PAGINATION:
      return { ...state, all: [...state.all, ...payload.opportunities], metaData: payload.meta };
    case types.MINE_OPPORTUNITIES_SUCCEED:
      return { ...state, mine: payload.opportunities };
    case types.MINE_OPPORTUNITIES_SUCCEED_PAGINATION:
      return { ...state, mine: [...state.mine, ...payload.opportunities] };
    case types.ATTACH_OPPORTUNITY_SUCCEED:
      return attachOpportunity(state, payload);
    case types.DETACH_OPPORTUNITY_SUCCEED:
      return { ...state, mine: state.mine.filter((el) => el.id !== payload.id) };
    case types.DROP_DOWN_OPPORTUNITY_SUCCEED:
      return dropDownOpportunity(state, payload);
    case types.SELECT_OPPORTUNITY:
      return { ...state, selectedOpportunityId: payload.id };
    case types.GET_ALL_USERS_ALERTS_SUCCEED:
      return { ...state, alerts: payload.alerts };
    case types.GET_ALL_USERS_ALERTS_SUCCEED_PAGINATION:
      return { ...state, alerts: [...state.alerts, ...payload.alerts] };
    case types.CREATE_ALERT_OPPORTUNITY_FAILURE:
      return { ...state, createAlertOpportunityError: payload.error };
    case types.GET_ALERT_RESPOND_BY_ID_SUCCEED:
      return { ...state, alertRespond: payload.respond };
    default:
      return state;
  }
};

export default opportunitiesReducer;
