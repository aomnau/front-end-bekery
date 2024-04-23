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
      setCartItems(cartItems.filter(item => item.cart_id !== cartItemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const incrementQuantity = (cartItemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.cart_id === cartItemId) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (cartItemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.cart_id === cartItemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  return (
    <div>
      <div className=" flex justify-between " style={{ marginTop: '150px', marginLeft: '14vh' }}>
        <div>
          <h1 className="menu menu-horizontal px-48 flex" >Product</h1>
        </div>
        <div className="flex-none">
          <div className="menu menu-horizontal px-96 flex">
            <h1>Price per piece</h1>
            <h1 className="mx-10">Quantity</h1>
            <h1 className="flex items-center mx-2">Total price</h1>
          </div>
        </div>
      </div>
      <hr style={{ width: '76%', margin: '0 auto', borderTop: '1px solid black' }} />
      <div>
        {cartItems.map(cartItem => (
          <div key={cartItem.cart_id} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: '30vh', marginTop: '20px', }}>
              <img src={`http://localhost:8000/${cartItem.product.bekery.imagebekery}`} alt="รูปภาพ" style={{ width: '150px', height: '150px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px', }} />
            </div>
            <div style={{ marginLeft: '10px', display: 'flex' }}>
              <p> {cartItem.product?.bekery?.bekeryname}</p>
              <div className="flex-none">
                <div  style={{ marginLeft: '69vh', display: 'flex', }} >
                  <p style={{ marginLeft: '31px' }} > ${cartItem.product.price}</p>
                  <div style={{marginLeft:'70px'}}>
                  <button onClick={() => decrementQuantity(cartItem.cart_id)} className="btn btn-outline text-sky-500 border-sky-500 hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ width: '15px', height: '15px', padding: '0', minWidth: '24px', minHeight: '24px' }} >-</button>
                  <span style={{ margin: '0 10px' }}>{cartItem.quantity}</span>
                  <button onClick={() => incrementQuantity(cartItem.cart_id)} className="btn btn-outline text-sky-500 border-sky-500 hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ width: '15px', height: '15px', padding: '0', minWidth: '24px', minHeight: '24px' }} >+</button>
                  </div>
                  <p style={{ marginLeft: '50px', color: 'red' }}> ${cartItem.product.price * cartItem.quantity}</p>
                  <button onClick={() => removeFromCart(cartItem.cart_id)} className="mx-24">Delete</button>
                </div>
              </div>
            </div>
          </div>

        ))}
        <div>
        </div>

      </div>
      <hr style={{ width: '76%', margin: '0 auto', borderTop: '1px solid black' }} />
      <div style={{width:'76%',margin: '0 auto',height:'150px', background: '#f7f7f7', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', }}>
        <div >
        <h2 style={{marginLeft: '100vh', marginTop:'20px',justifyContent:'center'}}>Total:<p style={{color: 'red'}}>${cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)}</p></h2>
        <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ borderRadius: '100px', marginLeft: '115vh' }} >Buy</button>
        </div>
      </div>
    </div>

  );
}

export default Cart;