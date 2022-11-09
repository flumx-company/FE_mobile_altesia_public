import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const Block = ({
  children, title, containerStyles = {}, titleStyles = {},
}) => (
  <View style={{ ...styles.block, ...containerStyles }}>
    {title
    && (
    <Text style={{ ...styles.blockTitle, ...titleStyles }}>
      {title}
    </Text>
    )}
    {children}
  </View>
);

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,
  },
  blockTitle: {
    marginBottom: 24,
    fontSize: 20,
    lineHeight: 24,
    fontFamily: fonts.primaryBold,
  },
});

export default Block;
