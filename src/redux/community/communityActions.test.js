import {
  allCategoriesFailure, allCategoriesRequested, allCategoriesSucceed, createCommunityIssueFailed, createCommunityIssueRequested, createCommunityIssueSucceed, getIssueByIdFailure, getIssueByIdRequested, getIssueByIdSucceed, questionsByCategoryIdFailure, questionsByCategoryIdRequested, questionsByCategoryIdSucceed, questionsByCategoryIdSucceedPagination, rateResponseByIdFailed, rateResponseByIdRequested, rateResponseByIdSucceed, responseIssueDirectFailure, responseIssueDirectRequested, responseIssueDirectSucceed, responsesByQuestionIdFailure, responsesByQuestionIdRequested, responsesByQuestionIdSucceed, responsesByQuestionIdSucceedPagination,
} from './actions';
import communityTypes from './types';

describe('community actions', () => {
  it('allCategoriesRequested', () => {
    expect(allCategoriesRequested()).toEqual({
      type: communityTypes.ALL_CATEGORIES_REQUESTED,
    });
  });

  it('allCategoriesSucceed', () => {
    expect(allCategoriesSucceed(123)).toEqual({
      type: communityTypes.ALL_CATEGORIES_SUCCEED,
      payload: {
        categories: 123,
      },
    });
  });

  it('allCategoriesFailure', () => {
    expect(allCategoriesFailure()).toEqual({
      type: communityTypes.ALL_CATEGORIES_FAILURE,
    });
  });

  it('questionsByCategoryIdRequested', () => {
    expect(questionsByCategoryIdRequested(123, 1, 'mine')).toEqual({
      type: communityTypes.QUESTIONS_BY_CATEGORY_ID_REQUESTED,
      payload: {
        id: 123,
        page: 1,
        whose: 'mine',
      },
    });
  });

  it('questionsByCategoryIdSucceed', () => {
    expect(questionsByCategoryIdSucceed(123)).toEqual({
      type: communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED,
      payload: {
        questions: 123,
      },
    });
  });

  it('questionsByCategoryIdSucceedPagination', () => {
    expect(questionsByCategoryIdSucceedPagination(123)).toEqual({
      type: communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED_PAGINATION,
      payload: {
        questions: 123,
      },
    });
  });

  it('questionsByCategoryIdFailure', () => {
    expect(questionsByCategoryIdFailure()).toEqual({
      type: communityTypes.QUESTIONS_BY_CATEGORY_ID_FAILED,
    });
  });

  it('responsesByQuestionIdRequested', () => {
    expect(responsesByQuestionIdRequested(123, 1, 'all', 'newest', 'oldest', 'lowestRate', 'highestRate')).toEqual({
      type: communityTypes.RESPONSES_BY_QUESTION_ID_REQUESTED,
      payload: {
        id: 123,
        page: 1,
        responseType: 'all',
        newest: 'newest',
        oldest: 'oldest',
        lowestRate: 'lowestRate',
        highestRate: 'highestRate',
      },
    });
  });

  it('responsesByQuestionIdSucceed', () => {
    expect(responsesByQuestionIdSucceed(123)).toEqual({
      type: communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED,
      payload: {
        responds: 123,
      },
    });
  });

  it('responsesByQuestionIdSucceedPagination', () => {
    expect(responsesByQuestionIdSucceedPagination(123)).toEqual({
      type: communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED_PAGINATION,
      payload: {
        responds: 123,
      },
    });
  });

  it('responsesByQuestionIdFailure', () => {
    expect(responsesByQuestionIdFailure()).toEqual({
      type: communityTypes.RESPONSES_BY_QUESTION_ID_FAILURE,
    });
  });

  it('rateResponseByIdRequested', () => {
    expect(rateResponseByIdRequested(123, 123, 5, false)).toEqual({
      type: communityTypes.RATE_RESPONSE_REQUESTED,
      payload: {
        idResponse: 123,
        idUserRate: 123,
        rate: 5,
        isRated: false,
      },
    });
  });

  it('rateResponseByIdSucceed', () => {
    expect(rateResponseByIdSucceed(5, 123)).toEqual({
      type: communityTypes.RATE_RESPONSE_SUCCEED,
      payload: {
        rate: 5,
        idResponse: 123,
      },
    });
  });

  it('rateResponseByIdFailed', () => {
    expect(rateResponseByIdFailed(123)).toEqual({
      type: communityTypes.RATE_RESPONSE_FAILURE,
      payload: {
        err: 123,
      },
    });
  });

  it('createCommunityIssueRequested', () => {
    expect(createCommunityIssueRequested(123, 'title', 'description', 'attachments', 'handleRedirect')).toEqual({
      type: communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_REQUESTED,
      payload: {
        id: 123,
        title: 'title',
        description: 'description',
        attachments: 'attachments',
        handleRedirect: 'handleRedirect',
      },
    });
  });

  it('createCommunityIssueSucceed', () => {
    expect(createCommunityIssueSucceed()).toEqual({
      type: communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_SUCCEED,
    });
  });

  it('createCommunityIssueFailed', () => {
    expect(createCommunityIssueFailed(123)).toEqual({
      type: communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_FAILED,
      payload: {
        error: 123,
      },
    });
  });

  it('responseIssueDirectRequested', () => {
    expect(responseIssueDirectRequested(123, 'description', 'all', 'attachments', 'handleRedirect')).toEqual({
      type: communityTypes.RESPONSE_ISSUE_DIRECT_REQUESTED,
      payload: {
        id: 123,
        description: 'description',
        responseType: 'all',
        attachments: 'attachments',
        handleRedirect: 'handleRedirect',
      },
    });
  });

  it('responseIssueDirectSucceed', () => {
    expect(responseIssueDirectSucceed()).toEqual({
      type: communityTypes.RESPONSE_ISSUE_DIRECT_SUCCEED,
    });
  });

  it('responseIssueDirectFailure', () => {
    expect(responseIssueDirectFailure(123)).toEqual({
      type: communityTypes.RESPONSE_ISSUE_DIRECT_FAILURE,
      payload: {
        error: 123,
      },
    });
  });

  it('getIssueByIdRequested', () => {
    expect(getIssueByIdRequested(123)).toEqual({
      type: communityTypes.GET_ISSUE_BY_ID_REQUESTED,
      payload: {
        id: 123,
      },
    });
  });

  it('getIssueByIdSucceed', () => {
    expect(getIssueByIdSucceed(123)).toEqual({
      type: communityTypes.GET_ISSUE_BY_ID_SUCCEED,
      payload: {
        issue: 123,
      },
    });
  });

  it('getIssueByIdFailure', () => {
    expect(getIssueByIdFailure(123)).toEqual({
      type: communityTypes.GET_ISSUE_BY_ID_FAILURE,
      payload: {
        err: 123,
      },
    });
  });
});
