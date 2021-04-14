import React from "react";

import {ReduxModule} from "../redux-module";

export const ModuleContext = React.createContext<ReduxModule | undefined>(undefined);

export const ModuleProvider: React.FC<{ module: ReduxModule }> = ({module, children}) => {
    return (
        <ModuleContext.Provider value={module}>
            {children}
        </ModuleContext.Provider>
    );
};
