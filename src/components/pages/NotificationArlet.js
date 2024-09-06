import React from "react";

export default function NotificationArlet({message, onClose, notificationArletVisible}){

    if (!notificationArletVisible) return null;

    return(
        <div 
        className="notification-arlet-layout"

        // INLINE STYLING
        style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            background: 'rgba(0, 0, 0, .7)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            
        }}
        >
            <div 
            className="notification-arlet-content"

            // INLINE STYLE
            style={{
                background: '#25D366',
                padding: '1em',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, .1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4em',
                flexDirection: 'column',
                gap: '1em',
            }}
            >
                {/* CONTENT */}
                <p style={{fontSize: '1.5em', color: 'whitesmoke'}}>{message}</p>
                <button onClick={onClose}>Close</button>
                {/* ENDS */}
            </div>
        </div>
    )
}