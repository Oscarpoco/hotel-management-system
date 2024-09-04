import { SET_VIEW } from "../actions/View";

// INITIAL STATE
const initialState = {
    currentView: "home",
    };

// REDUCER
export const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW:
            return { 
                ...state, 
                currentView: action.payload 
            }

        default:
            return state;
        }
    }
