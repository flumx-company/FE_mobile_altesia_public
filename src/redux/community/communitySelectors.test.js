import {
  getActualRateAfterRating, getCategories, getCreateIssueError, getIssues, getResponds, getResponseIssueDirectError, getSelectedCategoryId, getSelectedIssue,
} from './selectors';

describe('community selectors', () => {
  const state = {
    community: {
      issues: 'issues',
      categories: 'categories',
      responds: 'responds',
      selectedCategoryId: 123,
      createIssueError: 'error',
      responseDirectError: 'error',
      selectedIssue: 'selectedIssue',
      actualRateAfterRating: {
        rate: 5,
        idResponse: 123,
      },
    },
  };

  it('getIssues', () => {
    expect(getIssues(state)).toEqual('issues');
  });

  it('getCategories', () => {
    expect(getCategories(state)).toEqual('categories');
  });

  it('getResponds', () => {
    expect(getResponds(state)).toEqual('responds');
  });

  it('getSelectedCategoryId', () => {
    expect(getSelectedCategoryId(state)).toEqual(123);
  });

  it('getCreateIssueError', () => {
    expect(getCreateIssueError(state)).toEqual('error');
  });

  it('getResponseIssueDirectError', () => {
    expect(getResponseIssueDirectError(state)).toEqual('error');
  });

  it('getSelectedIssue', () => {
    expect(getSelectedIssue(state)).toEqual('selectedIssue');
  });

  it('getActualRateAfterRating', () => {
    expect(getActualRateAfterRating(state)).toEqual({
      rate: 5,
      idResponse: 123,
    });
  });
});
