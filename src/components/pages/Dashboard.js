import React from "react";
import '../styling/Dashboard.css';
import { useSelector, useDispatch } from "react-redux";

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

import { toggleSigning } from '../../redux/actions/UserInterface';

// COMPONENTS
import SwitchBetweenComponents from "./SwitchingComponents";



function Dashboard(){

    const isSideBarOpen = useSelector((state)=> state.userInterface.isSideBarOpen);
    const dispatch = useDispatch();

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
        
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(handleSideBar());
            dispatch(handleLoader(false));
        }, 3000);
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
                            </div>
                        </div>
                        {/* ENDS */}

                        {/* NAVIGATION */}
                        <div className="side-bar-navigation">
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('bookings')}><RiAlignItemBottomFill className="sidebar-icons" style={{color: '#0077B5'}} /> Bookings</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('reviews')}><MdReviews className="sidebar-icons" style={{color: '#25D366'}} />Reviews</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('gallery')}><GrGallery className="sidebar-icons" style={{color: '#DD2A7B'}} />Gallery</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('users')}><RiShieldUserFill className="sidebar-icons" style={{color: '#1DA1F2'}} />Users</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('accomodation')}><PiWarehouseFill className="sidebar-icons" style={{color: '#1877F2'}} />Accomodation</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('notifications')}><IoNotificationsSharp className="sidebar-icons" style={{color: '#772222'}} />Notifications</button>
                            <button  className="navigation-buttons" onClick={() =>handleChangeView('favorite')}><MdOutlineFavorite className="sidebar-icons" style={{color: '#772222'}} />Favorites</button>
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
                                <p className="admin">Oscar Poco</p>
                            </div>
                        </div>

                        {/* ADMIN PROFILE */}
                        <div className="user-profile">
                            <div className="profile" onClick={HnadleOpenProfile}>
                                <img src="boy.jpg" alt="profile-picture"></img>
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