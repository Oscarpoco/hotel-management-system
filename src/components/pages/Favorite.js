import React, { useEffect, useState } from "react";
import '../styling/Accomodation.css';
import { handleLoader } from "../../redux/actions/UserInterface";
import { useDispatch } from "react-redux";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { MdFavorite } from "react-icons/md";

export default function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch();

    const db = getFirestore();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            dispatch(handleLoader(true)); 

            // Fetch favorite documents
            const favoritesCollection = collection(db, "favorites");
            const favoritesSnapshot = await getDocs(favoritesCollection);
            const favoritesList = favoritesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setFavorites(favoritesList);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            dispatch(handleLoader(true)); 
        }
    };


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
                {favorites.map((favorite) => (
                    <div className="accomodation-grid-item" key={favorite.id}>
                        {/* PICTURE */}
                        <div className="room-pictures">
                            <img src={favorite.images[2]} alt="pictures" className="accomodation-image"/>
                        </div>

                        {/* CONTENT */}
                        <div className="accomodation-content">
                            <p><strong>Available:</strong> <br></br>
                                 {favorite.availability}
                            </p>

                            <p><strong>{favorite.price} ZAR</strong> night</p>
                            <p><strong>{favorite.location}</strong></p>
                            <p>
                                {favorite.amenities[0]}--
                                {favorite.amenities[1]}
                                <br></br>
                                {favorite.amenities[2]}--
                                {favorite.amenities[3]}
                            </p>
                            <p>{favorite
                            .numberOfRooms}</p>
                            <p>
                                <strong>What we offers</strong>

                                <br></br>

                                {favorite.description}
                            </p>
                        </div>

                        {/* LIKES */}
                        <div className="likes">
                            <MdFavorite className="love-icon"/>
                            <p className="number-of-likes">
                                {favorite.likes || 0} likes
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