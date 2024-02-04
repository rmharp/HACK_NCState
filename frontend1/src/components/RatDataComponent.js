import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatDataComponent = () => {
  const [ratDataArray, setRatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getUsers');
        console.log("DATA?", response.data);
        setRatData(response.data); 
      } catch (error) {
        console.error('Error fetching rat data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Rat Data</h1>
      <ul>
        {ratDataArray.map((rat) => (
          <li key={rat._id}>{rat.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default RatDataComponent;

