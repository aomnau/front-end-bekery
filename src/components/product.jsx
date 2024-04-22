import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';


function Product() {
  const [bekeryProduct, setBekeryProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { user_id } = useContext(AuthContext);


  useEffect(() => {
    const productData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bekery/showproduct/${id}`);
        setBekeryProduct(response.data);
      } catch (err) {
        console.log('เกิดข้อผิดพลาดในการโหลดข้อมูล bakery:', err);
      }
    };
    productData();
  }, [id]);

  const addToCart = async () => {
    if (bekeryProduct) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/bekery/addtocart', {
          user_id: user_id,
          bekery_id: bekeryProduct.bekery_id,
          product_id: bekeryProduct.product[0].product_id,
          quantity: quantity
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(prevCartItems => [...prevCartItems, response.data.result]);
        console.log('Product added to cart:', response.data.result);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/bekery/showaddress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAddress(response.data);
        console.log(response.data);
        console.log(address)
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, []);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      {bekeryProduct && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '280px', marginLeft: '40vh', marginTop: '150px' }}>
            <img src={`http://localhost:8000/${bekeryProduct.imagebekery}`} alt={bekeryProduct.bekeryname}
              style={{ width: '280px', height: '280px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px' }} />
          </div>
          <div style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px', marginTop: '150px' }}>
            <h2 style={{ fontSize: '20px' }}>{bekeryProduct.bekeryname}</h2>
            <p style={{ fontSize: '16px' }}>{bekeryProduct.description}</p>
            <ul>
            {bekeryProduct.product.map(product => (
  <li key={product.product_id} style={{ color: 'red', fontSize: '16px' }}>
    ${product.price * quantity}
  </li>
))}
            </ul>
            <div style={{ display: 'flex', alignItems:'center' }}>
            <Link to={'/address'} style={{ fontSize: '18px'  }} className='hover:underline'>address</Link>
            <div style={{display:''}}>
              {address && Array.isArray(address) && address.map((addressItem, index) => (
                <div key={index} style={{marginLeft:'20px'}} >
                  <p>  {addressItem.addressline1}  {addressItem.addressline2}  {addressItem.city}</p>
                  
                </div>
              ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
              <h2>Quantity</h2>
              <button onClick={decrementQuantity} className="btn btn-outline text-sky-500 border-sky-500   hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ marginLeft: '10px', padding: '10px ' }} >-</button>
              <span style={{ margin: '0 10px' }}>{quantity}</span>
              <button onClick={incrementQuantity} className="btn btn-outline text-sky-500 border-sky-500   hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ padding: '10px ' }} >+</button>
            </div>
            <div style={{ marginTop: '15px' }}>
              <button onClick={() => addToCart(user_id)} className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ borderRadius: '100px' }} >Add to cart</button>
              <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ borderRadius: '100px', marginLeft: '12px' }} >Buy</button>
            </div>
            <div style={{ marginTop: '20px' }}>
              <hr style={{ width: '100%', borderTop: '1px solid black' }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;