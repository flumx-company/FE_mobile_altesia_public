import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import UiCheckbox from '../../components/custom-checkbox/ui-checkbox';
import Block from '../profile-screen/components/block';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import { getAvailabilityList, getOpenToList } from '../../redux/profile/selectors';
import { checkOpenTo, checkAvailability } from '../../redux/profile/actions';
import routes from '../../routes';

const FillingProfileFirstStep = ({ navigation }) => {
  const dispatch = useDispatch();
  const openTo = useSelector(getOpenToList);
  const availability = useSelector(getAvailabilityList);

  const getIsDisabledBtn = () => {
    const isCheckedOpenTo = openTo.find((item) => item.isChecked);
    const isCheckedAvailability = availability.find((item) => item.isChecked);

    if (!isCheckedOpenTo) {
      return true;
    }

    if (!isCheckedAvailability) {
      return true;
    }

    return false;
  };

  const openToList = openTo.map((item) => {
    const handleCheck = () => dispatch(checkOpenTo(item.text));
    return (
      <UiCheckbox
        key={item.id}
        text={item.text}
        isChecked={item.isChecked}
        handleCheck={handleCheck}
        isRadio
      />
    );
  });

  const availabilityList = availability.map((item) => {
    const handleCheck = () => dispatch(checkAvailability(item.text));
    return (
      <UiCheckbox
        key={item.id}
        text={item.text}
        isChecked={item.isChecked}
        handleCheck={handleCheck}
        isRadio
      />
    );
  });

  const handleRedirectNextStep = () => navigation.navigate(routes.loginSingUp.fillingProfileSecondStep);
  const handleGoBack = () => navigation.navigate(routes.loginSingUp.verification);

  return (
    <ScreenContainer>
      <ScreenTitle title="Filling in the profile" />
      <Block title="Open to...">
        {openToList}
      </Block>
      <Block title="Availability" containerStyles={styles.availabilityBlock}>
        {availabilityList}
      </Block>
      <View style={styles.btnContainer}>
        <UiBtn
          text="Back"
          btnStyles={styles.cancelBtn}
          textStyles={styles.cancelBtnText}
          onPress={handleGoBack}
        />
        <UiBtn
          text="Next step"
          btnStyles={styles.sendBtn}
          onPress={handleRedirectNextStep}
          disabled={getIsDisabledBtn()}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  availabilityBlock: {
    borderBottomWidth: 0,
  },
  btnContainer: {
    width: '100%',
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
});

export default FillingProfileFirstStep;
