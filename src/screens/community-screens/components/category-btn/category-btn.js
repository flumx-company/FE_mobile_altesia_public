import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';

const CategoryBtn = ({
  text, isActive = false, containerStyle = {}, onPress,
}) => (
  <TouchableOpacity
    style={isActive ? { ...styles.container, ...styles.activeContainer, ...containerStyle } : { ...styles.container, ...containerStyle }}
    onPress={onPress}
  >
    <Text style={isActive ? { ...styles.text, ...styles.activeText } : { ...styles.text, ...styles.inActiveText }}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 32,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryActive,
    paddingHorizontal: 8,
    marginRight: 24,
    marginBottom: 10,
  },
  activeContainer: {
    backgroundColor: colors.primaryActive,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
  },
  inActiveText: {
    color: colors.primaryActive,
  },
  activeText: {
    color: colors.bgSecondary,
  },
});

export default CategoryBtn;
