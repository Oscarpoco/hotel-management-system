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
import '../styling/SignIn.css';
import { useDispatch } from "react-redux";
import { toggleSigning, handleLoader } from '../../redux/actions/UserInterface';

function SignIn() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLoader(true));

        
        const adminUsername = "admin";
        const adminPassword = "password123";

        setTimeout (()=> {
        // Check if the input matches the dummy credentials
        if (username === adminUsername && password === adminPassword) {
            alert("Login successful!");
            dispatch(toggleSigning());
            // Perform additional actions on successful login, if needed
        } else {
            alert("Invalid username or password!");
        }
        dispatch(handleLoader(false));
        }, 3000);
    };

    

        
            dispatch(toggleSigning());
            

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
                        {/* USERNAME */}
                        <div className="input-wrapper">
                            <label className="username-label">Username</label>
                            <input 
                                type="text" 
                                placeholder="Enter Username" 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
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
        </div>
    );
}

export default SignIn;
