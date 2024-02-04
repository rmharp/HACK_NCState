//import Box2 from './Box2';
import React, { useState, useEffect } from 'react';
import '../index.css';

const mice = [];
const food = []


function Simulation(props){

    const [miceItems, setMiceItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    
    const [totalSim, setTotalSim] = useState({});

    function updateMiceDisplay(){
        setMiceItems(mice.map(mouse => 
            <div key={mouse.id}>
              <p className={'mouse mouse_' + mouse.id} style={{left: mouse.posX, top: mouse.posY}}>Mouse</p>
              
            </div>
        ));
    }

    useEffect(() => {
        for(let i = 0; i < 1; i++){
            mice[i] = {
                id: i, 
                posX: 50,
                posY: 50,
                species: "red"
            };
        }
        updateMiceDisplay();
    }, []);

    useEffect(() => {
        if(!props.startSim) return;
        console.log(props.speciesData);
        let data = {num_food: props.numFood, total_iter: props.numIterations, moves_per_iter: 50, map_radius: 50, michael_nums: props.speciesData};
        let fetchResult = {}
        fetch("http://localhost:8000/anze/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then((res) => res.json())
            .then((result) => {
                fetchResult = result;
                console.log(result);
            })
        
        setTotalSim(fetchResult);


        for(let i = 0; i < props.num; i++){
            mice[i] = {
                id: i, 
                posX: 50,//fetchResult[i]
                posY: 50//fetchResult[i]
            };
        }
        updateMiceDisplay();
    }, [props.startSim]);

    const interval = setInterval(() => {
        console.log('FRAME');
        //updateMiceDisplay();
    }, 1000); //each frame
    

    return (
       <>
       {miceItems}
       {foodItems}
       </>
    );
}

export default Simulation;