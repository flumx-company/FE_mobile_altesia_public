import React from 'react';
import {
  Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import CheckboxCheckedIcon from '../icons/checkbox-checked-icon';
import CheckboxUncheckedIcon from '../icons/checkbox-unchecked-icon';
import RadioCheckedIcon from '../icons/radio-checked-icon';
import RadioUncheckedIcon from '../icons/radio-unchecked-icon';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

const UiCheckbox = ({
  text, isChecked, handleCheck, isRadio,
}) => (isRadio
  ? (
    <TouchableOpacity onPress={handleCheck} style={styles.container}>
      {isChecked
        ? <RadioCheckedIcon />
        : <RadioUncheckedIcon />}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
  : (
    <TouchableOpacity onPress={handleCheck} style={styles.container}>
      {isChecked
        ? <CheckboxCheckedIcon />
        : <CheckboxUncheckedIcon />}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  ));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    color: colors.textLight,
  },
});

export default UiCheckbox;
