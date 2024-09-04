import { combineReducers } from 'redux';
import UserInterfaceReducer from './UserInterfaceReducer';
import ManagementReducer from './ManagementReducer';
import { viewReducer } from './ViewReducer';

// Combine Reducers
const rootReducer = combineReducers({
    userInterface: UserInterfaceReducer,
    management: ManagementReducer,
    view: viewReducer,
});

export default rootReducer;
