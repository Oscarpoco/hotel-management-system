import React from "react";
import '../styling/Favorite.css';

export default function Favorite(){

    return(
        <div className="favorite-layout">
            {/* GALLERY HEADER */}
            <div className="favorite-header">
                <h1>Favorites</h1>
            </div>
            {/* ENDS */}

            {/* GALLERY GRID */}
            <div className="favorite-grid">

                <div className="favorite-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                

            </div>
            {/* ENDS */}
        </div>
    )
}