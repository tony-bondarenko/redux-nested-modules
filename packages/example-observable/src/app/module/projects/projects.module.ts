import {Module} from 'redux-nested-modules';

import {ProjectManagerPage} from './component/ProjectManagerPage';
import {sliceFactory} from './projects.slice';
import {selectorFactory} from './projects.selector';
import {epicFactory} from './projects.epic';

@Module({
    component: ProjectManagerPage,
    sliceFactory,
    selectorFactory,
    epicFactory,
})
export default class ProjectsModule {}
