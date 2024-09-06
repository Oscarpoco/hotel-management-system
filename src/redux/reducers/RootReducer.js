import { combineReducers } from 'redux';
import UserInterfaceReducer from './UserInterfaceReducer';
import { viewReducer } from './ViewReducer';
import alertNotificationReducer from './AlertNotificationReducer';

// Combine Reducers
const rootReducer = combineReducers({
    userInterface: UserInterfaceReducer,
    view: viewReducer,
    notification: alertNotificationReducer,
});

export default rootReducer;
