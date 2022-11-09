import communityTypes from './types';

export const selectCategoryAction = (id) => ({
  type: communityTypes.SELECT_CATEGORY,
  payload: {
    id,
  },
});

export const allCategoriesRequested = () => ({
  type: communityTypes.ALL_CATEGORIES_REQUESTED,
});

export const allCategoriesSucceed = (categories) => ({
  type: communityTypes.ALL_CATEGORIES_SUCCEED,
  payload: {
    categories,
  },
});

export const allCategoriesFailure = () => ({
  type: communityTypes.ALL_CATEGORIES_FAILURE,
});

// GET QUESTIONS BY COMMUNITY CATEGORY

export const questionsByCategoryIdRequested = (id, page, whose) => ({
  type: communityTypes.QUESTIONS_BY_CATEGORY_ID_REQUESTED,
  payload: {
    id,
    page,
    whose,
  },
});

export const questionsByCategoryIdSucceed = (questions) => ({
  type: communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED,
  payload: {
    questions,
  },
});

export const questionsByCategoryIdSucceedPagination = (questions) => ({
  type: communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED_PAGINATION,
  payload: {
    questions,
  },
});

export const questionsByCategoryIdFailure = () => ({
  type: communityTypes.QUESTIONS_BY_CATEGORY_ID_FAILED,
});

// GET RESPONSES BY QUESTION ID
export const responsesByQuestionIdRequested = (id, page = 1, responseType = 'all', newest = null, oldest = null, lowestRate = null, highestRate = null) => ({
  type: communityTypes.RESPONSES_BY_QUESTION_ID_REQUESTED,
  payload: {
    id,
    page,
    responseType,
    newest,
    oldest,
    lowestRate,
    highestRate,
  },
});

export const responsesByQuestionIdSucceed = (responds) => ({
  type: communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED,
  payload: {
    responds,
  },
});

export const responsesByQuestionIdSucceedPagination = (responds) => ({
  type: communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED_PAGINATION,
  payload: {
    responds,
  },
});

export const responsesByQuestionIdFailure = () => ({
  type: communityTypes.RESPONSES_BY_QUESTION_ID_FAILURE,
});

// RATE RESPONSE BY ID

export const rateResponseByIdRequested = (idResponse, idUserRate, rate, isRated) => ({
  type: communityTypes.RATE_RESPONSE_REQUESTED,
  payload: {
    idResponse,
    idUserRate,
    rate,
    isRated,
  },
});

export const rateResponseByIdSucceed = (rate, idResponse, idRate) => ({
  type: communityTypes.RATE_RESPONSE_SUCCEED,
  payload: {
    rate,
    idResponse,
    idRate,
  },
});

export const rateResponseByIdFailed = (err) => ({
  type: communityTypes.RATE_RESPONSE_FAILURE,
  payload: {
    err,
  },
});

// CREATE COMMUNITY ISSUE BY ID

export const createCommunityIssueRequested = (id, title, description, attachments, handleRedirect) => ({
  type: communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_REQUESTED,
  payload: {
    id,
    title,
    description,
    attachments,
    handleRedirect,
  },
});

export const createCommunityIssueSucceed = () => ({
  type: communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_SUCCEED,
});

export const createCommunityIssueFailed = (error) => ({
  type: communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_FAILED,
  payload: {
    error,
  },
});

// CREATE COMMUNITY ISSUE BY ID

export const responseIssueDirectRequested = (id, description, responseType, attachments, handleRedirect) => ({
  type: communityTypes.RESPONSE_ISSUE_DIRECT_REQUESTED,
  payload: {
    id,
    description,
    responseType,
    attachments,
    handleRedirect,
  },
});

export const responseIssueDirectSucceed = () => ({
  type: communityTypes.RESPONSE_ISSUE_DIRECT_SUCCEED,
});

export const responseIssueDirectFailure = (error) => ({
  type: communityTypes.RESPONSE_ISSUE_DIRECT_FAILURE,
  payload: {
    error,
  },
});

// GET ISSUE BY ID

export const getIssueByIdRequested = (id) => ({
  type: communityTypes.GET_ISSUE_BY_ID_REQUESTED,
  payload: {
    id,
  },
});

export const getIssueByIdSucceed = (issue) => ({
  type: communityTypes.GET_ISSUE_BY_ID_SUCCEED,
  payload: {
    issue,
  },
});

export const getIssueByIdFailure = (err) => ({
  type: communityTypes.GET_ISSUE_BY_ID_FAILURE,
  payload: {
    err,
  },
});
