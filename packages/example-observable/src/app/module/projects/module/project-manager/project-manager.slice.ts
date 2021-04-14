import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ReduxModule} from 'redux-nested-modules';

import {Project} from 'data-source';
import {toSerializable} from 'shared';

class State {
    project?: Project | null;
}

export const sliceFactory = (module: ReduxModule) => {
    return createSlice({
        name: module.getPath(),
        initialState: toSerializable(new State()),
        reducers: {
            unload() {
                return toSerializable(new State());
            },
            loadProject(state, {payload: projectId}: PayloadAction<string>) {},
            projectLoaded(state, {payload: project}: PayloadAction<Project | null>) {
                state.project = project;
            },
        },
    });
};
export type ModuleSlice = ReturnType<typeof sliceFactory>;
