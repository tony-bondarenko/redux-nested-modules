import {ProjectService} from './service/project';
import {TodoService} from './service/todo';
import {UserService} from './service/user';

export function createServiceMap() {
    return {
        projectService: new ProjectService(),
        todoService: new TodoService(),
        userService: new UserService(),
    } as const;
}

export type ServiceMap = ReturnType<typeof createServiceMap>;
