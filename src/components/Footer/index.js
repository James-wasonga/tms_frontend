// import { Link } from "react-router-dom";
// import {
//     FaFacebook,
//     FaTwitter,
//     FaWhatsapp,
//     FaInstagram,
//     FaWifi,
//     FaPhone,
//     FaMailBulk
// } from "react-icons/fa";
// import "./index.css";
// import { useContext } from "react";
// import { HeaderFooterContext } from "../../contexts";
// const Footer = ()=>{
//     const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
//     const year = new Date().getFullYear();
//     return(
//         <div className={"footer"}
//         style={{
//             display:headerFooter?"flex":"none"
//         }}
//         >
//             <div className={"links"}>
//                 <div className={"quick-links"}>
//                     <h3>Quick links</h3>
//                     <a className="link" to="/">
//                         Marketplace
//                     </a>
//                     <a className="link" to="/">
//                         Terms & Conditions
//                     </a>
//                     <a className="link" to="/">
//                         Privacy Policy
//                     </a>
//                 </div>

//                 <div className={"quick-links"}>
//                     <h3>Customer Service</h3>
//                     <a className="link" to="/">
//                         Frequently Asked Questions
//                     </a>
//                     <a className="link" to="/">
//                         Buyers guide
//                     </a>
//                     <a className="link" to="/">
//                         Sellers guide
//                     </a>
//                     <a className="link" to="/">
//                         About Us
//                     </a>
//                 </div>

//                 <div className={"quick-links"}>
//                     <h3>Contact us</h3>
//                     <a className="link" to="/">
//                         <FaPhone size={20} fill={"#ffffff"} />
//                         012324267
//                     </a>
//                     <a className="link" to="/">
//                         <FaMailBulk size={20} fill={"#ffffff"} />
//                         info@travel.com
//                     </a>
//                     <a className="link" to="/">
//                         <FaWifi size={20} fill={"#ffffff"} />
//                         Our blog
//                     </a>
//                 </div>

//                 <div className={"quick-links"}>
//                     <h3>Join our newsletter</h3>
//                     <p className="link" >
//                         Access our best deals and tips.
//                     </p>
//                     <div className="subscribe" >
//                         <input placeholder={"Enter email..."} />
//                         <button>Subscribe</button>
//                     </div>
//                 </div>
//             </div>

//             <div className={"divider"}  >
//                 <hr />
//             </div>

            

//             <div className={"social"}>
//                 <p>Copyright @ {year} travel.com. All rights reserved.</p>
//                 <div className={"social-media"}>
//                     <a className="footer-link" to={"https://facebook.com"}>
//                         <FaFacebook size={20} fill={"#ffffff"} />
//                     </a>
//                     <a className="footer-link" to={"https://twitter.com"}>
//                         <FaTwitter size={20} fill={"#ffffff"} />
//                     </a>
//                     <a className="footer-link" to={"https://instagram.com"}>
//                         <FaInstagram size={20} fill={"#ffffff"} />
//                     </a>
//                     <a className="footer-link" to={"https://wa.me.com"}>
//                         <FaWhatsapp size={20} fill={"#ffffff"} />
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Footer;

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaBus } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin, FiArrowRight, FiSend } from 'react-icons/fi';
import { HeaderFooterContext } from '../../contexts';
import './index.css';

const Footer = () => {
  const [headerFooter] = useContext(HeaderFooterContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  if (!headerFooter) return null;

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      {/* CTA Banner */}
      <div className="footer-cta-banner">
        <div className="footer-cta-inner">
          <div>
            <h3>Ready to Travel Smarter?</h3>
            <p>Join 50,000+ passengers already booking with MoveLink.</p>
          </div>
          <Link to="/tickets" className="footer-cta-btn">
            Book a Ticket <FiArrowRight size={16}/>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-inner">
          {/* Brand col */}
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon"><FaBus size={18} color="white"/></div>
              <span>Move<em>Link</em></span>
            </Link>
            <p className="footer-tagline">
              Kenya's most trusted online bus booking platform. Fast, safe and reliable intercity travel.
            </p>
            <div className="footer-contact-list">
              <a href="tel:+254712345678" className="footer-contact-item">
                <FiPhone size={14}/> +254 712 345 678
              </a>
              <a href="mailto:support@movelink.co.ke" className="footer-contact-item">
                <FiMail size={14}/> support@movelink.co.ke
              </a>
              <span className="footer-contact-item">
                <FiMapPin size={14}/> Westlands, Nairobi, Kenya
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tickets">Search Tickets</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Refund Policy</Link></li>
              <li><Link to="#">Operator Guide</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4>Stay Updated</h4>
            <p className="footer-newsletter-text">
              Get exclusive deals, route updates and travel tips in your inbox.
            </p>
            {subscribed ? (
              <div className="footer-subscribed">
                ✓ You're subscribed! Thanks for joining.
              </div>
            ) : (
              <div className="footer-newsletter">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                />
                <button onClick={handleSubscribe}>
                  <FiSend size={16}/>
                </button>
              </div>
            )}
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon fb" aria-label="Facebook"><FaFacebook size={18}/></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon tw" aria-label="Twitter"><FaTwitter size={18}/></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon ig" aria-label="Instagram"><FaInstagram size={18}/></a>
              <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" className="social-icon wa" aria-label="WhatsApp"><FaWhatsapp size={18}/></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {year} MoveLink. All rights reserved. Built with ❤ for Kenyan travellers.</p>
          <div className="footer-bottom-links">
            <Link to="#">Privacy</Link>
            <Link to="#">Terms</Link>
            <Link to="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
