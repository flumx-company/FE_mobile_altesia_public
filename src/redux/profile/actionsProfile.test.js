import types from './types';
import {
  addLink, addSpeciality, checkAvailability, checkLevel, checkLocation, checkOpenTo, checkPreferredIndustries, checkPreferredMissions, checkPreferredTime, checkSpeciality, industriesSucceed, loadCheckedIndustries, loadCheckedMissions, loadCheckedSpecialities, loadLocationsToWork, missionsSucceed, profileFailure, profileRequested, profileSucceed, putProfileFailure, putProfileRequested, putProfileSucceed, putToBeContacted, rateSalary, removeSpeciality, selectorsDataRequested, specialitiesSucceed, switchToBeContacted,
} from './actions';

describe('profile actions', () => {
  it('checkOpenTo', () => {
    expect(checkOpenTo(123)).toEqual({
      type: types.CHECK_OPEN_TO,
      payload: {
        text: 123,
      },
    });
  });

  it('checkAvailability', () => {
    expect(checkAvailability(123)).toEqual({
      type: types.CHECK_AVAILABILITY,
      payload: {
        text: 123,
      },
    });
  });

  it('checkLocation', () => {
    expect(checkLocation(123)).toEqual({
      type: types.CHECK_LOCATION,
      payload: {
        text: 123,
      },
    });
  });

  it('loadLocationsToWork', () => {
    expect(loadLocationsToWork(123)).toEqual({
      type: types.LOAD_LOCATIONS_TO_WORK,
      payload: {
        list: 123,
      },
    });
  });

  it('checkPreferredTime', () => {
    expect(checkPreferredTime(123)).toEqual({
      type: types.CHECK_PREFERRED_TIME,
      payload: {
        text: 123,
      },
    });
  });

  it('checkPreferredMissions', () => {
    expect(checkPreferredMissions(123)).toEqual({
      type: types.CHECK_PREFERRED_MISSIONS,
      payload: {
        id: 123,
      },
    });
  });

  it('checkPreferredIndustries', () => {
    expect(checkPreferredIndustries(123)).toEqual({
      type: types.CHECK_PREFERRED_INDUSTRIES,
      payload: {
        id: 123,
      },
    });
  });

  it('switchToBeContacted', () => {
    expect(switchToBeContacted()).toEqual({
      type: types.SWITCH_TO_BE_CONTACTED,
    });
  });

  it('putToBeContacted', () => {
    expect(putToBeContacted(123)).toEqual({
      type: types.PUT_TO_BE_CONTACTED,
      payload: {
        value: 123,
      },
    });
  });

  it('checkSpeciality', () => {
    expect(checkSpeciality(123, 321)).toEqual({
      type: types.CHECK_SPECIALITY,
      payload: {
        id: 123,
        idSpeciality: 321,
      },
    });
  });

  it('checkLevel', () => {
    expect(checkLevel(123, 321)).toEqual({
      type: types.CHECK_LEVEL,
      payload: {
        id: 123,
        idLevel: 321,
      },
    });
  });

  it('removeSpeciality', () => {
    expect(removeSpeciality(123)).toEqual({
      type: types.REMOVE_SPECIALITY,
      payload: {
        id: 123,
      },
    });
  });

  it('addSpeciality', () => {
    expect(addSpeciality()).toEqual({
      type: types.ADD_SPECIALITY,
    });
  });

  it('rateSalary', () => {
    expect(rateSalary(123, 321)).toEqual({
      type: types.RATE_SALARY,
      payload: {
        min: 123,
        max: 321,
      },
    });
  });

  it('addLink', () => {
    expect(addLink(123)).toEqual({
      type: types.ADD_LINK,
      payload: {
        link: 123,
      },
    });
  });

  it('selectorsDataRequested', () => {
    expect(selectorsDataRequested()).toEqual({
      type: types.GET_SELECTORS_DATA_REQUESTED,
    });
  });

  it('industriesSucceed', () => {
    expect(industriesSucceed(123)).toEqual({
      type: types.GET_INDUSTRIES_SUCCEED,
      payload: {
        industries: 123,
      },
    });
  });

  it('missionsSucceed', () => {
    expect(missionsSucceed(123)).toEqual({
      type: types.GET_MISSIONS_SUCCEED,
      payload: {
        missions: 123,
      },
    });
  });

  it('specialitiesSucceed', () => {
    expect(specialitiesSucceed(123)).toEqual({
      type: types.GET_SPECIALITIES_SUCCEED,
      payload: {
        specialities: 123,
      },
    });
  });

  it('loadCheckedIndustries', () => {
    expect(loadCheckedIndustries(123)).toEqual({
      type: types.LOAD_CHECKED_INDUSTRIES,
      payload: {
        checkedIndustries: 123,
      },
    });
  });

  it('loadCheckedMissions', () => {
    expect(loadCheckedMissions(123)).toEqual({
      type: types.LOAD_CHECKED_MISSIONS,
      payload: {
        checkedMissions: 123,
      },
    });
  });

  it('loadCheckedSpecialities', () => {
    expect(loadCheckedSpecialities(123)).toEqual({
      type: types.LOAD_CHECKED_SPECIALITIES,
      payload: {
        checkedSpecialities: 123,
      },
    });
  });

  it('profileRequested', () => {
    expect(profileRequested()).toEqual({
      type: types.PROFILE_REQUESTED,
    });
  });

  it('profileSucceed', () => {
    expect(profileSucceed(123)).toEqual({
      type: types.PROFILE_SUCCEED,
      payload: {
        profile: 123,
      },
    });
  });

  it('profileFailure', () => {
    expect(profileFailure()).toEqual({
      type: types.PROFILE_FAILURE,
    });
  });

  it('putProfileRequested', () => {
    expect(putProfileRequested(123, 321, 456)).toEqual({
      type: types.UPDATE_PROFILE_REQUESTED,
      payload: {
        min_rate: 123,
        gross_salary: 321,
        linkedin_link: 456,
      },
    });
  });

  it('putProfileSucceed', () => {
    expect(putProfileSucceed(123)).toEqual({
      type: types.UPDATE_PROFILE_SUCCEED,
      payload: {
        profile: 123,
      },
    });
  });

  it('putProfileFailure', () => {
    expect(putProfileFailure()).toEqual({
      type: types.UPDATE_PROFILE_FAILURE,
    });
  });
});
