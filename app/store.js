import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rootReducer from './reducers';

const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);


const store = createStore(
  pReducer,
  middleware
)

const persistor = persistStore(store);

export { persistor, store };