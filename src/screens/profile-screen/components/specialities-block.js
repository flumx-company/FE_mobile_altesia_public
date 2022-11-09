import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import Block from './block';
import UiCustomSelect from '../../../components/custom-select/ui-custom-select';
import { getLevels, getSpecialities } from '../../../redux/profile/selectors';

const SpecialitiesBlock = ({
  handleRemove, item, handleCheckSpecialities, handleChekLevel, index, selectedSpeciality, selectedLevel, checkedSpecialities,
}) => {
  const specialities = useSelector(getSpecialities);
  const levels = useSelector(getLevels);

  const filteredCheckedSpecialities = checkedSpecialities.filter((spec) => spec.speciality).map((el) => el.speciality).filter((unit) => unit !== selectedSpeciality);

  const filteredSpecialities = specialities.filter((el) => !filteredCheckedSpecialities.includes(el.id));
  const zIndexContainer = 100000 - index;

  return (
    <View style={{ ...styles.container, zIndex: zIndexContainer }}>
      <Block title="Specialities" containerStyles={{ ...styles.specialitiesSelect, ...styles.specialitiesSelectFirst }}>
        <UiCustomSelect
          selected={filteredSpecialities && filteredSpecialities.find((el) => el.id === selectedSpeciality) && specialities.find((el) => el.id === selectedSpeciality).name}
          placeholder="item"
          data={filteredSpecialities}
          handleRemove={handleRemove}
          id={item.id}
          isRadio
          handleCheck={handleCheckSpecialities}
          withDeleteBtn
          withIcons
        />
      </Block>
      <Block title="Level" containerStyles={{ ...styles.specialitiesSelect }}>
        <UiCustomSelect
          selected={levels && levels.find((el) => el.id === Number(selectedLevel)) && levels.find((el) => el.id === Number(selectedLevel)).name}
          placeholder="item"
          data={levels}
          isRadio
          withIcons
          id={item.id}
          handleCheck={handleChekLevel}
        />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: '100%',
  },
  specialitiesSelect: {
    paddingHorizontal: 0,
    borderBottomWidth: 0,
  },
  specialitiesSelectFirst: {
    zIndex: 5,
  },
});

export default SpecialitiesBlock;
