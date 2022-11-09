export const getIssues = (state) => state.community.issues;
export const getCategories = (state) => state.community.categories;
export const getResponds = (state) => state.community.responds;
export const getSelectedCategory = (state) => state.community.categories.find((item) => item.isSelected);
export const getSelectedCategoryId = (state) => state.community.selectedCategoryId;
export const getCreateIssueError = (state) => state.community.createIssueError;
export const getResponseIssueDirectError = (state) => state.community.responseDirectError;
export const getSelectedIssue = (state) => state.community.selectedIssue;
export const getActualRateAfterRating = (state) => state.community.actualRateAfterRating;
