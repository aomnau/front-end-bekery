import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/bekery/showcart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div style={{ marginTop: '150px' }}>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(cartItem => (
          <li key={cartItem.cart_id}>
            <h2>{cartItem.product.productName}</h2>
            <p>Price: ${cartItem.product.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>User ID: {cartItem.user_id}</p>
            <p>Bekery ID: {cartItem.bekery_id}</p>
            <p>Product ID: {cartItem.product_id}</p>
            {/* สร้างปุ่มหรือฟังก์ชันสำหรับลบรายการในตะกร้า */}
            <button onClick={() => removeFromCart(cartItem.cart_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;