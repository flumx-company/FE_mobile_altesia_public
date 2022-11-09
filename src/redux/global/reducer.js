import authTypes from '../auth/types';
import communityTypes from '../community/types';
import eventsTypes from '../events/types';
import homeTypes from '../home/types';
import opportunitiesTypes from '../opportunities/types';
import profileTypes from '../profile/types';

const initialState = {
  isLoading: false,
};

const globalReducer = (state = initialState, { type }) => {
  switch (type) {
    // AUTH
    case authTypes.LOGIN_REQUESTED:
    case authTypes.REGISTRATION_REQUESTED:
    case authTypes.CONFIRM_EMAIL_REQUESTED:
    case authTypes.RE_SEND_CONFIRMATION_REQUESTED:
    case authTypes.RESET_PASSWORD_REQUESTED:
    case authTypes.VERIFY_RESET_PASSWORD_REQUESTED:
    case authTypes.RESET_PASSWORD_COMPLETE_REQUESTED:
    case authTypes.USER_STATUS_REQUESTED:
    case authTypes.PUT_PROFILE_REQUESTED:
      return { ...state, isLoading: true };
    case authTypes.RE_SEND_CONFIRMATION_SUCCEED:
    case authTypes.RE_SEND_CONFIRMATION_FAILED:
    case authTypes.LOGIN_SUCCEED:
    case authTypes.LOGIN_FAILED:
    case authTypes.REGISTRATION_SUCCEED:
    case authTypes.REGISTRATION_FAILED:
    case authTypes.CONFIRM_EMAIL_SUCCEED:
    case authTypes.CONFIRM_EMAIL_FAILED:
    case authTypes.RESET_PASSWORD_SUCCEED:
    case authTypes.RESET_PASSWORD_FAILED:
    case authTypes.VERIFY_RESET_PASSWORD_SUCCEED:
    case authTypes.VERIFY_RESET_PASSWORD_FAILED:
    case authTypes.RESET_PASSWORD_COMPLETE_SUCCEED:
    case authTypes.RESET_PASSWORD_COMPLETE_FAILED:
    case authTypes.USER_STATUS_SUCCEED:
    case authTypes.USER_STATUS_FAILED:
    case authTypes.PUT_PROFILE_SUCCEED:
    case authTypes.PUT_PROFILE_FAILED:
      return { ...state, isLoading: false };
    // COMMUNITY
    case communityTypes.ALL_CATEGORIES_REQUESTED:
    case communityTypes.QUESTIONS_BY_CATEGORY_ID_REQUESTED:
    case communityTypes.RESPONSES_BY_QUESTION_ID_REQUESTED:
    case communityTypes.RATE_RESPONSE_REQUESTED:
    case communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_REQUESTED:
    case communityTypes.RESPONSE_ISSUE_DIRECT_REQUESTED:
    case communityTypes.GET_ISSUE_BY_ID_REQUESTED:
      return { ...state, isLoading: true };
    case communityTypes.ALL_CATEGORIES_SUCCEED:
    case communityTypes.ALL_CATEGORIES_FAILURE:
    case communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED:
    case communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED_PAGINATION:
    case communityTypes.QUESTIONS_BY_CATEGORY_ID_FAILED:
    case communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED:
    case communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED_PAGINATION:
    case communityTypes.RESPONSES_BY_QUESTION_ID_FAILURE:
    case communityTypes.RATE_RESPONSE_SUCCEED:
    case communityTypes.RATE_RESPONSE_FAILURE:
    case communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_SUCCEED:
    case communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_FAILED:
    case communityTypes.RESPONSE_ISSUE_DIRECT_SUCCEED:
    case communityTypes.RESPONSE_ISSUE_DIRECT_FAILURE:
    case communityTypes.GET_ISSUE_BY_ID_SUCCEED:
    case communityTypes.GET_ISSUE_BY_ID_FAILURE:
      return { ...state, isLoading: false };
    // EVENTS
    case eventsTypes.ALL_EVENTS_REQUESTED:
    case eventsTypes.MINE_EVENTS_REQUESTED:
    case eventsTypes.ATTACH_EVENT_REQUESTED:
    case eventsTypes.DETACH_EVENT_REQUESTED:
    case eventsTypes.DROP_DOWN_EVENT_REQUESTED:
      return { ...state, isLoading: true };
    case eventsTypes.ALL_EVENTS_SUCCEED:
    case eventsTypes.ALL_EVENTS_SUCCEED_PAGINATION:
    case eventsTypes.ALL_EVENTS_FAILED:
    case eventsTypes.MINE_EVENTS_SUCCEED:
    case eventsTypes.MINE_EVENTS_SUCCEED_PAGINATION:
    case eventsTypes.MINE_EVENTS_FAILED:
    case eventsTypes.ATTACH_EVENT_SUCCEED:
    case eventsTypes.ATTACH_EVENT_FAILURE:
    case eventsTypes.DETACH_EVENT_SUCCEED:
    case eventsTypes.DETACH_EVENT_FAILURE:
    case eventsTypes.DROP_DOWN_EVENT_SUCCEED:
    case eventsTypes.DROP_DOWN_EVENT_FAILED:
      return { ...state, isLoading: false };
    // HOME
    case homeTypes.OWN_REQUESTS_REQUESTED:
    case homeTypes.CREATE_FEATURE_REQUEST_REQUESTED:
      return { ...state, isLoading: true };
    case homeTypes.OWN_REQUESTS_SUCCEED:
    case homeTypes.OWN_REQUESTS_SUCCEED_PAGINATION:
    case homeTypes.OWN_REQUESTS_FAILED:
    case homeTypes.CREATE_FEATURE_REQUEST_SUCCEED:
    case homeTypes.CREATE_FEATURE_REQUEST_FAILURE:
      return { ...state, isLoading: false };
    // OPPORTUNITIES
    case opportunitiesTypes.ALL_OPPORTUNITIES_REQUESTED:
    case opportunitiesTypes.MINE_OPPORTUNITIES_REQUESTED:
    case opportunitiesTypes.ATTACH_OPPORTUNITY_REQUESTED:
    case opportunitiesTypes.DETACH_OPPORTUNITY_REQUESTED:
    case opportunitiesTypes.GET_ALL_USERS_ALERTS_REQUESTED:
    case opportunitiesTypes.DROP_DOWN_OPPORTUNITY_REQUESTED:
    case opportunitiesTypes.CREATE_ALERT_OPPORTUNITY_REQUESTED:
    case opportunitiesTypes.GET_ALERT_RESPOND_BY_ID_REQUESTED:
      return { ...state, isLoading: true };
    case opportunitiesTypes.ALL_OPPORTUNITIES_SUCCEED:
    case opportunitiesTypes.ALL_OPPORTUNITIES_SUCCEED_PAGINATION:
    case opportunitiesTypes.ALL_OPPORTUNITIES_FAILURE:
    case opportunitiesTypes.MINE_OPPORTUNITIES_SUCCEED:
    case opportunitiesTypes.MINE_OPPORTUNITIES_SUCCEED_PAGINATION:
    case opportunitiesTypes.MINE_OPPORTUNITIES_FAILURE:
    case opportunitiesTypes.ATTACH_OPPORTUNITY_SUCCEED:
    case opportunitiesTypes.ATTACH_OPPORTUNITY_FAILURE:
    case opportunitiesTypes.DETACH_OPPORTUNITY_SUCCEED:
    case opportunitiesTypes.DETACH_OPPORTUNITY_FAILURE:
    case opportunitiesTypes.GET_ALL_USERS_ALERTS_SUCCEED:
    case opportunitiesTypes.GET_ALL_USERS_ALERTS_SUCCEED_PAGINATION:
    case opportunitiesTypes.GET_ALL_USERS_ALERTS_FAILURE:
    case opportunitiesTypes.DROP_DOWN_OPPORTUNITY_SUCCEED:
    case opportunitiesTypes.DROP_DOWN_OPPORTUNITY_FAILED:
    case opportunitiesTypes.CREATE_ALERT_OPPORTUNITY_SUCCEED:
    case opportunitiesTypes.CREATE_ALERT_OPPORTUNITY_FAILURE:
    case opportunitiesTypes.GET_ALERT_RESPOND_BY_ID_SUCCEED:
    case opportunitiesTypes.GET_ALERT_RESPOND_BY_ID_FAILURE:
      return { ...state, isLoading: false };
    // PROFILE
    case profileTypes.PROFILE_REQUESTED:
    case profileTypes.UPDATE_PROFILE_REQUESTED:
      return { ...state, isLoading: true };
    case profileTypes.PROFILE_SUCCEED:
    case profileTypes.PROFILE_FAILURE:
    case profileTypes.UPDATE_PROFILE_SUCCEED:
    case profileTypes.UPDATE_PROFILE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default globalReducer;
