// filling profile
export const getOpenToList = (state) => state.profile.openToList;
export const getAvailabilityList = (state) => state.profile.availabilityList;
export const getLocationsToWorkList = (state) => state.profile.locationsToWork;
export const getSpecialities = (state) => state.profile.specialities;
export const getLevels = (state) => state.profile.levels;
export const getCheckedSpecialitiesList = (state) => state.profile.checkedSpecialitiesList;
export const getPreferredTime = (state) => state.profile.preferredTime;
export const getToBeContacted = (state) => state.profile.toBeContacted;
export const getPreferredMissions = (state) => state.profile.preferredMissions;
export const getPreferredIndustries = (state) => state.profile.preferredIndustries;
export const getSelectedPreferredMissions = (state) => state.profile.preferredMissions.filter((item) => item.isChecked);
export const getSelectedPreferredIndustries = (state) => state.profile.preferredIndustries.filter((item) => item.isChecked);
export const getSalary = (state) => state.profile.salary;
export const getLinkedInLink = (state) => state.profile.linkedInLink;

export const getLoadedProfile = (state) => state.profile.loadedProfile;

export const getNewProfile = (state) => ({
  availability: state.profile.availabilityList && state.profile.availabilityList.find((item) => item.isChecked) && state.profile.availabilityList.find((item) => item.isChecked).text,
  open_to: state.profile.openToList.find((item) => item.isChecked) && state.profile.openToList.find((item) => item.isChecked).text,
  min_rate: state.profile.salary.min,
  gross_salary: state.profile.salary.max,
  ok_to_contact: state.profile.toBeContacted,
  preferred_time_to_be_contacted: state.profile.preferredTime && state.profile.preferredTime.find((item) => item.isChecked) && state.profile.preferredTime.find((item) => item.isChecked).text,
  preferredMissions: state.profile.preferredMissions.filter((item) => item.isChecked).map((item) => item.id),
  preferredIndustries: state.profile.preferredIndustries.filter((item) => item.isChecked).map((item) => item.id),
  locations_to_work: state.profile.locationsToWork.filter((item) => item.isChecked).map((item) => item.text).join(', '),
  specialties: state.profile.checkedSpecialitiesList.map((item) => ({
    specialty_id: item.speciality,
    level: item.level,
  })),
  linkedin_link: state.profile.linkedInLink,
});
