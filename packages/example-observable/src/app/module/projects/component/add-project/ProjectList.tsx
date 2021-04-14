import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useReduxModule} from 'redux-nested-modules';

import {ModuleSlice} from '../../projects.slice';
import {ModuleSelectors} from '../../projects.selector';

export const ProjectList: React.FC = () => {
    const match = useRouteMatch();
    const currentModule = useReduxModule<ModuleSlice, ModuleSelectors>();
    const projectCollection = useSelector(currentModule.selector.selectProjects);
    if (!projectCollection || !projectCollection.length) {
        return <span>There are no projects</span>;
    }
    return (
        <div>
            <ul>
                {projectCollection &&
                    projectCollection.map((project, index) => (
                        <li key={index}>
                            <Link to={`${match.url}/${project.id}`}>{project.name}</Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
