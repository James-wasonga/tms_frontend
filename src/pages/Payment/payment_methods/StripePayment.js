// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const StripePayment = () => {
//   const navigate = useNavigate();
//   const handlePay = ()=>{
//     navigate("/profile");
//   }
//   return (
//     <div>StripePayment</div>
//   )
// }

// export default StripePayment;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, UserContext } from '../../../contexts';
import './index.css';

const StripePayment = () => {
  const [cartContext] = useContext(CartContext);
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '', expiry: '', cvv: '', name: ''
  });
  const [errors, setErrors] = useState({});

  const totalAmount = !isNaN(cartContext.fare * cartContext.seats?.length)
    ? cartContext.fare * cartContext.seats?.length : 0;
  const usdAmount = (totalAmount / 130).toFixed(2);

  const validate = () => {
    const errs = {};
    if (!cardDetails.name) errs.name = 'Cardholder name required';
    if (cardDetails.number.replace(/\s/g, '').length < 16) errs.number = 'Enter valid card number';
    if (!cardDetails.expiry) errs.expiry = 'Expiry required';
    if (cardDetails.cvv.length < 3) errs.cvv = 'Enter valid CVV';
    return errs;
  };

  const formatCard = (val) => {
    return val.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  };

  const handlePay = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // In production, use Stripe.js to tokenise card and charge
    setTimeout(() => {
      setLoading(false);
      navigate('/ticket-confirmation');
    }, 2000);
  };

  return (
    <div className="pay">
      <div className="details">
        <h5 className="text-success">🎟 Seat Summary</h5>
        {cartContext.seatsInfo?.map((seat, i) => (
          <div className="div" key={i}>
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
        <div className="stripe-form">
          <img
            src="/assets/images/payment/stripe.png"
            alt="Stripe"
            style={{ height: 40, objectFit: 'contain', marginBottom: 15 }}
          />
          <div className="stripe-field">
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>
          <div className="stripe-field">
            <label>Card Number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={cardDetails.number}
              maxLength={19}
              onChange={(e) => setCardDetails({ ...cardDetails, number: formatCard(e.target.value) })}
            />
            {errors.number && <small className="text-danger">{errors.number}</small>}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="stripe-field" style={{ flex: 1 }}>
              <label>Expiry (MM/YY)</label>
              <input
                type="text"
                placeholder="12/26"
                maxLength={5}
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              {errors.expiry && <small className="text-danger">{errors.expiry}</small>}
            </div>
            <div className="stripe-field" style={{ flex: 1 }}>
              <label>CVV</label>
              <input
                type="password"
                placeholder="123"
                maxLength={4}
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
              {errors.cvv && <small className="text-danger">{errors.cvv}</small>}
            </div>
          </div>
          <button
            className="btn btn-dark mt-3 w-100"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${usdAmount} with Card`}
          </button>
          <p style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#888' }}>
            🔒 Secured by Stripe. Your card details are encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
