import React from "react";
import '../styling/Accomodation.css';
import { useSelector, useDispatch } from "react-redux";
import { handleAddingAccomodation, handleLoader } from "../../redux/actions/UserInterface";

export default function Accomodation(){

    const dispatch = useDispatch();
    const addingAccomodation = useSelector((state) => state.userInterface.addingAccomodation);

    // Handle OPEN AND CLOSE FORM
    const handleOpenAccomdationForm = ()=>{
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(handleAddingAccomodation());
            dispatch(handleLoader(false));
        }, 3000);
    }

    return(
        <div className="accomodation-layout">
            {/* ACCOMODATION HEADER */}
            <div className="accomodation-header">
                <h1>Accomodation</h1>
                <button className="add-accomodation" onClick={handleOpenAccomdationForm}>Add Picture</button>
            </div>
            {/* ENDS */}

            {/* ACCOMODATION GRID */}
            <div className="accomodation-grid">

                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}
                {/* ACCOMODATION */}
                <div className="accomodation-grid-item">

                    {/* PICTURE */}
                    <div className="room-picture">
                        <img src="rooms.jpeg" alt="pictures"/>
                    </div>

                    {/* CONTENT */}
                    <div className="accomodation-content">
                        <p>Available: Sep 1-7</p>
                        <p><strong>1500 ZAR</strong> night</p>
                    </div>
                </div>
                {/* ENDS */}

            </div>
            {/* ENDS */}

            {/* POOPUP */}
            {addingAccomodation && (
                <form className="accomodation-form">
                    <input type="file" accept="image"></input>
                    <input type="text" placeholder="Availability"></input>
                    <input type="text" placeholder="Price"></input>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}