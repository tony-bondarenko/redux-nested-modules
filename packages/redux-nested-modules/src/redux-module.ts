import React from 'react';
import {Slice as SliceBase, Selector} from '@reduxjs/toolkit';
import {Epic} from 'redux-observable';
import {Subject} from 'rxjs';

import {ReducerRegistry, ReducersMap} from './reducer/reducer-registry';
import {ExtractSliceState, isSlice, SliceMap} from './types';
import {ReduxModuleRegistry} from './redux-module-registry';

export abstract class ReduxModule<
    Slice extends SliceBase | SliceMap = any,
    Selectors = any,
    State = ExtractSliceState<Slice>
> {
    protected static readonly MODULE_NODE = '@@module';

    isRegistered = false;

    protected moduleName?: string;
    protected path?: string[];
    protected parent?: ReduxModule;
    protected component?: React.ComponentType<any>;
    protected sliceFactory?: (module: ReduxModule) => Slice;
    protected sliceInstance?: Slice;
    protected selectorFactory?: (module: ReduxModule) => Selectors;
    protected selectorInstance?: Selectors;
    protected epicFactory?: (module: ReduxModule) => Epic;
    protected epicInstance?: Epic;

    register(
        reducerRegistry: ReducerRegistry,
        epic$: Subject<Epic>,
        path: string | string[],
        parent?: ReduxModule
    ) {
        if (process.env.NODE_ENV === 'development') {
            console.log('register', this.moduleName);
        }

        this.path = Array.isArray(path) ? path : [path];
        this.parent = parent;

        if (this.sliceFactory) {
            reducerRegistry.injectReducers([...this.getAbsolutePath(), ReduxModule.MODULE_NODE], this.getReducer());
        }
        if (this.epicFactory) {
            epic$.next(this.getEpic());
        }

        ReduxModuleRegistry.register(this);
        this.isRegistered = true;
    }

    getComponent(): React.ComponentType<any> | undefined {
        return this.component;
    }

    getReducer() {
        if (isSlice(this.slice)) {
            return this.slice.reducer;
        }
        const reducerMap: ReducersMap = {};
        const sliceMap: SliceMap = this.slice as any;
        for (const sliceName of Object.keys(sliceMap)) {
            reducerMap[sliceName] = sliceMap[sliceName].reducer;
        }
        return reducerMap;
    }

    get slice(): Slice {
        if (!this.sliceFactory) {
            return undefined as any;
        }
        if (!this.sliceInstance) {
            this.sliceInstance = this.sliceFactory(this);
        }
        return this.sliceInstance;
    }

    get selector(): Selectors {
        if (!this.selectorFactory) {
            return undefined as any;
        }
        if (!this.selectorInstance) {
            this.selectorInstance = this.selectorFactory(this);
        }
        return this.selectorInstance;
    }

    getEpic(): Epic {
        if (!this.epicFactory) {
            return undefined as any;
        }
        if (!this.epicInstance) {
            this.epicInstance = this.epicFactory(this);
        }
        return this.epicInstance;
    }

    rootSelector: Selector<any, State> = state => {
        let resultState = state;
        for (const path of [...this.getAbsolutePath(), ReduxModule.MODULE_NODE]) {
            if (!resultState[path]) {
                return undefined;
            }
            resultState = resultState[path];
        }
        return resultState;
    };

    getPath(): string {
        return this.getAbsolutePath().join('/');
    }

    getAbsolutePath(): string[] {
        if (!this.path) {
            throw new Error('Module has not been registered');
        }
        if (this.parent) {
            return [...this.parent.getAbsolutePath(), ...this.path];
        }
        return this.path;
    }

    findModule<S extends SliceBase | SliceMap, SL = any>(
        name: string
    ): ReduxModule<S, SL> | undefined {
        if (!this.path) {
            throw new Error('Module is not registered');
        }
        if (this.path[this.path?.length - 1] === name) {
            return this as any;
        }
        if (this.parent) {
            return this.parent.findModule(name);
        }
        return undefined;
    }
}
