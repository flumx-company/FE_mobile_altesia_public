import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors';
import PlusIcon from '../../icons/plus-icon';
import ArrowTopIcon from '../../icons/arrow-top-icon';
import AlertIcon from '../../icons/alert-icon';

const btnTypes = {
  plus: 'plus',
  alert: 'alert',
  arrowTop: 'arrowTop',
};

const FixedBtn = ({ onPress, type }) => {
  const getIcon = () => {
    switch (type) {
      case btnTypes.plus:
        return <PlusIcon />;
      case btnTypes.arrowTop:
        return <ArrowTopIcon />;
      case btnTypes.alert:
        return <AlertIcon />;
      default:
        return <PlusIcon />;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      {getIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    backgroundColor: colors.primaryActive,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4.65,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default FixedBtn;
