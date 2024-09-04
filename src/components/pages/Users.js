import React from "react";
import '../styling/Users.css'

export default function Users(){

    return(
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
                    <p>UserId</p>
                    <p>Action</p>
                </div>
                <div className="user-wrapper">
                    <p>Oscar Poco</p>
                    <p>South Africa</p>
                    <p>23</p>
                    <p>12445445</p>
                    <div className="remove-button"><button>Remove</button></div>
                </div>
                <div className="user-wrapper">
                    <p>Oscar Poco</p>
                    <p>South Africa</p>
                    <p>23</p>
                    <p>12445445</p>
                    <div className="remove-button"><button>Remove</button></div>
                </div>
                <div className="user-wrapper">
                    <p>Oscar Poco</p>
                    <p>South Africa</p>
                    <p>23</p>
                    <p>12445445</p>
                    <div className="remove-button"><button>Remove</button></div>
                </div>
            </div>
        </div>
    )
}