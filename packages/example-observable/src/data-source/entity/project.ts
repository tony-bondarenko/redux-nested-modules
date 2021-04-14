import {Todo} from './todo';

export class Project {
    id?: string;
    todos?: Todo[];

    constructor(public name: string) {}
}
