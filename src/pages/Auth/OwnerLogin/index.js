import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderFooterContext, UserContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import { FiEye, FiEyeOff, FiLock, FiMail, FiShield, FiSettings } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import '../LoginPage/index.css';

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [, setUserData] = useContext(UserContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  useEffect(() => { setHeaderFooter(false); window.scrollTo(0, 0); }, []);

  const handleLogin = () => {
    if (!credentials.email.trim()) {
      setStatus({ loading: false, error: 'Please enter your email address.', success: '' });
      return;
    }
    if (!credentials.password) {
      setStatus({ loading: false, error: 'Please enter your password.', success: '' });
      return;
    }

    setStatus({ loading: true, error: '', success: '' });

    fetch(DataURLS.ownerSignIn, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
      }),
    })
      .then(r => r.json())
      .then(response => {
        if (response.error) {
          setStatus({
            loading: false,
            error: response.error || 'Invalid credentials. Please try again.',
            success: '',
          });
        } else {
          const authData = {
            loggedIn: true,
            data: {
              token: response.token,
              user: {
                ...response.owner,
                role: response.owner?.role || 'owner',
              },
            },
          };
          setUserData(authData);
          localStorage.setItem('app_user', JSON.stringify(authData));
          setStatus({ loading: false, error: '', success: 'Login successful! Redirecting...' });
          setTimeout(() => navigate('/create-bus'), 800);
        }
      })
      .catch(() => {
        setStatus({
          loading: false,
          error: 'Connection error. Make sure the backend server is running.',
          success: '',
        });
      });
  };

  return (
    <div className="auth-page">
      {/* Left branding panel */}
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <div className="logo-icon"><FaBus size={20} color="white" /></div>
          <span>Move<em>Lin</em></span>
        </Link>
        <div className="auth-left-content">
          <div className="auth-left-badge">
            <span className="dot" /> Operator & Admin Portal
          </div>
          <h2>Manage Your <span>Fleet</span></h2>
          <p>
            Sign in to the operator dashboard to add buses, manage routes,
            view bookings and track your fleet performance.
          </p>
        </div>
        <div className="auth-left-features">
          <div className="auth-feature">
            <div className="auth-feature-icon"><FaBus size={15} /></div>
            Add and manage buses
          </div>
          <div className="auth-feature">
            <div className="auth-feature-icon"><FiSettings size={15} /></div>
            Manage routes and schedules
          </div>
          <div className="auth-feature">
            <div className="auth-feature-icon"><FiShield size={15} /></div>
            View all bookings and revenue
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <div className="auth-form-container">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fef9c3', border: '1px solid #fde047',
            color: '#854d0e', padding: '6px 14px', borderRadius: 100,
            fontSize: 13, fontWeight: 600, marginBottom: 20,
          }}>
            🔐 Operator / Admin Login
          </div>

          <h1 className="auth-form-title">Welcome back</h1>
          <p className="auth-form-subtitle">
            Sign in with your operator or admin credentials
          </p>

          {status.loading && (
            <div className="auth-loading">
              <span className="auth-spinner" />
              <span>Signing you in...</span>
            </div>
          )}
          {status.error && (
            <div className="auth-alert error">⚠ {status.error}</div>
          )}
          {status.success && (
            <div className="auth-alert success">✓ {status.success}</div>
          )}

          <div className="auth-field">
            <label>Email Address</label>
            <div className="auth-field-inner">
              <FiMail size={16} className="field-icon" />
              <input
                type="email"
                placeholder="admin@example.com"
                value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-field-inner">
              <FiLock size={16} className="field-icon" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter your password"
                className="has-right-btn"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
              <button className="password-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button
            className="auth-submit-btn"
            onClick={handleLogin}
            disabled={status.loading}
            style={{ marginTop: 8 }}
          >
            {status.loading
              ? <><span className="auth-spinner" /> Signing in...</>
              : 'Sign In as Operator →'}
          </button>

          <p className="auth-switch" style={{ marginTop: 24 }}>
            Not an operator? <Link to="/login">Passenger login</Link>
          </p>

          <div style={{
            marginTop: 24, padding: '14px 16px',
            background: '#f8fafc', borderRadius: 10,
            border: '1px solid #f1f5f9', fontSize: 13, color: '#64748b',
          }}>
            <strong>Default admin credentials:</strong><br />
            Email: Your email address <br />
            Password: Your unique Admin password
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
