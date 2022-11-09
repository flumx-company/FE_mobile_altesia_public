import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import AllMineSwitch from '../../components/all-mine-switch/all-mine-switch';
import OpportunitiesCard from './components/opportunities-card';
import { getAllOpportunities, getMineOpportunities } from '../../redux/opportunities/selectors';
import routes from '../../routes';
import InfinityScrollList from '../../components/infinity-scroll-list/infinity-scroll-list';
import { allOpportunitiesRequested, mineOpportunitiesRequested, selectOpportunity } from '../../redux/opportunities/actions';
import EmptyMineBlock from '../../components/empty-mine-block/empty-mine-block';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const OpportunitiesMain = ({ navigation }) => {
  const [whose, setWhose] = useState('all');
  const [allPage, setAllPage] = useState(2);
  const [minePage, setMinePage] = useState(2);

  const allOpportunities = useSelector(getAllOpportunities);
  const mineOpportunities = useSelector(getMineOpportunities);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setAllPage(2);
      setMinePage(2);
      dispatch(allOpportunitiesRequested());
      dispatch(mineOpportunitiesRequested());
    }, [whose]),
  );

  const loadMoreAllOpportunities = () => {
    dispatch(allOpportunitiesRequested(allPage));
    setAllPage((prev) => prev + 1);
  };

  const loadMoreMineOpportunities = () => {
    dispatch(mineOpportunitiesRequested(minePage));
    setMinePage((prev) => prev + 1);
  };

  const handleChooseAll = () => setWhose('all');
  const handleChooseMine = () => setWhose('mine');

  const handleRedirectCreateAlert = () => navigation.navigate(routes.opportunities.opportunitiesSentAlerts);

  const renderCard = ({ item }) => {
    const handleRedirectCreateAlertById = () => {
      dispatch(selectOpportunity(item.id));
      const params = {
        id: item.id,
        opportunityTitle: item.title,
      };
      navigation.navigate(routes.opportunities.opportunitiesCreateAlert, params);
    };

    return (
      <OpportunitiesCard
        id={item.id}
        whose={whose}
        title={item.title}
        date={item.created_at}
        text={item.info}
        handleRedirect={handleRedirectCreateAlertById}
        isRecommended={item.is_recommended}
        attachmentFiles={item.attachmentFiles}
        userOpportunities={item.userOpportunities}
      />
    );
  };

  return (
    <ScreenContainer
      withFixedBtn
      withScroll={false}
      handleFixedBtn={handleRedirectCreateAlert}
      typeFixedBtn="alert"
    >
      {whose === 'all' ? <ScreenTitle title="Opportunities" /> : <Text style={styles.yourOpportunitiesText}>Here are your opportunities</Text>}
      <AllMineSwitch
        whose={whose}
        handleChooseAll={handleChooseAll}
        handleChooseMine={handleChooseMine}
      />
      {whose === 'mine' && mineOpportunities.length === 0
        ? (
          <EmptyMineBlock
            onPress={handleChooseAll}
            text="You don't have any applied opportunitites yet Search one with the button below"
            textBtn="Show opportunities"
          />
        )
        : (
          <InfinityScrollList
            data={whose === 'all' ? allOpportunities : mineOpportunities}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={whose === 'all' ? loadMoreAllOpportunities : loadMoreMineOpportunities}
          />
        )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  yourOpportunitiesText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
    marginBottom: 30,
    marginTop: 40,
  },
});

export default OpportunitiesMain;
