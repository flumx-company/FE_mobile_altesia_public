import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import ArrowLeftIcon from '../../icons/arrow-left-icon';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const BackBtn = ({ text = 'Back', containerStyles = {}, onPress }) => (
  <Pressable style={{ ...styles.container, ...containerStyles }} onPress={onPress}>
    <ArrowLeftIcon />
    <Text style={styles.text}>
      {text}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.textLight,
    fontFamily: fonts.primaryMedium,
  },

});

export default BackBtn;
