import {ReduxModule} from './redux-module';

export class ReduxModuleRegistry {
    protected static modules: {[key: string]: ReduxModule} = {};

    static register(module: ReduxModule) {
        this.modules[module.getAbsolutePath().join('/')] = module;
    }

    static reload() {
        for (const moduleName of Object.keys(this.modules)) {
            this.modules[moduleName].isRegistered = false;
        }
    }
}
