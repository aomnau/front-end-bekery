import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/bekery/showorder');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{marginTop}}>
      <h1>Orders</h1>
      {orders.map(order => (
        <div key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
          <p>User ID: {order.user_id}</p>
          <p>Bakery ID: {order.bekery_id}</p>
          <p>Total Amount: ${order.totalamount}</p>
          <p>Order Date: {order.orderdate}</p>
          <p>Bakery Name: {order.bekery.bekeryname}</p>
          <p>Payment Method: {order.payment.paymentmethod}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ShowOrder;
