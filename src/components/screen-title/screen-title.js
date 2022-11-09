import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const ScreenTitle = ({ title, titleStyles }) => (
  <Text style={{ ...styles.title, ...titleStyles }}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    marginBottom: 17,
    marginTop: 20,
    fontSize: 40,
    color: colors.primaryActive,
    fontFamily: fonts.primaryLight,
  },
});

export default ScreenTitle;
