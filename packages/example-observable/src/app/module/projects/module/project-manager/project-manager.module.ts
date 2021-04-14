import {Module} from 'redux-nested-modules';

import {ProjectManagerPage} from './component/ProjectManagerPage';
import {sliceFactory} from './project-manager.slice';
import {selectorFactory} from './project-manager.selector';
import {epicFactory} from './project-manager.epic';

@Module({
    component: ProjectManagerPage,
    sliceFactory,
    selectorFactory,
    epicFactory,
})
export default class ProjectManagerModule {}
