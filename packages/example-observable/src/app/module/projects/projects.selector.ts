import {ReduxModule} from 'redux-nested-modules';
import {Selector} from '@reduxjs/toolkit';

import {Project} from 'data-source';

import {ModuleSlice} from './projects.slice';

export const selectorFactory = (module: ReduxModule<ModuleSlice>) => {
    const selectProjects: Selector<unknown, Project[] | undefined> = state =>
        module.rootSelector(state).projects;
    const selectProjectsLoaded: Selector<unknown, boolean> = state =>
        module.rootSelector(state).projectsLoaded;
    const selectAddInProgress: Selector<unknown, boolean> = state =>
        !!module.rootSelector(state).addInProgress;

    return {
        selectProjects,
        selectProjectsLoaded,
        selectAddInProgress,
    } as const;
};
export type ModuleSelectors = ReturnType<typeof selectorFactory>;
