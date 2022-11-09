import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating';
import Avatar from '../avatar/avatar';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import ModalWindow from '../../../../components/modal-window/modal-window';
import { rateResponseByIdRequested } from '../../../../redux/community/actions';
import transformDate from '../../../../helpers/transform-date';
import AttachmentsBlock from '../../../../components/attachments-block/attachments-block';
import { getActualRateAfterRating } from '../../../../redux/community/selectors';

const RespondItem = ({
  date, text, isLatest, id, rating, firstName, lastName, attachmentFiles, averageRating,
}) => {
  const [showRateModal, setShowRateModal] = useState(false);
  const actualRateAfterRating = useSelector(getActualRateAfterRating);
  const dispatch = useDispatch();

  const [rate, setRate] = useState(averageRating);

  const handleOpenRateModal = () => setShowRateModal(true);
  const handleCloseRateModal = () => {
    setShowRateModal(false);
    setRate(averageRating);
  };

  const handleRateResponse = () => {
    if (rating.length || actualRateAfterRating.idRate) {
      if(actualRateAfterRating.idRate){
        dispatch(rateResponseByIdRequested(id, actualRateAfterRating.idRate, rate, true));
      } else {
        dispatch(rateResponseByIdRequested(id, rating[0].id, rate, true));
      }
    } else {
      dispatch(rateResponseByIdRequested(id, null, rate, false));
    }
    if (actualRateAfterRating) {
      setRate(actualRateAfterRating);
    }
    setShowRateModal(false);
  };

  const handleBack = () => {
    setShowRateModal(false);
    setRate(averageRating);
  };

  useEffect(() => {
    if (actualRateAfterRating.idResponse === id) {
      setRate(actualRateAfterRating.rate);
    }
  }, [actualRateAfterRating]);

  return (
    <View style={styles.respondContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            styleContainer={styles.avatar}
            lastName={lastName}
            firstName={firstName}
          />
          <Text style={styles.dateText}>
            {transformDate(date)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleOpenRateModal}>
          <StarRating
            disabled
            maxStars={5}
            rating={rate}
            emptyStarColor={colors.rating}
            fullStarColor={colors.rating}
            starSize={14}
            selectedStar={setRate}
            containerStyle={styles.rating}
          />
        </TouchableOpacity>
      </View>
      <AttachmentsBlock attachmentFiles={attachmentFiles} />
      <Text style={styles.respondText}>
        {text}
      </Text>
      <ModalWindow
        title="Would you like to rate this answer?"
        agreeBtnText="save"
        disagreeBtnText="cancel"
        visible={showRateModal}
        withRating
        id={id}
        rate={rate}
        setRate={setRate}
        handleAgreeBtn={handleRateResponse}
        handleReturnBtn={handleBack}
        handleClose={handleCloseRateModal}
      />
      {isLatest && (
        <View style={styles.latestContainer}>
          <Text style={styles.latestText}>
            Yesterday
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  respondContainer: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 10,
    color: colors.textLight,
    fontFamily: fonts.primaryRegular,
  },
  respondText: {
    fontSize: 14,
    lineHeight: 18.2,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  latestContainer: {
    height: 32,
    width: 64,
    backgroundColor: colors.bgPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.mainGrey,
    position: 'absolute',
    left: '50%',
    top: -16,
    zIndex: 10,
  },
  latestText: {
    fontSize: 10,
    fontFamily: fonts.primaryRegular,
    color: colors.textSuperLight,
  },
});

export default RespondItem;
