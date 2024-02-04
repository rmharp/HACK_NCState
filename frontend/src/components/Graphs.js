import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import '../CSS/Brain.css';
import axios from 'axios'; 

function Graphs() {
    const [earthquakeData, setEarthquakeData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv');
    //         // Assuming the CSV is simple and can be directly converted; in real scenarios, you might need to parse it.
    //         // This is a placeholder: you'll need to transform this CSV into a format usable by Plotly
    //         // For instance, using a library like PapaParse or any CSV to JSON converter

    //         // Convert CSV to JSON here, then set the data
    //         // setEarthquakeData(convertedData);
    //     };

    //     fetchData();
    // }, []);

    return (
        <Plot
            data={[
                // Adjust this part with the actual data structure after conversion
                {
                    type: 'densitymapbox',
                    lat: earthquakeData.map(d => d.Latitude),
                    lon: earthquakeData.map(d => d.Longitude),
                    z: earthquakeData.map(d => d.Magnitude),
                    colorscale: 'Viridis',
                    radius: 10
                }
            ]}
            layout={{
                mapbox: { style: "open-street-map", center: { lat: 0, lon: 180 }, zoom: 0 },
                width: 600,
                height: 400,
                title: 'Earthquake Magnitude Density'
            }}
            config={{mapboxAccessToken: "YOUR_MAPBOX_ACCESS_TOKEN"}}
        />
    );
}

export default Graphs;
