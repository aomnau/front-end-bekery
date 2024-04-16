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
    <div style={{ marginTop: '150px',display: 'flex' }}>
      {bekeryProduct && (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '280px', marginLeft: '100px'}}>
          <img src={`http://localhost:8000/${bekeryProduct.imagebekery}`} alt={bekeryProduct.bekeryname} 
                  style={{ width: '280px', height: '280px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px'}}/>
                  </div>
          <div style={{  flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
              <h2>{bekeryProduct.bekeryname}</h2>
              <p style={{ fontSize: '14px',}}>{bekeryProduct.description}</p>
              <ul>
              {bekeryProduct.product.map(product => (
                  <li key={product.product_id}>${product.price}</li>
                ))}
              </ul>
              <p>Add an address</p>
              <p>Quantity</p>
              <div style={{ marginTop: '50px'}}>
              <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white"style={{ borderRadius: '100px' }} >Add to cart</button>
              <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white"style={{ borderRadius: '100px', marginLeft: '12px' }} >Buy</button>
              </div>
              <div style={{ marginTop: '35px'}}>
              <hr style={{ width: '100%', borderTop: '1px solid black' }} />
              </div>
            </div>
        </>
      )}
    </div>
  );
}
export default Product