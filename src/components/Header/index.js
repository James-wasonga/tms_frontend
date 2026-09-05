import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiUser, FiLogOut, FiHome, FiInfo,
  FiHelpCircle, FiBookOpen, FiPhone, FiLogIn, FiUserPlus, FiTicket
} from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import { HeaderFooterContext, UserContext } from '../../contexts';
import './index.css';

const navLinks = [
  { to: '/', label: 'Home', icon: <FiHome size={17} /> },
  { to: '/about', label: 'About', icon: <FiInfo size={17} /> },
  { to: '/faqs', label: 'FAQs', icon: <FiHelpCircle size={17} /> },
  { to: '/blogs', label: 'Blog', icon: <FiBookOpen size={17} /> },
  { to: '/contact', label: 'Contact', icon: <FiPhone size={17} /> },
];

const Header = () => {
  const [headerFooter] = useContext(HeaderFooterContext);
  const [userData, setUserData] = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem('app_user');
    setUserData({ loggedIn: false, data: {} });
    navigate('/');
  };

  if (!headerFooter) return null;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ── TOP BAR — desktop only ── */}
      <div className="header-topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href="tel:+254710733045" className="topbar-item">
              📞 +254 710 733 045
            </a>
            {/* <span className="topbar-sep" />
            <a href="mailto:support@movelink.co.ke" className="topbar-item">
              ✉ support@movelink.co.ke
            </a> */}
          </div>
          <div className="topbar-right">
            {userData.loggedIn ? (
              <button className="topbar-btn" onClick={() => navigate('/profile')}>
                <FiUser size={13} /> My Account
              </button>
            ) : (
              <>
                <button className="topbar-btn" onClick={() => navigate('/login')}>
                  <FiLogIn size={13} /> Sign In
                </button>
                <span className="topbar-sep" />
                <button className="topbar-btn" onClick={() => navigate('/register')}>
                  <FiUserPlus size={13} /> Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <div className="logo-icon-wrap">
              <FaBus size={17} color="white" />
            </div>
            <span className="logo-text">Move<em>Link</em></span>
          </Link>

          {/* Desktop nav links */}
          <nav className="header-nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="header-actions">
            {userData.loggedIn ? (
              <>
                <button className="header-user-btn" onClick={() => navigate('/profile')}>
                  <div className="user-avatar">
                    {userData.data?.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="user-name">
                    {userData.data?.user?.name?.split(' ')[0] || 'Profile'}
                  </span>
                </button>
                <button className="header-logout-btn" onClick={logout} title="Logout">
                  <FiLogOut size={16} />
                </button>
              </>
            ) : (
              <button className="header-cta-btn" onClick={() => navigate('/tickets')}>
                🎫 Buy a Ticket
              </button>
            )}

            {/* Hamburger — mobile only */}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE SLIDE-OUT MENU ── */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-top">
          <Link to="/" className="header-logo" onClick={() => setMobileOpen(false)}>
            <div className="logo-icon-wrap">
              <FaBus size={17} color="white" />
            </div>
            <span className="logo-text">Move<em>Link</em></span>
          </Link>
          <button className="mobile-close-btn" onClick={() => setMobileOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* User info bar inside mobile menu */}
        {userData.loggedIn && (
          <div className="mobile-user-bar">
            <div className="mobile-user-avatar">
              {userData.data?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="mobile-user-name">{userData.data?.user?.name}</div>
              <div className="mobile-user-email">{userData.data?.user?.email}</div>
            </div>
          </div>
        )}

        <nav className="mobile-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-nav-link${isActive(link.to) ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          {userData.loggedIn ? (
            <>
              <button
                className="mobile-footer-btn primary"
                onClick={() => { navigate('/tickets'); setMobileOpen(false); }}
              >
                🎫 Buy a Ticket
              </button>
              <button
                className="mobile-footer-btn outline"
                onClick={() => { navigate('/profile'); setMobileOpen(false); }}
              >
                <FiUser size={15} /> My Profile
              </button>
              <button className="mobile-footer-btn danger" onClick={logout}>
                <FiLogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-footer-btn primary"
                onClick={() => { navigate('/tickets'); setMobileOpen(false); }}
              >
                🎫 Buy a Ticket
              </button>
              <button
                className="mobile-footer-btn outline"
                onClick={() => { navigate('/login'); setMobileOpen(false); }}
              >
                <FiLogIn size={15} /> Sign In
              </button>
              <button
                className="mobile-footer-btn ghost"
                onClick={() => { navigate('/register'); setMobileOpen(false); }}
              >
                <FiUserPlus size={15} /> Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;