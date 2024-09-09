import React, { useEffect, useState } from "react";
import '../styling/Users.css';
import { collection, getDocs, getFirestore, doc, updateDoc } from "firebase/firestore"; // Import Firestore functions

export default function Users() {
    const [users, setUsers] = useState([]);
    const db = getFirestore();

    // Fetch users from Firestore
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users")); // Replace "users" with your collection name
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
            const userRef = doc(db, "users", userId);
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
            const userRef = doc(db, "users", userId);
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
            {/* ENDS */}

            {/* USERS */}
            <div className="overall-users">
                <div className="user-header-wrapper">
                    <p style={{width: '20%'}}>Name & Surname</p>
                    <p style={{width: '20%'}}>Location</p>
                    <p style={{width: '5%'}}>Age</p>
                    <p style={{width: '10%'}}>Status</p>
                    <p style={{width: '10%'}}>Phone</p>
                    <p style={{ width: '20%' }}>UserId</p>
                    <p style={{width: '15%'}}>Action</p>
                </div>
                {/* Dynamic list of users */}
                {users.map((user) => (
                    <div className="user-wrapper" key={user.id}>
                        <p style={{width: '20%'}}>{user.fullnames}</p>
                        <p style={{width: '20%'}}>{user.location}</p>
                        <p style={{width: '5%'}}>{user.age}</p>
                        <p style={{width: '10%'}}>{user.status}</p>
                        <p style={{width: '10%'}}>{user.phone}</p>
                        <p style={{ width: '20%' }}>{user.id}</p>
                        <div className="remove-button" style={{width: '15%'}}>
                            <button onClick={() => handleBlockUser(user.id)}>Block</button>
                            <button onClick={() => handleUnblockUser(user.id)}>Unblock</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
