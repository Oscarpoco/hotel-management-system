import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function UsersTable({ users, handleBlockUser, handleUnblockUser }) {
    return (
        <TableContainer component={Paper} style={{ minHeight: '700px' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name & Surname</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.fullnames}</TableCell>
                            <TableCell>{user.location}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleBlockUser(user.id)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Block
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleUnblockUser(user.id)}
                                >
                                    Unblock
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
