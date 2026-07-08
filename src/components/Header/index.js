// import React from 'react';
// import {FiLogIn, FiMail, FiMenu, FiMoon, FiMoreVertical, FiUser, FiUserCheck, FiUserPlus, FiX} from "react-icons/fi"
// import "./index.css";
// import { Button, Modal, Toast } from 'react-bootstrap';
// import { HeaderFooterContext, UserContext } from '../../contexts';
// import { useContext } from 'react';
// import { FaChevronDown, FaPhone } from 'react-icons/fa';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import SmallMenu from './SmallMenu';
// import { Link, useNavigate } from 'react-router-dom';
// const Header = ({isDashboard=false,isShown=true}) => {
//     const [userData,setUserData] = useContext(UserContext);
//     const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
//     const [topShown,setTopShown] = useState(true);
//     const [showToast,setshowToast] = useState(false);
//     const [smallMenuShown,setSmallMenuShown] = useState(false);

//     const navigate = useNavigate();
//     useEffect(()=>{
//         window.addEventListener("scroll",(e)=>{
//             console.log(window.innerWidth<600)
//             if(window.innerWidth<600){
//                 setTopShown(false);
//             }
//             else if(window.scrollY>=100 && window.innerWidth>=600 ){
//                 setTopShown(false);
//             }else{
//                 setTopShown(true);
//             }
//         })
//     },[])

//     useEffect(()=>{
//         window.addEventListener("resize",(e)=>{
//             if(window.innerWidth < 600){
//                 setTopShown(false);
//             }else if(window.screenY<100 && window.innerWidth>=600){
//                 setTopShown(true);
//             }

           
//         });
//         if(window.innerWidth < 600){
//                 setTopShown(false);
//             }else if(window.screenY<100 && window.innerWidth>=600){
//                 setTopShown(true);
//             }
//         console.log(window.screenY,window.innerWidth);
//     },[window.innerWidth])
//   return (
//     <div
//     className='header'
//     style={{
//         display:headerFooter?"flex":"none"
//     }}
//     >
//         <div
//         className='header-top'
//         style={{
//             display:topShown?"flex":'none',
//         }}
//         >
//             <div>
//                 <label><FaPhone className='icon' /> +254712345678</label>
//                 <div
//                 style={{
//                     width:1.5,
//                     backgroundColor:"#000000",
//                     height:15
//                 }}
//                 />
//                 <label><FiMail className='icon' /> transport@gmail.com</label>
//             </div>
//             <div>
                
//                 <Button
//                 style={{
//                     border:"none",
//                     display:"flex",
//                     gap:10,
//                     backgroundColor:"transparent"
//                 }}
//                 >
//                     <label style={{
//                         display:"flex",
//                         gap:10,
//                         color:"#000000",
//                         alignItems:"center"
//                     }} > English<FaChevronDown size={15} /></label>
//                 </Button>
                
//                 {
//                             userData.loggedIn?
//                             <Button
//                                 onClick={()=>{
//                                     setSmallMenuShown(false);
//                                     setshowToast(false);
//                                     navigate("/profile")}}
//                                 style={{
//                                 border:"none",
//                                 display:"flex",
//                                 gap:10,
//                                 backgroundColor:"transparent"
//                             }}
//                             >
//                                  <label className='icon' style={{color:"#000000"}}><FiLogIn className='icon' /> Dashboard </label>
//                             </Button>:
//                             <Button
//                             onClick={()=>{
//                                 setSmallMenuShown(false);
//                                 setshowToast(false);
//                                 navigate("/login")}}
//                             style={{
//                                 border:"none",
//                                 display:"flex",
//                                 gap:10,
//                                 backgroundColor:"transparent"
//                             }}
//                             >
//                                 <label className='icon' ><FiLogIn className='icon' /> SignIn </label>
//                                 <label style={{color:"#000000"}} >/</label>
//                                 <label><FiUserPlus className='icon' /> <label style={{color:"#000000"}} >SignUp</label></label>
//                             </Button>
//                         }
//             </div>
            
//             <Modal
//             show={showToast}
//             style={{
//                 padding:0,
//                 margin:0
//             }}
//             onBackdropClick={()=>setshowToast(false)}
//             onHide={()=>setshowToast(false)}
//             >
//                 <Modal.Body
//                 style={{
//                     width:"100%",
//                     margin:0,
//                 }}
//                 >
//                     <div>
//                         <label><FaPhone className='icon' /> +254712345678</label>
//                         <label><FiMail className='icon' /> transport@gmail.com</label>
//                     </div>
//                     <div>

//                         <Button
//                         style={{
//                             border:"none",
//                             display:"flex",
//                             gap:10,
//                             backgroundColor:"transparent"
//                         }}
//                         >
//                             <label style={{
//                                 display:"flex",
//                                 gap:10,
//                                 color:"#000000",
//                                 alignItems:"center"
//                             }} > English<FaChevronDown size={15} /></label>
//                         </Button>
//                         {
//                             userData.loggedIn?
//                             <Button
//                                 onClick={()=>{
//                                     setSmallMenuShown(false);
//                                     setshowToast(false);
//                                     navigate("/profile")}}
//                                 style={{
//                                 border:"none",
//                                 display:"flex",
//                                 gap:10,
//                                 backgroundColor:"transparent"
//                             }}
//                             >
//                                 <label className='icon' style={{color:"#000000"}}>
//                                     <FiLogIn className='icon' /> Dashboard </label>
//                             </Button>:
//                             <Button
//                             onClick={()=>{
//                                 setSmallMenuShown(false);
//                                 setshowToast(false);
//                                 navigate("/login")}}
//                             style={{
//                                 border:"none",
//                                 display:"flex",
//                                 gap:10,
//                                 backgroundColor:"transparent"
//                             }}
//                             >
//                                 <label className='icon' ><FiLogIn className='icon' /> SignIn </label>
//                                 <label style={{color:"#000000"}} >/</label>
//                                 <label><FiUserPlus className='icon' /> <label style={{color:"#000000"}} >SignUp</label></label>
//                             </Button>
//                         }
                        
//                     </div>
//                 </Modal.Body>
//             </Modal>
//             <Toast
//             show={false}
            
//             >
//                 <Toast.Body>
//                     <div>
//                         <Button
//                         style={{
//                             border:"none",
//                             display:"flex",
//                             gap:10,
//                             backgroundColor:"transparent"
//                         }}
//                         >
//                             <label style={{
//                                 display:"flex",
//                                 gap:10,
//                                 color:"#000000",
//                                 alignItems:"center"
//                             }} > English<FaChevronDown size={15} /></label>
//                         </Button>
                        
//                         <Button
//                         style={{
//                             border:"none",
//                             display:"flex",
//                             gap:10,
//                             backgroundColor:"transparent"
//                         }}
//                         >
//                             <label className='icon' ><FiLogIn className='icon' /> SignIn </label>
//                             <label style={{color:"#000000"}} >/</label>
//                             <label><FiUserPlus className='icon' /> <label style={{color:"#000000"}} >SignUp</label></label>
//                         </Button>
//                     </div>
//                 </Toast.Body>
//             </Toast>
//         </div>
//         <div className='header-info' >
//             <Link to='/'
//             className='logo'
//             >
//                 <img
//             src='/assets/images/bus.jpg'
//             />
//             </Link>
//                 <div
//                 className='links'
//                 >
//                     <Link to='/'>Home</Link>
//                     <Link to='/about'>About</Link>
//                     <Link to='/faqs'>FAQs</Link>
//                     <Link to='/blogs'>Blog</Link>
//                     <Link to='/contact'>Contact</Link>
//                 </div>

//             <div
//                 className='buttons'
//                 >
//             {/*<div
//             className='header-buttons'
//             onClick={()=>userData.loggedIn?navigate("/profile":navigate("/login"}
//             >
//                 <FiUser size={25}  />
                
//             </div>*/}
//             <div
//             className='header-buttons'
//             >
//                 {
//                     smallMenuShown?
//                     <FiX size={25} onClick={()=>setSmallMenuShown(false)}/>:
//                     <FiMenu size={25} onClick={()=>setSmallMenuShown(true)} />
//                 }
                
//             </div>
//             <div
//             className='header-buttons'
//             >
//                 <FiMoreVertical size={25} onClick={()=>setshowToast(true)} />
//             </div>
//         </div>

//         <Button className='buy-ticket-button header-btn' onClick={()=>navigate("/tickets")} >Buy a ticket</Button>

//         <SmallMenu smallMenuShown={smallMenuShown} setSmallMenuShown={setSmallMenuShown} />

//         </div>


            
            
        
//     </div>
//   )
// }

// export default Header

// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiInfo, FiHelpCircle, FiBookOpen, FiPhone, FiLogIn, FiUserPlus } from 'react-icons/fi';
// import { FaBus, FaPhone } from 'react-icons/fa';
// import { HeaderFooterContext, UserContext } from '../../contexts';
// import './index.css';

// const navLinks = [
//   { to: '/', label: 'Home', icon: <FiHome size={16}/> },
//   { to: '/about', label: 'About', icon: <FiInfo size={16}/> },
//   { to: '/faqs', label: 'FAQs', icon: <FiHelpCircle size={16}/> },
//   { to: '/blogs', label: 'Blog', icon: <FiBookOpen size={16}/> },
//   { to: '/contact', label: 'Contact', icon: <FiPhone size={16}/> },
// ];

// const Header = () => {
//   const [headerFooter] = useContext(HeaderFooterContext);
//   const [userData, setUserData] = useContext(UserContext);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => { setMobileOpen(false); }, [location.pathname]);

//   const logout = () => {
//     localStorage.removeItem('app_user');
//     setUserData({ loggedIn: false, data: {} });
//     navigate('/');
//   };

//   if (!headerFooter) return null;

//   return (
//     <>
//       <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
//         {/* Top bar */}
//         <div className="header-topbar">
//           <div className="topbar-inner">
//             <div className="topbar-left">
//               <a href="tel:+254712345678" className="topbar-item"><FaPhone size={12}/> +254 710 733045</a>
//               <span className="topbar-divider"/>
//               <a href="mailto:support@movelink.co.ke" className="topbar-item">✉ support@movelink.co.ke</a>
//             </div>
//             <div className="topbar-right">
//               {userData.loggedIn ? (
//                 <button className="topbar-btn" onClick={() => navigate('/profile')}>
//                   <FiUser size={13}/> My Account
//                 </button>
//               ) : (
//                 <>
//                   <button className="topbar-btn" onClick={() => navigate('/login')}><FiLogIn size={13}/> Sign In</button>
//                   <span className="topbar-divider"/>
//                   <button className="topbar-btn" onClick={() => navigate('/register')}><FiUserPlus size={13}/> Sign Up</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main nav */}
//         <div className="header-main">
//           <div className="header-inner">
//             {/* Logo */}
//             <Link to="/" className="header-logo">
//               <div className="logo-icon-wrap"><FaBus size={18} color="white"/></div>
//               <span className="logo-text">Move<em>Link</em></span>
//             </Link>

//             {/* Desktop nav */}
//             <nav className="header-nav">
//               {navLinks.map(link => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Desktop actions */}
//             <div className="header-actions">
//               {userData.loggedIn ? (
//                 <>
//                   <button className="header-user-btn" onClick={() => navigate('/profile')}>
//                     <div className="user-avatar">{userData.data?.user?.name?.[0]?.toUpperCase() || 'U'}</div>
//                     <span>{userData.data?.user?.name?.split(' ')[0] || 'Admin'}</span>
//                   </button>
//                   <button className="header-logout-btn" onClick={logout} title="Logout">
//                     <FiLogOut size={16}/>
//                   </button>
//                 </>
//               ) : (
//                 <button className="header-cta-btn" onClick={() => navigate('/tickets')}>
//                   🎫 Buy a Ticket
//                 </button>
//               )}

//               {/* Hamburger */}
//               <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
//                 {mobileOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile menu overlay */}
//       <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
//         <div className="mobile-menu-inner">
//           <div className="mobile-menu-header">
//             <Link to="/" className="header-logo">
//               <div className="logo-icon-wrap"><FaBus size={16} color="white"/></div>
//               <span className="logo-text">Move<em>Link</em></span>
//             </Link>
//             <button onClick={() => setMobileOpen(false)}><FiX size={22}/></button>
//           </div>
//           <nav className="mobile-nav">
//             {navLinks.map(link => (
//               <Link key={link.to} to={link.to} className={`mobile-nav-link${location.pathname === link.to ? ' active' : ''}`}>
//                 {link.icon} {link.label}
//               </Link>
//             ))}
//           </nav>
//           <div className="mobile-menu-footer">
//             {userData.loggedIn ? (
//               <>
//                 <button className="mobile-action-btn primary" onClick={() => navigate('/profile')}>
//                   <FiUser size={16}/> My Profile
//                 </button>
//                 <button className="mobile-action-btn danger" onClick={logout}>
//                   <FiLogOut size={16}/> Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button className="mobile-action-btn primary" onClick={() => navigate('/tickets')}>🎫 Buy a Ticket</button>
//                 <button className="mobile-action-btn outline" onClick={() => navigate('/login')}>Sign In</button>
//                 <button className="mobile-action-btn ghost" onClick={() => navigate('/register')}>Create Account</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}/>}
//     </>
//   );
// };

// export default Header;

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
            <a href="tel:+254712345678" className="topbar-item">
              📞 +254 712 345 678
            </a>
            <span className="topbar-sep" />
            <a href="mailto:support@movelink.co.ke" className="topbar-item">
              ✉ support@movelink.co.ke
            </a>
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