/* eslint-disable consistent-return */
const compareNewOldProfile = (loadedProfile, newProfile, values) => {
  if (!values) return;

  if (values.min !== String(loadedProfile.min_rate)) {
    return false;
  }

  if (values.max !== String(loadedProfile.gross_salary)) {
    return false;
  }

  if (values.linkedInLink !== loadedProfile.linkedin_link) {
    return false;
  }

  if (loadedProfile.availability !== newProfile.availability) {
    return false;
  }

  if (loadedProfile.locations_to_work !== newProfile.locations_to_work) {
    return false;
  }

  if (loadedProfile.ok_to_contact !== newProfile.ok_to_contact) {
    return false;
  }

  if (loadedProfile.open_to !== newProfile.open_to) {
    return false;
  }

  if (loadedProfile.preferred_time_to_be_contacted !== newProfile.preferred_time_to_be_contacted) {
    return false;
  }

  if (JSON.stringify(loadedProfile.preferredIndustries.sort()) !== JSON.stringify(newProfile.preferredIndustries.sort())) {
    return false;
  }

  if (JSON.stringify(loadedProfile.preferredMissions.sort()) !== JSON.stringify(newProfile.preferredMissions.sort())) {
    return false;
  }

  if (JSON.stringify(loadedProfile.specialties.sort()) !== JSON.stringify(newProfile.specialties.sort())) {
    return false;
  }

  return true;
};

export default compareNewOldProfile;
