import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';
import BackBtn from '../../../../components/buttons/back-btn/back-btn';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';

const GoBackBlock = ({
  whose, handleGoBack, handleChooseAll, handleChooseMine,
}) => (
  <View style={styles.goBackContainer}>
    <BackBtn containerStyles={styles.backBtn} onPress={handleGoBack} />
    <View style={styles.switchContainer}>
      <Pressable
        onPress={handleChooseAll}
        style={whose === 'all' ? { ...styles.switchBtn, ...styles.switchBtnActive } : styles.switchBtn}
      >
        <Text style={whose === 'all' ? { ...styles.switchText, ...styles.switchTextActive } : styles.switchText}>
          All
        </Text>
      </Pressable>
      <Pressable
        onPress={handleChooseMine}
        style={whose === 'mine' ? { ...styles.switchBtn, ...styles.switchBtnActive } : styles.switchBtn}
      >
        <Text style={whose === 'mine' ? { ...styles.switchText, ...styles.switchTextActive } : styles.switchText}>
          Mine
        </Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  backBtn: {
    width: 80,
  },
  goBackContainer: {
    width: '100%',
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchContainer: {
    width: 120,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.bgTertiary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchBtn: {
    width: '49%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
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

export default GoBackBlock;
