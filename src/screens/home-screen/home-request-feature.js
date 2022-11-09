import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import Input from '../../components/input/input';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import colors from '../../constants/colors';
import useFeatureRequestFormik from '../../hooks/useFeatureRequestFormik/useFeatureRequestFormik';
import AttachFileBlock from '../../components/attach-file-block/attach-file-block';
import { getCreateFeatureRequest } from '../../redux/home/selectors';

const HomeRequestFeature = ({ navigation }) => {
  const [attachFiles, setAttachFiles] = useState([]);
  const createFeatureRequestError = useSelector(getCreateFeatureRequest);

  const handleGoBack = () => navigation.goBack();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useFeatureRequestFormik(handleGoBack);

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
      <BackBtn onPress={handleGoBack} />
      <ScreenTitle title="Request a feature" />
      <Input
        value={values.title}
        setValue={handleChange('title')}
        placeholder="Type something"
        inputTitle="Title"
        error={errors.title}
      />
      <Input
        value={values.description}
        setValue={handleChange('description')}
        placeholder="Type something"
        inputTitle="Description"
        numberOfLines={5}
        multiline
        fieldStyles={styles.descriptionInput}
        error={errors.description}
      />
      <AttachFileBlock
        attachFiles={attachFiles}
        setAttachFiles={setAttachFiles}
        error={createFeatureRequestError}
      />
      <View style={styles.btnContainer}>
        <UiBtn
          text="Cancel"
          btnStyles={styles.cancelBtn}
          textStyles={styles.cancelBtnText}
          onPress={handleGoBack}
        />
        <UiBtn
          onPress={handleSubmit}
          text="Send"
          btnStyles={styles.sendBtn}
          disabled={isDisabledBtn()}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  descriptionInput: {
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
    borderColor: colors.primaryActive,
    borderWidth: 1,
  },
  cancelBtnText: {
    color: colors.primaryActive,
  },
  sendBtn: {
    width: '40%',
  },
});

export default HomeRequestFeature;
