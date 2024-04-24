import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import imagesrc from '../image/435653988_1489160635355368_1157433814282644680_n.jpg'

function Order() {
  const [bekeryProduct, setBekeryProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null); // Initialize orderDetails state
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    const productData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bekery/showproduct/${id}`);
        setBekeryProduct(response.data);
      } catch (err) {
        console.log('Error loading bakery data:', err);
      }
    };
    productData();
  }, [id]);

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

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/bekery/orderdetail', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      }
    };

    fetchOrderDetail();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
        if (bekeryProduct && orderDetails) {
            let totalPrice = 0;
            orderDetails.forEach(orderDetailItem => {
                const matchingProduct = bekeryProduct.product.find(product => product.product_id === orderDetailItem.product_id);
                if (matchingProduct) {
                    totalPrice += matchingProduct.price * orderDetailItem.quantity;
                }
            });
            setTotalPrice(totalPrice);
        }
    };

    calculateTotalPrice();
}, [bekeryProduct, orderDetails]);

const handleBuyClick = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/bekery/addorder', {
        user_id: user && user.user_id,
        bekery_id: id,
        totalamount: totalPrice 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding order:', error);
    }
};

const handleScanQrCode = () => {

    const qrData = `${id}-${totalPrice}`; 
    setQrCodeData(qrData);

   
    setPaymentMethod("QR Code"); 
};

  return (
    <div>
    <div style={{ display: 'flex' }}>
      {bekeryProduct && (
        <div style={{ display: 'flex', justifyContent: 'space-between',  marginLeft: '40vh', marginTop: '150px' }}>
          <img src={`http://localhost:8000/${bekeryProduct.imagebekery}`} alt={bekeryProduct.bekeryname}
            style={{ width: '200px', height: '200px', background: 'rgb(36,92,116)', padding: '10px', marginBottom: '10px', borderRadius: '10px' }} />
        </div>
      )}
      <div style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px', marginTop: '150px' }}>
        {bekeryProduct && (
          <>
            <h2 style={{ fontSize: '20px' }}>{bekeryProduct.bekeryname}</h2>
            <p style={{ fontSize: '16px' }}>{bekeryProduct.description}</p>
            <ul>
              {bekeryProduct.product.map(product => (
                <li key={product.product_id} style={{  fontSize: '16px' }}>
                  ${product.price * quantity}
                </li>
              ))}
            </ul>
            <div>
      {orderDetails && Array.isArray(orderDetails) && orderDetails.map((orderDetailItem, index) => (
    <div key={index}  >
        <p>Quantity: {orderDetailItem.quantity}</p>
    </div>
))}
      </div>
      <div style={{display:'flex'}}>
      <p>Total Price:</p>
      <p style={{ color: 'red', fontSize: '16px' }}> ${totalPrice}</p>
      </div>
          </>
        )}
      </div>
    </div>
    <div className="flex-none" style={{marginTop:'100px',marginLeft:'50px'}}>
    <div className="menu menu-horizontal px-80 flex">
        <h1>Payment method</h1>
        <h1 className="mx-10" onClick={() => setShowPopup(true)}>Scan Qr Code</h1>
        <h1 className="flex items-center mx-2">Payable on delivery</h1>
    </div>
</div>
<div>
{showPopup && (
    <div className="popup">
        <div style={{width:'400px',height:'400px'}}>
        <img style={{width:'300px',height:'400px',marginLeft:'50px'}} src={imagesrc} alt="รูปภาพ" />
        </div>
        {/* เพิ่มเนื้อหาของ popup ที่นี่ */}
        {/* ตัวอย่าง: ปุ่มปิด popup */}
        <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
        
   
    
)}
 </div>
    <div style={{marginTop:'50px',marginLeft:'350px'}}>
        {address && Array.isArray(address) && address.map((addressItem, index) => (
          <div key={index} style={{marginLeft:'20px'}} >
            <p>Address {addressItem.addressline1}  {addressItem.addressline2}  {addressItem.city}</p>
          </div>
        ))}
        </div>
        <div>
        <Link to="/showorder" onClick={() => handleBuyClick(user)}  className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-28 max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white" style={{ borderRadius: '100px', marginLeft: '120vh',position: 'absolute',top: '54vh',  left: '50px',  }}  >Buy</Link>
        </div>
    </div>
  );
}

export default Order;

