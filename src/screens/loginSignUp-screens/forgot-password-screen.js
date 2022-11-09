import React from 'react';
import {
  Text, View, StyleSheet, useWindowDimensions,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Input from '../../components/input/input';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import routes from '../../routes';
import useForgotPasswordFormik from '../../hooks/useForgotPasswordFormik/useForgotPasswordFormik';

const ForgotPasswordScreen = ({ navigation }) => {
  // styles
  const { width, height } = useWindowDimensions();
  const stylesTextContainer = { ...styles.textContainer, flexDirection: width > height ? 'row' : 'column' };

  const handleNavigateLogin = () => navigation.navigate(routes.loginSingUp.login);
  const handleRedirectVerification = () => navigation.navigate(routes.loginSingUp.resetPasswordVerification);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useForgotPasswordFormik(handleRedirectVerification);

  return (
    <ScreenContainer>
      <ScreenTitle title="Forgot Password?" />
      <View style={stylesTextContainer}>
        <Text style={styles.forgotText}>
          Send us your email than check your inbox
          {' '}
          {' '}
        </Text>
        <Text style={styles.forgotText}>to continue</Text>
      </View>
      <Input
        value={values.email}
        setValue={handleChange('email')}
        error={errors.email}
        placeholder="Email"
        inputTitle="Email"
        containerStyles={styles.inputContainer}
      />
      <UiBtn text="Send" btnStyles={styles.sendBtn} onPress={handleSubmit} disabled={!values.email} />
      <UiBtn text="Cancel" btnStyles={styles.cancelBtn} textStyles={styles.cancelBtnText} onPress={handleNavigateLogin} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 30,
  },
  forgotText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
  },
  sendBtn: {
    marginBottom: 10,
  },
  cancelBtn: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryActive,
    borderWidth: 1,
  },
  cancelBtnText: {
    color: colors.primaryActive,
  },
  inputContainer: {
    marginBottom: 32,
  },
});

export default ForgotPasswordScreen;
