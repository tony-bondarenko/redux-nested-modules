import {useContext} from 'react';

import {ModuleConfigContext, ReduxModuleConfig} from '../component/ReduxModuleConfigProvider';

export function useReduxModuleConfig(): ReduxModuleConfig {
    const config = useContext(ModuleConfigContext);
    if (!config) {
        throw new Error('ReduxModule config is not provided');
    }
    return config;
}
