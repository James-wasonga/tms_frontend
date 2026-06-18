import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderFooterContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import { FiBus, FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiUser, FiMapPin, FiCheckCircle, FiShield, FiZap, FiSmile } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import '../LoginPage/index.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', location: '', password: '', confirmPassword: '' });
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => { setHeaderFooter(false); window.scrollTo(0, 0); }, []);

  const validate = () => {
    if (!credentials.firstName) return 'First name is required.';
    if (!credentials.email) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) return 'Enter a valid email address.';
    if (!credentials.password || credentials.password.length < 6) return 'Password must be at least 6 characters.';
    if (credentials.password !== credentials.confirmPassword) return 'Passwords do not match.';
    if (!agreed) return 'Please agree to the terms and conditions.';
    return null;
  };

  const handleRegister = () => {
    const err = validate();
    if (err) { setStatus({ loading: false, error: err, success: '' }); return; }
    setStatus({ loading: true, error: '', success: '' });
    fetch(DataURLS.userSignUp, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${credentials.firstName} ${credentials.lastName}`.trim(),
        email: credentials.email,
        phone: credentials.phoneNumber,
        address: credentials.location,
        password: credentials.password,
      }),
    })
      .then(r => r.json())
      .then(response => {
        if (!response.error) {
          setStatus({ loading: false, error: '', success: 'Account created! Redirecting to login...' });
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setStatus({ loading: false, error: response.error || 'Registration failed. Please try again.', success: '' });
        }
      })
      .catch(() => setStatus({ loading: false, error: 'Connection error. Please try again.', success: '' }));
  };

  const field = (label, key, type = 'text', placeholder = '', icon) => (
    <div className="auth-field">
      <label>{label}</label>
      <div className="auth-field-inner">
        {icon && React.cloneElement(icon, { size: 16, className: 'field-icon' })}
        <input type={type} placeholder={placeholder} value={credentials[key]} onChange={e => setCredentials({ ...credentials, [key]: e.target.value })} />
      </div>
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <div className="logo-icon"><FaBus size={20} color="white"/></div>
          <span>Move<em>Link</em></span>
        </Link>
        <div className="auth-left-content">
          <div className="auth-left-badge"><span className="dot"/> Join 50,000+ travellers</div>
          <h2>Start Your <span>Journey</span> Today</h2>
          <p>Create your free account and unlock instant bus booking across 50+ routes in Kenya and beyond.</p>
        </div>
        <div className="auth-left-features">
          <div className="auth-feature"><div className="auth-feature-icon"><FiCheckCircle size={15}/></div>Free account, no credit card required</div>
          <div className="auth-feature"><div className="auth-feature-icon"><FiZap size={15}/></div>Book tickets in under 60 seconds</div>
          <div className="auth-feature"><div className="auth-feature-icon"><FiShield size={15}/></div>Your data is safe and encrypted</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container" style={{ maxWidth: 480 }}>
          <h1 className="auth-form-title">Create your account</h1>
          <p className="auth-form-subtitle">Fill in the details below to get started — it's free!</p>

          {status.loading && <div className="auth-loading"><span className="auth-spinner"/><span>Creating your account...</span></div>}
          {status.error && <div className="auth-alert error">⚠ {status.error}</div>}
          {status.success && <div className="auth-alert success">✓ {status.success}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('First Name *', 'firstName', 'text', 'John', <FiUser/>)}
            {field('Last Name', 'lastName', 'text', 'Trevor', <FiUser/>)}
          </div>
          {field('Email Address *', 'email', 'email', 'you@example.com', <FiMail/>)}
          {field('Phone Number', 'phoneNumber', 'tel', '+254 7XX XXX XXX', <FiPhone/>)}
          {field('City / Location', 'location', 'text', 'Nairobi', <FiMapPin/>)}

          <div className="auth-field">
            <label>Password *</label>
            <div className="auth-field-inner">
              <FiLock size={16} className="field-icon"/>
              <input type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" className="has-right-btn"
                value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })}/>
              <button className="password-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label>Confirm Password *</label>
            <div className="auth-field-inner">
              <FiLock size={16} className="field-icon"/>
              <input type="password" placeholder="Repeat your password"
                value={credentials.confirmPassword} onChange={e => setCredentials({ ...credentials, confirmPassword: e.target.value })}/>
            </div>
          </div>

          <label className="remember-me" style={{ marginBottom: 24 }}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}/>
            <span>I agree to the <Link to="#" style={{color:'#16a34a',textDecoration:'none',fontWeight:600}}>Terms & Conditions</Link> and <Link to="#" style={{color:'#16a34a',textDecoration:'none',fontWeight:600}}>Privacy Policy</Link></span>
          </label>

          <button className="auth-submit-btn" onClick={handleRegister} disabled={status.loading}>
            {status.loading ? <><span className="auth-spinner"/> Creating account...</> : 'Create Account →'}
          </button>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
