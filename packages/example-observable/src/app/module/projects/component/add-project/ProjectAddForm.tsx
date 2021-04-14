import {useDispatch, useSelector} from 'react-redux';
import {useReduxModule} from 'redux-nested-modules';
import React, {useState} from 'react';

import {toSerializable} from 'shared';
import {Project} from 'data-source';

import {ModuleSlice} from '../../projects.slice';
import {ModuleSelectors} from '../../projects.selector';

export const ProjectAddForm: React.FC = () => {
    const dispatch = useDispatch();
    const currentModule = useReduxModule<ModuleSlice, ModuleSelectors>();
    const isAddInProgress = useSelector(currentModule.selector.selectAddInProgress);
    const [newProjectName, setNewProjectName] = useState('');

    return (
        <div>
            <input type="text" onChange={event => setNewProjectName(event.target.value)} />
            <button
                onClick={() =>
                    newProjectName &&
                    dispatch(
                        currentModule.slice.actions.addProject(
                            toSerializable(new Project(newProjectName))
                        )
                    )
                }
            >
                Add
            </button>
            {isAddInProgress && <span>Adding...</span>}
        </div>
    );
};
