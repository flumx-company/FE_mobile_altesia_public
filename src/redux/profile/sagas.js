import {
  call, takeEvery, put, select,
} from 'redux-saga/effects';
import {
  axiosIndustries, axiosMissions, axiosSpecialities, axiosUserProfile, axiosUserPutProfile,
} from '../../services/api';
import types from './types';
import {
  profileFailure, checkAvailability, checkOpenTo, rateSalary, putToBeContacted, addLink, checkPreferredTime, loadLocationsToWork, industriesSucceed, missionsSucceed, specialitiesSucceed, loadCheckedIndustries, loadCheckedMissions, loadCheckedSpecialities, profileSucceed, putProfileSucceed, putProfileFailure,
} from './actions';
import { getNewProfile } from './selectors';
import toastMessages from '../../constants/toastMessages';
import errorSaga from '../errorSaga';

function* getProfileWorker() {
  try {
    const industriesResponse = yield call(axiosIndustries);
    const missionsResponse = yield call(axiosMissions);
    const specialitiesResponse = yield call(axiosSpecialities);

    yield put(industriesSucceed(industriesResponse.data.data));
    yield put(missionsSucceed(missionsResponse.data.data));
    yield put(specialitiesSucceed(specialitiesResponse.data.data));

    const response = yield call(axiosUserProfile);

    const profile = response.data.data.userProfile;
    yield put(profileSucceed(profile));
    const locationsToWork = profile.locations_to_work.split(', ');

    yield put(checkAvailability(profile.availability));
    yield put(checkOpenTo(profile.open_to));
    yield put(rateSalary(profile.min_rate, profile.gross_salary));
    yield put(putToBeContacted(profile.ok_to_contact));
    yield put(addLink(profile.linkedin_link));
    yield put(checkPreferredTime(profile.preferred_time_to_be_contacted));
    yield put(loadLocationsToWork(locationsToWork));
    yield put(loadCheckedIndustries(profile.userProfileIndustries));
    yield put(loadCheckedMissions(profile.userProfileMissions));
    yield put(loadCheckedSpecialities(profile.userProfileSpecialties));
  } catch (error) {
    yield put(profileFailure());
    yield call(errorSaga, error);
  }
}

function* updateProfileWorker(action) {
  try {
    const profile = yield select(getNewProfile);
    const newProfile = {
      ...profile,
      ...action.payload,
    };
    yield call(axiosUserPutProfile, newProfile);
    yield put(putProfileSucceed());
    /* eslint-disable-next-line no-undef */
    toast.show(toastMessages.savedProfile);
  } catch (error) {
    yield put(putProfileFailure());
    yield put(profileFailure());
    yield call(errorSaga, error);
  }
}

function* getSelectorsDataWorker() {
  try {
    const industries = yield call(axiosIndustries);
    const missions = yield call(axiosMissions);
    const specialities = yield call(axiosSpecialities);

    yield put(industriesSucceed(industries.data.data));
    yield put(missionsSucceed(missions.data.data));
    yield put(specialitiesSucceed(specialities.data.data));
  } catch (error) {
    yield put(profileFailure());
    yield call(errorSaga, error);
  }
}

function* profileWatcher() {
  yield takeEvery(types.PROFILE_REQUESTED, getProfileWorker);
  yield takeEvery(types.UPDATE_PROFILE_REQUESTED, updateProfileWorker);
  yield takeEvery(types.GET_SELECTORS_DATA_REQUESTED, getSelectorsDataWorker);
}

export default profileWatcher;
