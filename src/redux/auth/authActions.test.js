import {
  agreeTermsCondition, completeResetPasswordFailed, completeResetPasswordRequested, completeResetPasswordSucceed, confirmEmailFailed, confirmEmailRequested, confirmEmailSucceed, loginFailed, loginRequested, loginSucceed, putProfileRequested, putProfileSucceed, registerFailed, registerRequested, registerSucceed, reSendConfirmationFailed, reSendConfirmationRequested, reSendConfirmationSucceed, resetPasswordFailed, resetPasswordRequested, resetPasswordSucceed, userStatusFailed, userStatusRequested, userStatusSucceed, verifyResetPasswordFailed, verifyResetPasswordRequested, verifyResetPasswordSucceed,
} from './action';
import types from './types';

describe('auth actions', () => {
// LOGIN
  it('loginRequested', () => {
    expect(loginRequested('email', 'password')).toEqual({
      type: types.LOGIN_REQUESTED,
      payload: { email: 'email', password: 'password' },
    });
  });

  it('loginSucceed', () => {
    expect(loginSucceed(123)).toEqual({
      type: types.LOGIN_SUCCEED,
      payload: { token: 123 },
    });
  });

  it('loginFailed', () => {
    expect(loginFailed(123)).toEqual({
      type: types.LOGIN_FAILED,
      payload: { error: 123 },
    });
  });

  it('agreeTermsCondition', () => {
    expect(agreeTermsCondition()).toEqual({
      type: types.AGREE_TERMS_CONDITIONS,
    });
  });
  // REGISTER
  it('registerRequested', () => {
    expect(registerRequested('USA',
      '+1',
      'master',
      'experience',
      'expertise',
      'Tom',
      'Tom Hanks',
      'Tom@gmail.com',
      1234,
      'redirect')).toEqual({
      type: types.REGISTRATION_REQUESTED,
      payload: {
        country: 'USA',
        phoneNumber: '+1',
        degree: 'master',
        experience: 'experience',
        expertise: 'expertise',
        firstName: 'Tom',
        lastName: 'Tom Hanks',
        email: 'Tom@gmail.com',
        password: 1234,
        redirect: 'redirect',

      },
    });
  });

  it('registerSucceed', () => {
    expect(registerSucceed('Tom@gmail.com')).toEqual({
      type: types.REGISTRATION_SUCCEED,
      payload: { email: 'Tom@gmail.com' },
    });
  });

  it('registerFailed', () => {
    expect(registerFailed(123)).toEqual({
      type: types.REGISTRATION_FAILED,
      payload: { error: 123 },
    });
  });
  // CONFIRM EMAIL
  it('confirmEmailRequested', () => {
    expect(confirmEmailRequested(123, 123)).toEqual({
      type: types.CONFIRM_EMAIL_REQUESTED,
      payload: { code: 123, redirect: 123 },
    });
  });

  it('confirmEmailSucceed', () => {
    expect(confirmEmailSucceed(123)).toEqual({
      type: types.CONFIRM_EMAIL_SUCCEED,
      payload: { token: 123 },
    });
  });

  it('confirmEmailFailed', () => {
    expect(confirmEmailFailed(123)).toEqual({
      type: types.CONFIRM_EMAIL_FAILED,
      payload: { error: 123 },
    });
  });
  // RE SEND CONFIRMATION CODE
  it('reSendConfirmationRequested', () => {
    expect(reSendConfirmationRequested()).toEqual({
      type: types.RE_SEND_CONFIRMATION_REQUESTED,
    });
  });

  it('reSendConfirmationSucceed', () => {
    expect(reSendConfirmationSucceed(123)).toEqual({
      type: types.RE_SEND_CONFIRMATION_SUCCEED,
      payload: { code: 123 },
    });
  });

  it('reSendConfirmationFailed', () => {
    expect(reSendConfirmationFailed(123)).toEqual({
      type: types.RE_SEND_CONFIRMATION_FAILED,
      payload: { error: 123 },
    });
  });
  // RESET PASSWORD
  it('resetPasswordRequested', () => {
    expect(resetPasswordRequested(123, 123)).toEqual({
      type: types.RESET_PASSWORD_REQUESTED,
      payload: {
        email: 123,
        redirect: 123,
      },
    });
  });

  it('resetPasswordSucceed', () => {
    expect(resetPasswordSucceed('Tom@gmail.com')).toEqual({
      type: types.RESET_PASSWORD_SUCCEED,
      payload: { email: 'Tom@gmail.com' },
    });
  });

  it('resetPasswordFailed', () => {
    expect(resetPasswordFailed(123)).toEqual({
      type: types.RESET_PASSWORD_FAILED,
      payload: { error: 123 },
    });
  });

  // VERIFY RESET PASSWORD
  it('verifyResetPasswordRequested', () => {
    expect(verifyResetPasswordRequested(123, 'Tom@gmail.com', 123)).toEqual({
      type: types.VERIFY_RESET_PASSWORD_REQUESTED,
      payload: {
        token: 123,
        email: 'Tom@gmail.com',
        redirect: 123,
      },
    });
  });

  it('verifyResetPasswordSucceed', () => {
    expect(verifyResetPasswordSucceed(123)).toEqual({
      type: types.VERIFY_RESET_PASSWORD_SUCCEED,
      payload: { code: 123 },
    });
  });

  it('verifyResetPasswordFailed', () => {
    expect(verifyResetPasswordFailed(123)).toEqual({
      type: types.VERIFY_RESET_PASSWORD_FAILED,
      payload: { err: 123 },
    });
  });
  // COMPLETE RESET PASSWORD
  it('completeResetPasswordRequested', () => {
    expect(completeResetPasswordRequested('Tom@gmail.com', 123, 123, 123)).toEqual({
      type: types.RESET_PASSWORD_COMPLETE_REQUESTED,
      payload: {
        token: 123,
        email: 'Tom@gmail.com',
        password: 123,
        redirect: 123,
      },
    });
  });

  it('completeResetPasswordSucceed', () => {
    expect(completeResetPasswordSucceed('Tom@gmail.com', 123, 123)).toEqual({
      type: types.RESET_PASSWORD_COMPLETE_SUCCEED,
      payload: {
        email: 'Tom@gmail.com',
        token: 123,
        password: 123,
      },
    });
  });

  it('completeResetPasswordFailed', () => {
    expect(completeResetPasswordFailed(123)).toEqual({
      type: types.RESET_PASSWORD_COMPLETE_FAILED,
      payload: { err: 123 },
    });
  });
  // USER STATUS
  it('userStatusRequested', () => {
    expect(userStatusRequested()).toEqual({
      type: types.USER_STATUS_REQUESTED,
    });
  });

  it('userStatusSucceed', () => {
    expect(userStatusSucceed(123)).toEqual({
      type: types.USER_STATUS_SUCCEED,
      payload: {
        status: 123,
      },
    });
  });

  it('userStatusFailed', () => {
    expect(userStatusFailed(123)).toEqual({
      type: types.USER_STATUS_FAILED,
      payload: { err: 123 },
    });
  });

  // PUT PROFILE
  it('putProfileRequested', () => {
    expect(putProfileRequested(123)).toEqual({
      type: types.PUT_PROFILE_REQUESTED,
      payload: {
        redirect: 123,
      },
    });
  });

  it('putProfileSucceed', () => {
    expect(putProfileSucceed(123)).toEqual({
      type: types.PUT_PROFILE_SUCCEED,
      payload: {
        token: 123,
      },
    });
  });
});
