import React, { useEffect, useState } from "react";
import '../styling/Users.css';
import { firestore } from '../../firebase/Firebase';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 
import UsersTable from './UsersTable'; // Import the new table component

export default function Users() {
    const [users, setUsers] = useState([]);

    // Fetch users from Firestore
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "users"));
            const usersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    // Function to block a user
    const handleBlockUser = async (userId) => {
        try {
            const userRef = doc(firestore, "users", userId);
            await updateDoc(userRef, { status: "blocked" });
            alert("User has been blocked successfully.");
            fetchUsers();
        } catch (error) {
            console.error("Error blocking user: ", error);
            alert("Failed to block the user. Please try again.");
        }
    };

    // Function to unblock a user
    const handleUnblockUser = async (userId) => {
        try {
            const userRef = doc(firestore, "users", userId);
            await updateDoc(userRef, { status: "active" });
            alert("User has been unblocked successfully.");
            fetchUsers();
        } catch (error) {
            console.error("Error unblocking user: ", error);
            alert("Failed to unblock the user. Please try again.");
        }
    };

    return (
        <div className="user-layout">
            {/* USER HEADER */}
            <div className="user-header">
                <h1>Users</h1>
            </div>
            {/* USERS TABLE */}
            <div className="overall-users">
            <UsersTable users={users} handleBlockUser={handleBlockUser} handleUnblockUser={handleUnblockUser} />
            </div>
        </div>
    );
}
