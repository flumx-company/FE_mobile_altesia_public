import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import Input from '../../components/input/input';
import colors from '../../constants/colors';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import AttachFileBlock from '../../components/attach-file-block/attach-file-block';
import UiCustomSelect from '../../components/custom-select/ui-custom-select';
import { allCategoriesRequested } from '../../redux/community/actions';
import { getCategories, getCreateIssueError } from '../../redux/community/selectors';
import useCreateNewIssueFormik from '../../hooks/useCreateNewIssueFormik/useCreateNewIssueFormik';

const CommunityCreateIssue = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const createIssueError = useSelector(getCreateIssueError);

  const handleGoBack = () => navigation.goBack();

  const [attachFiles, setAttachFiles] = useState([]);
  const [category, setSelectCategory] = useState(null);
  const categoryId = categories && categories.find((item) => item.name === category) && categories.find((item) => item.name === category).id;

  useEffect(() => {
    dispatch(allCategoriesRequested());
  }, []);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useCreateNewIssueFormik(handleGoBack);

  values.id = categoryId;
  values.attachments = attachFiles;

  const isDisabledBtn = () => {
    if (values.title.length === 0) {
      return true;
    }
    if (values.description.length === 0) {
      return true;
    }
    return null;
  };

  return (
    <ScreenContainer>
      <BackBtn
        text="Back"
        onPress={handleGoBack}
        containerStyles={styles.backBtn}
      />
      <UiCustomSelect
        data={categories.filter((item) => item.id !== 'all')}
        title="Choose your category"
        placeholder="Category"
        selected={category}
        setSelected={setSelectCategory}
        withIcons={false}
        zIndex={4}
        error={errors.id}
      />
      <Input
        inputTitle="Title your question"
        placeholder="Type something"
        value={values.title}
        setValue={handleChange('title')}
        error={errors.title}
      />
      <Input
        inputTitle="Describe your question"
        placeholder="Type something"
        numberOfLines={5}
        multiline
        fieldStyles={styles.describeInput}
        value={values.description}
        setValue={handleChange('description')}
        error={errors.description}
      />
      <AttachFileBlock
        attachFiles={attachFiles}
        setAttachFiles={setAttachFiles}
        error={createIssueError}
      />
      <View style={styles.btnContainer}>
        <UiBtn
          text="Cancel"
          btnStyles={styles.cancelBtn}
          textStyles={styles.cancelBtnText}
          onPress={handleGoBack}
        />
        <UiBtn
          text="Send to moderation"
          btnStyles={styles.sendBtn}
          onPress={handleSubmit}
          disabled={isDisabledBtn()}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginBottom: 30,
  },
  describeInput: {
    height: 120,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    width: '40%',
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primaryActive,
  },
  cancelBtnText: {
    color: colors.primaryActive,
  },
  sendBtn: {
    width: '50%',
  },
});

export default CommunityCreateIssue;
