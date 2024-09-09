
import React, { useState, useEffect } from "react";
import '../styling/Gallery.css';
import { handleLoader } from "../../redux/actions/UserInterface";
import { handleCloseNotificationAlert, handleOpenNotificationAlert } from "../../redux/actions/AlertNotification";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase/Firebase";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage imports
import NotificationArlet from "./NotificationArlet";

export default function Gallery() {
    const [images, setImages] = useState([]); // State to store gallery images
    const [file, setFile] = useState(null); // State to store selected file

    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    // Initialize Firestore
    const db = getFirestore(); // This initializes Firestore

    useEffect(() => {
        fetchImages(); // Fetch images on component mount
    }, []);

    // Fetch images from Firestore
    const fetchImages = async () => {
        dispatch(handleLoader(true))
        try {
            const imagesCollection = collection(db, "gallery");
            const imageSnapshot = await getDocs(imagesCollection);
            const imageList = imageSnapshot.docs.map(doc => ({
                id: doc.id, // Include document ID
                ...doc.data()
            }));
            setImages(imageList);
            
        } catch (error) {
            console.error("Error fetching images: ", error);
        } finally {
            dispatch(handleLoader(false))
        }
    };
    


    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]); // Set selected file
        }
    };

    // Handle image upload
    const handleUpload = async () => {

        
        if (file) {

            try {
                const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the storage location
                await uploadBytes(storageRef, file); // Upload the file

                // Get the download URL of the uploaded file
                const downloadURL = await getDownloadURL(storageRef);

                // Save the URL to Firestore
                await addDoc(collection(db, "gallery"), { url: downloadURL });

               
                fetchImages();
                setFile(null);
                // dispatch(handleOpenNotificationAlert("Successfully added picture to gallery"));
                // setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);
                
            } catch (error) {
                console.error("Error uploading file: ", error);
                
            } 
            
        } else {
            
            dispatch(handleOpenNotificationAlert("Please select a file to upload."));
            setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);
            
        }
    };


    // HANDLE DELETE
    
    const handleDelete = async (imageId) => {
        dispatch(handleLoader(true));
        try {
            await deleteDoc(doc(db, "gallery", imageId));
            fetchImages(); 
            dispatch(handleOpenNotificationAlert("Successfully deleted"));
            setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);
        } catch (error) {
            console.error("Error deleting image: ", error);

        } finally {
            dispatch(handleLoader(false));
        }
    };
    


    return (
        <div className="gallery-layout">
            {/* GALLERY HEADER */}
            <div className="gallery-header">
                <h1>Gallery</h1>
                <input type="file" onChange={handleFileChange} /> {/* Input for selecting file */}
                <button className="add-picture" onClick={handleUpload}>Add Picture</button> {/* Button to upload */}
            </div>
            {/* ENDS */}

            {/* GALLERY GRID */}
            <div className="gallery-grid">
                {images.map((image, index) => ( 
                    <div className="gallery-grid-item" key={index}>
                        <img src={image.url} alt={`Gallery ${index}`} />
                        <button className="delete-image" onClick={() => handleDelete(image.id)}><strong>Delete</strong></button>
                    </div>
                ))}
            </div>
            {/* ENDS */}

            {/* NOTIFICATION POPUP */}
            <NotificationArlet 
            message={notification.message} 
            onClose={() => dispatch(handleCloseNotificationAlert())} 
            notificationArletVisible={notification.notificationArletVisible}
            />
        </div>
    );
}
