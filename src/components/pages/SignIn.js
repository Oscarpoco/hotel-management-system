// import React from "react";
// import '../styling/SignIn.css';
// import { useDispatch } from "react-redux";
// import {toggleSigning} from '../../redux/actions/UserInterface';


// import { useState } from "react";

// function SignIn(){
//     const dispatch = useDispatch();

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

    
//     // HANDLE SUBMIT
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Dummy credentials for login
//         const dummyUsername = "admin";
//         const dummyPassword = "password123";

//         // Check if the input matches the dummy credentials
//         if (username === dummyUsername && password === dummyPassword) {
//             alert("Login successful!");
//             dispatch(toggleSigning());
//             // Perform additional actions on successful login, if needed
//         } else {
//             alert("Invalid username or password!");
//         }
//     };


//     return(
//         <div className="signIn-wrapper">
//             {/* LOGO BAR */}
//             <div className="logo-bar">
//                 <div className="logo-abbreviation"><h2>RH</h2></div>
//                 <h3>
//                     <span>Management System</span>
//                 </h3>
//             </div>

//             {/* FORM WRAPPER */}
//             <div className="form-header-wrapper">

//                 <div className="form-wrapper">

//                     {/* HEADER */}
//                     <div className="form-header">
//                         <h2>Sign In</h2>
//                     </div>
//                     <form onClick={handleSubmit}>

//                         {/* USERNAME */}
//                         <div className="input-wrapper">
//                             <label className="username-label">Username</label>
//                             <input type="text" placeholder="Enter Username" value={username} onChange={e=> setUsername(e.target.value)}></input>
//                         </div>

//                         {/* PASSWORD */}
//                         <div className="input-wrapper">
//                             <label className="password-label">Password</label>
//                             <input type="password" placeholder="Enter Password" value={password} onChange={e=> setPassword(e.target.value)}></input>
//                         </div> 

//                         {/* BUTTON */}
//                         <button type="submit">Proceed</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SignIn;

import React, { useState } from "react";
import "../styling/SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSigning, handleLoader } from "../../redux/actions/UserInterface";
import { handleCloseNotificationAlert, handleOpenNotificationAlert } from "../../redux/actions/AlertNotification";
import { auth } from "../../firebase/Firebase"; // Import Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase sign-in method
import NotificationArlet from "./NotificationArlet";

function SignIn() {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    const [email, setEmail] = useState(""); // Changed to email
    const [password, setPassword] = useState("");

    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLoader(true));

        // Use Firebase Authentication to sign in the user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in successfully
              
                dispatch(handleOpenNotificationAlert('Login successful!'));
                setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);

                dispatch(toggleSigning());
                dispatch(handleLoader(false));
            })
            .catch((error) => {
                // Handle Errors here
                const errorCode = error.code;
                const errorMessage = error.message;

                dispatch(handleOpenNotificationAlert(`${errorMessage}`));
                setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);

                dispatch(handleLoader(false));
            });
    };

    return (
        <div className="signIn-wrapper">
            {/* LOGO BAR */}
            <div className="logo-bar">
                <div className="logo-abbreviation"><h2>RH</h2></div>
                <h3>
                    <span>Management System</span>
                </h3>
            </div>

            {/* FORM WRAPPER */}
            <div className="form-header-wrapper">
                <div className="form-wrapper">
                    {/* HEADER */}
                    <div className="form-header">
                        <h2>Sign In</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* EMAIL */}
                        <div className="input-wrapper">
                            <label className="username-label">Email</label>
                            <input 
                                type="email" 
                                placeholder="Enter Email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="input-wrapper">
                            <label className="password-label">Password</label>
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div> 

                        {/* BUTTON */}
                        <button type="submit">Proceed</button>
                    </form>
                </div>
            </div>

            {/* POPUP */}
            <NotificationArlet 
            message={notification.message} 
            onClose={() => dispatch(handleCloseNotificationAlert())} 
            notificationArletVisible={notification.notificationArletVisible}
            />
        </div>
    );
}

export default SignIn;
