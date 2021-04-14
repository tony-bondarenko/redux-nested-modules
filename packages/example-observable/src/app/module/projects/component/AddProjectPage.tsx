import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useReduxModule} from 'redux-nested-modules';

import {ModuleSlice} from '../projects.slice';
import {ModuleSelectors} from '../projects.selector';
import {ProjectList} from './add-project/ProjectList';
import {ProjectAddForm} from './add-project/ProjectAddForm';

export const AddProjectPage: React.FC = () => {
    const dispatch = useDispatch();
    const currentModule = useReduxModule<ModuleSlice, ModuleSelectors>();
    const isProjectsLoaded = useSelector(currentModule.selector.selectProjectsLoaded);

    const loadProjectsAction = currentModule.slice.actions.loadProjects;
    const unloadAction = currentModule.slice.actions.unload;
    useEffect(() => {
        dispatch(loadProjectsAction());
        return () => {
            dispatch(unloadAction());
        };
    }, [dispatch, loadProjectsAction, unloadAction]);

    if (!isProjectsLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <p>Add project</p>
                <ProjectAddForm />
            </div>
            <ProjectList />
        </div>
    );
};
