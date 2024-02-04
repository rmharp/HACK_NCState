import React, { useState } from 'react';
import '../CSS/About.css';

function About() {
    const [displayAbout, setDisplayAbout] = useState(false);

    const toggleAboutDisplay = () => {
        setDisplayAbout(!displayAbout);
    };

    return (
        <>
            <button className="learn-more" onClick={toggleAboutDisplay}>Learn more</button>
            {displayAbout && (
                <div className={`about-display ${displayAbout ? 'active' : ''}`}>
                    <header>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Brain Functions in Simulation</title>
                    </header>
                    <div class="container">
                        <h2>Brain Functions in Our Simulation</h2>
                        <div class="brain-section" id="frontal">
                            <h3>Frontal Lobe</h3>
                            <p>Determines the rat's decision-making skills, influencing how it chooses paths and food.</p>
                        </div>
                        <div class="brain-section" id="occipital">
                            <h3>Occipital Lobe</h3>
                            <p>Controls the rat's sight, affecting its ability to find food and navigate the environment.</p>
                        </div>
                        <div class="brain-section" id="hypothalamus">
                            <h3>Hypothalamus</h3>
                            <p>Regulates the rat's appetite, determining its urgency in seeking food.</p>
                        </div>
                        <div class="brain-section" id="parietal">
                            <h3>Parietal Lobe</h3>
                            <p>This part of the brain processes sensory information from the environment, such as touch and temperature. In our simulation, it helps rats react to temperature.</p>
                        </div>
                        <div class="brain-section" id="cerebellum">
                            <h3>Cerebellum</h3>
                            <p>Increases the rat's move speed, allowing for faster exploration and food collection.</p>
                        </div>
                        </div>
                    </div>
            )}
        </>
    );
}

export default About;