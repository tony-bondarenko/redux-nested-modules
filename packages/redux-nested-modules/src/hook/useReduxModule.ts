import {useContext} from 'react';

import {ModuleContext} from '../component/ModuleProvider';
import {ReduxModule} from '../redux-module';
import {Slice as SliceBase} from '@reduxjs/toolkit';
import {SliceMap} from '../types';

export function useReduxModule<Slice extends SliceBase | SliceMap, Selectors = any>(
    name?: string
): ReduxModule<Slice, Selectors> {
    const currentModule = useContext(ModuleContext) as ReduxModule<Slice, Selectors>;
    if (currentModule && name) {
        return currentModule.findModule(name) as ReduxModule<Slice, Selectors>;
    }
    return currentModule;
}
