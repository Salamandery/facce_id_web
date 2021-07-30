import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import calendar from './calendar/reducer';

export default combineReducers({ auth, user, calendar });
