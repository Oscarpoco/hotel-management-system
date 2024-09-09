import React, { useState, useEffect } from "react";
import '../styling/Accomodation.css';
import { useSelector, useDispatch } from "react-redux";
import { handleAddingAccomodation, handleLoader } from "../../redux/actions/UserInterface";
import { getFirestore, collection, addDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"; // Firestore imports
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
        title: "",
    });

    const [accommodations, setAccommodations] = useState([]);

    const db = getFirestore();

    useEffect(() => {
        fetchAccommodations();
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

    // Function to update availability status
    const updateAvailability = async (id, status) => {
        try {
            dispatch(handleLoader(true)); 
            const docRef = doc(db, "accommodations", id); 
            await updateDoc(docRef, { availability: status }); 
            // Refresh accommodations list after update
            fetchAccommodations();
        } catch (error) {
            console.error("Error updating availability:", error);
        } finally {
            dispatch(handleLoader(false)); 
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
                images: imageUrls,
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
                title: "",
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
        }, 2000);
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
                    Add Accomodation
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
                            
                            {/* Update availability buttons */}
                            <button className="accommodation-availability-available" onClick={() => updateAvailability(accommodation.id, "available")}><strong>Available</strong></button>
                            <button className="accommodation-availability-booked" onClick={() => updateAvailability(accommodation.id, "booked")}><strong>Booked</strong></button>
                        </div>
                    ))}
                </div>
            </div>
            {/* ENDS */}

            {/* POPUP */}
            {addingAccomodation && (
                <form className="accomodations-form" onSubmit={handleSubmit}>
                    {/* LEFT INPUTS */}
                    <div className="input-wrapper">
                        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                        <input type="number" min={1} name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
                        <input type="text" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                        <input type="text" name="numberOfRooms" placeholder="Number of rooms" value={formData.numberOfRooms} onChange={handleChange} />
                        {[...Array(7)].map((_, index) => (
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
                        <input type="text" name="title" placeholder="Title of the room" value={formData.title} onChange={handleChange} />
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
