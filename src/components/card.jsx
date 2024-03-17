import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BakeryComponent = () => {
  const [bakeryData, setBakeryData] = useState([]);

  useEffect(() => {
    fetchBakeryData();
  }, []);

  const fetchBakeryData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bekery/showbekery'); 
      setBakeryData(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล bakery:', error);
    }
  };

  return (
    <div>
      <h1>รายการ Bakery</h1>
      <div>
        {bakeryData.map(bakery => (
          <div key={bakery.id}>
            <img src={bakery.image_bakery} alt={bakery.bekeryname} />
            <h2>{bakery.bekeryname}</h2>
            <p>{bakery.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BakeryComponent;