import React, { useState } from 'react';
import axios from 'axios';

const AddAddressForm = () => {
  const [addressline1, setAddressLine1] = useState('');
  const [addressline2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:8000/bekery/addAddress', {
        addressline1,
        addressline2,
        city
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else if (error.request) {
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        setError('เกิดข้อผิดพลาดในการดำเนินการ');
      }
    }
  };

  return (
    <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="addressline1">Address Line 1:</label>
          <input
            id="addressline1"
            type="text"
            value={addressline1}
            onChange={(e) => setAddressLine1(e.target.value)}
            style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="addressline2">Address Line 2:</label>
          <input
            id="addressline2"
            type="text"
            value={addressline2}
            onChange={(e) => setAddressLine2(e.target.value)}
            style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
          />
        </div>
        <div style={{marginBottom: '10px' }}>
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
          />
        </div>
        <div style={{display:'flex'}}>
          <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white"  style={{ width: '100%', padding: '10px', borderRadius: '5px'}}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;