import React from "react";
import { useSelector } from "react-redux";

// components
import Home from './Home';
import Bookings from './Bookings';
import Gallery from './Gallery';
import Accomodation from './Accomodation';
import Notifications from './Notifications';
import Reviews from './Reviews';
import Users from './Users';
import Favorite from "./Favorite";

function SwitchBetweenComponents(){
    const currentView = useSelector((state) => state.view.currentView);

    // SWITCH CONDITIONAL RENDERING
    const renderComponents = ()=>{

        switch (currentView){

            case 'home':
                return <Home />

            case 'bookings':
                return <Bookings />

            case 'gallery':
                return <Gallery />

            case 'accomodation':
                return <Accomodation />

            case 'notifications':
                return <Notifications />

            case 'reviews':
                return <Reviews />

            case 'users':
                return <Users />

            case 'favorite':
                return <Favorite />

            default:
                return <Home />
        }
    }

    return(
        <div className="SwitchBetweenComponents" 
        // INLINE STYLING
        style=
        {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        }}>
        {/* ENDS */}

        {/* REDENDERING COMPONENTS */}
            {renderComponents()}
        </div>
    )
}

export default SwitchBetweenComponents;