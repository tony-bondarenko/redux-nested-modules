import {Module} from 'redux-nested-modules';

import {TodoManagerPage} from "./component/TodoManagerPage";

@Module({
    component: TodoManagerPage,
})
export default class TodoManagerModule {}
