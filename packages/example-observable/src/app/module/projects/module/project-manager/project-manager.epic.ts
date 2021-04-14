import {map, mergeMap} from 'rxjs/operators';
import {PayloadAction} from '@reduxjs/toolkit';
import {combineEpics, ofType} from 'redux-observable';
import {ReduxModule} from 'redux-nested-modules';

import {Epic} from 'types';

import {ModuleSlice} from './project-manager.slice';

export const epicFactory = (module: ReduxModule<ModuleSlice>) => {
    const epics: Epic[] = [];

    epics.push((action$, state$, {service: {projectService}}) =>
        action$.pipe(
            ofType(module.slice.actions.loadProject),
            mergeMap(({payload: projectId}: PayloadAction<string>) => {
                return projectService
                    .getById(projectId)
                    .pipe(map(project => module.slice.actions.projectLoaded(project)));
            })
        )
    );

    return combineEpics(...epics);
};
