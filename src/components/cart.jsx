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

  const removeFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/bekery/removecart/${cartItemId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // ลบรายการออกจากสเตตส์
      setCartItems(cartItems.filter(item => item.cart_id !== cartItemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <div style={{marginTop:'150px',marginLeft: '14vh'}}>
      <h1>product</h1>
      
      </div>
      <div>
      
        {cartItems.map(cartItem => (
          <div key={cartItem.cart_id} style={{display:'flex',alignItems:'center'}}>
            <div style={{   marginLeft: '10vh', marginTop: '20px',}}>
            <hr style={{ width: '100%', borderTop: '1px solid black', margin: '0 10px 0 0'}} />
            <img src={`http://localhost:8000/${cartItem.product.bekery.imagebekery}`} alt="รูปภาพ" style={{ width: '150px', height: '150px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px',marginTop:'10px' }}/>
            </div>
            <div style={{marginLeft: '10px',display:'flex'}}>
            <p> {cartItem.product?.bekery?.bekeryname}</p>
            <p> ${cartItem.product.price}</p>
            <p> {cartItem.quantity}</p>
            <button onClick={() => removeFromCart(cartItem.cart_id)}>ลบ</button>
            </div>
            
          </div>
        ))}
      </div>
      <hr style={{ width: '100%', borderTop: '1px solid black', margin: '0 10px 0 0'}} />
    </div>
  );
}

export default Cart;