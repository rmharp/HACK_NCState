//import Box2 from './Box2';
import React, { useState, useEffect } from 'react';
import '../index.css';


function Simulation(props){

    const [miceItems, setMiceItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    
    const [totalSim, setTotalSim] = useState({});

    function updateMiceDisplay(mice){
        setMiceItems(mice.map(mouse => 
            <div key={mouse.id}>
              <p className={'mouse mouse_' + mouse.id} style={{left: mouse.posX, top: mouse.posY}}>Mouse</p>
            </div>
        ));
    }

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
                console.log(JSON.parse(result));
                setTotalSim(JSON.parse(result));
            })
        
        props.setStartSim(false);

    }, [props.startSim, props.numIterations, props.numFood, props.speciesData]);

    useEffect(() => {
        let mice = []
        
        for(let iter in totalSim){

            for(let moves in totalSim[iter]){
                for(let thing in totalSim[iter][moves]){ // where rats are index 0 and food is index 1
                    let item = totalSim[iter][moves][thing];
                    console.log(item);
                    if (item == 0){
                        for(let i=0; i < item.length; i++){
                            if(mice.length < item.length){
                                mice = [];
                                for(let j=0; j < item.length; j++){
                                    mice.push(0);
                                }
                            }
                            for(let j = 0; j < item.length; j++){
                                let position = item[j];
                                mice[j] = {id: i, posX: position[0], posY: position[1]};
                            }
                        }
                    }

                    if (item == 1){
                        //...
                    }
                }
            }
        }
        console.log("MICE", mice);
        updateMiceDisplay(mice);
    }, [totalSim])

    // const interval = setInterval(() => {
    //     console.log('FRAME');
    //     //updateMiceDisplay();
    // }, 1000); //each frame
    

    return (
       <>
       {miceItems}
       {foodItems}
       </>
    );
}

export default Simulation;