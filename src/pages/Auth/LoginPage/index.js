import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext, HeaderFooterContext, UserContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import { FiBus, FiEye, FiEyeOff, FiLock, FiMail, FiShield, FiZap, FiSmile } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './index.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useContext(UserContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => { setHeaderFooter(false); window.scrollTo(0, 0); }, []);

  const handleLogin = () => {
    if (!credentials.email) { setStatus({ loading: false, error: 'Please enter your email address.', success: '' }); return; }
    if (!credentials.password) { setStatus({ loading: false, error: 'Please enter your password.', success: '' }); return; }
    setStatus({ loading: true, error: '', success: '' });
    fetch(DataURLS.userSignIn, {
      method: 'POST',
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
      .then(r => r.json())
      .then(response => {
        if (!response.error) {
          const user = response.user ?? {};
          const authData = { loggedIn: true, data: { token: response.token, user } };
          setUserData(authData);
          localStorage.setItem('app_user', JSON.stringify(authData));
          setStatus({ loading: false, error: '', success: 'Login successful! Redirecting...' });
          setTimeout(() => navigate(location.state?.from?.pathname || '/'), 800);
        } else {
          setStatus({ loading: false, error: response.error || 'Invalid credentials. Please try again.', success: '' });
        }
      })
      .catch(() => setStatus({ loading: false, error: 'Connection error. Please try again.', success: '' }));
  };

  return (
    <div className="auth-page">
      {/* Left branding panel */}
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <div className="logo-icon"><FaBus size={20} color="white"/></div>
          <span>Move<em>Link</em></span>
        </Link>
        <div className="auth-left-content">
          <div className="auth-left-badge"><span className="dot"/> Trusted by 50,000+ travellers</div>
          <h2>Your Journey Starts <span>Here</span></h2>
          <p>Sign in to access your bookings, manage your profile, and continue your travel journey with ease.</p>
        </div>
        <div className="auth-left-features">
          <div className="auth-feature"><div className="auth-feature-icon"><FiZap size={15}/></div>Instant e-ticket delivery</div>
          <div className="auth-feature"><div className="auth-feature-icon"><FiShield size={15}/></div>Secure encrypted payments</div>
          <div className="auth-feature"><div className="auth-feature-icon"><FiSmile size={15}/></div>24/7 customer support</div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Welcome back 👋</h1>
          <p className="auth-form-subtitle">Enter your credentials to access your account</p>

          {status.loading && (
            <div className="auth-loading">
              <span className="auth-spinner"/>
              <span>Signing you in...</span>
            </div>
          )}
          {status.error && <div className="auth-alert error">⚠ {status.error}</div>}
          {status.success && <div className="auth-alert success">✓ {status.success}</div>}

          <div className="auth-field">
            <label>Email Address</label>
            <div className="auth-field-inner">
              <FiMail size={16} className="field-icon"/>
              <input type="email" placeholder="you@example.com" value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-field-inner">
              <FiLock size={16} className="field-icon"/>
              <input type={showPw ? 'text' : 'password'} placeholder="Enter your password" className="has-right-btn"
                value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <button className="password-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
              </button>
            </div>
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}/>
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>

          <button className="auth-submit-btn" onClick={handleLogin} disabled={status.loading}>
            {status.loading ? <><span className="auth-spinner"/> Signing in...</> : 'Sign In →'}
          </button>

          <p className="auth-switch">Don't have an account? <Link to="/register">Create one free</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
