import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {
    createEpic, createStore,
    ReducerRegistry,
    ReduxModuleConfigProvider,
    ReduxModuleRegistry,
} from 'redux-nested-modules';

import rootReducer from 'app/app.reducer';
import rootEpic from 'app/app.epic';
import {createServiceMap} from 'data-source';

import './index.css';
import reportWebVitals from './reportWebVitals';

const serviceMap = createServiceMap();
const reducerRegistry = new ReducerRegistry(rootReducer);
const epicConfiguration = createEpic(rootEpic, {
    service: serviceMap,
});
const store = createStore(reducerRegistry, [epicConfiguration.epicMiddleware]);
epicConfiguration.epicMiddleware.run(epicConfiguration.rootEpic);

const render = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const App = require('./app/component/App').default;
    ReactDOM.render(
        <ReduxProvider store={store}>
            <ReduxModuleConfigProvider
                reducerRegistry={reducerRegistry}
                epicConfiguration={epicConfiguration}
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ReduxModuleConfigProvider>
        </ReduxProvider>,
        document.getElementById('root')
    );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/component/App', () => {
        /**
         * react-scripts v4.0.0 does not call this function
         */
        // eslint-disable-next-line no-console
        console.log('[HMR] update');
        reducerRegistry.reset();
        epicConfiguration.epicHotReloadSubject$.next();
        ReduxModuleRegistry.reload();
        render();
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
