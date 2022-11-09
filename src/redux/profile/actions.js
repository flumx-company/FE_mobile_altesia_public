import types from './types';
/* eslint-disable camelcase */

// FILLING PROFILE

export const checkOpenTo = (text) => ({
  type: types.CHECK_OPEN_TO,
  payload: {
    text,
  },
});

export const checkAvailability = (text) => ({
  type: types.CHECK_AVAILABILITY,
  payload: {
    text,
  },
});

export const checkLocation = (text) => ({
  type: types.CHECK_LOCATION,
  payload: {
    text,
  },
});

export const loadLocationsToWork = (list) => ({
  type: types.LOAD_LOCATIONS_TO_WORK,
  payload: {
    list,
  },
});

export const checkPreferredTime = (text) => ({
  type: types.CHECK_PREFERRED_TIME,
  payload: {
    text,
  },
});

export const checkPreferredMissions = (id) => ({
  type: types.CHECK_PREFERRED_MISSIONS,
  payload: {
    id,
  },
});

export const checkPreferredIndustries = (id) => ({
  type: types.CHECK_PREFERRED_INDUSTRIES,
  payload: {
    id,
  },
});

export const switchToBeContacted = () => ({
  type: types.SWITCH_TO_BE_CONTACTED,
});

export const putToBeContacted = (value) => ({
  type: types.PUT_TO_BE_CONTACTED,
  payload: {
    value,
  },
});

export const checkSpeciality = (id, idSpeciality) => ({
  type: types.CHECK_SPECIALITY,
  payload: {
    id,
    idSpeciality,
  },
});

export const checkLevel = (id, idLevel) => ({
  type: types.CHECK_LEVEL,
  payload: {
    id,
    idLevel,
  },
});

export const removeSpeciality = (id) => ({
  type: types.REMOVE_SPECIALITY,
  payload: {
    id,
  },
});

export const addSpeciality = () => ({
  type: types.ADD_SPECIALITY,
});

export const rateSalary = (min, max) => ({
  type: types.RATE_SALARY,
  payload: {
    min,
    max,
  },
});

export const addLink = (link) => ({
  type: types.ADD_LINK,
  payload: {
    link,
  },
});

// LOAD SELECTORS DATA ==========================

export const selectorsDataRequested = () => ({
  type: types.GET_SELECTORS_DATA_REQUESTED,
});

export const industriesSucceed = (industries) => ({
  type: types.GET_INDUSTRIES_SUCCEED,
  payload: {
    industries,
  },
});

export const missionsSucceed = (missions) => ({
  type: types.GET_MISSIONS_SUCCEED,
  payload: {
    missions,
  },
});

export const specialitiesSucceed = (specialities) => ({
  type: types.GET_SPECIALITIES_SUCCEED,
  payload: {
    specialities,
  },
});

// LOAD CHECKED SELECTORS ==========================

export const loadCheckedIndustries = (checkedIndustries) => ({
  type: types.LOAD_CHECKED_INDUSTRIES,
  payload: {
    checkedIndustries,
  },
});

export const loadCheckedMissions = (checkedMissions) => ({
  type: types.LOAD_CHECKED_MISSIONS,
  payload: {
    checkedMissions,
  },
});

export const loadCheckedSpecialities = (checkedSpecialities) => ({
  type: types.LOAD_CHECKED_SPECIALITIES,
  payload: {
    checkedSpecialities,
  },
});

// GET PROFILE ==========================

export const profileRequested = () => ({
  type: types.PROFILE_REQUESTED,
});

export const profileSucceed = (profile) => ({
  type: types.PROFILE_SUCCEED,
  payload: {
    profile,
  },
});

export const profileFailure = () => ({
  type: types.PROFILE_FAILURE,
});

// PUT PROFILE ==========================

export const putProfileRequested = (min_rate, gross_salary, linkedin_link) => ({
  type: types.UPDATE_PROFILE_REQUESTED,
  payload: {
    min_rate,
    gross_salary,
    linkedin_link,
  },
});

export const putProfileSucceed = (profile) => ({
  type: types.UPDATE_PROFILE_SUCCEED,
  payload: {
    profile,
  },
});

export const putProfileFailure = () => ({
  type: types.UPDATE_PROFILE_FAILURE,
});
