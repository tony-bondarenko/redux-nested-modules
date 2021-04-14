import {combineEpics} from 'redux-observable';

import userEpic from 'app/module/user/user.epic';

export default combineEpics(userEpic);
