import React, { useEffect } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import UiCheckbox from '../../components/custom-checkbox/ui-checkbox';
import Block from '../profile-screen/components/block';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import {
  getLocationsToWorkList, getPreferredIndustries, getPreferredMissions, getSelectedPreferredIndustries, getSelectedPreferredMissions,
} from '../../redux/profile/selectors';
import {
  checkLocation, checkPreferredIndustries, checkPreferredMissions, selectorsDataRequested,
} from '../../redux/profile/actions';
import Input from '../../components/input/input';
import UiCustomSelect from '../../components/custom-select/ui-custom-select';
import useSalaryFormik from '../../hooks/useSalaryFormik/useSalaryFormik';
import routes from '../../routes';

const FillingProfileThirdStep = ({ navigation }) => {
  const dispatch = useDispatch();

  const locationsToWork = useSelector(getLocationsToWorkList);
  const preferredMissions = useSelector(getPreferredMissions);
  const preferredIndustries = useSelector(getPreferredIndustries);
  const selectedPreferredMissions = useSelector(getSelectedPreferredMissions);
  const selectedPreferredIndustries = useSelector(getSelectedPreferredIndustries);

  const handleSelectPreferredMissions = (id) => dispatch(checkPreferredMissions(id));
  const handleSelectPreferredIndustries = (id) => dispatch(checkPreferredIndustries(id));
  const handleRedirectNextStep = () => navigation.navigate(routes.loginSingUp.fillingProfileThirdStep);
  const handleGoBack = () => navigation.navigate(routes.loginSingUp.fillingProfileFirstStep);

  useEffect(() => {
    dispatch(selectorsDataRequested());
  }, []);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useSalaryFormik(handleRedirectNextStep);
  /* eslint consistent-return: off */
  const isDisabledBtn = () => {
    if (!selectedPreferredMissions.length) {
      return true;
    }
    if (!selectedPreferredIndustries.length) {
      return true;
    }
    if (locationsToWork.every((item) => !item.isChecked)) {
      return true;
    }
    if (!values.min) {
      return true;
    }
    if (!values.max) {
      return true;
    }
  };

  const locationsToWorkList = locationsToWork.map((item) => {
    const handleCheckLocation = () => dispatch(checkLocation(item.text));
    return (
      <UiCheckbox
        key={item.id}
        isChecked={item.isChecked}
        text={item.text}
        handleCheck={handleCheckLocation}
      />
    );
  });

  return (
    <ScreenContainer>
      <ScreenTitle title="Filling in the profile" />
      <Text style={styles.subTitle}>
        Tell us about your preferences
      </Text>
      <Block title="Rate" containerStyles={styles.block}>
        <View style={styles.inputContainer}>
          <Input
            value={values.min}
            setValue={handleChange('min')}
            error={errors.min}
            containerStyles={styles.input}
            titleStyles={styles.inputTitle}
            inputTitle="Minimum expected, EUR"
            placeholder="0"
            keyboardType="phone-pad"
          />
          <Input
            value={values.max}
            setValue={handleChange('max')}
            error={errors.max}
            containerStyles={styles.input}
            titleStyles={styles.inputTitle}
            inputTitle="Gross Salary, EUR"
            placeholder="0"
            keyboardType="phone-pad"
          />
        </View>
      </Block>
      <Block
        title="Preferred missions"
        titleStyles={styles.selectTitle}
        containerStyles={styles.selectContainerFirst}
      >
        <UiCustomSelect
          placeholder="item"
          selected={selectedPreferredMissions}
          handleCheck={handleSelectPreferredMissions}
          data={preferredMissions}
          isMulti
        />
      </Block>
      <Block
        title="Preferred industries"
        titleStyles={styles.selectTitle}
        containerStyles={styles.selectContainerSecond}
      >
        <UiCustomSelect
          placeholder="item"
          selected={selectedPreferredIndustries}
          handleCheck={handleSelectPreferredIndustries}
          data={preferredIndustries}
          isMulti
        />
      </Block>
      <Block title="Possible locations to work" containerStyles={styles.block}>
        {locationsToWorkList}
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
          disabled={isDisabledBtn()}
          onPress={handleSubmit}
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
  block: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  input: {
    width: '48%',
  },
  inputTitle: {
    fontSize: 14,
  },
  selectContainerFirst: {
    paddingHorizontal: 0,
    zIndex: 3,
  },
  selectContainerSecond: {
    paddingHorizontal: 0,
    zIndex: 2,
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

export default FillingProfileThirdStep;
