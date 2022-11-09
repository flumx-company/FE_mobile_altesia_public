import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const TextBtn = ({
  text,
  color = colors.primaryActive,
  onPress = () => {},
  btnStyles = {},
  textStyles = {},
  isDisabled,
}) => {
  const textStyle = {
    ...styles.text, color, ...textStyles, opacity: isDisabled ? 0.1 : 1,
  };
  return (
    <TouchableOpacity
      style={{ ...styles.btn, ...btnStyles }}
      activeOpacity={isDisabled ? 1 : 0.2}
      onPress={isDisabled ? () => {} : onPress}
    >
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 16,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: fonts.primaryBold,
  },
});

export default TextBtn;
