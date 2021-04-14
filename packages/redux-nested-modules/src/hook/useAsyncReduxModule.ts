import {Slice as SliceBase} from '@reduxjs/toolkit';
import {useEffect, useState} from 'react';

import {ReduxModule} from '../redux-module';
import {SliceMap} from '../types';
import {useReduxModule} from './useReduxModule';
import {AsyncModuleLoader} from '../async-module';

// @todo subscribe on module load status change and update state on load status change - now is not implemented
export function useAsyncReduxModule<Slice extends SliceBase | SliceMap, Selectors = any>(
    loader: AsyncModuleLoader,
    onlyLoaded = false
): ReduxModule<Slice, Selectors> | undefined {
    const currentModule = useReduxModule<Slice, Selectors>();
    const [asyncModule, setAsyncModule] = useState<ReduxModule<Slice, Selectors>>();

    useEffect(() => {
        const subscription = loader(currentModule, onlyLoaded).subscribe(loadedModule =>
            setAsyncModule(loadedModule)
        );
        return () => {
            subscription.unsubscribe();
        };
    }, [currentModule, loader, onlyLoaded]);

    return asyncModule;
}
