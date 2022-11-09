import {
  getAgreedTermsConditions, getConfirmationError, getConfirmedToken, getLoginError, getRegisterError, getRegisterToken, getRegistrationEmail, getResetPasswordEmail, getResetPasswordError, getToken, getUserStatus, getVerifyCode,
} from './selectors';

describe('auth selectors', () => {
  const state = {
    auth: {
      token: 123,
      loginError: 'error',
      registerError: 'registerError',
      isAgreedTermsConditions: 123,
      resetPasswordEmail: 'Tom@gmail.com',
      resetPasswordError: 'resetError',
      verifyCode: 123,
      verifyCodeError: 'verifyCode',
      registerEmail: 'Tom@gmail.com',
      confirmedToken: 123,
      registerToken: 123,
      confirmationError: 'errorConfirmation',
      userStatus: 'verified',
    },
  };

  it('getToken', () => {
    expect(getToken(state)).toEqual(123);
  });

  it('getLoginError', () => {
    expect(getLoginError(state)).toEqual('error');
  });

  it('getRegisterError', () => {
    expect(getRegisterError(state)).toEqual('registerError');
  });

  it('getAgreedTermsConditions', () => {
    expect(getAgreedTermsConditions(state)).toEqual(123);
  });

  it('getConfirmedToken', () => {
    expect(getConfirmedToken(state)).toEqual(123);
  });

  it('getRegisterToken', () => {
    expect(getRegisterToken(state)).toEqual(123);
  });

  it('getRegistrationEmail', () => {
    expect(getRegistrationEmail(state)).toEqual('Tom@gmail.com');
  });

  it('getConfirmationError', () => {
    expect(getConfirmationError(state)).toEqual('errorConfirmation');
  });

  it('getResetPasswordError', () => {
    expect(getResetPasswordError(state)).toEqual('resetError');
  });

  it('getResetPasswordEmail', () => {
    expect(getResetPasswordEmail(state)).toEqual('Tom@gmail.com');
  });

  it('getVerifyCode', () => {
    expect(getVerifyCode(state)).toEqual(123);
  });

  it('getUserStatus', () => {
    expect(getUserStatus(state)).toEqual('verified');
  });
});
