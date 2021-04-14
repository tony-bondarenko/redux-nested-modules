import {BehaviorSubject, Subject} from 'rxjs';
import {map, mergeMap, startWith, switchMap, tap} from 'rxjs/operators';
import {createEpicMiddleware, Epic} from 'redux-observable';

import {EpicConfiguration} from './epic-configuration';

export function createEpic<D extends object>(
    initialEpic: Epic,
    dependencies: D
): EpicConfiguration {
    EpicConfiguration.epicSplitSubject$ = new BehaviorSubject<Epic>(initialEpic);
    const epicHotReloadSubject$ = new Subject<void>();

    const rootEpic: Epic = (action$, state$, dependencies) =>
        epicHotReloadSubject$.pipe(
            startWith(''),
            map(() => new BehaviorSubject(initialEpic)),
            tap(subject => (EpicConfiguration.epicSplitSubject$ = subject)),
            switchMap(() =>
                EpicConfiguration.epicSplitSubject$.pipe(
                    mergeMap(epic => epic(action$, state$, dependencies))
                )
            )
        );

    const epicMiddleware = createEpicMiddleware({
        dependencies,
    });

    return new EpicConfiguration(rootEpic, epicMiddleware, epicHotReloadSubject$);
}
