import {Module} from 'redux-nested-modules';

import {ProjectsRouter} from './component/ProjectsRouter';
import {sliceFactory} from './projects.slice';
import {selectorFactory} from './projects.selector';
import {epicFactory} from './projects.epic';

@Module({
    component: ProjectsRouter,
    sliceFactory,
    selectorFactory,
    epicFactory,
})
export default class ProjectsModule {}
