import {from, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Epic} from 'redux-observable';

import {Constructor, ESModule, isReduxModule} from './types';
import {ReduxModule} from './redux-module';
import {ReducerRegistry} from './reducer';

export type AsyncModuleLoader = (
    parentModule: ReduxModule,
    onlyLoaded?: boolean
) => Observable<ReduxModule | undefined>;

interface AsyncModuleLoaderInternal {
    module: ReduxModule;
    parentModule: ReduxModule;
}

// @todo think on how to encapsulate reducerRegistry & epicSubject
export function asyncModule(
    path: string | string[],
    getModule: () => Promise<ESModule<Constructor<ReduxModule>>>,
    reducerRegistry: ReducerRegistry,
    epicSplitSubject$: Subject<Epic>
): AsyncModuleLoader {
    const loader = ((parentModule: ReduxModule, onlyLoaded = false) => {
        if (onlyLoaded && (!loader.module || !loader.module.isRegistered)) {
            return of(undefined);
        }
        if (loader.module) {
            if (loader.parentModule !== parentModule) {
                throw new Error('Async module is already loaded with different parent module');
            }
            if (!loader.module.isRegistered) {
                loader.module.register(
                    reducerRegistry,
                    epicSplitSubject$,
                    path,
                    loader.parentModule
                );
            }
            return of(loader.module);
        }
        return from(getModule()).pipe(
            map(module => module.default),
            map(ReduxModuleCtor => {
                if (isReduxModule(ReduxModuleCtor)) {
                    loader.module = new ReduxModuleCtor();
                    loader.parentModule = parentModule;
                    loader.module.register(reducerRegistry, epicSplitSubject$, path, parentModule);
                } else {
                    throw new Error('Trying to load incorrect redux module');
                }
                return loader.module;
            })
        );
    }) as AsyncModuleLoader & AsyncModuleLoaderInternal;
    return loader;
}
