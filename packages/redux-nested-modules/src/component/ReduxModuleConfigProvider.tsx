import React from 'react';

import {ReducerRegistry} from '../reducer';
import {EpicConfiguration} from '../epic';

export interface ReduxModuleConfig {
    reducerRegistry: ReducerRegistry;
    epicConfiguration: EpicConfiguration;
}

export const ModuleConfigContext = React.createContext<ReduxModuleConfig | undefined>(undefined);

export const ReduxModuleConfigProvider: React.FC<ReduxModuleConfig> = ({reducerRegistry, epicConfiguration, children}) => {
    const contextValue: ReduxModuleConfig = {
        reducerRegistry,
        epicConfiguration,
    };
    return <ModuleConfigContext.Provider value={contextValue}>{children}</ModuleConfigContext.Provider>;
};
