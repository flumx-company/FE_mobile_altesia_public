import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import CategoryBtn from './components/category-btn/category-btn';
import colors from '../../constants/colors';
import IssueItem from './components/issue-item/issue-item';
import { getCategories, getIssues, getSelectedCategoryId } from '../../redux/community/selectors';
import routes from '../../routes';
import { questionsByCategoryIdRequested, selectCategoryAction } from '../../redux/community/actions';
import InfinityScrollList from '../../components/infinity-scroll-list/infinity-scroll-list';
import GoBackBlock from './components/go-back-block/go-back-block';

const CommunityCategory = ({ navigation }) => {
  const [page, setPage] = useState(2);
  const [whose, setWhose] = useState('all');

  const dispatch = useDispatch();

  const issues = useSelector(getIssues);
  const categories = useSelector(getCategories);
  const selectedCategoryId = useSelector(getSelectedCategoryId);

  const handleCreateIssue = () => navigation.navigate(routes.community.communityCreateIssue);
  const handleGoBack = () => navigation.goBack();

  const handleChooseAll = () => setWhose('all');
  const handleChooseMine = () => setWhose('mine');

  useEffect(() => {
    dispatch(questionsByCategoryIdRequested(selectedCategoryId, null, whose));
    setPage(2);
  }, [selectedCategoryId, whose]);

  const categoriesList = categories.map((item) => {
    const handleSelectCategory = () => {
      dispatch(selectCategoryAction(item.id));
      setPage(2);
    };
    return (
      <CategoryBtn
        key={item.id}
        text={item.name}
        isActive={item.isSelected}
        onPress={handleSelectCategory}
        containerStyle={styles.categoryBtn}
      />
    );
  });

  const loadMoreQuestions = () => {
    dispatch(questionsByCategoryIdRequested(selectedCategoryId, page, whose));
    setPage((prev) => prev + 1);
  };

  const renderIssueItem = ({ item }) => {
    const handleRedirectToIssue = () => {
      const params = {
        isMine: item.isMine,
        idIssue: item.id,
      };
      navigation.navigate(routes.community.communityIssue, params);
    };

    return (
      <IssueItem
        firstName={item.user.first_name}
        lastName={item.user.last_name}
        name={item.name}
        date={item.updated_at}
        title={item.title}
        text={item.description}
        onPress={handleRedirectToIssue}
        attachmentFiles={item.attachmentFiles}
      />
    );
  };

  return (
    <ScreenContainer
      fullWidth
      withScroll={false}
      withFixedBtn
      handleFixedBtn={handleCreateIssue}
    >
      <GoBackBlock
        handleGoBack={handleGoBack}
        handleChooseAll={handleChooseAll}
        handleChooseMine={handleChooseMine}
        whose={whose}
      />
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.scrollContainer}
        >
          {categoriesList}
        </ScrollView>
      </View>
      <InfinityScrollList
        data={issues}
        renderItem={renderIssueItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreQuestions}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.mainGrey,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainGrey,
  },
  scrollContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBtn: {
    marginBottom: 0,
  },
});

export default CommunityCategory;
