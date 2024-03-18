import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BakeryComponent = () => {
  const [bekeryData, setBekeryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bekery/showbekery');
      setBekeryData(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล bakery:', error);
    }
  };

  return (
    <div>
      <h1>Bakery</h1>
      <div>
        {bekeryData.map((bekery) => (
          <div key={bekery.bekery_id}>
            <img src={`http://localhost:8000/uploads/${bekery.image_bekery}`} alt={bekery.bekeryname} />
            <h2>{bekery.bekeryname}</h2>
            <p>{bekery.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BakeryComponent;