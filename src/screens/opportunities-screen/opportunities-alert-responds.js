import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import { alertRespondByIdRequested } from '../../redux/opportunities/actions';
import { getAlertRespond } from '../../redux/opportunities/selectors';
import transformDate from '../../helpers/transform-date';
import AttachmentsBlock from '../../components/attachments-block/attachments-block';

const OpportunitiesAlertResponds = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const alertRespond = useSelector(getAlertRespond);

  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    if (route.params.alertId) {
      dispatch(alertRespondByIdRequested(route.params.alertId));
    }
  }, []);

  return (
    <ScreenContainer>
      <BackBtn onPress={handleGoBack} />
      <ScreenTitle
        title="Alert Respond"
        titleStyles={styles.titleScreen}
      />
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>
            {alertRespond.opportunityAlert && alertRespond.opportunityAlert.title}
          </Text>
          <Text style={styles.date}>
            {transformDate(alertRespond.opportunityAlert && alertRespond.opportunityAlert.created_at)}
          </Text>
          <Text style={styles.text}>
            {alertRespond.opportunityAlert && alertRespond.opportunityAlert.description}
          </Text>
        </View>
        <AttachmentsBlock attachmentFiles={alertRespond.attachmentFiles} />
        <Text style={styles.title}>
          Respond from admin
        </Text>
        <Text style={styles.date}>
          {transformDate(alertRespond.opportunityAlert && alertRespond.opportunityAlert.updated_at)}
        </Text>
        <Text style={styles.text}>
          {alertRespond.reply}
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  titleScreen: {
    marginTop: 0,
  },
  container: {
    width: '100%',
    padding: 24,
    borderRadius: 3,
    backgroundColor: colors.bgSecondary,
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
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
  alertContainer: {
    marginBottom: 20,
  },
});

export default OpportunitiesAlertResponds;
