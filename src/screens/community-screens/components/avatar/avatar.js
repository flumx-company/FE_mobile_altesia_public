import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';

const Avatar = ({ styleContainer, firstName = '', lastName = '' }) => {
  const initials = `${firstName[0] || ' ' } ${lastName[0] || ' '}`;
  return (
    <View style={{ ...styles.container, ...styleContainer }}>
      <View style={styles.avatarContainer}>
        <Text style={styles.text}>
          {initials}
        </Text>
      </View>
      <Text style={styles.name}>
        {`${firstName} ${lastName}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.mainGrey,
  },
  text: {
    fontSize: 10,
    fontFamily: fonts.primaryMedium,
    color: colors.bgSecondary,
  },
  name: {
    fontSize: 12,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
  },
});

export default Avatar;
