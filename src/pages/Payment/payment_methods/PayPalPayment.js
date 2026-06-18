// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const PayPalPayment = () => {
//   const navigate = useNavigate();
//   const handlePay = ()=>{
//     navigate("/profile");
//   }
//   return (
//     <div>PayPalPayment</div>
//   )
// }

// export default PayPalPayment;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, UserContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import './index.css';

const PayPalPayment = () => {
  const [cartContext] = useContext(CartContext);
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = !isNaN(cartContext.fare * cartContext.seats?.length)
    ? cartContext.fare * cartContext.seats?.length : 0;

  // Convert KES to USD for display (approx rate)
  const usdAmount = (totalAmount / 130).toFixed(2);

  const handlePayPalPay = () => {
    setLoading(true);
    // In production, integrate with PayPal SDK here
    // For now, simulate and redirect to ticket
    setTimeout(() => {
      setLoading(false);
      navigate('/ticket-confirmation');
    }, 2000);
  };

  return (
    <div className="pay">
      <div className="details">
        <h5 className="text-success">🎟 Seat Summary</h5>
        {cartContext.seatsInfo?.map((seat, index) => (
          <div className="div" key={index}>
            <label><strong>Seat:</strong> {seat.seat}</label>
            <label><strong>Name:</strong> {seat.name || 'N/A'}</label>
          </div>
        ))}
        <p><strong>Route:</strong> {cartContext.pickupPoint} → {cartContext.destination}</p>
        <p className="total-fare">
          <strong>Total: Ksh. {totalAmount}</strong>
          <small style={{ color: '#888', marginLeft: 8 }}>(≈ ${usdAmount} USD)</small>
        </p>
      </div>
      <div className="payment">
        <div className="paypal-box">
          <img
            src="/assets/images/payment/paypal.png"
            alt="PayPal"
            style={{ height: 50, objectFit: 'contain', marginBottom: 10 }}
          />
          <p>You will be redirected to PayPal to complete your payment securely.</p>
          <button
            className="btn paypal-btn"
            onClick={handlePayPalPay}
            disabled={loading}
            style={{
              backgroundColor: '#0070ba',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Processing...' : `Pay $${usdAmount} with PayPal`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;
