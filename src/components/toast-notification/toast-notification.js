import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const ToastNotification = ({ options }) => (
  <View style={options.color ? { ...styles.container, backgroundColor: options.color } : styles.container}>
    <Text style={styles.text}>
      {options.message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    height: 40,
    fontFamily: fonts.secondaryRegular,
    backgroundColor: colors.black,
    borderRadius: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.bgSecondary,
  },
});

export default ToastNotification;
