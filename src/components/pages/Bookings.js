import React, { useEffect, useState } from "react";
import '../styling/Bookings.css';

// ICONS
import { MdDoneAll } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

// Import Firestore from your firebase.js file
import { firestore } from "../../firebase/Firebase"; 
import { collection, getDocs } from "firebase/firestore";

export default function Bookings() {
    const [bookings, setBookings] = useState([]); 

    // Fetch bookings from Firestore
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Reference to the "bookings" collection
                const bookingsCollection = collection(firestore, "bookings");
                // Fetch all documents in the "bookings" collection
                const bookingsSnapshot = await getDocs(bookingsCollection);
                // Map through each document and extract the data
                const bookingsList = bookingsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBookings(bookingsList);
            } catch (error) {
                console.error("Error fetching bookings: ", error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="bookings-layout">
            {/* BOOKING HEADER */}
            <div className="bookings-header">
                <h1>Bookings</h1>
            </div>
            {/* ENDS */}

            {/* BOOKINGS */}
            <div className="overall-bookings">
                <div className="bookings-header-wrapper">
                    {/* <p>Fullnames</p> */}
                    <p style={{width: '10%'}}>Check in</p>
                    <p style={{width: '10%'}}>Check out</p>
                    <p style={{width: '10%'}}>Guests</p>
                    <p style={{width: '10%'}}>Nights</p>
                    <p style={{width: '20%'}}>Created At</p>
                    <p style={{width: '10%'}}>Price</p>
                    <p style={{width: '20%'}}>UserId</p>
                    <p style={{width: '10%'}}>Action</p>
                </div>

                {/* Display each booking */}
                {bookings.map((booking) => (
                    <div key={booking.id} className="bookings-wrapper">
                        {/* <p>{booking.fullnames}</p> */}
                        <p style={{width: '10%'}}>{booking.checkIn}</p>
                        <p style={{width: '10%'}}>{booking.checkOut}</p>
                        <p style={{width: '10%'}}>{booking.guests}</p>
                        <p style={{width: '10%'}}>{booking.nights}</p>
                        <p style={{width: '20%'}}>{booking.createdAt}</p>
                        <p style={{width: '10%'}}>{booking.totalPrice} ZAR</p>
                        <p style={{width: '20%'}}>{booking.userId}</p>
                        <div className="remove-button" style={{width: '10%'}}>
                            <button className="actions-button">
                                <span className="tooltip" style={{ background: "#25D366" }}>Approve</span>
                                <MdDoneAll className="approve" />
                            </button>
                            <button className="actions-button">
                                <span className="tooltip" style={{ background: "#DD2A7B" }}>Decline</span>
                                <TiCancel className="decline" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
