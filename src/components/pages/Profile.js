import React, { useEffect, useState } from "react";
import '../styling/Profile.css';
import { useSelector, useDispatch } from "react-redux";
import { onProfileOpen, handleOnUpdate, handleLoader } from "../../redux/actions/UserInterface";
import { doc, getDoc, updateDoc,  } from "firebase/firestore";
import {firestore} from '../../firebase/Firebase';
import {storage} from '../../firebase/Firebase';
import { ref, uploadBytes , getDownloadURL} from "firebase/storage";

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { BiSave } from "react-icons/bi";

export default function Profile() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userInterface.userId);
    const updatingProfile = useSelector((state) => state.userInterface.updatingProfile);
    const [userData, setUserData] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    const db = firestore;

    useEffect(() => {
        if (userId) {
            // Fetch user data
            const fetchUserData = async () => {
                const userDoc = doc(db, "admins", userId);
                const userSnap = await getDoc(userDoc);
                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                    setProfilePictureUrl(userSnap.data().profilePictureUrl); 
                }
            };
            fetchUserData();
        }
    }, [userId, firestore]);

    // Handle profile picture change
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
        }
    };

    // Handle profile picture upload and update Firestore
    const handleProfilePictureUpload = async () => {
        if (profilePicture && userId) {
            dispatch(handleLoader(true));
            const storageRef = ref(storage, `profilePictures/${userId}/${profilePicture.name}`);
            await uploadBytes(storageRef, profilePicture);
            const downloadURL = await getDownloadURL(storageRef);

            // Update Firestore document with the new profile picture URL
            const userDoc = doc(firestore, "admins", userId);
            await updateDoc(userDoc, { profilePictureUrl: downloadURL });


            // Update state with the new URL
            setProfilePictureUrl(downloadURL);
            setProfilePicture(null);
            dispatch(handleOnUpdate(false));
            dispatch(handleLoader(false));
        }
    };


   

    // HANDLE CLOSE PROFILE
    const handleCloseProfile = () => {
        dispatch(handleLoader(true));
        setTimeout(() => {
            dispatch(onProfileOpen());
            dispatch(handleLoader(false));
        }, 3000);
    };

    // HANDLE ON UPDATE
    const onUpdating = () => {
        dispatch(handleLoader(true));
        setTimeout(() => {
            dispatch(handleOnUpdate());
            dispatch(handleLoader(false));
        }, 3000);
    };

    return (
        <div className="on-profile-layout">
            <div className="on-profile-content">
                {/* PROFILE HEADER */}
                <div className="profile-header">
                    {updatingProfile ?
                        <IoIosArrowBack className="back-arrow" onClick={onUpdating} /> :
                        <IoIosArrowBack className="back-arrow" onClick={handleCloseProfile} />}
                    <h3>My Profile</h3>
                    <div className="edit-profile-wrapper">
                        {updatingProfile ?
                            <BiSave className="edit-icon"  onClick={handleProfilePictureUpload}/> :
                            <FaRegEdit className="edit-icon" onClick={onUpdating} />}
                    </div>
                </div>

                {/* TERNARY FOR ON UPDATE AND OFF UPDATE */}
                {updatingProfile ?

                    // UPDATING PROFILE PICTURE
                    <form className="profile-details">
                        {/* USER DETAILS */}
                        <div className="user-details-wrapper">
                            <label>Profile picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        {/* ENDS */}
                    </form>

                    :

                    // NOT UPDATING
                    <div className="profile-details">
                        {/* USER PROFILE PICTURE */}
                        <div className="user-profile-picture">
                            <img src={profilePictureUrl} alt="profile-picture" />
                        </div>
                        {/* ENDS */}

                        {/* USER DETAILS */}
                        <div className="user-details-wrapper">
                            <label>Full Names</label>
                            <p><strong>{userData?.name || 'Not available'}</strong></p>
                        </div>
                        {/* ENDS */}

                        {/* USER DETAILS */}
                        <div className="user-details-wrapper">
                            <label>Job description</label>
                            <p><strong>{userData?.position || 'Not available'}</strong></p>
                        </div>
                        {/* ENDS */}

                        {/* USER DETAILS */}
                        <div className="user-details-wrapper">
                            <label>ID number</label>
                            <p><strong>{userData?.idNumber || 'Not available'}</strong></p>
                        </div>
                        {/* ENDS */}

                        {/* USER DETAILS */}
                        <div className="user-details-wrapper">
                            <label>Nationality</label>
                            <p><strong>{userData?.city || 'Not available'}</strong></p>
                        </div>
                        {/* ENDS */}

                    </div>
                }
            </div>
        </div>
    );
}
