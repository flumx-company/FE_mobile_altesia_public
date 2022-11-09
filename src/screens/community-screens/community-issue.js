import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import CategoryBtn from './components/category-btn/category-btn';
import colors from '../../constants/colors';
import IssueItem from './components/issue-item/issue-item';
import {
  getResponds, getSelectedCategory, getSelectedIssue,
} from '../../redux/community/selectors';
import RespondItem from './components/respond-item/respond-item';
import ModalWindow from '../../components/modal-window/modal-window';
import routes from '../../routes';
import UiCustomSelect from '../../components/custom-select/ui-custom-select';
import { getIssueByIdRequested, responsesByQuestionIdRequested } from '../../redux/community/actions';
import InfinityScrollList from '../../components/infinity-scroll-list/infinity-scroll-list';
import { useFocusEffect } from '@react-navigation/native';

export const sortBy = [
  { key: '1', name: 'Highest rate first' },
  { key: '2', name: 'Lowest rate first' },
  { key: '3', name: 'Last date first' },
  { key: '4', name: 'Old date first' },
];

const respondTypes = {
  all: 'all',
  direct: 'direct',
};

const sortParams = (selected) => {
  switch (selected) {
    case sortBy[0].name:
      return [null, null, null, 'highestRate'];
    case sortBy[1].name:
      return [null, null, 'lowestRate', null];
    case sortBy[2].name:
      return [null, 'oldest', null, null];
    case sortBy[3].name:
      return ['newest', null, null, null];
    default:
      return [];
  }
};

const CommunityIssue = ({ navigation, route }) => {
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const [whichResponds, setWhichResponds] = useState(respondTypes.all);
  const [page, setPage] = useState(2);

  const dispatch = useDispatch();

  const responds = useSelector(getResponds);
  const selectedCategory = useSelector(getSelectedCategory);
  const selectedIssue = useSelector(getSelectedIssue);

  const ref = useRef(null);

  useEffect(() => {
    if (route.params.idIssue) {
      dispatch(getIssueByIdRequested(route.params.idIssue));
    }
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(responsesByQuestionIdRequested(route.params.idIssue, undefined, whichResponds, ...sortParams(selectedSortBy)));
      setPage(2);
    }, [route, whichResponds, selectedSortBy]),
  );

  const loadMoreResponses = () => {
    dispatch(responsesByQuestionIdRequested(route.params.idIssue, page, whichResponds, ...sortParams(selectedSortBy)));
    setPage((prev) => prev + 1);
  };

  const handleScrollTop = () => {
    if (ref) {
      ref.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const handleChooseAllResponds = () => setWhichResponds(respondTypes.all);
  const handleChooseDirectResponds = () => setWhichResponds(respondTypes.direct);

  const handleOpenRespondModal = () => setShowRespondModal(true);
  const handleCloseRespondModal = () => setShowRespondModal(false);

  const handleGoBack = () => navigation.goBack();

  const handleRedirectRespondDirect = () => {
    setShowRespondModal(false);

    const params = {
      id: selectedIssue.id,
      title: selectedIssue.title,
      responseType: respondTypes.direct,
    };

    return navigation.navigate(routes.community.communityRespondIssue, params);
  };

  const handleRedirectRespondIssue = () => {
    setShowRespondModal(false);

    const params = {
      id: selectedIssue.id,
      title: selectedIssue.title,
      responseType: respondTypes.all,
    };

    return navigation.navigate(routes.community.communityRespondIssue, params);
  };

  const renderItem = ({ item }) => (
    <RespondItem
      firstName={item.user.first_name}
      lastName={item.user.last_name}
      key={item.id}
      id={item.id}
      text={item.answer}
      date={item.updated_at}
      isLatest={item.isLatest}
      rating={item.communityRatings}
      averageRating={item.averageRating}
      attachmentFiles={item.attachmentFiles}
    />
  );

  return (
    <ScreenContainer
      fullWidth
      withFixedBtn
      handleScroll={handleScrollTop}
      withScroll={false}
      typeFixedBtn="arrowTop"
    >
      <BackBtn
        text={selectedCategory.title}
        onPress={handleGoBack}
        containerStyles={styles.backBtn}
      />
      <View style={styles.filterContainer}>
        <View style={styles.switchContainer}>
          <CategoryBtn
            onPress={handleChooseAllResponds}
            text="All"
            isActive={whichResponds === respondTypes.all}
            containerStyle={styles.filterBtn}
          />
          <CategoryBtn
            onPress={handleChooseDirectResponds}
            text="Direct Responses"
            isActive={whichResponds === respondTypes.direct}
            containerStyle={styles.filterBtn}
          />
        </View>
        <UiCustomSelect
          placeholder="Sort By"
          isRadio
          selected={selectedSortBy}
          setSelected={setSelectedSortBy}
          data={sortBy}
          arrowIconColor={colors.primaryActive}
          containerStyles={styles.selectContainer}
          btnStyles={styles.selectBtn}
          placeholderStyles={styles.selectPlaceholder}
          selectedTextStyles={styles.selectText}
          listStyles={Platform.OS === 'ios' ? styles.selectList : {}}
          arrowStyles={styles.selectArrowIcon}
        />
      </View>
      <InfinityScrollList
        reference={ref}
        data={responds}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreResponses}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <IssueItem
            firstName={selectedIssue.user && selectedIssue.user.first_name}
            lastName={selectedIssue.user && selectedIssue.user.last_name}
            title={selectedIssue.title}
            text={selectedIssue.description}
            date={selectedIssue.updated_at}
            withRespond={!route.params.isMine}
            openRespondModal={handleOpenRespondModal}
            attachmentFiles={selectedIssue.attachmentFiles && selectedIssue.attachmentFiles.length && selectedIssue.attachmentFiles}
          />
        )}
      />
      <ModalWindow
        title="Would you like to make a common respond or directly to the author?"
        agreeBtnText="Common"
        disagreeBtnText="Direct"
        titleStyles={styles.modalTitle}
        visible={showRespondModal}
        handleClose={handleCloseRespondModal}
        handleReturnBtn={handleRedirectRespondDirect}
        handleAgreeBtn={handleRedirectRespondIssue}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.mainGrey,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,
    zIndex: 2,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  backBtn: {
    marginLeft: 15,
  },
  filterBtn: {
    marginBottom: 0,
    marginRight: 13,
  },
  modalTitle: {
    marginBottom: 45,
  },
  selectContainer: {
    width: 130,
    marginBottom: 0,
  },
  selectBtn: {
    height: 32,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: colors.primaryActive,
    backgroundColor: colors.transparent,
  },
  selectPlaceholder: {
    color: colors.primaryActive,
    fontSize: 14,
  },
  selectText: {
    color: colors.primaryActive,
    fontSize: 14,
  },
  selectList: {
    width: 186,
    left: -55,
    top: 32,
    borderTopWidth: 1,
    borderRadius: 4,
  },
  selectArrowIcon: {
    marginRight: 0,
  },
});

export default CommunityIssue;
