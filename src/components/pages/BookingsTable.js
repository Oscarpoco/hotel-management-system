import React from "react";
import { MdDoneAll } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function BookingsTable({ bookings, updateBookingStatus }) {
    return (
        <TableContainer component={Paper} style={{ maxHeight: '700px', width: '100%', overflowX: 'auto', overflowY: 'auto' }}>
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>Check In</TableCell>
                    <TableCell>Check Out</TableCell>
                    <TableCell>Guests</TableCell>
                    <TableCell>Nights</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>UserId</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>{booking.guests}</TableCell>
                        <TableCell>{booking.nights}</TableCell>
                        <TableCell>{booking.createdAt}</TableCell>
                        <TableCell>{booking.totalPrice} ZAR</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{booking.userId}</TableCell>
                        <TableCell
                        
                        style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'start', gap: '.5em'}}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<MdDoneAll />}
                                onClick={() => updateBookingStatus(booking.id, "approved")}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<TiCancel />}
                                onClick={() => updateBookingStatus(booking.id, "declined")}
                                style={{ paddingRight: '24px' }}
                            >
                                Decline
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
        );
}
