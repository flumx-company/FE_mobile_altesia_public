import React, { useEffect, useState } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Image, useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Input from '../../components/input/input';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import routes from '../../routes';
import {
  mockDegree, mockExperience, mockCountries,
} from './dataMock';
import useRegisterFormik from '../../hooks/useRegisterFormik/useRegisterFormik';
import { getAgreedTermsConditions, getRegisterError } from '../../redux/auth/selectors';
import { registerFailed } from '../../redux/auth/action';
import UiCustomSelect from '../../components/custom-select/ui-custom-select';

const RegisterScreen = ({ navigation }) => {
  const [country, setCountry] = useState(null);
  const [degree, setDegree] = useState(null);
  const [experience, setExperience] = useState(null);
  // const [expertise, setExpertise] = useState(null);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const [isShowDisagreeError, setIsShowDisagreeError] = useState(false);

  const dispatch = useDispatch();

  const registerError = useSelector(getRegisterError);
  const isAgree = useSelector(getAgreedTermsConditions);

  const handleRedirectToVerification = () => navigation.navigate(routes.loginSingUp.verification);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useRegisterFormik(handleRedirectToVerification);

  useEffect(() => () => {
    dispatch(registerFailed(null));
  }, []);

  useEffect(() => {
    if (isAgree) {
      setIsShowDisagreeError(false);
    }
  }, [isAgree]);

  if (isFocusedPhone) {
    if (values.phoneNumber.length === 0) {
      values.phoneNumber = '+';
    }
  }

  values.country = country;
  values.degree = degree;
  values.experience = experience;
  // values.expertise = expertise;

  const handleNavigateTerms = () => navigation.navigate(routes.loginSingUp.terms);
  const handleNavigateLogin = () => navigation.navigate(routes.loginSingUp.login);
  const handleShowDisagreeError = () => setIsShowDisagreeError(true);

  const getIsDisabled = () => {
    const isEmpty = Object.values(values).some((item) => !item);
    if (isEmpty) {
      return true;
    }
    return null;
  };

  // styles
  const { width, height } = useWindowDimensions();
  const titleStyles = { marginBottom: width > height ? 10 : 33 };
  const agreeContainerStyles = { flexDirection: width > height ? 'row' : 'column' };

  return (
    <ScreenContainer>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <ScreenTitle title="Register" titleStyles={titleStyles} />
      <Input
        value={values.firstName}
        setValue={handleChange('firstName')}
        placeholder="Your Name"
        inputTitle="Your First Name"
        error={errors.firstName}
      />
      <Input
        value={values.lastName}
        setValue={handleChange('lastName')}
        placeholder="Your Last Name"
        inputTitle="Your Last Name"
        error={errors.lastName}
      />
      <UiCustomSelect
        data={mockCountries}
        title="Country of residence"
        placeholder="USA"
        selected={country}
        setSelected={setCountry}
        withIcons={false}
        zIndex={9}
      />
      <Input
        value={values.phoneNumber}
        setValue={handleChange('phoneNumber')}
        placeholder="Phone number"
        inputTitle="Phone number"
        error={errors.phoneNumber}
        isPhone
        setIsFocused={setIsFocusedPhone}
      />
      <Input
        value={values.email}
        setValue={handleChange('email')}
        placeholder="Email"
        inputTitle="Email"
        error={registerError && registerError.includes('email') ? registerError : errors.email}
      />
      <Input
        value={values.password}
        setValue={handleChange('password')}
        placeholder="Password"
        inputTitle="Password"
        isSecure
        error={errors.password}
      />
      <UiCustomSelect
        data={mockDegree}
        title="Highest degree obtained"
        placeholder="BA"
        selected={degree}
        setSelected={setDegree}
        withIcons={false}
        zIndex={5}
      />
      <UiCustomSelect
        data={mockExperience}
        title="Level of Experience, years"
        placeholder="5-10"
        selected={experience}
        setSelected={setExperience}
        withIcons={false}
        zIndex={4}
      />
      {/* <UiCustomSelect */}
      {/*  data={mockExpertise} */}
      {/*  title="Field of expertise" */}
      {/*  placeholder="Finance" */}
      {/*  selected={expertise} */}
      {/*  setSelected={setExpertise} */}
      {/*  withIcons={false} */}
      {/*  zIndex={3} */}
      {/*  containerStyles={styles.selectFinance} */}
      {/* /> */}
      <View style={!isShowDisagreeError ? { ...styles.agreedContainer, agreeContainerStyles } : { ...styles.agreedContainer, agreeContainerStyles, ...styles.agreedWarning }}>
        <Text style={styles.agreeText}>
          By creating an account you agree
          {' '}
        </Text>
        <TouchableOpacity onPress={handleNavigateTerms}>
          <Text style={{ ...styles.agreeText, ...styles.linkText }}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
      <UiBtn
        text="Register"
        onPress={isAgree ? handleSubmit : handleShowDisagreeError}
        disabled={getIsDisabled()}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Already have an account?
          {' '}
        </Text>
        <TouchableOpacity onPress={handleNavigateLogin}>
          <Text style={{ ...styles.loginText, ...styles.linkText }}>
            Login
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
  agreeText: {
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: colors.textPrimary,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  loginContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  loginText: {
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
    fontSize: 16,
  },
  agreedContainer: {
    width: '100%',
    paddingVertical: 21,
    marginBottom: 7,
    borderRadius: 4,
  },
  agreedWarning: {
    backgroundColor: colors.warning,
  },
  // selectFinance: {
  //   marginBottom: 7,
  // },
});

export default RegisterScreen;
