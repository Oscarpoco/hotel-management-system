import React from "react";
import '../styling/Profile.css';
import { useSelector, useDispatch } from "react-redux";
import { onProfileOpen, handleOnUpdate, handleLoader } from "../../redux/actions/UserInterface";

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { BiSave } from "react-icons/bi";

export default function Profile(){

    const dispatch = useDispatch();
    const updatingProfile = useSelector((state) => state.userInterface.updatingProfile);

    // HANDLE CLOSE PROFILE
    const handleCloseProfile = () =>{
        
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(onProfileOpen());
            dispatch(handleLoader(false));
        }, 3000);
    }

    // HANDLE ON UPDATE
    const onUpdating = ()=>{
        
        dispatch(handleLoader(true));

        setTimeout (()=> {
            dispatch(handleOnUpdate());
            dispatch(handleLoader(false));
        }, 3000);
    }

    return(
        <div className="on-profile-layout">
            <div className="on-profile-content">

                {/* PROFILE HEADER */}
                <div className="profile-header">
                    
                    {updatingProfile ?<IoIosArrowBack className="back-arrow" onClick={onUpdating}/> : <IoIosArrowBack className="back-arrow" onClick={handleCloseProfile}/>}
                    <h3>My Profile</h3>
                    <div className="edit-profile-wrapper">

                        {updatingProfile ? <BiSave className="edit-icon" onClick={onUpdating}/> : <FaRegEdit className="edit-icon" onClick={onUpdating}/>}
                           
                    </div>
                </div>

                {/* TERNARY FOR ON UPDATE AND OFF UPDATE */}

                {updatingProfile ? 
                
                // UPDATING PROFILE
                <form className="profile-details">
                
                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Username</label>
                        <input type="email" placeholder="Enter a new username"></input>
                    </div>
                    {/* ENDS */}
                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Password</label>
                        <input type="password" placeholder="Enter a new password"></input>
                    </div>
                    {/* ENDS */}
                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm password"></input>
                    </div>
                    {/* ENDS */}
                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Profile picture</label>
                        <input type="file" accept="image" required></input>
                    </div>
                    {/* ENDS */}
                </form>

                :

                // NOT UPDATING
                <div className="profile-details">
                    

                    {/* USER PROFILE PICTURE */}
                    <div className="user-profile-picture">
                        <img src="boy.jpg" alt="profile-picture"></img>
                    </div>
                    {/* ENDS */}

                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Full Names</label>
                        <p><strong>Oscar Kyle Poco</strong></p>
                    </div>
                    {/* ENDS */}
                    
                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Job description</label>
                        <p><strong>Senior Admnistrator</strong></p>
                    </div>
                    {/* ENDS */}

                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>ID number</label>
                        <p><strong>9712166319089</strong></p>
                    </div>
                    {/* ENDS */}

                    {/* USER DETAILS */}
                    <div className="user-details-wrapper">
                        <label>Nationality</label>
                        <p><strong>South Africa</strong></p>
                    </div>
                    {/* ENDS */}

                </div>
                }
                

            </div>
        </div>
    )
}