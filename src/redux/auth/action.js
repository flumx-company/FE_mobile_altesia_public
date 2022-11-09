import types from './types';

// LOGIN
export const loginRequested = (email, password) => ({
  type: types.LOGIN_REQUESTED,
  payload: {
    email,
    password,
  },
});

export const loginSucceed = (token) => ({
  type: types.LOGIN_SUCCEED,
  payload: {
    token,
  },
});

export const loginFailed = (error) => ({
  type: types.LOGIN_FAILED,
  payload: {
    error,
  },
});

export const agreeTermsCondition = () => ({
  type: types.AGREE_TERMS_CONDITIONS,
});

// REGISTER
export const registerRequested = (country,
  phoneNumber,
  degree,
  experience,
  firstName,
  lastName,
  email,
  password,
  redirect) => ({
  type: types.REGISTRATION_REQUESTED,
  payload: {
    country,
    phoneNumber,
    degree,
    experience,
    firstName,
    lastName,
    email,
    password,
    redirect,
  },
});

export const registerSucceed = (email) => ({
  type: types.REGISTRATION_SUCCEED,
  payload: {
    email,
  },
});

export const registerFailed = (error) => ({
  type: types.REGISTRATION_FAILED,
  payload: {
    error,
  },
});

// CONFIRMATION EMAIL
export const confirmEmailRequested = (code, redirect) => ({
  type: types.CONFIRM_EMAIL_REQUESTED,
  payload: {
    code,
    redirect,
  },
});

export const confirmEmailSucceed = (token) => ({
  type: types.CONFIRM_EMAIL_SUCCEED,
  payload: {
    token,
  },
});

export const confirmEmailFailed = (error) => ({
  type: types.CONFIRM_EMAIL_FAILED,
  payload: {
    error,
  },
});

// RE SEND CONFIRMATION CODE
export const reSendConfirmationRequested = () => ({
  type: types.RE_SEND_CONFIRMATION_REQUESTED,
});

export const reSendConfirmationSucceed = (code) => ({
  type: types.RE_SEND_CONFIRMATION_SUCCEED,
  payload: {
    code,
  },
});

export const reSendConfirmationFailed = (error) => ({
  type: types.RE_SEND_CONFIRMATION_FAILED,
  payload: {
    error,
  },
});

// RESET PASSWORD

export const resetPasswordRequested = (email, redirect) => ({
  type: types.RESET_PASSWORD_REQUESTED,
  payload: {
    email,
    redirect,
  },
});

export const resetPasswordSucceed = (email) => ({
  type: types.RESET_PASSWORD_SUCCEED,
  payload: {
    email,
  },
});

export const resetPasswordFailed = (error) => ({
  type: types.RESET_PASSWORD_FAILED,
  payload: {
    error,
  },
});

export const verifyResetPasswordRequested = (token, email, redirect) => ({
  type: types.VERIFY_RESET_PASSWORD_REQUESTED,
  payload: {
    token,
    email,
    redirect,
  },
});

export const verifyResetPasswordSucceed = (code) => ({
  type: types.VERIFY_RESET_PASSWORD_SUCCEED,
  payload: {
    code,
  },
});

export const verifyResetPasswordFailed = (err) => ({
  type: types.VERIFY_RESET_PASSWORD_FAILED,
  payload: {
    err,
  },
});

export const completeResetPasswordRequested = (email, token, password, redirect) => ({
  type: types.RESET_PASSWORD_COMPLETE_REQUESTED,
  payload: {
    email,
    token,
    password,
    redirect,
  },
});

export const completeResetPasswordSucceed = (email, token, password) => ({
  type: types.RESET_PASSWORD_COMPLETE_SUCCEED,
  payload: {
    email,
    token,
    password,
  },
});

export const completeResetPasswordFailed = (err) => ({
  type: types.RESET_PASSWORD_COMPLETE_FAILED,
  payload: {
    err,
  },
});

export const userStatusRequested = () => ({
  type: types.USER_STATUS_REQUESTED,
});

export const userStatusSucceed = (status) => ({
  type: types.USER_STATUS_SUCCEED,
  payload: {
    status,
  },
});

export const userStatusFailed = (err) => ({
  type: types.USER_STATUS_FAILED,
  payload: {
    err,
  },
});

export const putProfileRequested = (redirect) => ({
  type: types.PUT_PROFILE_REQUESTED,
  payload: {
    redirect,
  },
});

export const putProfileSucceed = (token) => ({
  type: types.PUT_PROFILE_SUCCEED,
  payload: {
    token,
  },
});

export const clearFilledProfile = () => ({
  type: types.CLEAR_FILLED_PROFILE,
});
