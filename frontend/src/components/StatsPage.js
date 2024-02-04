import React, {useState, useEffect} from 'react'
import CircularGraphs from './CircularGraphs';
import HeatmapGraphs from './HeatmapGraphs';
import SlopeChart from './SlopeChart';

import '../index.css';


function StatsPage(){

    // Circular Positions
    const positions = Array.from({ length: 5 }, (_, i) => ({ value: Math.random() * 100 }));

    // Heatmap Positions
    // const positions = Array.from({ length: 1000 }, (_, i) => ({
    //   x: Math.random() * 800, // assuming width of SVG is 800
    //   y: Math.random() * 600, // assuming height of SVG is 600
    //   value: Math.random() // assuming value is between 0 and 1 for color scaling
    // }));

    useEffect(() => {

    },[])


    return (
        <div className='fade-in2 stats-container'>
            <div className='fade-in2'>
            {/* Circular Graph of species percentage left alive */}
            {/* <CircularGraphs data={positions} /> */}
            {/* HeatMap of end positions or positions over time */}
            {/* <HeatmapGraphs data={positions} /> */}
            {/* SlopeChart of brain traits labeled by species */}
            {/* <SlopeChart /> */}
            {/* BarChart of species population over time */}
            {/* <Bar Chart /> */}
            </div>
        </div>
    );
}

export default StatsPage;