import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import UiBtn from '../buttons/ui-btn/ui-btn';
import UserFindIcon from '../icons/user-find-icon';

const EmptyMineBlock = ({ onPress, text, textBtn }) => (
  <View style={styles.block}>
    <Text style={styles.text}>
      {text}
    </Text>
    <UiBtn text={textBtn} Icon={() => <UserFindIcon />} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  block: {
    width: '100%',
  },
  text: {
    marginBottom: 29,
    fontSize: 16,
    lineHeight: 20.8,
    textAlign: 'center',
    fontFamily: fonts.primaryMedium,
    color: colors.mainGrey,
  },
});

export default EmptyMineBlock;
