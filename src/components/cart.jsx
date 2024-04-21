import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`http://localhost:8000/bekery/showproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(response.data); 
        console.log(setCartItems)
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [id]);

  return (
    <div>
    <h1>Cart</h1>
    {cartItems !== null && Array.isArray(cartItems) && cartItems.length > 0 ? (
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <h3>{item.productName}</h3> {/* ปรับให้เหมาะกับการตอบรับข้อมูลที่ส่งกลับจากเซิร์ฟเวอร์ */}
              <p>Quantity: {item.quantity}</p> {/* ปรับให้เหมาะกับการตอบรับข้อมูลที่ส่งกลับจากเซิร์ฟเวอร์ */}
              <p>Price: ${item.price}</p> {/* ปรับให้เหมาะกับการตอบรับข้อมูลที่ส่งกลับจากเซิร์ฟเวอร์ */}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>{cartItems !== null ? 'Your cart is empty' : 'Loading...'}</p>
    )}
  </div>
);
}

export default Cart;
