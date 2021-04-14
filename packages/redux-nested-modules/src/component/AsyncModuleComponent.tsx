import React, {useEffect, useState} from 'react';
import {from, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {ReduxModule} from '../redux-module';
import {ModuleProvider} from './ModuleProvider';
import {useReduxModule} from '../hook/useReduxModule';
import {useReduxModuleConfig} from '../hook/useReduxModuleConfig';
import {Constructor, ESModule, isReduxModule} from '../types';

export function asyncModuleComponent(
    path: string | string[],
    getModule: () => Promise<ESModule<Constructor<any>>>,
    placeholder?: React.ReactElement
) {
    const AsyncComponent: React.FC<any> & {module?: ReduxModule} = props => {
        const [unmountSubject$] = useState(new Subject());
        const [reduxModule, setReduxModule] = useState<ReduxModule | undefined>(
            () => AsyncComponent.module
        );
        const [rerenderState, rerender] = useState(true);
        const parentModule = useReduxModule();
        const config = useReduxModuleConfig();

        useEffect(() => {
            if (!reduxModule) {
                from(getModule())
                    .pipe(map(module => module.default))
                    .subscribe(reduxModuleCtor => {
                        if (isReduxModule(reduxModuleCtor)) {
                            const reduxModule = new reduxModuleCtor();
                            AsyncComponent.module = reduxModule;
                            reduxModule.register(
                                config.reducerRegistry,
                                config.epicConfiguration.getEpicSplitSubject(),
                                path,
                                parentModule
                            );
                            setReduxModule(() => AsyncComponent.module);
                        } else {
                            throw new Error('Trying to load incorrect redux module');
                        }
                    });
            }
            return () => {
                unmountSubject$.next();
                unmountSubject$.complete();
            };
        }, [reduxModule, parentModule, unmountSubject$, config]);

        const moduleRegistered = reduxModule?.isRegistered;
        useEffect(() => {
            if (reduxModule && !reduxModule.isRegistered) {
                reduxModule.register(
                    config.reducerRegistry,
                    config.epicConfiguration.getEpicSplitSubject(),
                    path,
                    parentModule
                );
                rerender(!rerenderState);
            }
        }, [reduxModule, parentModule, moduleRegistered, rerenderState, config]);

        if (!reduxModule || !reduxModule.isRegistered) {
            return placeholder ?? null;
        }

        const Component = reduxModule.getComponent();
        return Component ? (
            <ModuleProvider module={reduxModule}>
                <Component {...props} />
            </ModuleProvider>
        ) : null;
    };
    return AsyncComponent;
}
