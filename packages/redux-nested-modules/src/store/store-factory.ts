import {configureStore, getDefaultMiddleware, Middleware} from '@reduxjs/toolkit';

import {ReducerRegistry} from '../reducer';

export function createStore(reducerRegistry: ReducerRegistry, middlewareCollection: Middleware[]) {
    const customizedMiddleware = getDefaultMiddleware({
        thunk: false,
    });
    customizedMiddleware.push(...middlewareCollection);

    const store = configureStore({
        reducer: reducerRegistry.initialReducers,
        middleware: customizedMiddleware,
    });
    reducerRegistry.store = store;
    return store;
}
