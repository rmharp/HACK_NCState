import React, { useState } from 'react';
import '../CSS/Settings.css';
import '../CSS/Brain.css';
import '../index.css';

function Settings(props) {
    // Pass numFood, numIterations, speciesData into simulation.py
    const [numSpecies, setNumSpecies] = useState(1); // For the number of species
    const [brainSettings, setBrainSettings] = useState([1, 1, 1, 1, 1]); // For brain settings
    const [totalRat, setTotalRat] = useState(0); // Total number of rats
    const [animationClass, setAnimationClass] = useState('');

    console.log("ALL SPECIES ARRAY", props.speciesData);

    const handleSliderChange = (index, value) => {
        const newSettings = [...brainSettings];
        newSettings[index] = value;
        setBrainSettings(newSettings);
    };

    const handleAddSpecies = () => {
        const newSpecies = [numSpecies, ...brainSettings];
        setTotalRat(totalRat + numSpecies);
        setNumSpecies(1);
        setBrainSettings([1, 1, 1, 1, 1]);
        props.setSpeciesData([...props.speciesData, newSpecies]); // Add newSpecies to speciesData

        console.log("CURRENT SPECIES ARRAY", newSpecies);
        console.log("PROPS?", props.speciesData);
        console.log("iterations num", props.numIterations);
        console.log("Food num", props.numFood);
    };

    function handleSimulationClick(){        
        alert("Simulation running");
        setTotalRat(0);
        setBrainSettings([1, 1, 1, 1, 1])
        setNumSpecies(1);
        props.setNumFood(1);
        props.setNumIterations(1);
        props.setSpeciesData([]);
        props.startSimulation();
        setAnimationClass('slide-out-right');
    }
    
    return (
      <div className={`settings-container ${animationClass}`}>
        <div className="simulation-settings">
            <h1>Simulation Settings</h1>
            <h3>Number of food:</h3>
            <input
                    type="number"
                    min="1"
                    value={props.numFood}
                    onChange={(e) => props.setNumFood(parseInt(e.target.value))}
            />
            <br />
            <h3>Number of iterations:</h3>
            <input
                    type="number"
                    min="1"
                    value={props.numIterations}
                    onChange={(e) => props.setNumIterations(parseInt(e.target.value))}
                />
        </div>
        
        <div className="rat-settings">
            <h3>Rat Species Settings</h3>
            <p>Total Rats: {totalRat}</p> {/* Display total number of rats */}
            <div className="setting-one">
                {/* Input for number of species */}
                <input
                    type="number"
                    min="1"
                    value={numSpecies}
                    onChange={(e) => setNumSpecies(parseInt(e.target.value))}
                />
                <button onClick={handleAddSpecies}>Add Species</button>
            </div>
            {/* Sliders for brain settings */}
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                    <p>
                        {index === 0 && 'Frontal Lobe'}
                        {index === 1 && 'Occipital Lobe'}
                        {index === 2 && 'Hypothalamus'}
                        {index === 3 && 'Parietal Lobe'}
                        {index === 4 && 'Cerebellum'}
                        : {brainSettings[index]}
                    </p>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={brainSettings[index]}
                        onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                    />
                </div>
            ))}

            <button className="simulation-button" onClick={handleSimulationClick}>Run Simulation</button>
        </div>
        </div>
    );
}

export default Settings;