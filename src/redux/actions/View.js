

// ACTION TYPES
export const SET_VIEW = 'SET_VIEW';

// ACTION CREATOR

export const setView = (view)=>{

    return{
        type: SET_VIEW,
        payload: view,
    }
}