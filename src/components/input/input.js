import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import CloseEyeIcon from '../icons/close-eye-icon';
import OpenEyeIcon from '../icons/open-eye-icon';

const Input = ({
  value,
  setValue,
  inputTitle,
  placeholder,
  isSecure = false,
  multiline = false,
  numberOfLines = 1,
  containerStyles = {},
  titleStyles = {},
  fieldStyles = {},
  error,
  isShowTextError = true,
  passwordError = false,
  zIndex = 1,
  isPhone = false,
  initialValue,
  keyboardType = 'default',
  setIsFocused = () => {},
}) => {
  const [isShowValue, setIsShowValue] = useState(false);

  const inputField = useRef(null);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, []);

  const handleFocus = () => {
    if (!value || value.length === 1) {
      setValue('+');
    }
    setIsFocused(true);
  };

  const handleToggleShowPassword = () => {
    setIsShowValue((prev) => !prev);
    if (inputField.current) {
      inputField.current.focus();
    }
  };

  const inputStyles = {
    ...styles.inputField,
    ...fieldStyles,
    textAlignVertical: multiline ? 'top' : 'center',
    paddingTop: multiline ? 8 : 0,
  };
  return isSecure
    ? (
      <View style={{ ...styles.inputContainer, ...containerStyles, zIndex }}>
        {inputTitle && <Text style={{ ...styles.inputTitle, ...titleStyles }}>{inputTitle}</Text>}
        <TextInput
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={error ? { ...inputStyles, ...styles.errorField } : { ...inputStyles, ...fieldStyles }}
          secureTextEntry={!isShowValue}
          onChangeText={setValue}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.mainGrey}
          onFocus={isPhone ? handleFocus : () => {}}
          keyboardType={keyboardType}
          ref={inputField}
        />
        <TouchableOpacity style={styles.icon} onPress={handleToggleShowPassword}>
          {isShowValue ? <OpenEyeIcon /> : <CloseEyeIcon />}
        </TouchableOpacity>
        {
        passwordError && (
          <View>
            <View style={passwordError.includes('letter') ? styles.lowLine : styles.weakLine} />
            <Text style={styles.errorPasswordText}>
              <Text style={passwordError.includes('letter') ? styles.lowTitle : styles.errorWeakTitle}>
                Weak.
                {' '}
              </Text>
              {passwordError}
            </Text>
          </View>
        )
      }
        {
        error && isShowTextError && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )
      }
      </View>
    )
    : (
      <View style={{ ...styles.inputContainer, ...containerStyles, zIndex }}>
        {inputTitle && <Text style={{ ...styles.inputTitle, ...titleStyles }}>{inputTitle}</Text>}
        <TextInput
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={error ? { ...inputStyles, ...styles.errorField } : { ...inputStyles, ...fieldStyles }}
          secureTextEntry={isSecure}
          onChangeText={setValue}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.mainGrey}
          onFocus={isPhone ? handleFocus : () => {}}
          keyboardType={keyboardType}
        />
        {
        error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )
      }
      </View>
    );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 17,
  },
  inputTitle: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
  },
  inputField: {
    width: '100%',
    height: 50,
    paddingHorizontal: 17,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.mainGrey,
    backgroundColor: colors.bgSecondary,
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
  },
  errorField: {
    borderColor: colors.validation,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.validation,
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 23,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorPasswordText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  weakLine: {
    marginVertical: 4,
    height: 4,
    width: 100,
    backgroundColor: colors.weakRed,
    borderRadius: 2,
  },
  errorWeakTitle: {
    color: colors.weakRed,
  },
  lowLine: {
    marginVertical: 4,
    height: 4,
    width: 120,
    backgroundColor: colors.rating,
    borderRadius: 2,
  },
  lowTitle: {
    color: colors.rating,
  },
});

export default Input;
