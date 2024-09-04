import React from "react";
import '../styling/SignIn.css';

function SignIn(){
    return(
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
                    <form>

                        {/* USERNAME */}
                        <div className="input-wrapper">
                            <label className="username-label">Username</label>
                            <input type="text" placeholder="Enter Username"></input>
                        </div>

                        {/* PASSWORD */}
                        <div className="input-wrapper">
                            <label className="password-label">Password</label>
                            <input type="text" placeholder="Enter Password"></input>
                        </div>

                        {/* BUTTON */}
                        <button type="submit">Proceed</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;