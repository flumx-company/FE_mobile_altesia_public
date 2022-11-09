import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import MailIcon from '../../components/icons/mail-icon';
import RequestCard from './components/request-card/request-card';
import routes from '../../routes';
import InfinityScrollList from '../../components/infinity-scroll-list/infinity-scroll-list';
import { ownFeaturesRequested } from '../../redux/home/actions';
import { getRequests } from '../../redux/home/selectors';

const HomeMain = ({ navigation }) => {
  const [page, setPage] = useState(2);

  const dispatch = useDispatch();
  const requests = useSelector(getRequests);

  const handleCreateRequest = () => navigation.navigate(routes.home.homeRequestFeature);

  const renderRequestItem = ({ item }) => {
    const handleRedirect = () => {
      const params = {
        requestId: item.id,
      };
      navigation.navigate(routes.home.homeRequestRespond, params);
    };

    return (
      <RequestCard
        key={item.id}
        isReplied={item.is_replied}
        titleRequest={item.title}
        textRequest={item.description}
        dateRequest={item.created_at}
        handleRedirect={handleRedirect}
        attachmentFiles={item.attachmentFiles}
      />
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(ownFeaturesRequested());
    }, []),
  );

  const loadMoreRequests = () => {
    dispatch(ownFeaturesRequested(page));
    setPage((prev) => prev + 1);
  };

  return requests && requests.length ? (
    <ScreenContainer
      withFixedBtn
      withScroll={false}
      handleFixedBtn={handleCreateRequest}
    >
      <ScreenTitle
        title="Sent requests"
        titleStyles={styles.sentTitle}
      />
      <InfinityScrollList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRequestItem}
        onEndReached={loadMoreRequests}
      />
    </ScreenContainer>
  )
    : (
      <ScreenContainer>
        <ScreenTitle
          title="Request a feature"
          titleStyles={styles.requestTitle}
        />
        <Text style={styles.text}>
          Request a feature to Admin of the Altesia
        </Text>
        <TouchableOpacity style={styles.requestBtn} onPress={handleCreateRequest}>
          <MailIcon />
          <Text style={styles.requestBtnText}>
            Request a feature
          </Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
};

const styles = StyleSheet.create({
  requestTitle: {
    marginTop: 72,
  },
  text: {
    marginBottom: 23,
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    color: colors.mainGrey,
  },
  requestBtn: {
    width: 265,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.primaryActive,
  },
  requestBtnText: {
    marginLeft: 12,
    fontSize: 21,
    fontFamily: fonts.primaryMedium,
    color: colors.bgPrimary,
    letterSpacing: 0.68,
  },
  sentTitle: {

  },
});

export default HomeMain;
