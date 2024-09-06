import { IS_SIGNED_IN, 
    IS_SIDE_BAR_OPEN, 
    IS_SEND_NOTIF_BUTTON_OPEN, 
    IS_PROFILE_OPEN, 
    ON_UPDATE_PROFILE, 
    ON_ADD_ACCOMODATION, 
    IS_LOADER_OPEN, 
    
} 
from '../actions/UserInterface';

const initialState = {
    isSignedIn: false,
    isSideBarOpen: false,
    sendNotificationButton: false,
    isProfileOpened: false,
    updatingProfile: false,
    addingAccomodation: false,
    isLoading: false,
    
};

const UserInterfaceReducer = (state = initialState, action) => {
    switch (action.type) {
        
        // IS_SIGNED_IN
        case IS_SIGNED_IN:
            return{
                ...state,
                isSignedIn: !state.isSignedIn
            }
            
        // ENDS

        // SIDE BAR
        case IS_SIDE_BAR_OPEN:
            return{
                ...state,
                isSideBarOpen: !state.isSideBarOpen,
            }
        // ENDS

        // SEND NOTIFICATION BUTTON
        case IS_SEND_NOTIF_BUTTON_OPEN:
            return{
                ...state,
                sendNotificationButton: !state.sendNotificationButton,
            }
        // ENDS

        // OPEN UPDATE
        case IS_PROFILE_OPEN:
            return{
                ...state,
                isProfileOpened: !state.isProfileOpened
            }
        // ENDS

        // ON_UPDATE_PROFILE
        case ON_UPDATE_PROFILE:
            return{
                ...state,
                updatingProfile: !state.updatingProfile,
            }

        // ON_ADD_ACCOMODATION
        case ON_ADD_ACCOMODATION:
            return{
                ...state,
                addingAccomodation: !state.addingAccomodation,
            }

        // IS LOADING
        case IS_LOADER_OPEN:
            return{
                ...state,
                isLoading: !state.isLoading
            }

        
        default:
            return state;
    }
};

export default UserInterfaceReducer;
