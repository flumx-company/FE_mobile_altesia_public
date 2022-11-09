import React, { useState } from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import DetailsIcon from '../../../components/icons/details-icon';
import LogoutIcon from '../../../components/icons/logout-icon';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import ModalWindow from '../../../components/modal-window/modal-window';
import { loginSucceed } from '../../../redux/auth/action';
import { storageRemoveLoginToken } from '../../../services/asyncStorage';

const LogoutBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleOpenModal = () => {
    setModalVisible(true);
    setIsOpen(false);
  };
  const handleCloseModal = () => setModalVisible(false);
  const handleLogOut = () => {
    dispatch(loginSucceed(null));
    storageRemoveLoginToken();
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggle}>
        <DetailsIcon />
      </TouchableOpacity>
      {isOpen && (
      <TouchableOpacity style={styles.logoutBtn} onPress={handleOpenModal}>
        <LogoutIcon />
        <Text style={styles.logoutText}>
          Log out
        </Text>
      </TouchableOpacity>
      )}
      <ModalWindow
        title="Are you sure?"
        text="You want to log out of your account. Are you sure?"
        agreeBtnText="Yes, log out"
        disagreeBtnText="Back"
        handleReturnBtn={handleCloseModal}
        handleAgreeBtn={handleLogOut}
        visible={modalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    position: 'absolute',
    width: 92,
    height: 40,
    top: 22,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.bgSecondary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,

  },
});

export default LogoutBtn;
