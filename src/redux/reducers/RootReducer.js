import { combineReducers } from 'redux';
import UserInterfaceReducer from './UserInterfaceReducer';
import { viewReducer } from './ViewReducer';

// Combine Reducers
const rootReducer = combineReducers({
    userInterface: UserInterfaceReducer,
    view: viewReducer,
});

export default rootReducer;
