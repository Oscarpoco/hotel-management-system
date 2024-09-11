import React, { useState } from "react";
import '../styling/Notifications.css';
import { handleOpenNotifButton, handleLoader } from "../../redux/actions/UserInterface";
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {firestore} from '../../firebase/Firebase';

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

export default function Notifications() {
    const dispatch = useDispatch();
    const sendNotificationButton = useSelector((state) => state.userInterface.sendNotificationButton);

    const [fromEmail, setFromEmail] = useState("okpoco15@gmail.com");
    const [toEmail, setToEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const db = firestore;

    // HANDLE OPEN FORM
    const handleOpenForm = () => {
        dispatch(handleLoader(true));
        setTimeout(() => {
            dispatch(handleOpenNotifButton());
            dispatch(handleLoader(false));
        }, 3000);
    };

    // HANDLE SEND EMAIL
    const handleSendEmail = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "notifications"), {
                from: fromEmail,
                to: toEmail,
                subject: subject,
                message: message,
                timestamp: serverTimestamp()
            });

            alert('Notification sent successfully');
            // Clear the form after sending
            setToEmail("");
            setSubject("");
            setMessage("");

            // close the form
            handleOpenForm();
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <div className="notifications-layout">
            {/* NOTIFICATIONS HEADER */}
            <div className="notifications-header">
                <h1>Notifications</h1>
                <button className="open-form" onClick={handleOpenForm}>Send</button>
            </div>
            {/* ENDS */}

            {/* SENT NOTIFICATIONS */}
            <div className="sent-notifications">
                {/* Display sent notifications here */}
            </div>
            {/* ENDS */}

            {/* MESSAGE FORM */}
            {sendNotificationButton && (
                <div className="send-message">
                    {/* SEND MESSAGE HEADER */}
                    <div className="send-message-header">
                        <IoIosArrowBack className="back-arrow" onClick={handleOpenForm} />
                        <h2>Compose</h2>
                        <button className="send-button" onClick={handleSendEmail}>
                            <IoMdSend className="send-icon" />
                        </button>
                    </div>
                    {/* ENDS */}

                    {/* SEND MESSAGE SENDER */}
                    <div className="send-message-sender">
                        <label htmlFor="From">From:</label>
                        <input type="email" placeholder="okpoco15@gmail.com" readOnly value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
                    </div>
                    {/* ENDS */}

                    {/* SEND MESSAGE RECEIVER */}
                    <div className="send-message-receiver">
                        <label htmlFor="To">To:</label>
                        <input type="email" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
                    </div>
                    {/* ENDS */}

                    {/* SEND MESSAGE SUBJECT */}
                    <div className="send-message-subject">
                        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    {/* ENDS */}

                    {/* SEND MESSAGE COMPOSE */}
                    <div className="send-message-compose">
                        <textarea className="compose-textarea" placeholder="Compose..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    {/* ENDS */}
                </div>
            )}
            {/* ENDS */}
        </div>
    );
}
