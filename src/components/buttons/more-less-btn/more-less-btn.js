import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';

const MoreLessBtn = ({ onPress, text = '', btnStyles = {} }) => (
  <TouchableOpacity onPress={onPress} style={{ ...styles.moreLessBtn, ...btnStyles }}>
    <Text style={styles.moreLessBtnText}>
      {' '}
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  moreLessBtn: {
    height: 17.5,
  },
  moreLessBtnText: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.primaryActive,
  },
});

export default MoreLessBtn;
