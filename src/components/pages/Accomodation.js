// import React from "react";
// import '../styling/Accomodation.css';
// import { useSelector, useDispatch } from "react-redux";
// import { handleAddingAccomodation, handleLoader } from "../../redux/actions/UserInterface";

// // ICONS
// import { IoMdClose } from "react-icons/io";

// export default function Accomodation(){

//     const dispatch = useDispatch();
//     const addingAccomodation = useSelector((state) => state.userInterface.addingAccomodation);

//     // Handle OPEN AND CLOSE FORM
//     const handleOpenAccomdationForm = ()=>{
//         dispatch(handleLoader(true));

//         setTimeout (()=> {
//             dispatch(handleAddingAccomodation(true));
//             dispatch(handleLoader(false));
//         }, 3000);
//     }
//     // ENDS

//     // HANDLE CLOSE
//     const handleClose = ()=>{
//         dispatch(handleAddingAccomodation(false));
//         }
//     // ENDS

//     return(
//         <div className="accomodation-layout">
//             {/* ACCOMODATION HEADER */}
//             <div className="accomodation-header">
//                 <h1>Accomodation</h1>
//                 <button className="add-accomodation" onClick={handleOpenAccomdationForm}>Add Picture</button>
//             </div>
//             {/* ENDS */}

//             {/* ACCOMODATION GRID */}
//             <div className="accomodation-grid">

//                 {/* ACCOMODATION */}
//                 <div className="accomodation-grid-item">

//                     {/* PICTURE */}
//                     <div className="room-picture">
//                         <img src="rooms.jpeg" alt="pictures"/>
//                     </div>

//                     {/* CONTENT */}
//                     <div className="accomodation-content">
//                         <p>Available: Sep 1-7</p>
//                         <p><strong>1500 ZAR</strong> night</p>
//                     </div>
//                 </div>
//                 {/* ENDS */}

//             </div>
//             {/* ENDS */}

//             {/* POOPUP */}
//             {addingAccomodation && (
//                 <form className="accomodations-form">

//                     {/* LEFT INPUTS */}
//                     <div className="input-wrapper">
//                         <input type="file" accept="image"></input>
//                         <input type="file" accept="image"></input>
//                         <input type="file" accept="image"></input>
//                         <input type="text" placeholder="Price"></input>
//                         <input type="text" placeholder="Availability"></input>
//                         <input type="text" placeholder="Location"></input>
//                         <input type="text" placeholder="Number of rooms"></input>
//                         <input type="text" placeholder="First Amenities"></input>
//                         <input type="text" placeholder="Second Amenities"></input>
//                     </div>

//                     {/* RIGHT INPUTS */}
//                     <div className="input-wrapper">
//                         <input type="text" placeholder="Third Amenities"></input>
//                         <input type="text" placeholder="Fourth Amenities"></input>
//                         <input type="text" placeholder="Fifth Amenities"></input>
//                         <input type="text" placeholder="Sixth Amenities"></input>
//                         <input type="text" placeholder="Seventh Amenities"></input>
//                         <textarea placeholder="Room description and policies"></textarea>
//                     </div>

//                     {/* BUTTONS */}
//                     <div className="action-buttons-wrapper">
//                         <button className="close-form-button" onClick={handleClose}><IoMdClose className="close-detail-form"/></button>
//                         <button type="submit" className="send-details-button">Submit</button>
//                     </div>
                    
//                 </form>
//             )}
//         </div>
//     )
// }

import React, { useState, useEffect } from "react";
import '../styling/Accomodation.css';
import { useSelector, useDispatch } from "react-redux";
import { handleAddingAccomodation, handleLoader } from "../../redux/actions/UserInterface";
import { getFirestore, collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import { storage } from "../../firebase/Firebase"; // Your Firebase storage import

// ICONS
import { IoMdClose } from "react-icons/io";

export default function Accomodation() {
    const dispatch = useDispatch();
    const addingAccomodation = useSelector((state) => state.userInterface.addingAccomodation);

    const [formData, setFormData] = useState({
        images: [],
        price: "",
        availability: "",
        location: "",
        numberOfRooms: "",
        amenities: [],
        description: "",
    });

    const [accommodations, setAccommodations] = useState([]);

    const db = getFirestore();

    useEffect(() => {
        fetchAccommodations(); // Fetch accommodations when component mounts
    }, []);

    // Fetch data from Firestore
    const fetchAccommodations = async () => {
        try {
            const accommodationsCollection = collection(db, "accommodations");
            const accommodationsSnapshot = await getDocs(accommodationsCollection);
            const accommodationsList = accommodationsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setAccommodations(accommodationsList);
        } catch (error) {
            console.error("Error fetching accommodations:", error);
        }
    };

    // Handle file change
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle amenities change
    const handleAmenitiesChange = (index, value) => {
        const newAmenities = [...formData.amenities];
        newAmenities[index] = value;
        setFormData({ ...formData, amenities: newAmenities });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(handleLoader(true));

        try {
            // Upload images to Firebase Storage and get URLs
            const imageUrls = await Promise.all(
                formData.images.map(async (image) => {
                    const imageRef = ref(storage, `accommodations/${image.name}`);
                    await uploadBytes(imageRef, image);
                    return await getDownloadURL(imageRef);
                })
            );

            // Create accommodation object
            const accommodationData = {
                ...formData,
                images: imageUrls, // Save image URLs
            };

            // Save accommodation data to Firestore
            await addDoc(collection(db, "accommodations"), accommodationData);

            // Fetch accommodations again to refresh the list
            fetchAccommodations();

            // Clear form data
            setFormData({
                images: [],
                price: "",
                availability: "",
                location: "",
                numberOfRooms: "",
                amenities: [],
                description: "",
            });

            dispatch(handleAddingAccomodation(false));
        } catch (error) {
            console.error("Error saving accommodation:", error);
        } finally {
            dispatch(handleLoader(false));
        }
    };

    // Handle OPEN AND CLOSE FORM
    const handleOpenAccomdationForm = () => {
        dispatch(handleLoader(true));

        setTimeout(() => {
            dispatch(handleAddingAccomodation(true));
            dispatch(handleLoader(false));
        }, 3000);
    };

    // HANDLE CLOSE
    const handleClose = () => {
        dispatch(handleAddingAccomodation(false));
    };

    // DELETE ACCOMODATION
    const handleDelete = async (id) => {
        try {
            dispatch(handleLoader(true));
            const docRef = doc(db, "accommodations", id);
            await deleteDoc(docRef);
            // Refresh accommodations list after deletion
            fetchAccommodations();
        } catch (error) {
            console.error("Error deleting accommodation:", error);
        } finally {
            dispatch(handleLoader(false));
        }
    };

    return (
        <div className="accomodation-layout">
            {/* ACCOMODATION HEADER */}
            <div className="accomodation-header">
                <h1>Accomodation</h1>
                <button className="add-accomodation" onClick={handleOpenAccomdationForm}>
                    Add Picture
                </button>
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

                        {/* DELETE */}
                        <button className="delete-image" onClick={() => handleDelete(accommodation.id)}><strong>Remove</strong></button>
                    </div>
                ))}
                </div>
            </div>
            {/* ENDS */}

            {/* POOPUP */}
            {addingAccomodation && (
                <form className="accomodations-form" onSubmit={handleSubmit}>
                    {/* LEFT INPUTS */}
                    <div className="input-wrapper">
                        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
                        <input type="text" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                        <input type="text" name="numberOfRooms" placeholder="Number of rooms" value={formData.numberOfRooms} onChange={handleChange} />
                        {[...Array(4)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Amenity ${index + 1}`}
                                value={formData.amenities[index] || ""}
                                onChange={(e) => handleAmenitiesChange(index, e.target.value)}
                            />
                        ))}
                    </div>

                    {/* RIGHT INPUTS */}
                    <div className="input-wrapper">
                        <textarea name="description" placeholder="Room description and policies" value={formData.description} onChange={handleChange} />
                    </div>

                    {/* BUTTONS */}
                    <div className="action-buttons-wrapper">
                        <button type="button" className="close-form-button" onClick={handleClose}>
                            <IoMdClose className="close-detail-form" />
                        </button>
                        <button type="submit" className="send-details-button">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}
