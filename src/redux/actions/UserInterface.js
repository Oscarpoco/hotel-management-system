
// ACTION TYPES
export const IS_SIGNED_IN = 'IS_SIGNED_IN';

// side bar action type
export const IS_SIDE_BAR_OPEN = 'IS_SIDE_BAR_OPEN';



// ACTIONS CREATOR

export const isSignedInTriggered = ()=>{
    return{
        type: IS_SIGNED_IN,
    }
}

// SIDE BAR ACTION CREATOR

export const handleSideBar = ()=>{
    return{
        type: IS_SIDE_BAR_OPEN,
    }
}