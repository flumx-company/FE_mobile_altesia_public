import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import RegisterScreen from '../screens/loginSignUp-screens/register-screen';
import LoginScreen from '../screens/loginSignUp-screens/login-screen';
import ForgotPasswordScreen from '../screens/loginSignUp-screens/forgot-password-screen';
import TermsScreen from '../screens/loginSignUp-screens/terms-screen';
import routes from '../routes';
import VerificationScreen from '../screens/loginSignUp-screens/verification-screen';
import FillingProfileFirstStep from '../screens/loginSignUp-screens/filling-profile-first-step';
import FillingProfileSecondStep from '../screens/loginSignUp-screens/filling-profile-second-step';
import FillingProfileThirdStep from '../screens/loginSignUp-screens/filling-profile-third-step';
import FillingProfileLastStep from '../screens/loginSignUp-screens/filling-prolife-last-step';
import ResetPasswordVerification from '../screens/loginSignUp-screens/reset-password-verification';
import ResetPasswordComplete from '../screens/loginSignUp-screens/reset-password-complete';
import ThankYou from '../screens/loginSignUp-screens/thank-you';
import { getRegisterToken } from '../redux/auth/selectors';
import useGetRegisterTokenFromStorage from '../hooks/useGetRegisterTokenFromStorage/useGetTokenFromStorage';

const LoginRouting = () => {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  const registerToken = useSelector(getRegisterToken);

  useGetRegisterTokenFromStorage();

  return registerToken
    ? (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={routes.loginSingUp.thankYou} component={ThankYou} />
      </Stack.Navigator>
    )
    : (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={routes.loginSingUp.login} component={LoginScreen} />
        <Stack.Screen name={routes.loginSingUp.register} component={RegisterScreen} />
        <Stack.Screen name={routes.loginSingUp.forgotPassword} component={ForgotPasswordScreen} />
        <Stack.Screen name={routes.loginSingUp.resetPasswordVerification} component={ResetPasswordVerification} />
        <Stack.Screen name={routes.loginSingUp.resetPasswordNewPassword} component={ResetPasswordComplete} />
        <Stack.Screen name={routes.loginSingUp.terms} component={TermsScreen} />
        <Stack.Screen name={routes.loginSingUp.fillingProfileFirstStep} component={FillingProfileFirstStep} />
        <Stack.Screen name={routes.loginSingUp.fillingProfileLastStep} component={FillingProfileLastStep} />
        <Stack.Screen name={routes.loginSingUp.fillingProfileThirdStep} component={FillingProfileThirdStep} />
        <Stack.Screen name={routes.loginSingUp.fillingProfileSecondStep} component={FillingProfileSecondStep} />
        <Stack.Screen name={routes.loginSingUp.thankYou} component={ThankYou} />
        <Stack.Screen name={routes.loginSingUp.verification} component={VerificationScreen} />
      </Stack.Navigator>
    );
};

export default LoginRouting;
