import React, { useContext, useEffect, useState } from 'react';
import { HeaderFooterContext } from '../../contexts';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiClock, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => { setHeaderFooter(true); window.scrollTo(0, 0); }, []);

  const handleSend = () => {
    if (!form.firstName || !form.email || !form.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in your name, email and message.' });
      return;
    }
    setStatus({ loading: true, success: false, error: '' });
    // Simulate send
    setTimeout(() => setStatus({ loading: false, success: true, error: '' }), 1500);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <span className="contact-label">Get in Touch</span>
        <h1>We're Here to <span className="contact-accent">Help You</span></h1>
        <p>Have a question, feedback or need assistance? Our friendly team is ready to help, around the clock.</p>
      </section>

      {/* Cards */}
      <div className="contact-cards">
        <div className="contact-info-card">
          <div className="ci-icon"><FiPhone size={22}/></div>
          <h4>Phone & WhatsApp</h4>
          <p>+254 712 345 678</p>
          <a href="tel:+254712345678">Call now →</a>
        </div>
        <div className="contact-info-card">
          <div className="ci-icon"><FiMail size={22}/></div>
          <h4>Email Support</h4>
          <p>support@movelink.co.ke</p>
          <a href="mailto:support@movelink.co.ke">Send email →</a>
        </div>
        <div className="contact-info-card">
          <div className="ci-icon"><FiMapPin size={22}/></div>
          <h4>Office Location</h4>
          <p>Westlands, Nairobi, Kenya</p>
          <a href="#map">View on map →</a>
        </div>
        <div className="contact-info-card">
          <div className="ci-icon"><FiClock size={22}/></div>
          <h4>Working Hours</h4>
          <p>24/7 — Every day of the year</p>
          <span style={{color:'#16a34a',fontSize:13,fontWeight:600}}>Always available</span>
        </div>
      </div>

      {/* Main */}
      <section className="contact-main">
        {/* Form */}
        <div className="contact-form-wrap">
          <h2>Send Us a Message</h2>
          <p>Fill out the form and our team will get back to you within 24 hours.</p>

          {status.success ? (
            <div className="contact-success">
              <FiCheckCircle size={48} color="#16a34a"/>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => { setStatus({ loading: false, success: false, error: '' }); setForm({ firstName:'',lastName:'',email:'',phone:'',subject:'',message:'' }); }}>Send Another</button>
            </div>
          ) : (
            <div className="contact-form">
              {status.error && <div className="contact-error">{status.error}</div>}
              <div className="form-row">
                <div className="form-field">
                  <label>First Name <span>*</span></label>
                  <input type="text" placeholder="John" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} />
                </div>
                <div className="form-field">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Email Address <span>*</span></label>
                  <input type="email" placeholder="john@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                </div>
              </div>
              <div className="form-field">
                <label>Subject</label>
                <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                  <option value="">Select a topic...</option>
                  <option value="booking">Booking Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="refund">Refund Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label>Message <span>*</span></label>
                <textarea rows={5} placeholder="Describe your issue or question in detail..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
              </div>
              <button className="contact-send-btn" onClick={handleSend} disabled={status.loading}>
                {status.loading ? <span className="spinner" /> : <><FiSend /> Send Message</>}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="contact-sidebar">
          <div className="contact-sidebar-box">
            <h3>Quick Help</h3>
            <div className="quick-links">
              <a href="/faqs">📖 Browse our FAQs</a>
              <a href="/profile">🎫 Check your bookings</a>
              <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer">
                <FaWhatsapp color="#25d366"/> WhatsApp us
              </a>
            </div>
          </div>

          <div className="contact-sidebar-box">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link fb"><FiFacebook size={18}/> Facebook</a>
              <a href="#" className="social-link tw"><FiTwitter size={18}/> Twitter / X</a>
              <a href="#" className="social-link ig"><FiInstagram size={18}/> Instagram</a>
              <a href="https://wa.me/254712345678" className="social-link wa"><FaWhatsapp size={18}/> WhatsApp</a>
            </div>
          </div>

          <div className="contact-sidebar-box contact-map-placeholder" id="map">
            <div className="map-inner">
              <FiMapPin size={32} color="#16a34a"/>
              <p>Westlands Square, Nairobi</p>
              <small>4th Floor, Block C</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
