import React from 'react';
import {
  View, StyleSheet, Modal, Text, useWindowDimensions, TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import TextBtn from '../buttons/text-btn/text-btn';

const ModalWindow = ({
  title,
  text,
  visible,
  handleClose = () => {},
  agreeBtnText,
  disagreeBtnText,
  handleReturnBtn = () => {},
  handleAgreeBtn = () => {},
  withRating = false,
  titleStyles = {},
  rate,
  setRate,
}) => {
  const { width } = useWindowDimensions();
  const modalWindowStyles = { width: width - 60 };

  const handleAgree = () => {
    handleReturnBtn();
    handleAgreeBtn();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
    >
      <TouchableOpacity style={styles.modalBackground} onPress={handleClose}>
        <View style={{ ...styles.modalWindow, ...modalWindowStyles }}>
          {title && <Text style={{ ...styles.modalTitle, ...titleStyles }}>{title}</Text>}
          {withRating
          && (
          <View style={styles.ratingContainer}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rate}
              emptyStarColor={colors.rating}
              fullStarColor={colors.rating}
              starSize={27}
              selectedStar={setRate}
              containerStyle={styles.rating}
            />
          </View>
          )}
          {text && <Text style={styles.modalText}>{text}</Text>}
          <View style={styles.btnContainer}>
            <TextBtn
              text={disagreeBtnText}
              onPress={handleReturnBtn}
              color={colors.textPrimary}
              btnStyles={styles.btnStyles}
            />
            <TextBtn
              text={agreeBtnText}
              onPress={handleAgree}
              btnStyles={styles.btnAgree}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgModal,
  },
  modalWindow: {
    backgroundColor: colors.bgSecondary,
    padding: 24,
    borderRadius: 6,
  },
  ratingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  modalText: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
    marginBottom: 42,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rating: {
    width: 175,
    marginBottom: 50,
  },
  btnStyles: {
    marginRight: 24,
  },
  btnAgree: {
    marginRight: 0,
  },
});

export default ModalWindow;
