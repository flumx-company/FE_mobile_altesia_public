import React from 'react';
import {
  Modal, Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const ModalChooseFrom = ({
  visible = false,
  handleCloseModal = () => {},
  handleCamera = () => {},
  handleGallery = () => {},
  handleDocument = () => {},
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    supportedOrientations={['portrait', 'landscape']}
  >
    <TouchableOpacity style={styles.modalContainer} onPress={handleCloseModal}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Choose file from:
          </Text>
        </View>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.listBtn} onPress={handleCamera}>
            <Text style={styles.btnText}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listBtn} onPress={handleGallery}>
            <Text style={styles.btnText}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listBtn} onPress={handleDocument}>
            <Text style={styles.btnText}>
              File
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: 200,
    paddingHorizontal: 16,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: colors.bgSecondary,
  },
  titleContainer: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderColor: colors.mainGrey,
    marginBottom: 26,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  listBtn: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.bgPrimary,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.red,
  },
});

export default ModalChooseFrom;
