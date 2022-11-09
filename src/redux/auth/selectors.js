export const getToken = (state) => state.auth.token;
export const getLoginError = (state) => state.auth.loginError;
export const getRegisterError = (state) => state.auth.registerError;
export const getAgreedTermsConditions = (state) => state.auth.isAgreedTermsConditions;

export const getConfirmedToken = (state) => state.auth.confirmedToken;
export const getRegisterToken = (state) => state.auth.registerToken;
export const getRegistrationEmail = (state) => state.auth.registerEmail;
export const getConfirmationError = (state) => state.auth.confirmationError;
export const getResetPasswordError = (state) => state.auth.resetPasswordError;

export const getResetPasswordEmail = (state) => state.auth.resetPasswordEmail;
export const getVerifyCode = (state) => state.auth.verifyCode;
export const getUserStatus = (state) => state.auth.userStatus;
