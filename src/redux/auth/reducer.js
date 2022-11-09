import types from './types';

const initialState = {
  token: false,
  loginError: null,
  registerError: null,
  isAgreedTermsConditions: false,
  resetPasswordEmail: null,
  resetPasswordError: null,
  verifyCode: null,
  verifyCodeError: null,
  registerEmail: null,
  confirmedToken: null,
  registerToken: null,
  confirmationError: null,
  userStatus: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTH:
      return { ...state, token: true };
    case types.LOGIN_SUCCEED:
      return { ...state, token: payload.token, loginError: null };
    case types.LOGIN_FAILED:
      return { ...state, loginError: payload.error };
    case types.REGISTRATION_FAILED:
      return { ...state, registerError: payload.error };
    case types.AGREE_TERMS_CONDITIONS:
      return { ...state, isAgreedTermsConditions: true };
      //
    case types.RESET_PASSWORD_SUCCEED:
      return { ...state, resetPasswordEmail: payload.email };
    case types.VERIFY_RESET_PASSWORD_SUCCEED:
      return { ...state, verifyCode: payload.code };
    case types.CONFIRM_EMAIL_SUCCEED:
      return { ...state, confirmedToken: payload.token };
    case types.USER_STATUS_SUCCEED:
      return { ...state, userStatus: payload.status };
    case types.PUT_PROFILE_SUCCEED:
      return { ...state, registerToken: payload.token };
    case types.REGISTRATION_SUCCEED:
      return { ...state, registerEmail: payload.email };
    case types.RE_SEND_CONFIRMATION_FAILED:
      return { ...state, confirmationError: payload.error };
    case types.RESET_PASSWORD_FAILED:
      return { ...state, resetPasswordError: payload.error };
    default:
      return state;
  }
};

export default authReducer;
