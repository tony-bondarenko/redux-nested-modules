import {Observable, of} from "rxjs";

import {Project} from "../entity";

export class ProjectService {
    getCollection(): Observable<Project[]> {
        return of([]);
    }
}
