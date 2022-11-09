import uuid from 'react-native-uuid';
import types from './types';
import authTypes from '../auth/types';

const initialState = {
  openToList: [
    {
      id: 1,
      text: 'Freelance',
      isChecked: false,
    },
    {
      id: 2,
      text: 'Employee',
      isChecked: false,
    },
  ],
  availabilityList: [
    {
      id: 1,
      text: '5  days per week',
      isChecked: false,
    },
    {
      id: 2,
      text: '4  days per week',
      isChecked: false,
    },
    {
      id: 3,
      text: '3  days per week',
      isChecked: false,
    },
    {
      id: 4,
      text: '2  days per week',
      isChecked: false,
    },
    {
      id: 5,
      text: '1  day per week',
      isChecked: false,
    },
    {
      id: 6,
      text: 'Evenings',
      isChecked: false,
    },
    {
      id: 7,
      text: 'Weekend',
      isChecked: false,
    },
  ],
  locationsToWork: [
    {
      id: 1,
      text: 'All regions in Belgium',
      isChecked: false,
    },
    {
      id: 2,
      text: 'Open to international positions',
      isChecked: false,
    },
  ],
  specialities: [],
  levels: [
    { id: 1, name: '1 - basic' },
    { id: 2, name: '2 -' },
    { id: 3, name: '3 -' },
    { id: 4, name: '4 - expert' },
  ],
  checkedSpecialitiesList: [
    { id: uuid.v4(), speciality: null, level: null },
  ],
  preferredTime: [
    {
      id: 1,
      text: 'Weekdays 8-12',
      isChecked: false,
    },
    {
      id: 2,
      text: 'Weekdays 12-18',
      isChecked: false,
    },
    {
      id: 3,
      text: 'Evenings 18-20',
      isChecked: false,
    },
    {
      id: 4,
      text: 'Weekend',
      isChecked: false,
    },
  ],
  toBeContacted: true,
  preferredMissions: [],
  preferredIndustries: [],
  salary: {
    min: null,
    max: null,
  },
  linkedInLink: null,
  userStatus: null,
  loadedProfile: {},
};

const checkOpenList = (state, payload) => {
  const newOpenList = state.openToList.map((item) => {
    if (item.text === payload.text) {
      return { ...item, isChecked: true };
    }
    return { ...item, isChecked: false };
  });
  return { ...state, openToList: newOpenList };
};

const checkAvailabilityList = (state, payload) => {
  const newAvailability = state.availabilityList.map((item) => {
    if (item.text === payload.text) {
      return { ...item, isChecked: true };
    }
    return { ...item, isChecked: false };
  });
  return { ...state, availabilityList: newAvailability };
};

const checkLocationToWorkList = (state, payload) => {
  const newAvailability = state.locationsToWork.map((item) => {
    if (item.text === payload.text) {
      return { ...item, isChecked: !item.isChecked };
    }
    return item;
  });
  return { ...state, locationsToWork: newAvailability };
};

const checkPreferredTime = (state, payload) => {
  const newPreferredTime = state.preferredTime.map((item) => {
    if (item.text === payload.text) {
      return { ...item, isChecked: true };
    }
    return { ...item, isChecked: false };
  });
  return { ...state, preferredTime: newPreferredTime };
};

const switchToBeContacted = (state) => ({ ...state, toBeContacted: !state.toBeContacted });

const selectPreferredIndustries = (state, payload) => {
  const newPreferredIndustries = state.preferredIndustries.map((item) => {
    if (item.id === payload.id) {
      return { ...item, isChecked: !item.isChecked };
    }
    return item;
  });
  return { ...state, preferredIndustries: newPreferredIndustries };
};

const selectPreferredMissions = (state, payload) => {
  const newPreferredMissions = state.preferredMissions.map((item) => {
    if (item.id === payload.id) {
      return { ...item, isChecked: !item.isChecked };
    }
    return item;
  });
  return { ...state, preferredMissions: newPreferredMissions };
};

const addSpeciality = (state) => {
  const newCheckedSpeciality = { id: uuid.v4(), speciality: null, level: null };
  return { ...state, checkedSpecialitiesList: [...state.checkedSpecialitiesList, newCheckedSpeciality] };
};

const removeSpeciality = (state, payload) => {
  if (state.checkedSpecialitiesList.length <= 1) {
    const newSpecialities = state.checkedSpecialitiesList.map((item) => {
      if (item.id === payload.id) {
        return { ...item, speciality: null };
      }
      return item;
    });
    return { ...state, checkedSpecialitiesList: newSpecialities };
  }
  return { ...state, checkedSpecialitiesList: state.checkedSpecialitiesList.filter((item) => item.id !== payload.id) };
};

const checkSpeciality = (state, payload) => {
  const newCheckedSpecialities = state.checkedSpecialitiesList.map((item) => {
    if (item.id === payload.id) {
      return { ...item, speciality: payload.idSpeciality };
    }
    return item;
  });
  return { ...state, checkedSpecialitiesList: newCheckedSpecialities };
};

const checkLevel = (state, payload) => {
  const newCheckedSpecialities = state.checkedSpecialitiesList.map((item) => {
    if (item.id === payload.id) {
      return { ...item, level: payload.idLevel };
    }
    return item;
  });
  return { ...state, checkedSpecialitiesList: newCheckedSpecialities };
};

const loadLocationsToWork = (state, payload) => {
  const locations = state.locationsToWork.map((item) => {
    if (payload.list.includes(item.text)) {
      return { ...item, isChecked: true };
    }
    return { ...item, isChecked: false };
  });
  return { ...state, locationsToWork: locations };
};

const industriesSucceed = (state, payload) => {
  const preferredIndustries = payload.industries.map((item) => ({ id: item.id, name: item.name, isChecked: false }));
  return { ...state, preferredIndustries };
};

const missionsSucceed = (state, payload) => {
  const preferredMissions = payload.missions.map((item) => ({ id: item.id, name: item.name, isChecked: false }));
  return { ...state, preferredMissions };
};

const specialitiesSucceed = (state, payload) => {
  const specialities = payload.specialities.map((item) => ({ id: item.id, name: item.name, isChecked: false }));
  return { ...state, specialities };
};

const loadCheckedIndustries = (state, payload) => {
  const preferredIndustries = state.preferredIndustries.map((item) => {
    const checkedItem = payload.checkedIndustries.find((el) => el.industry.id === item.id);
    if (checkedItem) {
      return { ...item, isChecked: true };
    }
    return item;
  });
  return { ...state, preferredIndustries };
};

const loadCheckedMissions = (state, payload) => {
  const preferredMissions = state.preferredMissions.map((item) => {
    const checkedItem = payload.checkedMissions.find((el) => el.mission.id === item.id);
    if (checkedItem) {
      return { ...item, isChecked: true };
    }
    return item;
  });
  return { ...state, preferredMissions };
};

const loadCheckedSpecialities = (state, payload) => {
  if (payload.checkedSpecialities.length === 0) {
    return state;
  }
  const checkedSpecialitiesList = payload.checkedSpecialities.map((item) => ({ id: uuid.v4(), speciality: item.specialty.id, level: item.level }));
  return { ...state, checkedSpecialitiesList };
};

const profileSucceed = (state, payload) => {
  const loadedProfile = {
    availability: payload.profile.availability,
    open_to: payload.profile.open_to,
    min_rate: payload.profile.min_rate,
    gross_salary: payload.profile.gross_salary,
    ok_to_contact: payload.profile.ok_to_contact,
    preferred_time_to_be_contacted: payload.profile.preferred_time_to_be_contacted,
    locations_to_work: payload.profile.locations_to_work,
    linkedin_link: payload.profile.linkedin_link,
    //
    preferredMissions: payload.profile.userProfileMissions.map((item) => item.mission.id),
    preferredIndustries: payload.profile.userProfileIndustries.map((item) => item.industry.id),
    specialties: payload.profile.userProfileSpecialties.map((item) => ({ specialty_id: item.specialty.id, level: item.level })),
  };
  return { ...state, loadedProfile };
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //
    case types.CHECK_OPEN_TO:
      return checkOpenList(state, payload);
    case types.CHECK_AVAILABILITY:
      return checkAvailabilityList(state, payload);
    case types.CHECK_LOCATION:
      return checkLocationToWorkList(state, payload);
    case types.CHECK_PREFERRED_TIME:
      return checkPreferredTime(state, payload);
    case types.ADD_SPECIALITY:
      return addSpeciality(state);
    case types.REMOVE_SPECIALITY:
      return removeSpeciality(state, payload);
    case types.CHECK_SPECIALITY:
      return checkSpeciality(state, payload);
    case types.CHECK_LEVEL:
      return checkLevel(state, payload);
    case types.SWITCH_TO_BE_CONTACTED:
      return switchToBeContacted(state);
    case types.CHECK_PREFERRED_INDUSTRIES:
      return selectPreferredIndustries(state, payload);
    case types.CHECK_PREFERRED_MISSIONS:
      return selectPreferredMissions(state, payload);
    case types.RATE_SALARY:
      return { ...state, salary: { min: payload.min, max: payload.max } };
    case types.ADD_LINK:
      return { ...state, linkedInLink: payload.link };
    case types.PUT_TO_BE_CONTACTED:
      return { ...state, toBeContacted: payload.value };
    case types.LOAD_LOCATIONS_TO_WORK:
      return loadLocationsToWork(state, payload);
    case types.GET_INDUSTRIES_SUCCEED:
      return industriesSucceed(state, payload);
    case types.GET_MISSIONS_SUCCEED:
      return missionsSucceed(state, payload);
    case types.GET_SPECIALITIES_SUCCEED:
      return specialitiesSucceed(state, payload);
    case types.LOAD_CHECKED_INDUSTRIES:
      return loadCheckedIndustries(state, payload);
    case types.LOAD_CHECKED_MISSIONS:
      return loadCheckedMissions(state, payload);
    case types.LOAD_CHECKED_SPECIALITIES:
      return loadCheckedSpecialities(state, payload);
    case types.PROFILE_SUCCEED:
      return profileSucceed(state, payload);
    case authTypes.CLEAR_FILLED_PROFILE:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default profileReducer;
