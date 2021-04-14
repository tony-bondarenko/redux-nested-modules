import {ReduxModule} from 'redux-nested-modules';
import {Selector} from '@reduxjs/toolkit';

import {Project} from 'data-source';

import {ModuleSlice} from './project-manager.slice';

export const selectorFactory = (module: ReduxModule<ModuleSlice>) => {
    const selectProject: Selector<unknown, Project | null | undefined> = state =>
        module.rootSelector(state).project;

    return {
        selectProject,
    } as const;
};
export type ModuleSelectors = ReturnType<typeof selectorFactory>;
