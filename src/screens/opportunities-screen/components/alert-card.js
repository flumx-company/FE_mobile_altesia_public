import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import cutString from '../../../helpers/cutString';
import MoreLessBtn from '../../../components/buttons/more-less-btn/more-less-btn';
import transformDate from '../../../helpers/transform-date';
import MailIcon from '../../../components/icons/mail-icon';
import ArrowBeforeIcon from '../../../components/icons/arrow-before-icon';
import AttachmentsBlock from '../../../components/attachments-block/attachments-block';

const AlertCard = ({
  title, text, date, isReplied, opportunityTitle, handleRedirect, attachmentFiles,
}) => {
  const [isAllText, setIsAllText] = useState(false);

  const shortText = cutString(text, 180);

  const handleShowAllText = () => setIsAllText(true);
  const handleHideAllText = () => setIsAllText(false);

  return (
    <TouchableOpacity style={styles.container} onPress={isReplied ? handleRedirect : () => {}}>
      <View style={styles.opportunityTitleContainer}>
        <ArrowBeforeIcon />
        <Text style={styles.opportunityTitleText}>
          {opportunityTitle}
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>
        <MailIcon color={isReplied ? colors.primaryActive : colors.mainGrey} />
      </View>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    marginBottom: 16,
    borderRadius: 3,
    backgroundColor: colors.bgSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
    maxWidth: '90%',
  },
  date: {
    marginBottom: 16,
    fontSize: 10,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  text: {
    fontSize: 16,
    lineHeight: 22.4,
    letterSpacing: 0.44,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  opportunityTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  opportunityTitleText: {
    marginLeft: 10,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: colors.textLight,
  },
});

export default AlertCard;
