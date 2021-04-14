import {Slice} from '@reduxjs/toolkit';
import {ReduxModule} from './redux-module';

export interface ESModule<T> {
    default: T;
}

export type Constructor<T> = new (...args: unknown[]) => T;

export function isSlice(x: any): x is Slice {
    return typeof x === 'object' && 'reducer' in x && 'actions' in x && 'caseReducers' in x;
}

export type SliceMap = {
    [key: string]: Slice;
};

export type SliceState<S extends Slice> = ReturnType<S['reducer']>;
export type SliceMapState<S extends SliceMap> = {
    [P in keyof S]: ReturnType<S[P]['reducer']>;
};

export type ExtractSliceState<S extends Slice | SliceMap> = S extends SliceMap
    ? SliceMapState<S>
    : S extends Slice
    ? SliceState<S>
    : any;

export function isReduxModule(x: unknown): x is typeof ReduxModule {
    return typeof x === 'function' && '__reduxModule' in x;
}
