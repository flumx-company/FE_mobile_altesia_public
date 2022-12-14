const communityTypes = {
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  SELECT_QUESTION: 'SELECT_QUESTION',
  ALL_CATEGORIES_REQUESTED: 'ALL_CATEGORIES_REQUESTED',
  ALL_CATEGORIES_SUCCEED: 'ALL_CATEGORIES_SUCCEED',
  ALL_CATEGORIES_FAILURE: 'ALL_CATEGORIES_FAILURE',
  // GET QUESTIONS BY COMMUNITY ID
  QUESTIONS_BY_CATEGORY_ID_REQUESTED: 'QUESTIONS_BY_CATEGORY_ID_REQUESTED',
  QUESTIONS_BY_CATEGORY_ID_SUCCEED: 'QUESTIONS_BY_CATEGORY_ID_SUCCEED',
  QUESTIONS_BY_CATEGORY_ID_SUCCEED_PAGINATION: 'QUESTIONS_BY_CATEGORY_ID_SUCCEED_PAGINATION',
  QUESTIONS_BY_CATEGORY_ID_FAILED: 'QUESTIONS_BY_CATEGORY_ID_FAILED',
  // GET ISSUE BY ID
  GET_ISSUE_BY_ID_REQUESTED: 'GET_ISSUE_BY_ID_REQUESTED',
  GET_ISSUE_BY_ID_SUCCEED: 'GET_ISSUE_BY_ID_SUCCEED',
  GET_ISSUE_BY_ID_FAILURE: 'GET_ISSUE_BY_ID_FAILURE',
  // GET RESPONSES BY QUESTION ID
  RESPONSES_BY_QUESTION_ID_REQUESTED: 'RESPONSES_BY_QUESTION_ID_REQUESTED',
  RESPONSES_BY_QUESTION_ID_SUCCEED: 'RESPONSES_BY_QUESTION_ID_SUCCEED',
  RESPONSES_BY_QUESTION_ID_SUCCEED_PAGINATION: 'RESPONSES_BY_QUESTION_ID_SUCCEED_PAGINATION',
  RESPONSES_BY_QUESTION_ID_FAILURE: 'RESPONSES_BY_QUESTION_ID_FAILURE',
  // RATE RESPONDS
  RATE_RESPONSE_REQUESTED: 'RATE_RESPONSE_REQUESTED',
  RATE_RESPONSE_SUCCEED: 'RATE_RESPONSE_SUCCEED',
  RATE_RESPONSE_FAILURE: 'RATE_RESPONSE_FAILURE',
  // CREATE COMMUNITY QUESTION BY ID
  CREATE_COMMUNITY_ISSUE_BY_ID_REQUESTED: 'CREATE_COMMUNITY_ISSUE_BY_ID_REQUESTED',
  CREATE_COMMUNITY_ISSUE_BY_ID_SUCCEED: 'CREATE_COMMUNITY_ISSUE_BY_ID_SUCCEED',
  CREATE_COMMUNITY_ISSUE_BY_ID_FAILED: 'CREATE_COMMUNITY_ISSUE_BY_ID_FAILED',
  // RESPONSE BY ISSUE ID DIRECT
  RESPONSE_ISSUE_DIRECT_REQUESTED: 'RESPONSE_ISSUE_DIRECT_REQUESTED',
  RESPONSE_ISSUE_DIRECT_SUCCEED: 'RESPONSE_ISSUE_DIRECT_SUCCEED',
  RESPONSE_ISSUE_DIRECT_FAILURE: 'RESPONSE_ISSUE_DIRECT_FAILURE',
};

export default communityTypes;
