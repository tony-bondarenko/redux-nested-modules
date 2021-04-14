import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ReduxModule} from 'redux-nested-modules';

import {Project} from 'data-source';

interface State {
    projects?: Project[];
}

export const sliceFactory = (module: ReduxModule) => {
    return createSlice({
        name: module.getPath(),
        initialState: {} as State,
        reducers: {
            unload() {
                return {};
            },
            loadProjects() {},
            projectCollectionLoaded(state, {payload: projectCollection}: PayloadAction<Project[]>) {
                state.projects = projectCollection;
            },
        },
    });
};
export type ModuleSlice = ReturnType<typeof sliceFactory>;
