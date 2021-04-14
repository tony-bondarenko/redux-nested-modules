import React from 'react';
import {Slice} from '@reduxjs/toolkit';
import {Epic} from 'redux-observable';

import {ReduxModule} from '../redux-module';
import {SliceMap} from '../types';

interface ReduxModuleConfig {
    component: React.ComponentType<any>;
    sliceFactory?: (module: ReduxModule) => Slice | SliceMap;
    epicFactory?: (module: ReduxModule) => Epic;
    selectorFactory?: (module: ReduxModule) => any;
}

export function Module(config: ReduxModuleConfig) {
    return function classDecorator(originalClass: any): any {
        return class extends ReduxModule {
            static readonly __reduxModule = true;
            protected moduleName = originalClass.name;
            protected component = config.component;
            protected sliceFactory = config.sliceFactory;
            protected epicFactory = config.epicFactory;
            protected selectorFactory = config.selectorFactory;
        };
    };
}
