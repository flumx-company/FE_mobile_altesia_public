import React from 'react';
import {
  StyleSheet, Switch, Text, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import UiCheckbox from '../../components/custom-checkbox/ui-checkbox';
import Block from '../profile-screen/components/block';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import { getPreferredTime, getToBeContacted } from '../../redux/profile/selectors';
import { checkPreferredTime, switchToBeContacted } from '../../redux/profile/actions';
import { putProfileRequested } from '../../redux/auth/action';
import routes from '../../routes';

const FillingProfileLastStep = ({ navigation }) => {
  const dispatch = useDispatch();

  const preferredTime = useSelector(getPreferredTime);
  const isToBeContacted = useSelector(getToBeContacted);
  const handleSwitchToBeContacted = () => dispatch(switchToBeContacted());

  const handleGoBack = () => navigation.navigate(routes.loginSingUp.fillingProfileThirdStep);
  const handleRedirect = () => navigation.navigate(routes.loginSingUp.thankYou);
  const handleSubmit = () => dispatch(putProfileRequested(handleRedirect));

  const getIsDisabledBtn = () => {
    const isCheckedPreferredTime = preferredTime.find((item) => item.isChecked);
    if (!isCheckedPreferredTime) {
      return true;
    }
    return null;
  };

  const preferredTimeList = preferredTime.map((item) => {
    const handleCheckPreferredTime = () => dispatch(checkPreferredTime(item.text));
    return (
      <UiCheckbox
        key={item.id}
        isChecked={item.isChecked}
        text={item.text}
        handleCheck={handleCheckPreferredTime}
        isRadio
      />
    );
  });

  return (
    <ScreenContainer>
      <ScreenTitle title="Filling in the profile" />
      <Text style={styles.subTitle}>
        Indicate your strengths
      </Text>
      <Block title="Ok to be contacted by Altesia" containerStyles={styles.block}>
        <View style={styles.switchContainer}>
          <Text style={{ ...styles.switchText, color: colors.mainGrey }}>No</Text>
          <Switch
            style={styles.switch}
            trackColor={{ true: colors.primaryActive, false: colors.mainGrey }}
            thumbColor={isToBeContacted ? colors.primaryActive : colors.bgSecondary}
            onValueChange={handleSwitchToBeContacted}
            value={isToBeContacted}
          />
          <Text style={styles.switchText}>yes</Text>
        </View>
      </Block>
      <Block title="Preferred time to be contacted" containerStyles={styles.lastBlock}>
        {preferredTimeList}
      </Block>
      <View style={styles.btnContainer}>
        <UiBtn
          text="Back"
          btnStyles={styles.cancelBtn}
          textStyles={styles.cancelBtnText}
          onPress={handleGoBack}
        />
        <UiBtn
          text="Save and Go!"
          btnStyles={styles.sendBtn}
          onPress={handleSubmit}
          disabled={getIsDisabledBtn()}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    width: '100%',
    marginBottom: 24,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  switchText: {
    fontSize: 20,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
    textTransform: 'uppercase',
  },
  switch: {
    color: colors.primaryActive,
    marginHorizontal: 20,
  },
  btnContainer: {
    width: '100%',
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    width: '45%',
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primaryActive,
  },
  cancelBtnText: {
    color: colors.primaryActive,
  },
  sendBtn: {
    width: '45%',
  },
  block: {
    marginHorizontal: 0,
    borderBottomWidth: 0,
  },
  lastBlock: {
    marginBottom: 0,
    marginHorizontal: 0,
    borderBottomWidth: 0,
  },
});

export default FillingProfileLastStep;
