import axios from 'axios';
import urlCreator from './urlCreator';

// ===========AUTH===========
// GET
export const axiosConfirmEmail = ({ code }) => axios.get(urlCreator.auth.getConfirmEmail(code));
// POST
export const axiosReSendConfirmCode = (email) => axios.post(urlCreator.auth.reSendConfirmCode, {
  email,
});
export const axiosLogin = ({
  email,
  password,
}) => axios.post(urlCreator.auth.login, {
  email,
  password,
});

export const axiosRegister = ({
  country,
  phoneNumber,
  degree,
  experience,
  firstName,
  lastName,
  email,
  password,
}) => axios.post(urlCreator.auth.registration, {
  country,
  phone_number: phoneNumber,
  degree,
  experience,
  first_name: firstName,
  last_name: lastName,
  email,
  password,
});

export const axiosResetPassword = (email) => axios.post(urlCreator.auth.passwordReset, {
  email,
});

export const axiosVerifyResetPassword = ({
  token,
  email,
}) => axios.post(urlCreator.auth.verificationPassword, {
  token,
  email,
});

export const axiosResetPasswordComplete = ({
  email,
  token,
  password,
}) => axios.post(urlCreator.auth.passwordResetComplete, {
  email,
  token,
  password,
});

// ===========USER===========
// GET
export const axiosUserProfile = () => axios.get(urlCreator.user.getProfile);
export const axiosUserStatus = () => axios.get(urlCreator.user.getUserStatus);
export const axiosSpecialities = () => axios.get(urlCreator.user.getSpecialities);
export const axiosIndustries = () => axios.get(urlCreator.user.getIndustries);
export const axiosMissions = () => axios.get(urlCreator.user.getMissions);
// PUT
export const axiosUserPutProfile = (profile) => axios.put(urlCreator.user.updateProfile, profile);

// ===========USER FEATURES===========
// GET
export const axiosAllFeatures = (page) => axios.get(urlCreator.usersFeatures.getFeature(page));
// POST
export const axiosFeatureRequest = ({ title, description, attachments }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  attachments.forEach((item) => formData.append('attachments', item));
  return axios.post(urlCreator.usersFeatures.featureRequest, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// ===========EVENTS===========
// GET
export const axiosAllEvents = (page) => axios.get(urlCreator.events.getAllEvents(page));
export const axiosMineEvents = (page) => axios.get(urlCreator.events.getMineEvents(page));
// PATCH
export const axiosAttachEventById = (id) => axios.patch(urlCreator.events.attachEventById(id), {
  is_interesting: true,
});
export const axiosDropDownEventById = (id) => axios.patch(urlCreator.events.attachEventById(id), {
  is_interesting: false,
});

// DELETE
export const axiosDetachEventById = (id) => axios.delete(urlCreator.events.detachEventById(id));

// ===========COMMUNITY===========
// GET
export const axiosAllCategories = () => axios.get(urlCreator.community.getCategories);
export const axiosAllIssues = ({ page }) => axios.get(urlCreator.community.getAllIssues(page));
export const axiosMineIssues = ({ page }) => axios.get(urlCreator.community.getMineIssues(page));
export const axiosIssuesAllByCommunityId = ({
  id,
  page,
}) => axios.get(urlCreator.community.getIssuesAllByCategoryId(id, page));
export const axiosIssuesMineByCommunityId = ({
  id,
  page,
}) => axios.get(urlCreator.community.getIssuesMineByCategoryId(id, page));

export const axiosIssueById = (id) => axios.get(urlCreator.community.getIssueById(id));
export const axiosResponseById = (id) => axios.get(urlCreator.community.getResponseById(id));
export const axiosResponsesByQuestionId = (id, page, responseType, newest, oldest, lowestRate, highestRate) => axios.get(urlCreator.community.getAllResponses(id, page, responseType, newest, oldest, lowestRate, highestRate));
// POST
export const axiosRateResponseByIdPut = (id, rating) => axios.put(urlCreator.community.updateCommunityRating(id), {
  rating,
});
export const axiosRateResponseByIdPost = (id, rating) => axios.post(urlCreator.community.rateResponseById(id), {
  rating,
});
export const axiosCreateIssueByCommunityId = ({
  id, title, description, attachments,
}) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  attachments.forEach((item) => formData.append('attachments', item));
  return axios.post(urlCreator.community.createNewIssueByCommunityId(id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const axiosResponseByIssueId = ({
  id, description, responseType, attachments,
}) => {
  const formData = new FormData();
  formData.append('answer', description);
  formData.append('responseType', responseType);
  attachments.forEach((item) => formData.append('attachments', item));
  return axios.post(urlCreator.community.createResponseByQuestionId(id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// ===========OPPORTUNITIES===========
// GET
export const axiosAllOpportunities = (page) => axios.get(urlCreator.opportunities.getAllOpportunities(page));
export const axiosMineOpportunities = (page) => axios.get(urlCreator.opportunities.getMineOpportunities(page));
export const axiosUsersAlert = ({ page }) => axios.get(urlCreator.opportunities.getAllUsersAlerts(page));
export const axiosAlertRespondById = (id) => axios.get(urlCreator.opportunities.getAlertRespondById(id));
// POST
export const axiosCreateAlertOpportunity = ({
  id, title, description, attachments,
}) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  attachments.forEach((item) => formData.append('attachments', item));
  return axios.post(urlCreator.opportunities.createAlertOpportunityById(id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// PATCH
export const axiosAttachOpportunityById = (id) => axios.patch(urlCreator.opportunities.attachOpportunityById(id), {
  is_interesting: true,
});
export const axiosDropDownOpportunityById = (id) => axios.patch(urlCreator.opportunities.attachOpportunityById(id), {
  is_interesting: false,
});
// DELETE
export const axiosDetachOpportunityById = (id) => axios.delete(urlCreator.opportunities.detachOpportunityById(id));
