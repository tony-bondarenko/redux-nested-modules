import {map, mergeMap} from 'rxjs/operators';
import {combineEpics, ofType} from 'redux-observable';

import {Epic} from 'types';
import {toSerializable} from 'shared';

import {loadCurrentUser, currentUserLoaded} from './user.slice';

const epics: Epic[] = [];

epics.push((action$, state$, {service: {userService}}) =>
    action$.pipe(
        ofType(loadCurrentUser),
        mergeMap(() => {
            return userService
                .getCurrent()
                .pipe(map(currentUser => currentUserLoaded(toSerializable(currentUser))));
        })
    )
);

export default combineEpics(...epics);
