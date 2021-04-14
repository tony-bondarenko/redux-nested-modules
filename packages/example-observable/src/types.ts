import {Action} from 'redux';
import {ActionsObservable, StateObservable} from 'redux-observable';
import {Observable} from 'rxjs';

import {ServiceMap} from './data-source';

export interface Epic<
    Input extends Action = any, // eslint-disable-line @typescript-eslint/no-explicit-any
    Output extends Input = Input,
    State = any, // eslint-disable-line @typescript-eslint/no-explicit-any
    Dependencies = {service: ServiceMap}
> {
    (
        action$: ActionsObservable<Input>,
        state$: StateObservable<State>,
        dependencies: Dependencies
    ): Observable<Output>;
}
