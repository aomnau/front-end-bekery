import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BakeryComponent(props) {
    const [bekery, setBekery] = useState([]);


    useEffect(() => {
      fetchData(); 
    }, []);

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/bekery/showbekery');
                setBekery(response.data); 
            } catch (err) {
                console.log ('เกิดข้อผิดพลาดในการดึงข้อมูล bakery:', err);
            }
        };

       

    // if (!bakery) {
    //     return <div>กำลังโหลดข้อมูล...</div>;
    // }

    return (
      <div>
      {bekery.map(item =>(
        <div key={item.id}>
            <img src={item.image_bekery} alt="bekery" />
            <h2>{item.bekeryname}</h2>
            <p>{item.description}</p>
        </div>
        ))}
        </div>
    );
}

export default BakeryComponent;