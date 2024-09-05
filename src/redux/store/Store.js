import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/RootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk'; // Correct import for thunk

const persistConfig = {
  key: 'root',
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store with persisted reducer and middleware
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk) 
);

export const persistor = persistStore(store);

export default store;
