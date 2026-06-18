// import React from 'react'
// import { useContext } from 'react';
// import { HeaderFooterContext } from '../../contexts';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import MPesaPayment from './payment_methods/MPesaPayment';
// import PayPalPayment from './payment_methods/PayPalPayment';
// import StripePayment from './payment_methods/StripePayment';
// import { TopBarImage } from '../../components';

// const Pay = () => {
//   const {paymentType} = useParams();
// const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
//   useEffect(()=>{
//     setHeaderFooter(true);
//     window.scroll(0,0);
//   },[])
//   return (
//     <div
//     style={{
//       marginTop:50
//     }}
//     >
//       <TopBarImage/>
//       {
//         paymentType=="m-pesa"?
//         <MPesaPayment/>:
//         paymentType=="paypal"?
//         <PayPalPayment/>:
//         paymentType=="stripe"?
//         <StripePayment/>:<></>
//       }
//     </div>
//   )
// }

// export default Pay;

import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeaderFooterContext, CartContext } from '../../contexts';
import MPesaPayment from './payment_methods/MPesaPayment';
import PayPalPayment from './payment_methods/PayPalPayment';
import StripePayment from './payment_methods/StripePayment';
import { FiArrowLeft } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './pay.css';

const paymentLabels = { 'mpesa': 'M-Pesa', 'paypal': 'PayPal', 'stripe': 'Stripe / Card' };

const Pay = () => {
  const { paymentType } = useParams();
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [cartContext] = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => { setHeaderFooter(true); window.scroll(0, 0); }, []);

  return (
    <div className="pay-page">
      {/* Page header */}
      <div className="pay-page-header">
        <div className="pay-page-header-inner">
          <button className="pay-back-btn" onClick={() => navigate('/payment-gateway')}>
            <FiArrowLeft size={16}/> Back
          </button>
          <div className="pay-page-title">
            <FaBus size={20} color="#16a34a"/>
            <div>
              <h3>{paymentLabels[paymentType] || 'Payment'}</h3>
              <p>{cartContext?.pickupPoint} → {cartContext?.destination}</p>
            </div>
          </div>
          <div className="pay-secure-badge">🔒 Secure Payment</div>
        </div>
      </div>

      {/* Payment component */}
      <div className="pay-page-body">
        {paymentType === 'mpesa' ? <MPesaPayment/> :
         paymentType === 'paypal' ? <PayPalPayment/> :
         paymentType === 'stripe' ? <StripePayment/> :
         <div style={{textAlign:'center',padding:60}}><p>Unknown payment method.</p><button onClick={() => navigate('/payment-gateway')} style={{marginTop:16,background:'#16a34a',color:'white',border:'none',padding:'12px 24px',borderRadius:10,cursor:'pointer'}}>← Go Back</button></div>}
      </div>
    </div>
  );
};

export default Pay;
