import React from "react";
import '../styling/Accomodation.css';
import { useEffect, useState } from "react";

// FIRESTORE IMPORT
import { getFirestore, collection, getDocs } from "firebase/firestore";

// ICONS
import { MdFavorite } from "react-icons/md";


export default function Favorite(){

    const [accommodations, setAccommodations] = useState([]);
  

    const db = getFirestore();

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        try {
            // Fetch favorite IDs
            const favoritesCollection = collection(db, "favorites");
            const favoritesSnapshot = await getDocs(favoritesCollection);
            const favoritesList = favoritesSnapshot.docs.map(doc => doc.data().accommodationId);

            // Fetch accommodations
            const accommodationsCollection = collection(db, "accommodations");
            const accommodationsSnapshot = await getDocs(accommodationsCollection);
            const accommodationsList = accommodationsSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(accommodation => favoritesList.includes(accommodation.id)); // Only include those in favorites

            setAccommodations(accommodationsList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log( {accommodations})

    return(
        <div className="accomodation-layout">
            {/* ACCOMODATION HEADER */}
            <div className="accomodation-header">
                <h1>Most loved accomodations</h1>
            </div>
            {/* ENDS */}

            {/* ACCOMODATION GRID */}
            <div className="accomodation-grid">
                <div className="accomodation-aligning">
                {accommodations.map((accommodation) => (
                    <div className="accomodation-grid-item" key={accommodation.id}>
                        {/* PICTURE */}
                        <div className="room-pictures">
                            <img src={accommodation.images[2]} alt="pictures" className="accomodation-image"/>
                        </div>

                        {/* CONTENT */}
                        <div className="accomodation-content">
                            <p><strong>Available:</strong> <br></br>
                                 {accommodation.availability}
                            </p>

                            <p><strong>{accommodation.price} ZAR</strong> night</p>
                            <p><strong>{accommodation.location}</strong></p>
                            <p>
                                {accommodation.amenities[0]}--
                                {accommodation.amenities[1]}
                                <br></br>
                                {accommodation.amenities[2]}--
                                {accommodation.amenities[3]}
                            </p>
                            <p>{accommodation.numberOfRooms}</p>
                            <p>
                                <strong>What we offers</strong>

                                <br></br>

                                {accommodation.description}
                            </p>
                        </div>

                        {/* LIKES */}
                        <div className="likes">
                            <MdFavorite className="love-icon"/>
                            <p className="number-of-likes">
                                {accommodation.likes || 0} likes
                            </p>
                        </div>

                    </div>
                ))}
                </div>

                
            </div>
            {/* ENDS */}
        </div>
    )
}