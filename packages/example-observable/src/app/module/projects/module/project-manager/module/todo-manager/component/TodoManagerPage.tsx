import React from "react";
import {useSelector} from "react-redux";
import {useReduxModule} from "redux-nested-modules";

import {ModuleSlice as ProjectManagerSlice} from '../../../project-manager.slice';
import {ModuleSelectors as ProjectManagerSelectors} from '../../../project-manager.selector';

export const TodoManagerPage: React.FC = () => {
    const projectManagerModule = useReduxModule<ProjectManagerSlice, ProjectManagerSelectors>('manager');
    const project = useSelector(projectManagerModule.selector.selectProject);

    if (!project) {
        return <div>Unknown project</div>;
    }

    return <div>Project got from parent module: {project.name}</div>;
}
