import React, { useState } from 'react';
import '../CSS/Brain.css';
import brainOutline from '..//media/brain-outline.JPEG';

//Frontal Lobe, Occipital Lobe, Hypothalamus, Parietal Lobe, Cerebellum

function Brain() {
    const [displayAbout, setDisplayAbout] = useState(false);

    const toggleAboutDisplay = () => {
        setDisplayAbout(!displayAbout);
    };

    return (
        <>
            <div className="brain-container">
                <h1>Test</h1>
                <img src={brainOutline} className="brain-outline" alt="Brain outline" />
            </div>
        </>
    );
}

export default Brain;
