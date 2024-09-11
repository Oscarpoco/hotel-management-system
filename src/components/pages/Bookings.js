import React, { useEffect, useState } from "react";
import '../styling/Bookings.css';

// ICONS
import { MdDoneAll } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

// Import Firestore and Firestore methods from firebase.js
import { firestore } from "../../firebase/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

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

    // Function to update booking status
    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const bookingDocRef = doc(firestore, "bookings", bookingId); 
            await updateDoc(bookingDocRef, { status: newStatus }); 
            alert("Successfully updated status");

            // Update the bookings state after successfully updating Firestore
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Error updating booking status")
        }
    };

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
                    <p className="check-in-data">Check in</p>
                    <p className="check-out-data">Check out</p>
                    <p className="guests">Guests</p>
                    <p className="nights">Nights</p>
                    <p className="time">Created At</p>
                    <p className="price">Price</p>
                    <p className="user-id-data">UserId</p>
                    <p className="remove-button-actions">Action</p>
                </div>

                {/* Display each booking */}
                {bookings.map((booking) => (
                    <div key={booking.id} className="bookings-wrapper">
                        <p className="check-in-data">{booking.checkIn}</p>
                        <p className="check-out-data">{booking.checkOut}</p>
                        <p className="guests">{booking.guests}</p>
                        <p className="nights">{booking.nights}</p>
                        <p className="time">{booking.createdAt}</p>
                        <p className="price">{booking.totalPrice} ZAR</p>
                        <p className="user-id-data">{booking.userId}</p>
                        <div className="remove-button-actions">
                            <button
                                className="actions-button"
                                onClick={() => updateBookingStatus(booking.id, "approved")}
                            >
                                <span className="tooltip" style={{ background: "#25D366" }}>Approve</span>
                                <MdDoneAll className="approve" />
                            </button>
                            <button
                                className="actions-button"
                                onClick={() => updateBookingStatus(booking.id, "declined")}
                            >
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
