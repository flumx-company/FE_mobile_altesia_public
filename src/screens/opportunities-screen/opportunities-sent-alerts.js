import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import AlertCard from './components/alert-card';
import { getAlertsOpportunities } from '../../redux/opportunities/selectors';
import { allUsersAlertsRequested } from '../../redux/opportunities/actions';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import InfinityScrollList from '../../components/infinity-scroll-list/infinity-scroll-list';
import routes from '../../routes';

const OpportunitiesSentAlerts = ({ navigation }) => {
  const [page, setPage] = useState(2);

  const dispatch = useDispatch();

  const alerts = useSelector(getAlertsOpportunities);

  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    dispatch(allUsersAlertsRequested());
  }, []);

  const renderAlert = ({ item }) => {
    const handleRedirectResponds = () => {
      const params = {
        alertId: item.id,
      };
      navigation.navigate(routes.opportunities.opportunitiesAlertResponds, params);
    };
    return (
      <AlertCard
        opportunityTitle={item.opportunity.title}
        isReplied={item.is_replied}
        title={item.title}
        text={item.description}
        date={item.created_at}
        isNewAlert={item.isNewAlert}
        handleRedirect={handleRedirectResponds}
        attachmentFiles={item.attachmentFiles}
      />
    );
  };

  const loadMoreAlerts = () => {
    dispatch(allUsersAlertsRequested(page));
    setPage((prev) => prev + 1);
  };

  return alerts.length
    ? (
      <ScreenContainer
        withScroll={false}
      >
        <BackBtn onPress={handleGoBack} />
        <ScreenTitle
          title="Sent Alerts"
          titleStyles={styles.title}
        />
        <InfinityScrollList
          data={alerts}
          renderItem={renderAlert}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreAlerts}
        />
      </ScreenContainer>
    )
    : (
      <ScreenContainer>
        <BackBtn onPress={handleGoBack} />
        <ScreenTitle title="Sent Alerts" />
        <Text style={styles.text}>
          You don’t have any alerts yet.
          {'\n'}
          Create one with the button above
        </Text>
      </ScreenContainer>
    );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 0,
  },
  text: {
    marginBottom: 29,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: 0.22,
    textAlign: 'center',
    fontFamily: fonts.secondaryMedium,
    color: colors.mainGrey,
  },
});

export default OpportunitiesSentAlerts;
