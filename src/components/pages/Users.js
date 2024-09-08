import React, { useEffect, useState } from "react";
import '../styling/Users.css';
import { collection, getDocs , getFirestore } from "firebase/firestore";

export default function Users() {
    const [users, setUsers] = useState([]);

    const db = getFirestore();

    // Fetch users from Firestore
    useEffect(() => {
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

        fetchUsers();
    }, []);

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
                    <p>Name & Surname</p>
                    <p>Location</p>
                    <p>Age</p>
                    <p>Phone</p>
                    <p style={{width: '20%'}}>UserId</p>
                    <p>Action</p>
                </div>
                {/* Dynamic list of users */}
                {users.map((user) => (
                    <div className="user-wrapper" key={user.id}>
                        <p>{user.fullnames}</p>
                        <p>{user.location}</p>
                        <p>{user.age}</p>
                        <p>{user.phone}</p>
                        <p style={{width: '20%'}}>{user.id}</p>
                        <div className="remove-button">
                            <button onClick={() => handleBlockUser(user.id)}>Block</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Handle blocking a user (implement logic as needed)
const handleBlockUser = (userId) => {
    console.log(`Block user with ID: ${userId}`);
    // Implement block logic, e.g., updating Firestore or marking the user as blocked
};
