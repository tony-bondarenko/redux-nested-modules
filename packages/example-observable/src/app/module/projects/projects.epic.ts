import {map, mergeMap} from 'rxjs/operators';
import {combineEpics, ofType} from 'redux-observable';
import {ReduxModule} from 'redux-nested-modules';

import {Epic} from 'types';

import {ModuleSlice} from './projects.slice';

export const epicFactory = (module: ReduxModule<ModuleSlice>) => {
    const epics: Epic[] = [];

    epics.push((action$, state$, {service: {projectService}}) =>
        action$.pipe(
            ofType(module.slice.actions.loadProjects),
            mergeMap(() => {
                return projectService
                    .getCollection()
                    .pipe(
                        map(projectCollection =>
                            module.slice.actions.projectCollectionLoaded(projectCollection)
                        )
                    );
            })
        )
    );

    return combineEpics(...epics);
};
