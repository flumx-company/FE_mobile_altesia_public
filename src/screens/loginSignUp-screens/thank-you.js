import React, { useEffect } from 'react';
import {
  Text, View, StyleSheet, Pressable, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ScreenTitle from '../../components/screen-title/screen-title';
import ScreenContainer from '../../components/screen-container/screen-container';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import UserWaitingIcon from '../../components/icons/user-waiting-icon';
import UserApprovedIcon from '../../components/icons/user-approved-icon';
import { getConfirmedToken, getRegisterToken, getUserStatus } from '../../redux/auth/selectors';
import { loginSucceed, putProfileSucceed, userStatusRequested } from '../../redux/auth/action';
import { storagePutRegisterToken, storageRemoveRegisterToken } from '../../services/asyncStorage';
/* eslint-disable no-empty */
const ThankYou = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(getUserStatus);
  const confirmToken = useSelector(getConfirmedToken);
  const registerToken = useSelector(getRegisterToken);

  const handleGoToPlatform = async () => {
    try {
      const token = await AsyncStorage.getItem('registerToken');
      if (token) {
        dispatch(loginSucceed(token));
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        storageRemoveRegisterToken();
      }
    } catch (e) {}
  };

  const handleLogout = () => {
    storageRemoveRegisterToken();
    dispatch(putProfileSucceed(null));
  };

  useEffect(() => {
    dispatch(userStatusRequested());
  }, [confirmToken, registerToken]);

  useEffect(() => {
    if (confirmToken) {
      storagePutRegisterToken(confirmToken);
    }
  }, [confirmToken]);

  return (
    <ScreenContainer>
      <ScreenTitle title="Thank you for registering!" titleStyles={styles.title} />
      {userStatus && userStatus !== 'waiting for access'
        ? (
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>
              Your profile has been successfully verified by moderators!
            </Text>
            <Text style={styles.centerText}>
              Start using the application right now by clicking on the button below
            </Text>
            <Pressable style={styles.activeBtn} onPress={handleGoToPlatform}>
              <UserApprovedIcon />
              <Text style={styles.activeBtnText}>
                Go to platform
              </Text>
            </Pressable>
            <View style={styles.logoutContainer}>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        : (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Our goal is to create a favorable environment for professional growth and information exchange among specialists in the ***** area.
            </Text>
            <Text style={styles.lastText}>
              In this regard, each new profile is checked by our moderators for the correctness of the data specified in the profile.
            </Text>
            <Pressable style={styles.disabledBtn}>
              <UserWaitingIcon />
              <Text style={styles.disabledBtnText}>
                Go to platform
              </Text>
            </Pressable>
            <View style={styles.logoutContainer}>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  textContainer: {
    width: '100%',
  },
  subTitle: {
    width: '90%',
    marginBottom: 170,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.25,
    textAlign: 'center',
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  lastText: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
    marginBottom: 270,
  },
  disabledBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.transparent,
    borderColor: colors.disabled,
  },
  disabledBtnText: {
    marginLeft: 10,
    color: colors.disabled,
    fontFamily: fonts.primaryRegular,
    fontSize: 21,
  },
  centerText: {
    marginBottom: 140,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  activeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    marginBottom: 30,
    borderRadius: 8,
    backgroundColor: colors.primaryActive,
  },
  activeBtnText: {
    marginLeft: 10,
    color: colors.bgSecondary,
    fontFamily: fonts.primaryRegular,
    fontSize: 21,
  },
  logoutContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    width: 80,
  },
  logoutText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    textDecorationLine: 'underline',
    color: colors.textPrimary,
  },
});

export default ThankYou;
