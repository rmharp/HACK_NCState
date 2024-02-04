import React, { useState } from 'react';
import '../CSS/Brain.css';
import brainOutline from '..//media/brain-outline.JPEG';

function Brain() {
    const [displayAbout, setDisplayAbout] = useState(false);

    const toggleAboutDisplay = () => {
        setDisplayAbout(!displayAbout);
    };

    return (
        <>
            <h1>Test</h1>
            <img src={brainOutline} className="brain-outline" alt="Brain outline" />
        </>
    );
}

export default Brain;
