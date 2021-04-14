import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ReduxModule} from 'redux-nested-modules';

import {Project} from 'data-source';
import {toSerializable} from "shared";

class State {
    projects: Project[] = [];
    projectsLoaded = false;
    addInProgress?: boolean;
}

export const sliceFactory = (module: ReduxModule) => {
    return createSlice({
        name: module.getPath(),
        initialState: toSerializable(new State()),
        reducers: {
            unload() {
                return toSerializable(new State());
            },
            loadProjects() {},
            projectCollectionLoaded(state, {payload: projectCollection}: PayloadAction<Project[]>) {
                state.projects = projectCollection;
                state.projectsLoaded = true;
            },
            addProject(state, {payload: project}: PayloadAction<Project>) {
                state.addInProgress = true;
            },
            projectAdded(state, {payload: project}: PayloadAction<Project>) {
                state.projects = [
                    ...state.projects,
                    project,
                ];
                state.addInProgress = false;
            }
        },
    });
};
export type ModuleSlice = ReturnType<typeof sliceFactory>;
