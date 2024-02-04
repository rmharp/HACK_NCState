import '../App.css';
import Simulation from './Simulation';
import React, { useState } from 'react';
import About from './About';
// import RatDataComponent from './RatDataComponent';
import Settings from './Settings';
import Graphs from './Graphs';
import Brain from './Brain';
//import axios from 'axios';

function App() {
  const [showMenu, setShowMenu] = useState(1);
  const [startSim, setStartSim] = useState(false);
  const [numFood, setNumFood] = useState(1);
  const [numIterations, setNumIterations] = useState(1);
  const [speciesData, setSpeciesData] = useState([]); // ArrayList of arrays for species data

  function handleClick(){
    setShowMenu(0);
  }

  function startSimulation(){
    setStartSim(true)
  }

  return (
    <div className="App">
      {showMenu && <header className="App-header">
        <p id="title">
          RAT SIMULATOR
        </p>
        <div className="entry-container">
          <p>Hack at NC State 2024</p>
          <div className = "submit" onClick = {handleClick}>Simulate</div>
          {/* <Graphs/> */}
        </div>
      </header> }
      {/* <RatDataComponent/> */}
      
      {(!showMenu) && 
        <div>
          <Brain />
          <Simulation startSim={startSim}
                      numFood={numFood}
                      numIterations={numIterations}
                      speciesData={speciesData}
                      setStartSim = {(a) => setStartSim(a)} 
          />
          <Settings startSimulation = {() => startSimulation()} 
                    numIterations = {numIterations}
                    numFood = {numFood}
                    speciesData = {speciesData}
                    setNumIterations = {(a) => setNumIterations(a)}
                    setNumFood = {(a) => setNumFood(a)}
                    setSpeciesData = {(a) => setSpeciesData(a)}
          />
          
          <About />
          
        </div>

      }

    </div>
  );
}

export default App;







