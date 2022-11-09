import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import Input from '../../components/input/input';
import ScreenTitle from '../../components/screen-title/screen-title';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import colors from '../../constants/colors';
import AttachFileBlock from '../../components/attach-file-block/attach-file-block';
import ArrowBeforeIcon from '../../components/icons/arrow-before-icon';
import fonts from '../../constants/fonts';
import { getResponseIssueDirectError } from '../../redux/community/selectors';
import useResponseIssueFormik from '../../hooks/useResponseIssueFormik/useResponseIssueFormik';

const CommunityRespondIssue = ({ navigation, route }) => {
  const [attachFiles, setAttachFiles] = useState([]);

  const responseIssueDirectError = useSelector(getResponseIssueDirectError);

  const handleGoBack = () => navigation.goBack();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useResponseIssueFormik(handleGoBack, route.params.responseType);

  values.id = route.params.id;

  return (
    <ScreenContainer>
      <BackBtn
        text="Back"
        onPress={handleGoBack}
      />
      <ScreenTitle
        title={route.params.responseType === 'all' ? 'Your response to issue' : 'Your direct response'}
        titleStyles={styles.title}
      />
      <View style={styles.issueTitleContainer}>
        <ArrowBeforeIcon />
        <Text style={styles.issueTitle}>
          {route.params.title}
        </Text>
      </View>
      <Input
        inputTitle="Your response:"
        placeholder="Type something"
        numberOfLines={5}
        multiline
        fieldStyles={styles.responseInput}
        value={values.description}
        setValue={handleChange('description')}
        error={errors.description}
      />
      <AttachFileBlock
        attachFiles={attachFiles}
        setAttachFiles={setAttachFiles}
        error={responseIssueDirectError}
      />
      <View style={styles.btnContainer}>
        <UiBtn
          text="Cancel"
          btnStyles={styles.cancelBtn}
          textStyles={styles.cancelBtnText}
          onPress={handleGoBack}
        />
        <UiBtn
          text="Send"
          btnStyles={styles.sendBtn}
          onPress={handleSubmit}
          disabled={!values.description.length}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 0,
  },
  responseInput: {
    height: 120,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    width: '45%',
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primaryActive,
  },
  cancelBtnText: {
    color: colors.primaryActive,
  },
  sendBtn: {
    width: '45%',
  },
  issueTitleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  issueTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
});

export default CommunityRespondIssue;
