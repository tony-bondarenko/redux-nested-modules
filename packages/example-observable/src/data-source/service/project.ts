import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {generateId} from 'shared';

import {Project} from '../entity';

export class ProjectService {
    protected static readonly HTTP_DELAY = 1000;
    protected projects: Project[] = [];

    getById(id: string): Observable<Project | null> {
        const project = this.projects.find(value => value.id === id);
        return of(project ?? null).pipe(delay(ProjectService.HTTP_DELAY));
    }

    getCollection(): Observable<Project[]> {
        return of(this.projects).pipe(delay(ProjectService.HTTP_DELAY));
    }

    addProject(project: Project): Observable<Project> {
        const newProject = {
            ...project,
            id: generateId(5),
        };
        this.projects = [...this.projects, newProject];
        return of(newProject).pipe(delay(ProjectService.HTTP_DELAY));
    }
}
