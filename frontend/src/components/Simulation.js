//import Box2 from './Box2';
import React, { useState, useEffect } from 'react';
import '../index.css';
import rat from '../media/rat.GIF';


let currFrame = 0;

function Simulation(props){

    const [miceItems, setMiceItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    
    const [totalSim, setTotalSim] = useState(0);
    // const [currFrame, setCurrFrame] = useState(0);

    function updateMiceDisplay(mice){
        setMiceItems(mice.map(mouse => 
            <div key={mouse.id}>
              {/* <p className={'mouse mouse_' + mouse.id} style={{left: mouse.posX, top: mouse.posY}}>o</p> */}
              <img src={rat} className={'mouse mouse_' + mouse.id} style={{left: mouse.posX, top: mouse.posY, transform: `rotate(${mouse.rot}deg)`}} alt="Rat" />
            </div>
        ));
    }

    function updateFoodDisplay(food){
        setFoodItems(food.map(feed => 
            <div key={feed.id}>
              <p className={'food food_' + feed.id} style={{left: feed.posX, top: feed.posY}}>c</p>
            </div>
        ));
    }

    function mouseDisplayCalc(tSim){
        if(currFrame >props.numIterations*300) {
            // props.setShowStats(true);
            return;
        }
        let mice = [];
        let food = [];
        //console.log(tsim)
        
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
        let iterationNumber = Math.floor(currFrame / 300);
        let moveNumber = currFrame % 300;
        
        let frame = tSim[`iteration${iterationNumber}`][`moves_data${moveNumber}`];

        for(let obj in frame){
            for(let obj_data of frame[obj]){
                console.log(obj_data);
                let pos = [obj_data[0], obj_data[1]];

                if (obj === "rats"){
                    mice.push({id: mice.length, posX: 600 + pos[0], posY: 450 + pos[1], rot: 90});
                 }else{
                    food.push({id: food.length, posX: 600 + pos[0], posY: 450 + pos[1]});
                 }
            }
        }

        /*
        for(let thing in val){ // where rats are index 0 and food is index 1
            for(let position in val[thing]){
                let pos = val[thing][position];
                if(thing=='rats'){
                    mice.push({id: mice.length, posX: 600 + 0.5*pos[0], posY: 600 + 0.5*pos[1], rot: 90});
                }else{
                    food.push({id: food.length, posX: 600 + 0.5*pos[0], posY: 600 + 0.5*pos[1]});
                }
                
            }
        }
        */
        // console.log("MICE", mice);
        updateMiceDisplay(mice);
        updateFoodDisplay(food);
        
    }

    useEffect(() => {
        if(!props.startSim) return;
        let data = {num_food: parseInt(props.numFood), total_iter: parseInt(props.numIterations), moves_per_iter: 200, map_radius: 50, michael_nums: props.speciesData};
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
                console.log(typeof result);
                setTotalSim(JSON.parse(result));
                mouseDisplayCalc(JSON.parse(result));
                // const sim_data = JSON.parse(result);
                //console.log(JSON.parse(result));
            })
        

        // get_json().then(data =>{
        //     setTotalSim(data);
        //     mouseDisplayCalc(data);
        // }
        

        
            
        
        props.setStartSim(false);

        


    }, [props.startSim, props.numIterations, props.numFood, props.speciesData]);

    useEffect(() => {
        if(!totalSim) return;
        setInterval(() => {
            console.log('Frame', totalSim, currFrame);
            if(!totalSim) return;
            mouseDisplayCalc(totalSim);
            currFrame += 1;
            
        }, 2); //each frame
    }, [totalSim])
    

    return (
       <>
       {miceItems}
       {foodItems}
       </>
    );
}

export default Simulation;