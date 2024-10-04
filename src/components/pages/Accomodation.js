import React, { useState, useEffect } from "react";
import '../styling/Accomodation.css';
import { useSelector, useDispatch } from "react-redux";
import { handleAddingAccomodation, handleLoader } from "../../redux/actions/UserInterface";
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import { storage } from "../../firebase/Firebase"; // Your Firebase storage import
import {firestore} from '../../firebase/Firebase';

// MUI Imports
import { Button, TextField, IconButton, Grid, Box } from '@mui/material';
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

    const db = firestore;

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
            fetchAccommodations(); // Refresh accommodations list after update
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
            fetchAccommodations(); // Refresh accommodations list after save

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
            fetchAccommodations(); // Refresh accommodations list after deletion
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
                <h1>Accommodation</h1>
                <Button variant="contained" color="primary" onClick={handleOpenAccomdationForm}>
                    Add
                </Button>
            </div>

            {/* ACCOMODATION GRID */}
            <div className="accomodation-grid">
                <div className="accomodation-aligning">
                    {accommodations.map((accommodation) => (
                        <div className="accomodation-grid-item" key={accommodation.id}>
                            {/* PICTURE */}
                            <div className="room-pictures">
                                <img src={accommodation.images[2]} alt="pictures" className="accomodation-image" />
                            </div>

                            {/* CONTENT */}
                            <div className="accomodation-content">
                                <p><strong>Available:</strong> {accommodation.availability}</p>
                                <p><strong>{accommodation.price} ZAR</strong> night</p>
                                <p><strong>{accommodation.location}</strong></p>
                                <p>{accommodation.amenities.join(', ')}</p>
                                <p>{accommodation.numberOfRooms}</p>
                                <p><strong>What we offer:</strong> {accommodation.description}</p>
                            </div>

                            {/* DELETE */}

                            <div className='action-buttons-wrapper'>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(accommodation.id)}>
                                    Remove
                                </Button>

                                {/* Update availability buttons */}
                                <Button variant="contained" color="success" onClick={() => updateAvailability(accommodation.id, "available")}>
                                    Available
                                </Button>
                                <Button variant="contained" color="warning" onClick={() => updateAvailability(accommodation.id, "booked")}>
                                    Booked
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* POPUP */}
            {addingAccomodation && (
                <Box className="accomodations-form" component="form" onSubmit={handleSubmit} sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                            <TextField
                                fullWidth
                                type="number"
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Availability"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Number of rooms"
                                name="numberOfRooms"
                                value={formData.numberOfRooms}
                                onChange={handleChange}
                                margin="normal"
                            />
                            {[...Array(10)].map((_, index) => (
                                <TextField
                                    key={index}
                                    fullWidth
                                    label={`Amenity ${index + 1}`}
                                    value={formData.amenities[index] || ""}
                                    onChange={(e) => handleAmenitiesChange(index, e.target.value)}
                                    margin="normal"
                                />
                            ))}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Title of the room"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Room description and policies"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>

                    {/* BUTTONS */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <IconButton onClick={handleClose}>
                            <IoMdClose />
                        </IconButton>
                        <Button variant="contained" color="primary" type="submit">
                            Save Accommodation
                        </Button>
                    </Box>
                </Box>
            )}
        </div>
    );
}
