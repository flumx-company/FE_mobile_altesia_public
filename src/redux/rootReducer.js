import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import eventsReducer from './events/reducer';
import communityReducer from './community/reducer';
import opportunitiesReducer from './opportunities/reducer';
import homeReducer from './home/reducer';
import profileReducer from './profile/reducer';
import globalReducer from './global/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  events: eventsReducer,
  community: communityReducer,
  opportunities: opportunitiesReducer,
  features: homeReducer,
  global: globalReducer,
});

export default rootReducer;
