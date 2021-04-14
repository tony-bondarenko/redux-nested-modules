import React from "react";
import {Route, Switch} from "react-router";
import {useRouteMatch} from "react-router-dom";
import {asyncModuleComponent} from "redux-nested-modules";

import {AddProjectPage} from "./AddProjectPage";

const ProjectsManager = asyncModuleComponent(
    'manager',
    () => import('../module/project-manager/project-manager.module')
);

export const ProjectsRouter: React.FC = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.url} exact component={AddProjectPage} />
            <Route path={`${match.url}/:projectId`} component={ProjectsManager} />
        </Switch>
    );
}
