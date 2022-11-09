import { all } from 'redux-saga/effects';
import loginWatcher from './auth/sagas';
import eventsWatcher from './events/sagas';
import homeWatcher from './home/sagas';
import communityWatcher from './community/sagas';
import opportunitiesWatcher from './opportunities/sagas';
import profileWatcher from './profile/sagas';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    eventsWatcher(),
    homeWatcher(),
    communityWatcher(),
    opportunitiesWatcher(),
    profileWatcher(),
  ]);
}
