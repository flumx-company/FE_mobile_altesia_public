const baseUrl = 'http://178.151.201.167:49168/api/v1/client';

const urlCreator = {
  imagesPath: 'http://178.151.201.167:49168',
  auth: {
    // GET
    getConfirmEmail: (code) => `${baseUrl}/confirm-email/${code}`,
    // POST
    login: `${baseUrl}/login`,
    registration: `${baseUrl}/registration`,
    reSendConfirmCode: `${baseUrl}/re-send-email-confirmation-code`,
    passwordReset: `${baseUrl}/password/reset`,
    verificationPassword: `${baseUrl}/password/reset/verification`,
    passwordResetComplete: `${baseUrl}/password/reset/complete`,
  },
  user: {
    // GET
    getProfile: `${baseUrl}/user`,
    getUserStatus: `${baseUrl}/user/status`,
    getIndustries: `${baseUrl}/industries`,
    getMissions: `${baseUrl}/missions`,
    getSpecialities: `${baseUrl}/specialties`,
    updateProfile: `${baseUrl}/user/profile`,
  },
  usersFeatures: {
    // GET
    getFeature: (page) => (page ? `${baseUrl}/user-features?page=${page}` : `${baseUrl}/user-features`),
    // POST
    featureRequest: `${baseUrl}/user-features`,
  },
  events: {
    // GET
    getAllEvents: (page) => (page ? `${baseUrl}/events?page=${page}` : `${baseUrl}/events`),
    getMineEvents: (page) => (page ? `${baseUrl}/events?mine=mine&page=${page}` : `${baseUrl}/events?mine=mine`),
    getEventById: (id) => `${baseUrl}/events/${id}`,
    // PATCH
    attachEventById: (id) => `${baseUrl}/events/${id}/participate`,
    // DELETE
    detachEventById: (id) => `${baseUrl}/events/${id}/participate-cancel`,
  },
  community: {
    // GET
    getCategories: `${baseUrl}/community-categories`,
    getAllIssues: (page) => (page ? `${baseUrl}/community-questions?page=${page}` : `${baseUrl}/community-questions`),
    getMineIssues: (page) => (page ? `${baseUrl}/community-questions?mine=mine&page=${page}` : `${baseUrl}/community-questions?mine=mine`),
    getIssuesAllByCategoryId: (id, page) => (page ? `${baseUrl}/community-questions?communityCategoryId=${id}&page=${page}` : `${baseUrl}/community-questions?communityCategoryId=${id}`),
    getIssuesMineByCategoryId: (id, page) => (page ? `${baseUrl}/community-questions?communityCategoryId=${id}&page=${page}&mine=mine` : `${baseUrl}/community-questions?communityCategoryId=${id}&mine=mine`),
    getIssueById: (id) => `${baseUrl}/community-questions/${id}`,
    getAllResponses: (id, page, responseType, newest, oldest, lowestRate, highestRate) => `${baseUrl}/community-responses?communityQuestionId=${id}&page=${page}&responseType=${responseType}&newest=${newest}&oldest=${oldest}&lowestRate=${lowestRate}&highestRate=${highestRate}&limit=20`,
    getResponseById: (id) => `${baseUrl}/community-responses/${id}`,
    // POST
    createNewIssueByCommunityId: (id) => `${baseUrl}/community-categories/${id}/community-questions`,
    createResponseByQuestionId: (id) => `${baseUrl}/community-questions/${id}/community-responses`,
    rateResponseById: (id) => `${baseUrl}/community-responses/${id}/rate`,
    // PUT
    updateCommunityRating: (id) => `${baseUrl}/community-response-ratings/${id}`,
  },
  opportunities: {
    // GET
    getAllOpportunities: (page) => (page ? `${baseUrl}/opportunities?page=${page}` : `${baseUrl}/opportunities`),
    getMineOpportunities: (page) => (page ? `${baseUrl}/opportunities?mine=mine&page=${page}` : `${baseUrl}/opportunities?mine=mine`),
    getAllAlertsById: (id) => `${baseUrl}/opportunities/${id}/alerts`,
    getAllUsersAlerts: (page) => (page ? `${baseUrl}/opportunities/user/alerts/fetch?page=${page}` : `${baseUrl}/opportunities/user/alerts/fetch`),
    getAlertRespondById: (id) => `${baseUrl}/opportunity-alerts/${id}/replies`,
    // POST
    createAlertOpportunityById: (id) => `${baseUrl}/opportunities/${id}/alerts`,
    attachOpportunityById: (id) => `${baseUrl}/opportunities/${id}/user-attach`,
    // DELETE
    detachOpportunityById: (id) => `${baseUrl}/opportunities/${id}/user-detach`,
  },
  industries: {
    // GET
    getAllIndustries: `${baseUrl}/industries`,
  },
  missions: {
    // GET
    getAllMissions: `${baseUrl}/missions`,
  },
};

export default urlCreator;
