import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';
import Avatar from '../avatar/avatar';
import TextBtn from '../../../../components/buttons/text-btn/text-btn';
import transformDate from '../../../../helpers/transform-date';
import AttachmentsBlock from '../../../../components/attachments-block/attachments-block';

const IssueItem = ({
  date,
  title,
  text,
  onPress = () => {},
  withRespond = false,
  openRespondModal = () => {},
  firstName,
  lastName,
  attachmentFiles = [],
}) => (
  <View style={styles.container}>
    <View style={styles.avatarContainer}>
      <Avatar
        firstName={firstName}
        lastName={lastName}
        styleContainer={styles.avatar}
      />
      <Text style={styles.dataText}>
        {transformDate(date)}
      </Text>
    </View>
    <AttachmentsBlock attachmentFiles={attachmentFiles} />
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    <Text style={styles.text}>{text}</Text>
    {withRespond && <TextBtn onPress={openRespondModal} text="respond" />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,
  },
  avatarContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  dataText: {
    fontSize: 10,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  title: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
  },
  text: {
    marginBottom: 17,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
});

export default IssueItem;
