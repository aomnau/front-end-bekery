import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BakeryComponent = ({ searchTerm }) => {
  const [bekeryData, setBekeryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, bekeryData]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bekery/showbekery');
      setBekeryData(response.data);
    } catch (err) {
      console.log('เกิดข้อผิดพลาดในการโหลดข้อมูล bakery:', err);
    }
  };

  const filterData = () => {
    const filtered = bekeryData.filter(bekery =>
      bekery.bekeryname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className='flex flex-wrap' style={{ width: '100%', maxWidth: '100vw', overflowX: 'auto', justifyContent: 'center' }} >
        {filteredData.map((bekery) => (
          <Link to={`/product/${bekery.bekery_id}`}>
          <div key={bekery.bekery_id}  style={{ background: '#fff',   width: '280px',margin: '50px' }} >
            <img src={`http://localhost:8000/${bekery.imagebekery}`} alt={bekery.bekeryname} 
            style={{ width: '280px', height: '280px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px'}}/>
            <div style={{ marginBottom: '10px' }}>
            <h2 to={'/product'} className='hover:underline' style={{ margin: '0' }}> {bekery.bekeryname}</h2>
            <p className='hover:underline' style={{ marginBottom: '1px', fontSize: '10px' }}> {bekery.description}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BakeryComponent;