import communityTypes from './types';

const initialState = {
  issues: [],
  categories: [],
  responds: [],
  selectedCategoryId: null,
  selectedQuestionId: null,
  createIssueError: null,
  responseDirectError: null,
  selectedIssue: {},
  actualRateAfterRating: {
    rate: null,
    idResponse: null,
    idRate: null,
  },
};

const getAllCategories = (state, payload) => {
  const categories = payload.categories.map((el) => ({ ...el, isSelected: false }));
  const allCategories = {
    id: 'all',
    isSelected: false,
    name: 'All',
  };
  return { ...state, categories: [allCategories, ...categories] };
};

const communityReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case communityTypes.SELECT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((item) => {
          if (item.id === payload.id) {
            return { ...item, isSelected: true };
          }
          return { ...item, isSelected: false };
        }),
        selectedCategoryId: payload.id,
      };
    case communityTypes.ALL_CATEGORIES_SUCCEED:
      return getAllCategories(state, payload);
    case communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED:
      return { ...state, issues: payload.questions };
    case communityTypes.QUESTIONS_BY_CATEGORY_ID_SUCCEED_PAGINATION:
      return { ...state, issues: [...state.issues, ...payload.questions] };
    case communityTypes.SELECT_QUESTION:
      return { ...state, selectedQuestionId: payload.id };
    case communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED:
      return { ...state, responds: payload.responds };
    case communityTypes.RESPONSES_BY_QUESTION_ID_SUCCEED_PAGINATION:
      return { ...state, responds: [...state.responds, ...payload.responds] };
    case communityTypes.CREATE_COMMUNITY_ISSUE_BY_ID_FAILED:
      return { ...state, createIssueError: payload.error };
    case communityTypes.RESPONSE_ISSUE_DIRECT_FAILURE:
      return { ...state, responseDirectError: payload.error };
    case communityTypes.RATE_RESPONSE_SUCCEED:
      return { ...state, actualRateAfterRating: { rate: payload.rate, idResponse: payload.idResponse, idRate: payload.idRate } };
    case communityTypes.GET_ISSUE_BY_ID_SUCCEED:
      return { ...state, selectedIssue: payload.issue };
    default:
      return state;
  }
};

export default communityReducer;
