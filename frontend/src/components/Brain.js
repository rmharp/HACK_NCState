import React, { useState } from 'react';
import '../CSS/Brain.css';

import brainOutline2 from '../media/brain-outline-2-removebg-preview.png';
import cerebellum from '../media/cerebellum-removebg-preview.png';
import hypo from '../media/hypothalamus-removebg-preview.png';
import frontal from '../media/frontal-lobe-removebg-preview.png';
import parietal from '../media/parietal-lobe-removebg-preview.png';
import occipital from '../media/occipital-lobe-removebg-preview.png';

function Brain(props) {
    const [brainColors, setBrainColors] = useState([
        [255, 255, 255], // Frontal lobe
        [255, 255, 255], // Occipital lobe
        [255, 255, 255], // Hypothalamus
        [255, 255, 255], // Parietal lobe
        [255, 255, 255]  // Cerebellum
    ]);

    const interpolateColor = (colorA, colorB, t) => {
        return colorA.map((channel, index) => {
            return Math.round(channel + (colorB[index] - channel) * t);
        });
    };

    const handleSliderChange = (index, value) => {
        const newColors = [...brainColors];
        const color = interpolateColor([255, 255, 255], [255, 0, 0], value / 100);
        newColors[index] = color;
        setBrainColors(newColors);
    };

    return (
        <div className="testing1">
            <div className="brain-container">
                <img src={brainOutline2} className="brainOutline2" alt="Brain outline" />
                <img src={cerebellum} className="cerebellum" alt="Cerebellum" style={{ filter: `rgb(${brainColors[0].join()})` }} />
                <img src={hypo} className="hypo" alt="Hypothalamus" style={{ filter: `rgb(${brainColors[1].join()})` }} />
                <img src={frontal} className="frontal" alt="Frontal lobe" style={{ filter: `rgb(${brainColors[2].join()})` }} />
                <img src={parietal} className="parietal" alt="Parietal lobe" style={{ filter: `rgb(${brainColors[3].join()})` }} />
                <img src={occipital} className="occipital" alt="Occipital lobe" style={{ filter: `rgb(${brainColors[4].join()})` }} />
            </div>
        </div>
    );
}

export default Brain;


