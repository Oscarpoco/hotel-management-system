import React from "react";
import { useEffect, useState } from "react";
import '../styling/Dashboard.css';
import { useSelector, useDispatch } from "react-redux";
// FIRESTORE
// import { doc  } from "firebase/firestore";
import {firestore} from '../../firebase/Firebase';
import { doc, onSnapshot } from "firebase/firestore";
// actions
import { handleSideBar, onProfileOpen, handleLoader } from "../../redux/actions/UserInterface";
import { setView } from "../../redux/actions/View";

// ICONS
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { PiWarehouseFill } from "react-icons/pi";
import { RiShieldUserFill } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

import { toggleSigning } from '../../redux/actions/UserInterface';

// COMPONENTS
import SwitchBetweenComponents from "./SwitchingComponents";



function Dashboard(){

    const isSideBarOpen = useSelector((state)=> state.userInterface.isSideBarOpen);
    const userId = useSelector((state) => state.userInterface.userId);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);

    const db = firestore;
 // Real-time Firestore updates

useEffect(() => {
    if (userId) {
        // Reference to the Firestore document
        const userDoc = doc(db, "admins", userId);
        
        // Real-time listener for user data, including profile picture updates
        const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                setUserData(userData);  // Update user data
                setProfilePictureUrl(userData.profilePictureUrl || '');  // Update profile picture URL
            } else {
                console.error("User data not found");
            }
        }, (error) => {
            console.error("Error fetching user data: ", error);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }
}, [userId, db]);


    // LOGOUT
    const handleLogout = () => {
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(toggleSigning());
            dispatch(handleLoader(false));
        }, 3000);
        
    }

    // HANDLE OPENING SIDEBAR

    const HandleToggleSideBar = ()=>{
        dispatch(handleSideBar());
    }

    // HANDLE SIDEBAR NAVIGATION CLICKS
    const handleChangeView = (view)=>{
       
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(setView(view));
            dispatch(handleLoader(false));
        }, 3000);
    }
    // ENDS

    // HANLDE OPENING PROFILE
    const HnadleOpenProfile = ()=>{
        
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(onProfileOpen());
            dispatch(handleLoader(false));
        }, 3000);
    }



    return(
        <div className="dashboard-wrapper">

                {/* SIDE BAR */}
                {isSideBarOpen && (
                    <div className="aside">

                        {/* LOGO-WRAPPER */}
                        <div className="side-bar-logo-wrapper">
                            <div className="side-bar-logo">
                                <h3>Rest Hotely 
                                <br></br>
                                <span>Management System</span></h3>
                                <button type="submit" className="home-button" onClick={() =>handleChangeView('home')}><FaHome className="sidebar-icons"/> Home</button>
                                <MdClose className="menu-close-icon" onClick={HandleToggleSideBar}/>
                            </div>
                        </div>
                        {/* ENDS */}

                        {/* NAVIGATION */}
                        <div className="side-bar-navigation">
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('bookings')}><RiAlignItemBottomFill className="sidebar-icons" /> Bookings</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('reviews')}><MdReviews className="sidebar-icons" />Reviews</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('gallery')}><GrGallery className="sidebar-icons" />Gallery</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('users')}><RiShieldUserFill className="sidebar-icons" />Users</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('accomodation')}><PiWarehouseFill className="sidebar-icons"/>Accomodation</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('notifications')}><IoNotificationsSharp className="sidebar-icons" />Notifications</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('favorite')}><MdOutlineFavorite className="sidebar-icons" />Favorites</button>
                        </div>

                        {/* ENDS */}
                    </div>
                )}
                {/* ENDS */}

                {/* BODY */}
                <div className="dashboard-main">
                   <nav>
                        {/* ADMIIN NAME */}
                        <div className="user">
                            {/* TOGGLE */}
                            <div className="menu" onClick={HandleToggleSideBar}>
                                {isSideBarOpen ? 
                                <MdClose className="menu-icon"/>

                                :

                                <RiMenuUnfold2Fill className="menu-icon"/>
                                }
                            </div>
                            {/* ENDS */}

                            <div className="admin-wrapper">
                                <span><p>Admin</p></span>
                                <p className="admin">{userData?.name || 'Not available'}</p>
                            </div>
                        </div>

                        {/* ADMIN PROFILE */}
                        <div className="user-profile">
                            <div className="profile" onClick={HnadleOpenProfile}>
                            {profilePictureUrl ? (
                                    <img
                                        src={profilePictureUrl}
                                        alt="Profile"
                                    />
                                ) : (
                                    <FaRegCircleUser style={{ fontSize: "100px" }} /> // Fallback icon
                            )}
                            </div>
                            <div className="logout">
                                <RiLogoutCircleRLine className="logout-icon" onClick={handleLogout}/>
                            </div>
                        </div>
                   </nav>

                   {/* RENDERING SWITCHING COMPENT */}
                   <div className="content">
                        <SwitchBetweenComponents />
                   </div>
                </div>
                {/* ENDS */}
        </div>
    )
}

export default Dashboard;