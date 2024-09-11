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
            zIndex: 1000000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '2em'
            
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
                borderRadius: '20px',
            }}
            >
                {/* CONTENT */}
                <p style={{fontSize: '1.5em', color: 'whitesmoke'}}>{message}</p>
                <button onClick={onClose}
                    style={{
                        background: 'white',
                        padding: '.5em .7em',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, .1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '20px',
                        color: 'black',
                    }}
                
                >Close</button>
                {/* ENDS */}
            </div>
        </div>
    )
}