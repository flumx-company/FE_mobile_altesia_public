import React, { useState } from 'react';
import { View } from 'react-native';
import UiCheckbox from '../../../components/custom-checkbox/ui-checkbox';

const CheckboxList = ({ data = [] }) => {
  const [list, setList] = useState(data);

  const handleCheck = (text) => {
    setList((prev) => prev.map((el) => {
      if (text === el.text) {
        return {
          ...el,
          isChecked: !el.isChecked,
        };
      }
      return {
        ...el,
        isChecked: false,
      };
    }));
  };

  const checkboxList = list.map((el) => (
    <UiCheckbox
      key={el.text}
      text={el.text}
      isChecked={el.isChecked}
      handleCheck={handleCheck}
    />
  ));

  return (
    <View>
      {checkboxList}
    </View>
  );
};

export default CheckboxList;
