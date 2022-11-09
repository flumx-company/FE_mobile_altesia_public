import types from './types';

// GET ALL OPPORTUNITIES

export const allOpportunitiesRequested = (page) => ({
  type: types.ALL_OPPORTUNITIES_REQUESTED,
  payload: {
    page,
  },
});

export const allOpportunitiesSucceed = (opportunities, meta) => ({
  type: types.ALL_OPPORTUNITIES_SUCCEED,
  payload: {
    opportunities,
    meta,
  },
});

export const allOpportunitiesSucceedPagination = (opportunities, meta) => ({
  type: types.ALL_OPPORTUNITIES_SUCCEED_PAGINATION,
  payload: {
    opportunities,
    meta,
  },
});

export const allOpportunitiesFailure = () => ({
  type: types.ALL_OPPORTUNITIES_FAILURE,
});

// GET MINE OPPORTUNITIES

export const mineOpportunitiesRequested = (page) => ({
  type: types.MINE_OPPORTUNITIES_REQUESTED,
  payload: {
    page,
  },
});

export const mineOpportunitiesSucceed = (opportunities) => ({
  type: types.MINE_OPPORTUNITIES_SUCCEED,
  payload: {
    opportunities,
  },
});

export const mineOpportunitiesSucceedPagination = (opportunities) => ({
  type: types.MINE_OPPORTUNITIES_SUCCEED_PAGINATION,
  payload: {
    opportunities,
  },
});

export const mineOpportunitiesFailure = () => ({
  type: types.MINE_OPPORTUNITIES_FAILURE,
});

// ATTACH OPPORTUNITY

export const attachOpportunityRequested = (id) => ({
  type: types.ATTACH_OPPORTUNITY_REQUESTED,
  payload: {
    id,
  },
});

export const attachOpportunitySucceed = (id) => ({
  type: types.ATTACH_OPPORTUNITY_SUCCEED,
  payload: {
    id,
  },
});

export const attachOpportunityFailure = () => ({
  type: types.ATTACH_OPPORTUNITY_FAILURE,
});

// DETACH OPPORTUNITY

export const detachOpportunityRequested = (id) => ({
  type: types.DETACH_OPPORTUNITY_REQUESTED,
  payload: {
    id,
  },
});

export const detachOpportunitySucceed = (id) => ({
  type: types.DETACH_OPPORTUNITY_SUCCEED,
  payload: {
    id,
  },
});

export const detachOpportunityFailure = () => ({
  type: types.DETACH_OPPORTUNITY_FAILURE,
});

// DROP DOWN FROM ALL

export const dropDownOpportunityRequested = (id) => ({
  type: types.DROP_DOWN_OPPORTUNITY_REQUESTED,
  payload: {
    id,
  },
});

export const dropDownOpportunitySucceed = (id, isHandlePutDownItem) => ({
  type: types.DROP_DOWN_OPPORTUNITY_SUCCEED,
  payload: {
    id,
    isHandlePutDownItem,
  },
});

export const dropDownOpportunityFailure = () => ({
  type: types.DROP_DOWN_OPPORTUNITY_FAILED,
});

// GET ALERTS BY OPPORTUNITY

export const allUsersAlertsRequested = (page) => ({
  type: types.GET_ALL_USERS_ALERTS_REQUESTED,
  payload: {
    page,
  },
});

export const allUsersAlertsSucceed = (alerts) => ({
  type: types.GET_ALL_USERS_ALERTS_SUCCEED,
  payload: {
    alerts,
  },
});

export const allUsersAlertsSucceedPagination = (alerts) => ({
  type: types.GET_ALL_USERS_ALERTS_SUCCEED_PAGINATION,
  payload: {
    alerts,
  },
});

export const allUsersAlertsFailure = () => ({
  type: types.GET_ALL_USERS_ALERTS_FAILURE,
});

// SELECT OPPORTUNITY

export const selectOpportunity = (id) => ({
  type: types.SELECT_OPPORTUNITY,
  payload: {
    id,
  },
});

// CREATE ALERT BY OPPORTUNITY ID

export const createAlertOpportunityByIdRequested = (id, title, description, attachments, handleRedirect) => ({
  type: types.CREATE_ALERT_OPPORTUNITY_REQUESTED,
  payload: {
    id,
    title,
    description,
    attachments,
    handleRedirect,
  },
});

export const createAlertOpportunityByIdSucceed = () => ({
  type: types.CREATE_ALERT_OPPORTUNITY_SUCCEED,
});

export const createAlertOpportunityByIdFailure = (error) => ({
  type: types.CREATE_ALERT_OPPORTUNITY_FAILURE,
  payload: {
    error,
  },
});

// GET ALERT RESPOND BY ID

export const alertRespondByIdRequested = (id) => ({
  type: types.GET_ALERT_RESPOND_BY_ID_REQUESTED,
  payload: {
    id,
  },
});

export const alertRespondByIdSucceed = (respond) => ({
  type: types.GET_ALERT_RESPOND_BY_ID_SUCCEED,
  payload: {
    respond,
  },
});

export const alertRespondByIdFailure = () => ({
  type: types.GET_ALERT_RESPOND_BY_ID_FAILURE,
});
