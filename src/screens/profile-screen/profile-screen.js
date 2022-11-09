import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import Input from '../../components/input/input';
import UiCustomSelect from '../../components/custom-select/ui-custom-select';
import Block from './components/block';
import SpecialitiesBlock from './components/specialities-block';
import ScreenContainer from '../../components/screen-container/screen-container';
import {
  profileRequested, addSpeciality, checkAvailability, checkLevel, checkLocation, checkOpenTo, checkPreferredIndustries, checkPreferredMissions, checkPreferredTime, checkSpeciality, removeSpeciality, switchToBeContacted,
} from '../../redux/profile/actions';
import LogoutBtn from './components/logout-btn';
import {
  getAvailabilityList, getCheckedSpecialitiesList, getLinkedInLink, getLoadedProfile, getLocationsToWorkList, getNewProfile, getOpenToList, getPreferredIndustries, getPreferredMissions, getPreferredTime, getSalary, getSelectedPreferredIndustries, getSelectedPreferredMissions, getToBeContacted,
} from '../../redux/profile/selectors';
import UiCheckbox from '../../components/custom-checkbox/ui-checkbox';
import useProfileFormik from '../../hooks/useProfileFormik/useProfileFormik';
import compareNewOldProfile from '../../helpers/compare-new-old-profile';
import ModalWindow from '../../components/modal-window/modal-window';
import routes from '../../routes';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const openTo = useSelector(getOpenToList);
  const availability = useSelector(getAvailabilityList);
  const isToBeContacted = useSelector(getToBeContacted);
  const preferredTime = useSelector(getPreferredTime);
  const preferredMissions = useSelector(getPreferredMissions);
  const preferredIndustries = useSelector(getPreferredIndustries);
  const selectedPreferredMissions = useSelector(getSelectedPreferredMissions);
  const selectedPreferredIndustries = useSelector(getSelectedPreferredIndustries);
  const locationsToWork = useSelector(getLocationsToWorkList);
  const checkedSpecialities = useSelector(getCheckedSpecialitiesList);
  const salary = useSelector(getSalary);
  const linkedInLink = useSelector(getLinkedInLink);
  const loadedProfile = useSelector(getLoadedProfile);
  const newProfile = useSelector(getNewProfile);
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useProfileFormik();

  useEffect(() => {
    setIsChanged(compareNewOldProfile(loadedProfile, newProfile, values));
  }, [loadedProfile, newProfile, values]);

  const handleSwitchToBeContacted = () => dispatch(switchToBeContacted());
  const handleSelectPreferredMissions = (id) => dispatch(checkPreferredMissions(id));
  const handleSelectPreferredIndustries = (id) => dispatch(checkPreferredIndustries(id));
  const handleAddMoreSpeciality = () => dispatch(addSpeciality());

  const handleBack = () => {
    setModalVisible(false);
    dispatch(profileRequested());
    navigation.navigate(routes.profile);
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleBeforeLeave = () => {
    if (!isChanged) {
      setModalVisible(true);
      navigation.navigate(routes.profile);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('blur', handleBeforeLeave);
      return () => {
        unsubscribe();
      };
    }, [isChanged]),
  );

  const handleSaveChanges = () => {
    setModalVisible(false);
    handleSubmit();
    dispatch(profileRequested());
  };

  useEffect(() => {
    dispatch(profileRequested());
  }, []);

  useEffect(() => {
    values.min = String(salary.min);
    values.max = String(salary.max);
    values.linkedInLink = String(linkedInLink);
  }, [salary, linkedInLink]);

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

  const specialitiesList = checkedSpecialities.map((item, i) => {
    const handleRemove = () => dispatch(removeSpeciality(item.id));
    const handleCheckSpeciality = (specialityId) => dispatch(checkSpeciality(item.id, specialityId));
    const handleCheckLevel = (levelId) => dispatch(checkLevel(item.id, levelId));
    return (
      <SpecialitiesBlock
        key={item.id}
        index={i}
        item={item}
        selectedSpeciality={item.speciality}
        selectedLevel={item.level}
        handleRemove={handleRemove}
        handleCheckSpecialities={handleCheckSpeciality}
        handleChekLevel={handleCheckLevel}
        checkedSpecialities={checkedSpecialities}
      />
    );
  });

  return (
    <ScreenContainer>
      <View style={styles.titleContainer}>
        <View />
        <Text style={styles.title}>
          Profile
        </Text>
        <LogoutBtn />
      </View>
      <Text style={styles.text}>
        Please fill your job preferences to match them opportunities best
      </Text>
      <Block title="Availability">
        {availabilityList}
      </Block>
      <Block title="Open to...">
        {openToList}
      </Block>
      <Block title="Rate">
        <View style={styles.inputContainer}>
          <Input
            containerStyles={styles.input}
            titleStyles={styles.inputTitle}
            inputTitle="Minimum expected, EUR"
            placeholder="0"
            value={values.min}
            setValue={handleChange('min')}
            error={errors.min}
            keyboardType="numeric"
          />
          <Input
            containerStyles={styles.input}
            titleStyles={styles.inputTitle}
            inputTitle="Gross Salary, EUR"
            placeholder="0"
            value={values.max}
            setValue={handleChange('max')}
            error={errors.max}
            keyboardType="numeric"
          />
        </View>
      </Block>
      <Block title="Ok to be contacted by Altesia">
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
      <Block title="Preferred time to be contacted">
        {preferredTimeList}
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
      <Block title="Possible locations to work">
        {locationsToWorkList}
      </Block>
      <Block containerStyles={styles.specialitiesBlock}>
        {specialitiesList}
        {checkedSpecialities[0].speciality && (
          <Pressable style={styles.addBtn} onPress={handleAddMoreSpeciality}>
            <Text style={styles.addBtnText}>Add one more Speciality</Text>
          </Pressable>
        )}
      </Block>
      <Block title="Add link to your Linkedin Profile">
        <Input
          placeholder="http//..."
          value={values.linkedInLink}
          setValue={handleChange('linkedInLink')}
          error={errors.linkedInLink}
        />
        <UiBtn
          text="Save changes"
          btnStyles={styles.saveChangesBtn}
          onPress={handleSaveChanges}
          disabled={compareNewOldProfile(loadedProfile, newProfile, values)}
        />
      </Block>
      <ModalWindow
        title="Save changes?"
        text="You made changes to your profile, but did not save them"
        agreeBtnText="Save changes"
        disagreeBtnText="Don't save"
        handleClose={handleCloseModal}
        handleReturnBtn={handleBack}
        handleAgreeBtn={handleSaveChanges}
        visible={modalVisible}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    marginBottom: 17,
    marginTop: 20,
    fontSize: 40,
    color: colors.primaryActive,
    fontFamily: fonts.primaryLight,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20.8,
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
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
  selectTitle: {
    marginBottom: 15,
  },
  selectContainerFirst: {
    zIndex: 3,
  },
  selectContainerSecond: {
    zIndex: 2,
  },
  saveChangesBtn: {
    marginBottom: 10,
  },
  addBtn: {
    width: '100%',
    marginBottom: 24,
  },
  addBtnText: {
    fontFamily: fonts.primaryBold,
    color: colors.primaryActive,
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'center',
  },
  specialitiesBlock: {
    zIndex: 2,
  },
});

export default ProfileScreen;
