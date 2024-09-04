import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/RootReducer';  
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer, applyMiddleware(thunk)) 

// Create Store
const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
