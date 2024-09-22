import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import BookingsTable from "./BookingsTable";
import '../styling/Bookings.css'

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsCollection = collection(firestore, "bookings");
                const bookingsSnapshot = await getDocs(bookingsCollection);
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

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const bookingDocRef = doc(firestore, "bookings", bookingId);
            await updateDoc(bookingDocRef, { status: newStatus });
            alert("Successfully updated status");
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Error updating booking status");
        }
    };

    return (
        <div className="bookings-layout">
            <div className="bookings-header">
                <h1>Bookings</h1>
            </div>
            <div className="overall-bookings">
                <BookingsTable bookings={bookings} updateBookingStatus={updateBookingStatus} />
            </div>
        </div>
    );
}
