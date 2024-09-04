import React from "react";
import '../styling/Gallery.css'

export default function Gallery(){

    return(
        <div className="gallery-layout">

            {/* GALLERY HEADER */}
            <div className="gallery-header">
                <h1>Gallery</h1>
                <button className="add-picture">Add Picture</button>
            </div>
            {/* ENDS */}

            {/* GALLERY GRID */}
            <div className="gallery-grid">

                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>
                <div className="gallery-grid-item">
                    <img src="rooms.jpeg" alt="pictures"/>
                </div>

            </div>
            {/* ENDS */}
        </div>
    )
}