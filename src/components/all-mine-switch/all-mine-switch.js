import React from 'react';
import {
  Pressable, Text, View, StyleSheet,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const AllMineSwitch = ({ whose, handleChooseAll, handleChooseMine }) => (
  <View style={styles.switchContainer}>
    <Pressable style={whose === 'all' ? { ...styles.switchBtn, ...styles.switchBtnActive } : styles.switchBtn} onPress={handleChooseAll}>
      <Text style={whose === 'all' ? { ...styles.switchText, ...styles.switchTextActive } : styles.switchText}>
        All
      </Text>
    </Pressable>
    <Pressable style={whose === 'mine' ? { ...styles.switchBtn, ...styles.switchBtnActive } : styles.switchBtn} onPress={handleChooseMine}>
      <Text style={whose === 'mine' ? { ...styles.switchText, ...styles.switchTextActive } : styles.switchText}>
        Mine
      </Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  switchContainer: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.bgTertiary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  switchBtn: {
    width: '49%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  switchText: {
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    color: colors.textLight,
  },
  switchBtnActive: {
    backgroundColor: colors.bgSecondary,
  },
  switchTextActive: {
    color: colors.primaryActive,
  },
});

export default AllMineSwitch;
