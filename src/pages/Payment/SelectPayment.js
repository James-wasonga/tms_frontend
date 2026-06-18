// import React from 'react';
// import "./selectPayment.css";
// import { useNavigate,useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import { CartContext, HeaderFooterContext, UserContext } from '../../contexts';
// import { Toast } from 'react-bootstrap';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { TopBarImage } from '../../components';

// const SelectPayment = () => {
// const [cartContext,setCartContext] = useContext(CartContext);
// const [userData,setUserData] = useContext(UserContext);

// const [signIn,setSignIn] = useState({
//     error:false,
//     message:""
// });

// const [selectedPayment,setselectedPayment] = useState(null);
// const paymentModes = [
//     {
//         id:1,
//         name:"M-Pesa",
//         image:"/assets/images/payment/mpesa.png"
//     },
//     {
//         id:2,
//         name:"PayPal",
//         image:"/assets/images/payment/paypal.png"
//     },
//     {
//         id:3,
//         name:"Stripe",
//         image:"/assets/images/payment/stripe.png"
//     },
// ];

// const navigate = useNavigate();
// const location = useLocation();
// const handlePay = (paymentType)=>{
//     if(userData.loggedIn){
//         setSignIn({

//             error:false,
//             message:"Successfully booked!"
//         });
//         navigate(`/pay/${paymentType.name.toLowerCase()}`)
//     }else{
//         setSignIn({
//             error:true,
//             message:"Login in first to continue with booking!"
//         });
//         setTimeout(()=>{
//             navigate("/login",{state:{from:location},replace:true});
//         },1000)
        
//     }
// }

// const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
//   useEffect(()=>{
//     setHeaderFooter(true);
//     window.scroll(0,0);
//   },[])
//   return (
//     <>
//    <TopBarImage>
//     <p>{cartContext.pickupPoint}</p>
//           <p>-</p>
//     <p>{cartContext.destination}</p>
//    </TopBarImage>

//       <div
//     className='payments-holder'
//     >
//         <Toast
//         show={signIn.error}
//         onClose={()=>setSignIn({...signIn,error:false})}
//         style={{
//             position:"fixed",
//             top:0,
//             right:0,
//             zIndex:102,
//             backgroundColor:signIn.error?"red":"var(--app-color)"
//         }}
        
//         >
//             <Toast.Header>
//                 Error
//             </Toast.Header>
//             <Toast.Body>
//                 {signIn.message}
//             </Toast.Body>
//         </Toast>
//         <h4 className='text-success' >Select payment method</h4>
//         <div className='payments'>
//             {
//                 paymentModes.map((paymentMode,index)=>{
//                     return(
//                         <div
//                         className='payment'
//                         onClick={()=>handlePay(paymentMode)}
//                         >
//                             <img src={paymentMode.image}/>
//                             <div/>
//                             <p>{paymentMode.name}</p>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     </div>
//     </>
    
//   )
// }

// export default SelectPayment;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext, HeaderFooterContext, UserContext } from '../../contexts';
import { FaCreditCard, FaMobileAlt, FaPaypal } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { TopBarImage } from '../../components';
import './selectPayment.css';

const paymentModes = [
  { id: 1, name: 'M-Pesa', path: 'mpesa', description: 'Pay via M-Pesa STK push', icon: <FaMobileAlt size={26} color="#16a34a"/>, badge: '🇰🇪 Kenya', image: '/assets/images/payment/mpesa.png' },
  { id: 2, name: 'PayPal',  path: 'paypal', description: 'Pay securely with PayPal', icon: <FaPaypal size={26} color="#0070ba"/>, badge: '🌍 International', image: '/assets/images/payment/paypal.png' },
  { id: 3, name: 'Card / Stripe', path: 'stripe', description: 'Visa, Mastercard, Amex', icon: <FaCreditCard size={26} color="#6772e5"/>, badge: '💳 All Cards', image: '/assets/images/payment/stripe.png' },
];

const SelectPayment = () => {
  const [cartContext] = useContext(CartContext);
  const [userData] = useContext(UserContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setHeaderFooter(true); window.scroll(0, 0); }, []);

  const totalAmount = !isNaN(cartContext.fare * cartContext.seats?.length)
    ? cartContext.fare * (cartContext.seats?.length || 0) : 0;

  const handleSelect = (pm) => {
    if (!userData.loggedIn) {
      setError('Please sign in to continue with payment.');
      setTimeout(() => navigate('/login', { state: { from: location }, replace: true }), 1500);
      return;
    }
    navigate(`/pay/${pm.path}`);
  };

  return (
    <div className="payments-page">
      <TopBarImage>
        <span>💳 Select Payment</span>
      </TopBarImage>

      <div className="payments-holder">
        {error && (
          <div style={{ display:'flex',alignItems:'center',gap:8, background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:'12px 16px', borderRadius:10, marginBottom:20, width:'100%', fontSize:14 }}>
            <FiAlertCircle size={16}/> {error}
          </div>
        )}

        <div className="payment-summary-box">
          <div>
            <h5>Order Summary</h5>
            <p>{cartContext.seats?.length || 0} seat(s) · {cartContext.pickupPoint || '—'} → {cartContext.destination || '—'}</p>
          </div>
          <h4>Ksh {totalAmount.toLocaleString()}</h4>
        </div>

        <h3 className="payment-section-title">Choose a Payment Method</h3>

        <div className="payments">
          {paymentModes.map(pm => (
            <div className="payment-option" key={pm.id} onClick={() => handleSelect(pm)}>
              {pm.icon}
              <img src={pm.image} alt={pm.name} onError={e => { e.target.style.display='none'; }}/>
              <p>{pm.name}</p>
              <span className="payment-badge">{pm.badge}</span>
            </div>
          ))}
        </div>

        <p className="security-note">🔒 All transactions are encrypted and processed securely.</p>
      </div>
    </div>
  );
};

export default SelectPayment;
