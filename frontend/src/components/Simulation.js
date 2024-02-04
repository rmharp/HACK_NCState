//import Box2 from './Box2';
import React, { useState, useEffect } from 'react';
import '../index.css';


function Simulation(props){

    const [miceItems, setMiceItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    
    const [totalSim, setTotalSim] = useState({});
    const [currFrame, setCurrFrame] = useState(0);

    function updateMiceDisplay(mice){
        setMiceItems(mice.map(mouse => 
            <div key={mouse.id}>
              <p className={'mouse mouse_' + mouse.id} style={{left: mouse.posX, top: mouse.posY}}>Mouse</p>
            </div>
        ));
    }

    function mouseDisplayCalc(tSim){
        let mice = []
        
        // for(let iter in totalSim){
        //     for(let moves in totalSim[iter]){
        //         for(let thing in totalSim[iter][moves]){ // where rats are index 0 and food is index 1
        //             for(let position in totalSim[iter][moves][thing]){
        //                 let pos = totalSim[iter][moves][thing][position];
        //                 mice.append({id: pos[0], posX: pos[0], posY: pos[1]});
        //             }
        //         }
        //     }
        // }
        let iterationNumber = 0;//Math.floor(currFrame / 50);
        let moveNumber = 0;//currFrame % 50;
        console.log('pre', tSim[`iteration${iterationNumber}`]);
        let val = tSim[`iteration${iterationNumber}`]['moves_data0'];
        console.log('val',val);
        for(let thing in val){ // where rats are index 0 and food is index 1
            for(let position in val[thing]){
                let pos = val[thing][position];
                mice.push({id: pos[0]*pos[1], posX: pos[0], posY: pos[1]});
            }
        }
        console.log("MICE", mice);
        updateMiceDisplay(mice);
    }

    useEffect(() => {
        if(!props.startSim) return;
        console.log(props.speciesData);
        let data = {num_food: props.numFood, total_iter: props.numIterations, moves_per_iter: 50, map_radius: 50, michael_nums: props.speciesData};
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
                mouseDisplayCalc(JSON.parse(result));
            })
        
        props.setStartSim(false);

    }, [props.startSim, props.numIterations, props.numFood, props.speciesData]);

    setInterval(() => {
        if(!props.startSim) return;
        mouseDisplayCalc(totalSim);
        setCurrFrame(currFrame + 1);
    }, 1000); //each frame
    

    return (
       <>
       {miceItems}
       {foodItems}
       </>
    );
}

export default Simulation;