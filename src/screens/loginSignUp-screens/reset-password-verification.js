import React, { useEffect, useState } from 'react';
import {
  Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import {
  resetPasswordRequested,
  verifyResetPasswordRequested,
} from '../../redux/auth/action';
import { getResetPasswordEmail, getResetPasswordError } from '../../redux/auth/selectors';
import routes from '../../routes';

const CELL_COUNT = 6;
let timer = () => {};

const ResetPasswordVerification = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSendAgain, setIsSendAgain] = useState(false);
  const dispatch = useDispatch();

  const error = useSelector(getResetPasswordError);
  const resetPasswordEmail = useSelector(getResetPasswordEmail);

  const handleRedirectCompleteReset = () => navigation.navigate(routes.loginSingUp.resetPasswordNewPassword);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });
  /* eslint consistent-return: off */
  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        setIsSendAgain(true);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  const start = () => {
    setTimeLeft(30);
    clearTimeout(timer);
    startTimer();
  };

  const handleSubmitVerification = () => {
    dispatch(verifyResetPasswordRequested(value, resetPasswordEmail, handleRedirectCompleteReset));
    setIsSendAgain(false);
    start();
    setValue('');
  };

  const handleReSendConfirmCode = () => {
    dispatch(resetPasswordRequested(resetPasswordEmail, () => {}));
    setIsSendAgain(false);
    setValue('');
    start();
  };

  // styles
  const { width, height } = useWindowDimensions();
  const titleStyles = { marginBottom: width > height ? 10 : 33 };

  return (
    <ScreenContainer>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <ScreenTitle title="Password reset" titleStyles={titleStyles} />
      <Text style={styles.title}>
        Verification code
      </Text>
      <CodeField
        ref={ref}
        {...props}
        caretHidden={false}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[error ? styles.cellError : styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      { error && (
      <Text style={styles.errorText}>
        You entered the wrong code, please try again
      </Text>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.receiveText}>
          Didn`&apos;`t receive the code?
          {' '}
        </Text>
        {
          isSendAgain
            ? (
              <TouchableOpacity onPress={handleReSendConfirmCode}>
                <Text style={styles.linkText}>
                  Send again
                </Text>
              </TouchableOpacity>
            )
            : (
              <Text style={styles.linkText}>
                Repeat after
                {' '}
                {timeLeft}
                {' '}
                sec.
              </Text>
            )
        }
      </View>
      <UiBtn
        text="Enter"
        onPress={handleSubmitVerification}
        disabled={value.length < 6}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
  },
  cell: {
    width: 40,
    height: 50,
    marginRight: 5,
    borderRadius: 4,
    lineHeight: 50,
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.mainGrey,
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
  },
  cellError: {
    width: 40,
    height: 50,
    marginRight: 5,
    borderRadius: 4,
    lineHeight: 50,
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.validation,
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.validation,
  },
  focusCell: {
    borderColor: colors.black,
  },
  textContainer: {
    marginTop: 25,
    flexDirection: 'row',
    marginBottom: 112,
  },
  receiveText: {
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  linkText: {
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
    textDecorationLine: 'underline',
  },
});

export default ResetPasswordVerification;
