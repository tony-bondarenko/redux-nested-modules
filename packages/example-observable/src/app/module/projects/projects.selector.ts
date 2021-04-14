import {ReduxModule} from 'redux-nested-modules';
import {Selector} from '@reduxjs/toolkit';

import {Project} from 'data-source';

import {ModuleSlice} from './projects.slice';

export const selectorFactory = (module: ReduxModule<ModuleSlice>) => {
    const selectProjects: Selector<unknown, Project[] | undefined> = state =>
        module.rootSelector(state).projects;

    return {
        selectProjects,
    } as const;
};
export type ModuleSelectors = ReturnType<typeof selectorFactory>;
