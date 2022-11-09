import React, { useEffect } from 'react';
import {
  StyleSheet, View, Text, Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import Block from '../profile-screen/components/block';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import { getCheckedSpecialitiesList } from '../../redux/profile/selectors';
import {
  addSpeciality, checkLevel, checkSpeciality, removeSpeciality, selectorsDataRequested,
} from '../../redux/profile/actions';
import Input from '../../components/input/input';
import SpecialitiesBlock from '../profile-screen/components/specialities-block';
import useLinkFormik from '../../hooks/useLinkFormik/useLinkFormik';
import routes from '../../routes';

const FillingProfileThirdStep = ({ navigation }) => {
  const dispatch = useDispatch();
  const checkedSpecialities = useSelector(getCheckedSpecialitiesList);

  const addMoreSpeciality = () => dispatch(addSpeciality());
  const handleRedirectNextStep = () => navigation.navigate(routes.loginSingUp.fillingProfileLastStep);
  const handleGoBack = () => navigation.navigate(routes.loginSingUp.fillingProfileSecondStep);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useLinkFormik(handleRedirectNextStep);

  const isDisabledBtn = () => {
    if (!values.link) {
      return true;
    }
    if (checkedSpecialities.every((item) => !item.speciality)) {
      return true;
    }
    if (checkedSpecialities.every((item) => !item.level)) {
      return true;
    }
    return null;
  };

  useEffect(() => {
    selectorsDataRequested();
  }, []);

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
      <ScreenTitle title="Filling in the profile" />
      <Text style={styles.subTitle}>
        Indicate your strengths
      </Text>
      <Block containerStyles={styles.specialitiesBlock}>
        {specialitiesList}
        {checkedSpecialities[0].speciality && (
          <Pressable style={styles.addBtn} onPress={addMoreSpeciality}>
            <Text style={styles.addBtnText}>Add one more Speciality</Text>
          </Pressable>
        )}
      </Block>
      <Block title="Add link to your Linkedin Profile" containerStyles={styles.linkContainer}>
        <Input
          placeholder="http//..."
          value={values.link}
          setValue={handleChange('link')}
          error={errors.link}
        />
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
          onPress={handleSubmit}
          disabled={isDisabledBtn()}
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
  btnContainer: {
    marginTop: 'auto',
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
    paddingHorizontal: 0,
    zIndex: 2,
  },
  linkContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
});

export default FillingProfileThirdStep;
