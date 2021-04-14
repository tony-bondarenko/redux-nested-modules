import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {asyncModuleComponent} from 'redux-nested-modules';
import {useDispatch, useSelector} from 'react-redux';

import {selectCurrentUser, loadCurrentUser} from 'app/module/user';

const ProjectsPage = asyncModuleComponent(
    'projects',
    () => import('../module/projects/projects.module')
);

const App: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, [dispatch]);

    if (user === undefined) {
        return <span>Loading...</span>;
    }

    if (!user) {
        return <span>Permission denied</span>;
    }

    return (
        <React.Fragment>
            <header>Hi, {user.name}!</header>
            <hr />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/projects">Project Manager</Link>
                </li>
            </ul>
            <hr />
            <Switch>
                <Route path="/projects" component={ProjectsPage} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
