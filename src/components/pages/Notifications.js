import React from "react";
import '../styling/Notifications.css';
import { handleOpenNotifButton, handleLoader } from "../../redux/actions/UserInterface";
import { useSelector, useDispatch } from "react-redux";

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

export default function Notifications(){

    const dispatch = useDispatch();
    const sendNotificationButton = useSelector((state) => state.userInterface.sendNotificationButton);

    // HANDLE OPEN FORM
    const handleOpenForm = () => {
        
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(handleOpenNotifButton());
            dispatch(handleLoader(false));
        }, 3000);
        }
    // HANDLE CLOSE FORM

    return(
        <div className="notifications-layout">
            {/* NOTIFICATIONS HEADER */}
            <div className="notifications-header">
                <h1>Notifications</h1>
                <button className="open-form" onClick={handleOpenForm}>Send</button>
            </div>
            {/* ENDS */}

            {/* SENT NOTIFICATIONS */}
            <div className="sent-notifications">

            </div>
            {/* ENDS */}

            {/* MESSAGE FORM */}
            {sendNotificationButton && (
            <div className="send-message">
                {/* SEND MESSAGE HEADER */}
                <div className="send-message-header">
                    <IoIosArrowBack className="back-arrow" onClick={handleOpenForm}/>
                    <h2>Compose</h2>

                    <button className="send-button">
                    <IoMdSend className="send-icon"/>
                    </button>
                </div>
                {/* ENDS */}

                {/* SEND MESSAGE SENDER */}
                <div className="send-message-sender">
                    <label>From:</label>
                    <input type="email"/>
                </div>
                {/* ENDS */}

                {/* SEND MESSAGE RECEIVER  */}
                <div className="send-message-receiver">
                    <label>To:</label>
                    <input type="email"/>
                </div>
                {/* ENDS */}

                {/* SEND MESSAGE SUBJECT */}
                <div className="send-message-subject">
                    <input type="text" placeholder="Subject"/>
                </div>
                {/* ENDS */}

                {/* SEND MESSAGE COMPOSE */}
                <div className="send-message-compose">
                    <textarea className="compose-textarea" placeholder="Compose..."></textarea>
                </div>
                {/*ENDS  */}
            </div>
            )}
            {/* ENDS */}
            
        </div>
    )
}