import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Product() {
  const [bekeryProduct, setBekeryProduct] = useState(null);
  const {id} = useParams()

  useEffect(() => {
    const productData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bekery/showproduct/${id}`);
        setBekeryProduct(response.data);
        console.log(response)
      } catch (err) {
        console.log('เกิดข้อผิดพลาดในการโหลดข้อมูล bakery:', err);
      }
    };
    productData()
    }, [id]
  )
  useEffect(() => {
    console.log(bekeryProduct);
  }, [bekeryProduct]);
  
  return (
    <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {bekeryProduct && (
        <>
          <img src={`http://localhost:8000/${bekeryProduct.imagebekery}`} alt={bekeryProduct.bekeryname} 
                  style={{ width: '280px', height: '280px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px'}}/>
          <p>{bekeryProduct.bekeryname}</p>
          <p>{bekeryProduct.description}</p>
        </>
      )}
    </div>
  );
}
export default Product