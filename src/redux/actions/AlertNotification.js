// ACTION TYPE
export const IS_NOTIF_ALERT_OPEN = 'IS_NOTIF_ALERT_OPEN';

export const IS_NOTIF_ALERT_CLOSE = 'IS_NOTIF_ALERT_CLOSE';


// ACTION CREATOR

export const handleOpenNotificationAlert = (message)=>{
    return{
        type: IS_NOTIF_ALERT_OPEN,
        payload: message,
        }
    }


export const handleCloseNotificationAlert = ()=>{
    return{
        type: IS_NOTIF_ALERT_CLOSE,
        }
    }