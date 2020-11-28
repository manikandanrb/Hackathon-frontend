/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/App';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { name as appName } from './app.json';

const RootApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RootApp);
