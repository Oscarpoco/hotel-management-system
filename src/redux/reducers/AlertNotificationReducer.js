import { IS_NOTIF_ALERT_OPEN, IS_NOTIF_ALERT_CLOSE } from "../actions/AlertNotification";


// INITIAL STATE
const initialState = {
    notificationArletVisible: false,
    message: "",
}

// REDUCER
const alertNotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_NOTIF_ALERT_OPEN:
            return {
                ...state, 
                notificationArletVisible: true,
                message: action.payload,
            };

        case IS_NOTIF_ALERT_CLOSE:
            return {...state, 
                message: "",
                notificationArletVisible: false
            };
                default:
        return state;
    }
}

export default alertNotificationReducer;