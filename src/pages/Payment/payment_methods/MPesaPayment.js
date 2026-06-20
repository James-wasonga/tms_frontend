import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, UserContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import { FiPhone, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './index.css';

const MPesaPayment = () => {
  const [cartContext] = useContext(CartContext);
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const [phone, setPhone] = useState(userData?.data?.user?.phone || '');
  const [step, setStep] = useState('form'); // form | waiting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(60);
  const pollRef = useRef(null);
  const countdownRef = useRef(null);

  const totalAmount = (cartContext.fare || 0) * (cartContext.seats?.length || 0);

  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, '');
    if (digits.startsWith('254') && digits.length === 12) return digits;
    if (digits.startsWith('0') && digits.length === 10) return '254' + digits.slice(1);
    if (digits.startsWith('7') && digits.length === 9) return '254' + digits;
    return null;
  };

  const stopPolling = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const saveBooking = (paymentRef) => {
    const bookingData = {
      busSlug: cartContext.busSlug,
      seats: cartContext.seats,
      seatsInfo: cartContext.seatsInfo,
      from: cartContext.pickupPoint,
      to: cartContext.destination,
      date: cartContext.date,
      amount: totalAmount,
      paymentType: 'M_PESA',
      paymentRef,
      phone,
    };
    fetch(DataURLS.createBooking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.data?.token}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then(r => r.json())
      .then(() => {
        setStep('success');
        setTimeout(() => navigate('/ticket-confirmation'), 2000);
      })
      .catch(() => {
        setStep('success');
        setTimeout(() => navigate('/ticket-confirmation'), 2000);
      });
  };

  // ── Poll Safaricom for the REAL result of the STK push ──
  const pollPaymentStatus = (checkoutRequestId) => {
    let attempts = 0;
    const maxAttempts = 20; // ~60 seconds at 3s intervals

    pollRef.current = setInterval(() => {
      attempts += 1;

      fetch(`${DataURLS.mpesaStatus}/${checkoutRequestId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${userData?.data?.token}` },
      })
        .then(r => r.json())
        .then(res => {
          // ResultCode 0 = success, anything else (once present) = failed/cancelled
          if (res.ResultCode === '0' || res.ResultCode === 0) {
            stopPolling();
            saveBooking(checkoutRequestId);
          } else if (res.ResultCode !== undefined && res.ResultCode !== null) {
            // Safaricom has a final result and it's NOT success
            stopPolling();
            setStep('error');
            setErrorMsg(
              res.ResultDesc === 'No response from user.'
                ? 'You did not enter your M-Pesa PIN in time. Please try again.'
                : (res.ResultDesc || 'Payment was not completed.')
            );
          }
          // If ResultCode is missing entirely, Safaricom hasn't processed it yet — keep polling
        })
        .catch(() => {
          // Query failed (e.g. still processing) — keep polling, don't fail immediately
        });

      if (attempts >= maxAttempts) {
        stopPolling();
        setStep('error');
        setErrorMsg('Payment timed out. Please try again.');
      }
    }, 3000); // check every 3 seconds
  };

  const handlePay = () => {
    const formatted = formatPhone(phone);
    if (!formatted) {
      setErrorMsg('Please enter a valid Safaricom M-Pesa number (e.g. 0712345678).');
      return;
    }
    setErrorMsg('');
    setStep('waiting');

    let secs = 60;
    setCountdown(60);
    countdownRef.current = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) clearInterval(countdownRef.current);
    }, 1000);

    fetch(DataURLS.mpesaSTK, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.data?.token}`,
      },
      body: JSON.stringify({
        phone: formatted,
        amount: totalAmount,
        busName: cartContext.bus,
        from: cartContext.pickupPoint,
        to: cartContext.destination,
      }),
    })
      .then(r => r.json())
      .then(res => {
        if (res.ResponseCode === '0' && res.CheckoutRequestID) {
          // STK push accepted — now POLL for the real result, don't assume success
          pollPaymentStatus(res.CheckoutRequestID);
        } else {
          stopPolling();
          setStep('error');
          setErrorMsg(res.errorMessage || res.error || 'M-Pesa request failed. Please try again.');
        }
      })
      .catch(() => {
        stopPolling();
        setStep('error');
        setErrorMsg('Could not reach payment server. Please check your connection and try again.');
      });
  };

  const handleCancel = () => {
    stopPolling();
    setStep('form');
    setErrorMsg('');
  };

  return (
    <div className="pay">
      {/* Booking details */}
      <div className="details">
        <h5><FaBus size={16} style={{ marginRight: 8, color: '#16a34a' }} />Booking Summary</h5>
        {(cartContext.seatsInfo || []).map((s, i) => (
          <div className="div" key={i}>
            <label><strong>Seat {s.seat}</strong> — {s.name || 'Passenger'}</label>
            <label>Ksh {Number(cartContext.fare || 0).toLocaleString()}</label>
          </div>
        ))}
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
          <p><strong>Route:</strong> {cartContext.pickupPoint} → {cartContext.destination}</p>
          <p className="total-fare">
            Total: <strong>Ksh {totalAmount.toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <div className="payment">
        {step === 'form' && (
          <>
            <div className="payment-instruction">
              <h5>💚 Pay with M-Pesa</h5>
              <p>Enter your Safaricom number. An STK push will be sent to your phone — enter your M-Pesa PIN to confirm.</p>
            </div>
            {errorMsg && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 10, marginBottom: 12, fontSize: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
                <FiAlertCircle size={16} /> {errorMsg}
              </div>
            )}
            <div className="user-data">
              <label><FiPhone size={14} /> M-Pesa Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. 0712 345 678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePay()}
              />
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 12px' }}>
                Accepted formats: 07XXXXXXXX · 254XXXXXXXXX
              </p>
              <button
                onClick={handlePay}
                style={{
                  width: '100%', background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                  color: 'white', border: 'none', height: 52, borderRadius: 12,
                  fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'DM Sans,sans-serif',
                }}
              >
                Send STK Push — Ksh {totalAmount.toLocaleString()}
              </button>
              <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 12 }}>
                🔒 Payments secured by Safaricom M-Pesa Daraja API
              </p>
            </div>
          </>
        )}

        {step === 'waiting' && (
          <div style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>📱</div>
            <h4 style={{ color: '#0f172a', marginBottom: 8 }}>Check Your Phone!</h4>
            <p style={{ color: '#64748b', marginBottom: 20 }}>
              An M-Pesa prompt has been sent to <strong>{phone}</strong>.<br />
              Enter your <strong>M-Pesa PIN</strong> to complete the payment.
            </p>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: countdown > 20 ? '#f0fdf4' : '#fef9c3',
              border: `4px solid ${countdown > 20 ? '#16a34a' : '#f59e0b'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', flexDirection: 'column',
            }}>
              <FiClock size={20} color={countdown > 20 ? '#16a34a' : '#d97706'} />
              <strong style={{ fontSize: 18, color: countdown > 20 ? '#16a34a' : '#d97706' }}>
                {countdown}s
              </strong>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>
              Confirming with Safaricom... checking every few seconds
            </p>
            <button
              onClick={handleCancel}
              style={{
                marginTop: 16, background: 'none', border: '1.5px solid #e2e8f0',
                padding: '10px 24px', borderRadius: 10, cursor: 'pointer',
                color: '#64748b', fontFamily: 'DM Sans,sans-serif',
              }}
            >
              ← Cancel & Try Again
            </button>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <FiCheckCircle size={64} color="#16a34a" />
            <h4 style={{ color: '#0f172a', marginTop: 16, marginBottom: 8 }}>Payment Confirmed!</h4>
            <p style={{ color: '#64748b' }}>
              Ksh {totalAmount.toLocaleString()} received via M-Pesa.<br />
              Redirecting to your e-ticket...
            </p>
          </div>
        )}

        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: '30px 20px' }}>
            <FiAlertCircle size={48} color="#dc2626" />
            <h4 style={{ color: '#0f172a', marginTop: 16, marginBottom: 8 }}>Payment Failed</h4>
            <p style={{ color: '#64748b', marginBottom: 20 }}>{errorMsg}</p>
            <button
              onClick={handleCancel}
              style={{
                background: '#16a34a', color: 'white', border: 'none',
                padding: '12px 32px', borderRadius: 12, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'DM Sans,sans-serif',
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MPesaPayment;