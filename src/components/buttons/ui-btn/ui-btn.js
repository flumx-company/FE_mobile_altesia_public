import React from 'react';
import {
  Pressable, Text, StyleSheet, View,
} from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const UiBtn = ({
  text,
  btnStyles = {},
  textStyles = {},
  onPress = () => {},
  disabled = false,
  Icon = null,
}) => (
  <Pressable
    style={disabled ? { ...styles.btn, ...btnStyles, ...styles.disabledBtn } : { ...styles.btn, ...btnStyles }}
    onPress={disabled ? () => {} : onPress}
  >
    {Icon && (
    <View style={styles.icon}>
      <Icon />
    </View>
    )}
    <Text style={{ ...styles.loginBtnText, ...textStyles }}>{text}</Text>
  </Pressable>
);
const styles = StyleSheet.create({
  btn: {
    width: '100%',
    marginBottom: 30,
    height: 56,
    borderRadius: 4,
    backgroundColor: colors.primaryActive,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginBtnText: {
    color: colors.bgSecondary,
    fontSize: 21,
    fontFamily: fonts.primaryMedium,
  },
  disabledBtn: {
    backgroundColor: colors.disabled,
  },
  icon: {
    marginRight: 10,
  },
});

export default UiBtn;
