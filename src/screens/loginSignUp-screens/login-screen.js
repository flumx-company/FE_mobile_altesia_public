import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Image, useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Input from '../../components/input/input';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import routes from '../../routes';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import useLoginFormik from '../../hooks/useLoginFormik/useLoginFormik';
import { getLoginError } from '../../redux/auth/selectors';
import { loginFailed } from '../../redux/auth/action';

const LoginScreen = ({ navigation }) => {
  const error = useSelector(getLoginError);
  const dispatch = useDispatch();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useLoginFormik();

  useEffect(() => () => {
    dispatch(loginFailed(null));
  }, []);

  // styles
  const { width, height } = useWindowDimensions();
  const titleStyles = { marginBottom: width > height ? 10 : 33 };

  const handleNavigateRegister = () => navigation.navigate(routes.loginSingUp.register);
  const handleNavigateForgotPassword = () => navigation.navigate(routes.loginSingUp.forgotPassword);

  return (
    <ScreenContainer>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <ScreenTitle title="Login" titleStyles={titleStyles} />
      <Input
        value={values.email}
        setValue={handleChange('email')}
        placeholder="Email"
        inputTitle="Email"
        error={error || errors.email}
      />
      <Input
        value={values.password}
        setValue={handleChange('password')}
        placeholder="Password"
        inputTitle="Password"
        error={error}
        isShowTextError={false}
        isSecure
      />
      <TouchableOpacity style={styles.forgotContainer} onPress={handleNavigateForgotPassword}>
        <Text style={{ ...styles.forgotText, ...styles.linkText }}>Forgot password?</Text>
      </TouchableOpacity>
      <UiBtn
        text="Login"
        onPress={handleSubmit}
        disabled={Object.values(values).some((item) => !item)}
      />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Do you have an account?
          {' '}
        </Text>
        <TouchableOpacity onPress={handleNavigateRegister}>
          <Text style={{ ...styles.registerText, ...styles.linkText }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
  },
  forgotContainer: {
    marginBottom: 30,
  },
  forgotText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
