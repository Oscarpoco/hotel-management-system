import React from "react";
import '../styling/Notifications.css';

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

export default function Notifications(){

    return(
        <div className="notifications-layout">
            {/* NOTIFICATIONS HEADER */}
            <div className="notifications-header">
                <h1>Notifications</h1>
                <button className="add-picture">Send Message</button>
            </div>
            {/* ENDS */}

            {/* SENT NOTIFICATIONS */}
            <div className="sent-notifications">

            </div>
            {/* ENDS */}

            {/* MESSAGE FORM */}
            <div className="send-message">
                {/* SEND MESSAGE HEADER */}
                <div className="send-message-header">
                    <IoIosArrowBack className="back-arrow"/>
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
            {/* ENDS */}
        </div>
    )
}