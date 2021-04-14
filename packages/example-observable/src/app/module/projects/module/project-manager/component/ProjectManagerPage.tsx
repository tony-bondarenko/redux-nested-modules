import React, {useEffect} from 'react';
import {asyncModuleComponent, useReduxModule} from 'redux-nested-modules';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch, Link} from 'react-router-dom';
import {Route, Switch} from "react-router";

import {ModuleSlice} from '../project-manager.slice';
import {ModuleSelectors} from '../project-manager.selector';

const TodoManager = asyncModuleComponent(
    'todo',
    () => import('../module/todo-manager/todo-manager.module')
);

export const ProjectManagerPage: React.FC = () => {
    const match = useRouteMatch<{projectId: string}>();
    const projectId = match.params.projectId;

    const dispatch = useDispatch();
    const currentModule = useReduxModule<ModuleSlice, ModuleSelectors>();
    const project = useSelector(currentModule.selector.selectProject);

    const loadProjectAction = currentModule.slice.actions.loadProject;
    const unloadAction = currentModule.slice.actions.unload;
    useEffect(() => {
        dispatch(loadProjectAction(projectId));
        return () => {
            dispatch(unloadAction());
        };
    }, [dispatch, loadProjectAction, unloadAction, projectId]);

    if (project === undefined) {
        return <div>Loading...</div>;
    }
    if (project === null) {
        return <div>Page Not Found</div>;
    }

    return (
        <div>
            <div>Projects \ {project.name}</div>
            <ul>
                <li><Link to={`${match.url}/todos`}>Todos</Link></li>
            </ul>
            <hr/>
            <Switch>
                <Route path={`${match.url}/todos`} component={TodoManager} />
            </Switch>
        </div>
    );
};
