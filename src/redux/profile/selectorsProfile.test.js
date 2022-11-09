import {
  getAvailabilityList, getCheckedSpecialitiesList, getLevels, getLinkedInLink, getLoadedProfile, getLocationsToWorkList, getOpenToList, getPreferredIndustries, getPreferredMissions, getPreferredTime, getSalary, getSpecialities, getToBeContacted,
} from './selectors';

describe('profile selectors', () => {
  const state = {
    profile: {
      openToList: [
        {
          id: 1,
          text: 'Freelance',
          isChecked: true,
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
          isChecked: true,
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
          isChecked: true,
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
        { id: '1', speciality: null, level: null },
      ],
      preferredTime: [
        {
          id: 1,
          text: 'Weekdays 8-12',
          isChecked: true,
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
      salary: 123,
      linkedInLink: 321,
      userStatus: 456,
      loadedProfile: 789,
    },
  };

  it('getOpenToList', () => {
    expect(getOpenToList(state)).toEqual([
      {
        id: 1,
        text: 'Freelance',
        isChecked: true,
      },
      {
        id: 2,
        text: 'Employee',
        isChecked: false,
      },
    ]);
  });

  it('getAvailabilityList', () => {
    expect(getAvailabilityList(state)).toEqual([
      {
        id: 1,
        text: '5  days per week',
        isChecked: true,
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
    ]);
  });

  it('getLocationsToWorkList', () => {
    expect(getLocationsToWorkList(state)).toEqual([
      {
        id: 1,
        text: 'All regions in Belgium',
        isChecked: true,
      },
      {
        id: 2,
        text: 'Open to international positions',
        isChecked: false,
      },
    ]);
  });

  it('getSpecialities', () => {
    expect(getSpecialities(state)).toEqual([]);
  });

  it('getLevels', () => {
    expect(getLevels(state)).toEqual([
      { id: 1, name: '1 - basic' },
      { id: 2, name: '2 -' },
      { id: 3, name: '3 -' },
      { id: 4, name: '4 - expert' },
    ]);
  });

  it('getCheckedSpecialitiesList', () => {
    expect(getCheckedSpecialitiesList(state)).toEqual([
      { id: '1', speciality: null, level: null },
    ]);
  });

  it('getPreferredTime', () => {
    expect(getPreferredTime(state)).toEqual([
      {
        id: 1,
        text: 'Weekdays 8-12',
        isChecked: true,
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
    ]);
  });

  it('getToBeContacted', () => {
    expect(getToBeContacted(state)).toEqual(true);
  });

  it('getPreferredMissions', () => {
    expect(getPreferredMissions(state)).toEqual([]);
  });

  it('getPreferredIndustries', () => {
    expect(getPreferredIndustries(state)).toEqual([]);
  });

  it('getSalary', () => {
    expect(getSalary(state)).toEqual(123);
  });

  it('getLinkedInLink', () => {
    expect(getLinkedInLink(state)).toEqual(321);
  });

  it('getLoadedProfile', () => {
    expect(getLoadedProfile(state)).toEqual(789);
  });
});
