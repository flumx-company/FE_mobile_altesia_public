import React, { useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import BackBtn from '../../components/buttons/back-btn/back-btn';
import Input from '../../components/input/input';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import colors from '../../constants/colors';
import DetailsIcon from '../../components/icons/details-icon';
import routes from '../../routes';
import AttachFileBlock from '../../components/attach-file-block/attach-file-block';
import { getCreateAlertOpportunity } from '../../redux/opportunities/selectors';
import useCreateAlertOpportunityFormik from '../../hooks/useCreateAlertOpportunity/useCreateAlertOpportunityFormik';
import ArrowBeforeIcon from '../../components/icons/arrow-before-icon';
import fonts from '../../constants/fonts';

const OpportunitiesCreateAlert = ({ navigation, route }) => {
  const [attachFiles, setAttachFiles] = useState([]);

  const createAlertOpportunityError = useSelector(getCreateAlertOpportunity);

  const handleGoBack = () => navigation.goBack();
  const handleRedirectSentAlerts = () => navigation.navigate(routes.opportunities.opportunitiesSentAlerts);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
  } = useCreateAlertOpportunityFormik(handleGoBack);

  values.id = route.params.id;
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
      <View style={styles.headerContainer}>
        <BackBtn onPress={handleGoBack} containerStyles={styles.backBtn} />
        <TouchableOpacity onPress={handleRedirectSentAlerts}>
          <DetailsIcon />
        </TouchableOpacity>
      </View>
      <ScreenTitle title="Alert Altesia" titleStyles={styles.title} />
      <View style={styles.opportunityTitleContainer}>
        <ArrowBeforeIcon />
        <Text style={styles.opportunityTitle}>
          {route.params.opportunityTitle}
        </Text>
      </View>
      <Input
        placeholder="Type something"
        inputTitle="Title"
        value={values.title}
        setValue={handleChange('title')}
        error={errors.title}
      />
      <Input
        placeholder="Type something"
        inputTitle="Descriptions"
        numberOfLines={5}
        multiline
        fieldStyles={styles.descriptionInput}
        value={values.description}
        setValue={handleChange('description')}
        error={errors.description}
      />
      <AttachFileBlock
        attachFiles={attachFiles}
        setAttachFiles={setAttachFiles}
        error={createAlertOpportunityError}
      />
      <View style={styles.btnContainer}>
        <UiBtn
          text="Cancel"
          btnStyles={styles.btnCancel}
          textStyles={styles.btnCancelText}
          onPress={handleGoBack}
        />
        <UiBtn
          text="Send"
          btnStyles={styles.btnSend}
          onPress={handleSubmit}
          disabled={isDisabledBtn()}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  backBtn: {
    width: '50%',
  },
  title: {
    marginTop: 0,
  },
  opportunityTitleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  opportunityTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  descriptionInput: {
    height: 120,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnCancel: {
    width: '45%',
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primaryActive,
  },
  btnCancelText: {
    color: colors.primaryActive,
  },
  btnSend: {
    width: '45%',
  },
});

export default OpportunitiesCreateAlert;
