import React, { useEffect } from 'react';
import {
  Text, StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import MailIcon from '../../components/icons/mail-icon';
import { getRequestRespond } from '../../redux/home/selectors';
import { getRequestRespondById } from '../../redux/home/actions';
import transformDate from '../../helpers/transform-date';
import AttachmentsBlock from '../../components/attachments-block/attachments-block';

const HomeRequestResponse = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const handleGoBack = () => navigation.goBack();

  const requestRespond = useSelector(getRequestRespond);

  useEffect(() => {
    if (route.params) {
      dispatch(getRequestRespondById(route.params.requestId));
    }
  }, [route]);

  return (
    <ScreenContainer>
      <BackBtn onPress={handleGoBack} />
      <ScreenTitle
        title="Request response"
        titleStyles={styles.sentTitle}
      />
      <View style={styles.cardContainer}>
        <View style={styles.requestContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              {requestRespond.title}
            </Text>
            <MailIcon color={colors.primaryActive} />
          </View>
          <Text style={styles.cardDate}>
            {transformDate(requestRespond.created_at)}
          </Text>
          <Text style={styles.cardText}>
            {requestRespond.description}
          </Text>
        </View>
        <AttachmentsBlock attachmentFiles={requestRespond.attachmentFiles} />
        <Text style={styles.cardTitle}>
          Response from admin
        </Text>
        <Text style={styles.cardDate}>
          {transformDate(requestRespond.updated_at)}
        </Text>
        <Text style={styles.cardText}>
          {requestRespond.replied_description}
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  requestContainer: {
    marginBottom: 20,
  },
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

export default HomeRequestResponse;
