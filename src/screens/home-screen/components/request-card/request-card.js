import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import MailIcon from '../../../../components/icons/mail-icon';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import cutString from '../../../../helpers/cutString';
import MoreLessBtn from '../../../../components/buttons/more-less-btn/more-less-btn';
import transformDate from '../../../../helpers/transform-date';
import AttachmentsBlock from '../../../../components/attachments-block/attachments-block';

const RequestCard = ({
  titleRequest, dateRequest, textRequest, isReplied, handleRedirect, attachmentFiles,
}) => {
  const [isAllText, setIsAllText] = useState(false);

  const shortText = cutString(textRequest, 180);

  const handleShowAllText = () => setIsAllText(true);
  const handleHideAllText = () => setIsAllText(false);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={isReplied ? handleRedirect : () => {}}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {titleRequest}
        </Text>
        <MailIcon color={isReplied ? colors.primaryActive : colors.mediumGrey} />
      </View>
      <Text style={styles.cardDate}>
        {transformDate(dateRequest)}
      </Text>
      <AttachmentsBlock attachmentFiles={attachmentFiles} />
      <Text style={styles.cardText}>
        {isAllText ? textRequest : shortText}
        {shortText && shortText.length !== textRequest.length && (
          <MoreLessBtn
            text={isAllText ? 'Less' : 'More'}
            onPress={isAllText ? handleHideAllText : handleShowAllText}
          />
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
    maxWidth: '90%',
  },
  cardDate: {
    marginBottom: 16,
    fontSize: 10,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 22.6,
    letterSpacing: 0.44,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
});

export default RequestCard;
