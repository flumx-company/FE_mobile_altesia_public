import React from 'react';
import {
  Text, StyleSheet,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Input from '../../components/input/input';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import routes from '../../routes';
import useResetPasswordFormik from '../../hooks/useResetPasswordFormik/useResetPasswordFormik';

const ResetPasswordComplete = ({ navigation }) => {
  const handleNavigateLogin = () => navigation.navigate(routes.loginSingUp.login);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useResetPasswordFormik(handleNavigateLogin);

  return (
    <ScreenContainer>
      <ScreenTitle title="New Password" />
      <Text style={styles.forgotText}>
        Create a new login password
      </Text>
      <Input
        value={values.password}
        setValue={handleChange('password')}
        inputTitle="New password"
        containerStyles={styles.inputContainer}
        isSecure
        passwordError={errors.password}
      />
      <Input
        value={values.passwordConfirmation}
        setValue={handleChange('passwordConfirmation')}
        inputTitle="Repeat password"
        containerStyles={styles.inputContainer}
        isSecure
        error={errors.passwordConfirmation}
      />
      <UiBtn text="Save" btnStyles={styles.sendBtn} onPress={handleSubmit} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: 'center',
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
  },
  sendBtn: {
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 32,
  },
});

export default ResetPasswordComplete;
