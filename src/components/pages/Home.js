
import React from "react";
import '../styling/Home.css'
import SimpleBarChart from "./Graph";

export default function Home(){

    return(
        <div className="home">

            {/* HOME HEADER */}
            <div className="home-header">
                <h1>Perfomance Bar Graph</h1>
            </div>
            {/* ENDS */}

            {/* GRAPH */}
            <div className="graph-wrapper">
                <SimpleBarChart />
            </div>
            {/* ENDS */}
            
        </div>
    )
}