import { IS_SIGNED_IN, IS_SIDE_BAR_OPEN } from '../actions/UserInterface';

const initialState = {
    isSignedIn: false,
    isSideBarOpen: false,
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
        
        default:
            return state;
    }
};

export default UserInterfaceReducer;
