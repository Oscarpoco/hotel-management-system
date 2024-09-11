
import React from "react";
import '../styling/Home.css';
import { setView } from "../../redux/actions/View";
import { handleLoader } from "../../redux/actions/UserInterface";
import { useDispatch } from "react-redux";

// ICONS
import { MdReviews } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { PiWarehouseFill } from "react-icons/pi";
import { MdOutlineFavorite } from "react-icons/md";
import { RiAlignItemBottomFill } from "react-icons/ri";



export default function Home(){

    const dispatch = useDispatch();
    
    const handleChangeComponents = (view)=>{
        dispatch(handleLoader(true));

        setTimeout (() => {
            dispatch(setView(view));
            dispatch(handleLoader(false));
        }, 2000)
    }

    return(
        <div className="home">

            {/* HOME HEADER */}
            <div className="home-header">
                <h1>Dashboard</h1>
            </div>
            {/* ENDS */}

            {/* dashboard */}
            <div className="dashboard-content-wrapper">
                <div className="dashboard-grid">
                    <div className="dashboard-grid-item" onClick={() =>handleChangeComponents('bookings')}>
                        <h2>Bookings</h2>
                        <RiAlignItemBottomFill className="home-icons" style={{color: '#0077B5'}}/>
                    </div>

                    <div className="dashboard-grid-item" onClick={() =>handleChangeComponents('accomodation')}>
                        <h2>Accommodations</h2>
                        <PiWarehouseFill className="home-icons" style={{color: '#1877F2'}} />
                    </div>
                    <div className="dashboard-grid-item" onClick={() =>handleChangeComponents('favorite')}>
                        <h2>Loved Accommodations</h2>
                        <MdOutlineFavorite className="home-icons" style={{color: '#772222'}}/>
                    </div>
                    <div className="dashboard-grid-item" onClick={() =>handleChangeComponents('reviews')}>
                        <h2>Feedback</h2>
                        <MdReviews className="home-icons" style={{color: '#25D366'}} />
                    </div>
                    <div className="dashboard-grid-item" onClick={() =>handleChangeComponents('gallery')}>
                        <h2>Gallery</h2>
                        <GrGallery className="home-icons" style={{color: '#DD2A7B'}} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}