import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderFooterContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import { FiMail, FiLock, FiKey, FiArrowLeft, FiShield, FiZap, FiSmile } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import '../LoginPage/index.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => { setHeaderFooter(false); window.scrollTo(0, 0); }, []);

  const handleSendCode = () => {
    if (!email || !email.includes('@')) { setStatus({ loading: false, error: 'Enter a valid email address.', success: '' }); return; }
    setStatus({ loading: true, error: '', success: '' });
    fetch(DataURLS.userForgotPassword, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(r => r.json())
      .then(res => {
        if (!res.error) { setStatus({ loading: false, error: '', success: 'Reset code sent! Check your email.' }); setTimeout(() => setStep(2), 1200); }
        else { setStatus({ loading: false, error: res.error || 'Email not found.', success: '' }); }
      })
      .catch(() => setStatus({ loading: false, error: 'Connection error. Please try again.', success: '' }));
  };

  const handleReset = () => {
    if (!code) { setStatus({ loading: false, error: 'Enter the reset code.', success: '' }); return; }
    if (newPassword.length < 6) { setStatus({ loading: false, error: 'Password must be at least 6 characters.', success: '' }); return; }
    if (newPassword !== confirmPassword) { setStatus({ loading: false, error: 'Passwords do not match.', success: '' }); return; }
    setStatus({ loading: true, error: '', success: '' });
    fetch(DataURLS.userResetPassword, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, password: newPassword }),
    })
      .then(r => r.json())
      .then(res => {
        if (!res.error) { setStatus({ loading: false, error: '', success: 'Password reset! Redirecting to login...' }); setTimeout(() => navigate('/login'), 2000); }
        else { setStatus({ loading: false, error: res.error || 'Invalid or expired code.', success: '' }); }
      })
      .catch(() => setStatus({ loading: false, error: 'An error occurred.', success: '' }));
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <div className="logo-icon"><FaBus size={20} color="white"/></div>
          <span>Move<em>Link</em></span>
        </Link>
        <div className="auth-left-content">
          <div className="auth-left-badge"><span className="dot"/> Account Recovery</div>
          <h2>Reset Your <span>Password</span></h2>
          <p>Enter your email and we'll send a verification code to help you securely regain access to your account.</p>
        </div>
        <div className="auth-left-features">
          <div className="auth-feature"><div className="auth-feature-icon"><FiShield size={15}/></div>Secure 2-step verification</div>
          <div className="auth-feature"><div className="auth-feature-icon"><FiZap size={15}/></div>Code expires in 15 minutes</div>
          <div className="auth-feature"><div className="auth-feature-icon"><FiSmile size={15}/></div>Your data is always protected</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {[1,2].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: step >= s ? '#16a34a' : '#e2e8f0', transition: 'background 0.3s' }}/>
            ))}
          </div>

          <h1 className="auth-form-title">
            {step === 1 ? 'Forgot Password?' : 'Enter Reset Code'}
          </h1>
          <p className="auth-form-subtitle">
            {step === 1 ? 'Enter your registered email to receive a reset code.' : `We sent a code to ${email}. Enter it below.`}
          </p>

          {status.loading && <div className="auth-loading"><span className="auth-spinner"/><span>{step === 1 ? 'Sending code...' : 'Resetting password...'}</span></div>}
          {status.error && <div className="auth-alert error">⚠ {status.error}</div>}
          {status.success && <div className="auth-alert success">✓ {status.success}</div>}

          {step === 1 ? (
            <>
              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-field-inner">
                  <FiMail size={16} className="field-icon"/>
                  <input type="email" placeholder="you@example.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendCode()}/>
                </div>
              </div>
              <button className="auth-submit-btn" onClick={handleSendCode} disabled={status.loading}>
                {status.loading ? <><span className="auth-spinner"/> Sending...</> : 'Send Reset Code →'}
              </button>
            </>
          ) : (
            <>
              <div className="auth-field">
                <label>Reset Code</label>
                <div className="auth-field-inner">
                  <FiKey size={16} className="field-icon"/>
                  <input type="text" placeholder="Enter 6-digit code" value={code}
                    onChange={e => setCode(e.target.value)} maxLength={8}/>
                </div>
              </div>
              <div className="auth-field">
                <label>New Password</label>
                <div className="auth-field-inner">
                  <FiLock size={16} className="field-icon"/>
                  <input type="password" placeholder="Min 6 characters" value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}/>
                </div>
              </div>
              <div className="auth-field">
                <label>Confirm New Password</label>
                <div className="auth-field-inner">
                  <FiLock size={16} className="field-icon"/>
                  <input type="password" placeholder="Repeat password" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
              </div>
              <button className="auth-submit-btn" onClick={handleReset} disabled={status.loading}>
                {status.loading ? <><span className="auth-spinner"/> Resetting...</> : 'Reset Password →'}
              </button>
              <button onClick={() => { setStep(1); setStatus({loading:false,error:'',success:''}); }}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiArrowLeft size={14}/> Back
              </button>
            </>
          )}

          <p className="auth-switch" style={{ marginTop: 24 }}>
            Remember it? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
