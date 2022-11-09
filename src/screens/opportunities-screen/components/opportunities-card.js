import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import TextBtn from '../../../components/buttons/text-btn/text-btn';
import cutString from '../../../helpers/cutString';
import MoreLessBtn from '../../../components/buttons/more-less-btn/more-less-btn';
import ModalWindow from '../../../components/modal-window/modal-window';
import { attachOpportunityRequested, detachOpportunityRequested, dropDownOpportunityRequested } from '../../../redux/opportunities/actions';
import transformDate from '../../../helpers/transform-date';
import AttachmentsBlock from '../../../components/attachments-block/attachments-block';

const OpportunitiesCard = ({
  whose, title, text, date, handleRedirect, id, isRecommended, attachmentFiles, userOpportunities,
}) => {
  const [isAllText, setIsAllText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAttachOpportunityById = () => dispatch(attachOpportunityRequested(id));
  const handleDetachOpportunityById = () => {
    dispatch(detachOpportunityRequested(id));
    setModalVisible(false);
  };

  const isDisabledBtn = () => {
    if (!userOpportunities.length) {
      return false;
    }
    return !userOpportunities[0].is_interesting;
  };

  const handleDropDownOpportunityById = () => {
    dispatch(dropDownOpportunityRequested(id));
    setModalVisible(false);
  };

  const shortText = cutString(text, 180);

  const handleShowAllText = () => setIsAllText(true);
  const handleHideAllText = () => setIsAllText(false);

  const handleCloseModal = () => setModalVisible(false);
  const handleOpenModal = () => setModalVisible(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.date}>
        {transformDate(date)}
      </Text>
      <AttachmentsBlock attachmentFiles={attachmentFiles} />
      <Text style={styles.text}>
        {isAllText ? text : shortText}
        {text.length !== shortText.length && (
        <MoreLessBtn
          text={isAllText ? 'Less' : 'More'}
          onPress={isAllText ? handleHideAllText : handleShowAllText}
        />
        )}
      </Text>
      {whose === 'all'
        ? (
          <View style={styles.btnContainer}>
            <View style={styles.btnGroup}>
              <TextBtn
                text="yes"
                onPress={handleAttachOpportunityById}
              />
              <TextBtn
                text="no"
                color={colors.textPrimary}
                onPress={handleOpenModal}
                isDisabled={isDisabledBtn()}
              />
            </View>
            {
              isRecommended
                ? (
                  <Text style={styles.recommendedText}>
                    Recommended
                  </Text>
                )
                : (
                  <TextBtn
                    text="I know someone"
                    color={colors.textLight}
                    onPress={handleRedirect}
                    textStyles={styles.IKnowText}
                    btnStyles={styles.IKnowBtn}
                  />
                )
            }
          </View>
        )
        : (
          <View style={styles.btnContainer}>
            <TextBtn text="cancel" onPress={handleOpenModal} />
            {
              isRecommended
                ? (
                  <Text style={styles.recommendedText}>
                    Recommended
                  </Text>
                )
                : (
                  <TextBtn
                    text="I know someone"
                    color={colors.textLight}
                    onPress={handleRedirect}
                    textStyles={styles.IKnowText}
                    btnStyles={styles.IKnowBtn}
                  />
                )
            }
          </View>
        )}
      <ModalWindow
        title="Are you sure?"
        text="You are not interested in this position anymore"
        agreeBtnText="Confirm"
        disagreeBtnText="Back"
        handleReturnBtn={handleCloseModal}
        handleAgreeBtn={whose === 'mine' ? handleDetachOpportunityById : handleDropDownOpportunityById}
        visible={modalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    borderRadius: 3,
    backgroundColor: colors.bgSecondary,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
    lineHeight: 22.4,
    marginBottom: 16,
  },
  btnGroup: {
    flexDirection: 'row',
  },
  IKnowText: {
    textTransform: 'none',
  },
  IKnowBtn: {
    marginRight: 0,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  recommendedText: {
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    color: colors.mainGrey,
  },
});

export default OpportunitiesCard;
