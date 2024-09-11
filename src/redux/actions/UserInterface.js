
// ACTION TYPES
export const IS_SIGNED_IN = 'IS_SIGNED_IN';

// side bar action type
export const IS_SIDE_BAR_OPEN = 'IS_SIDE_BAR_OPEN';

// TOGGLE SEND NOTIFICATIONS BUTTON
export const IS_SEND_NOTIF_BUTTON_OPEN = 'IS_SEND_NOTIF_BUTTON_OPEN';

// OPEN UPDATE WINDOW
export const IS_PROFILE_OPEN = 'IS_PROFILE_OPEN';

// ON PROFILE UPDATE
export const ON_UPDATE_PROFILE = 'ON_UPDATE_PROFILE';

// ON ADD ACCOMODATION
export const ON_ADD_ACCOMODATION = 'ON_ADD_ACCOMODATION';

// LOADER
export const IS_LOADER_OPEN = 'IS_LOADER_OPEN';





// ACTIONS CREATOR

export const toggleSigning = ()=>{
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

// TOOGLE SEND NOTIFICATIONS BUTTON
export const handleOpenNotifButton = ()=>{
    return{
        type: IS_SEND_NOTIF_BUTTON_OPEN,
        }
}

// OPEN UPDATE TAB
export const onProfileOpen = ()=>{
    return{
        type: IS_PROFILE_OPEN,
    }
}

// ON PROFILE UPDATE
export const handleOnUpdate = ()=>{
    return{
        type: ON_UPDATE_PROFILE,
    }
}

// ON_ADD_ACCOMODATION
export const handleAddingAccomodation = ()=>{
    return{
        type: ON_ADD_ACCOMODATION,
    }
}

// LOADER
export const handleLoader = ()=>{
    return{
        type: IS_LOADER_OPEN,
        }
    }


// AUTHENICATION

export const SET_USER_ID = "SET_USER_ID";

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId,
});

