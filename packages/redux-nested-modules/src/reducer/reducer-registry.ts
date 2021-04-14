import {combineReducers, Reducer, ReducersMapObject} from 'redux';
import {EnhancedStore} from '@reduxjs/toolkit';
import cloneDeep from 'lodash.clonedeep';

import {DuplicateReducerError} from './duplicate-reducer-error';

export interface ReducersMap {
    [key: string]: ReducersMap | Reducer | ReducersMapObject;
}

function isReducer(x: unknown): x is Reducer {
    return typeof x === 'function';
}

export class ReducerRegistry {
    public store?: EnhancedStore;

    protected baseReducers: ReducersMap;
    protected reducers: ReducersMap;

    get initialReducers(): Reducer {
        return this.buildReducer(this.reducers);
    }

    constructor(baseReducers: ReducersMapObject | ReducersMap) {
        this.baseReducers = cloneDeep(baseReducers);
        this.reducers = baseReducers;
    }

    injectReducers(path: string[], reducers: Reducer | ReducersMapObject | ReducersMap): void {
        if (!this.store) {
            throw new Error('Store is not set into ReducerRegistry');
        }
        try {
            let reducersCopy: Reducer | ReducersMapObject | ReducersMap;
            if (!isReducer(reducers)) {
                reducersCopy = cloneDeep(reducers);
            } else {
                reducersCopy = reducers;
            }
            this.internalInject(this.reducers, path, reducersCopy);
            this.store.replaceReducer(this.buildReducer(this.reducers));
        } catch (e) {
            if (e instanceof DuplicateReducerError) {
                throw new Error(`Duplicate reducer inject using path: ${path.join('->')}`);
            }
            throw e;
        }
    }

    reset(): void {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error('ReducerRegistry reset is allowed only in dev mode');
        }
        this.reducers = cloneDeep(this.baseReducers);
    }

    protected internalInject(
        map: ReducersMap | ReducersMapObject,
        path: string[],
        reducers: Reducer | ReducersMapObject | ReducersMap
    ): void {
        const pathCopy = [...path];
        const [property] = pathCopy.splice(0, 1);
        if (pathCopy.length === 0) {
            if (map[property]) {
                throw new DuplicateReducerError();
            }
            map[property] = reducers;
        } else {
            if (!map[property]) {
                map[property] = {};
            }
            const reducer = map[property];
            if (isReducer(reducer)) {
                throw new DuplicateReducerError();
            }
            this.internalInject(reducer, pathCopy, reducers);
        }
    }

    protected buildReducer(map: ReducersMap | ReducersMapObject): Reducer {
        const levelReducer: ReducersMapObject = {};
        for (const propertyName of Object.keys(map)) {
            const reducer = map[propertyName];
            if (isReducer(reducer)) {
                levelReducer[propertyName] = reducer;
            } else {
                levelReducer[propertyName] = this.buildReducer(reducer);
            }
        }
        return combineReducers(levelReducer);
    }
}
