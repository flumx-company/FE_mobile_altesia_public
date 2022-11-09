import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenTitle from '../../components/screen-title/screen-title';
import ScreenContainer from '../../components/screen-container/screen-container';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import CategoryBtn from './components/category-btn/category-btn';
import routes from '../../routes';
import { getCategories } from '../../redux/community/selectors';
import { allCategoriesRequested, selectCategoryAction } from '../../redux/community/actions';

const CommunityGeneral = ({ navigation }) => {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCategoriesRequested());
  }, []);

  const handleCreateIssue = () => navigation.navigate(routes.community.communityCreateIssue);

  const categoriesList = categories.map((item) => {
    const handleSelectCategory = () => {
      navigation.navigate(routes.community.communityCategory);
      dispatch(selectCategoryAction(item.id));
    };
    return (
      <CategoryBtn
        text={item.name}
        key={item.id}
        id={item.id}
        onPress={handleSelectCategory}
      />
    );
  });

  return (
    (
      <ScreenContainer withFixedBtn handleFixedBtn={handleCreateIssue}>
        <ScreenTitle title="Ask our community" />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Post your question in appropriate category or browse existed
          </Text>
          <View style={styles.categoryContainer}>
            {categoriesList}
          </View>
        </View>
      </ScreenContainer>
    )
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: 300,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 20.8,
    textAlign: 'center',
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
  },
  categoryContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CommunityGeneral;
