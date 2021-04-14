import {Subject} from 'rxjs';
import {Epic, EpicMiddleware} from 'redux-observable';

export class EpicConfiguration {
    static epicSplitSubject$: Subject<Epic>;

    constructor(
        public rootEpic: Epic,
        public epicMiddleware: EpicMiddleware<any>,
        public epicHotReloadSubject$: Subject<void>
    ) {}

    getEpicSplitSubject(): Subject<Epic> {
        return EpicConfiguration.epicSplitSubject$;
    }
}
