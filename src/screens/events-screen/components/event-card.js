import React, { useState } from 'react';
import {
  Image, Text, View, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import cutString from '../../../helpers/cutString';
import ModalWindow from '../../../components/modal-window/modal-window';
import TextBtn from '../../../components/buttons/text-btn/text-btn';
import MoreLessBtn from '../../../components/buttons/more-less-btn/more-less-btn';
import { attachEventRequested, detachEventRequested, dropDownEventRequested } from '../../../redux/events/actions';
import transformDate from '../../../helpers/transform-date';

const EventCard = ({
  whoseEvents,
  title,
  text,
  date,
  id,
  imgUri,
  maxAttendanceNumber,
  userEvents,
  countOfAppliedUsers,
}) => {
  const [isAllText, setIsAllText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const isDisableYesBtn = () => countOfAppliedUsers >= maxAttendanceNumber;

  const isDisabledBtn = () => {
    if (!userEvents.length) {
      return false;
    }
    return !userEvents[0].is_interesting;
  };

  const shortText = cutString(text, 180);

  const dispatch = useDispatch();

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleAttachEvent = () => dispatch(attachEventRequested(id));
  const handleDetachEvent = () => dispatch(detachEventRequested(id));
  const handleDropDownEvent = () => dispatch(dropDownEventRequested(id));

  const handleShowAllText = () => setIsAllText(true);
  const handleHideAllText = () => setIsAllText(false);

  return (
    <View style={styles.cardContainer}>
      {imgUri && <Image source={{ uri: imgUri }} style={styles.cardImage} />}
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{transformDate(date)}</Text>
        <Text style={styles.cardText}>
          {isAllText ? text : shortText}
          {shortText && shortText.length !== text.length && (
          <MoreLessBtn
            text={isAllText ? 'Less' : 'More'}
            onPress={isAllText ? handleHideAllText : handleShowAllText}
          />
          )}
        </Text>
        {whoseEvents === 'mine' ? (
          <View style={styles.btnContainer}>
            <TextBtn text="cancel" onPress={handleOpenModal} />
            <Text style={styles.textResponded}>
              {userEvents && userEvents.length}
              {' '}
              /
              {maxAttendanceNumber}
              {'  '}
              Responded
            </Text>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <View style={styles.btnGroup}>
              <TextBtn
                text="yes"
                onPress={handleAttachEvent}
                isDisabled={isDisableYesBtn()}
              />
              <TextBtn
                text="no"
                onPress={handleOpenModal}
                color={colors.textPrimary}
                isDisabled={isDisabledBtn()}
              />
            </View>
            <Text style={styles.textResponded}>
              {userEvents && userEvents.length}
              {' '}
              /
              {maxAttendanceNumber}
              {'  '}
              Responded
            </Text>
          </View>
        ) }
      </View>
      <ModalWindow
        title="Are you sure?"
        text={whoseEvents === 'mine' ? 'You want to cancel your participation in this event' : 'You want to remove this event'}
        agreeBtnText="Cancel"
        disagreeBtnText="Back"
        handleReturnBtn={handleCloseModal}
        handleAgreeBtn={whoseEvents === 'mine' ? handleDetachEvent : handleDropDownEvent}
        visible={modalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 3,
    backgroundColor: colors.bgSecondary,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 24,
    fontFamily: fonts.primaryBold,
  },
  cardDate: {
    marginBottom: 16,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: colors.textLight,
  },
  cardText: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  textResponded: {
    fontSize: 12,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  btnGroup: {
    flexDirection: 'row',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

export default EventCard;
