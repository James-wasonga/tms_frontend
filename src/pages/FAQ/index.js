import React, { useContext, useEffect, useState } from 'react';
import { HeaderFooterContext } from '../../contexts';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import './faq.css';

const faqs = [
  { category: "Booking", q: "How do I book a bus ticket?", a: "Select your departure city and destination, choose a travel date, then click 'Search Tickets'. Pick a bus, select your preferred seat(s), enter passenger details, and complete payment via M-Pesa, PayPal, or card. Your e-ticket is sent instantly." },
  { category: "Booking", q: "Can I book for multiple passengers?", a: "Yes! On the seat selection page, you can select multiple seats. For each seat you'll be prompted to enter the passenger's name and ID number." },
  { category: "Booking", q: "How far in advance can I book?", a: "You can book up to 30 days in advance. Same-day bookings are also supported depending on seat availability." },
  { category: "Payment", q: "What payment methods are accepted?", a: "We accept M-Pesa (STK Push), Visa/Mastercard via Stripe, and PayPal. All payments are encrypted and processed securely." },
  { category: "Payment", q: "Does MoveLink charge any booking fees?", a: "There are no hidden fees. The price displayed is exactly what you pay — it includes the bus fare and our small service charge." },
  { category: "Payment", q: "Can I get a refund if I cancel?", a: "Cancellations made 24+ hours before departure qualify for a full refund. Cancellations within 24 hours may incur a 20% fee. Log in to your profile and go to 'My Bookings' to initiate a cancellation." },
  { category: "Tickets", q: "How do I get my ticket?", a: "After payment, your e-ticket is displayed on screen and emailed to your registered address. You can also access it anytime from your profile under 'My Bookings'." },
  { category: "Tickets", q: "Do I need to print my ticket?", a: "No printing required! Show your digital e-ticket on your phone to the conductor. Make sure your screen is bright enough to scan the QR code." },
  { category: "Travel", q: "What happens if the bus is delayed or cancelled?", a: "In case of operator cancellation, you will receive a full refund within 48 hours. For delays, the operator is required to notify passengers through the platform." },
  { category: "Travel", q: "Can I change my travel date?", a: "Date changes depend on the operator's policy. Some operators allow free changes up to 12 hours before departure. Check your ticket details or contact support." },
  { category: "Account", q: "Do I need an account to book?", a: "An account is required to complete a booking. This ensures your ticket is securely tied to your identity and accessible at any time." },
  { category: "Account", q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page, enter your registered email, and we'll send you a reset code. Enter the code and set a new password." },
];

const categories = ["All", ...Array.from(new Set(faqs.map(f => f.category)))];

const FAQ = () => {
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => { setHeaderFooter(true); window.scrollTo(0, 0); }, []);

  const filtered = faqs.filter(f => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="faq-hero">
        <span className="faq-label">FAQ</span>
        <h1>Frequently Asked <span className="faq-accent">Questions</span></h1>
        <p>Find answers to the most common questions about booking, payments, and travel on MoveLink.</p>
        <div className="faq-search-wrap">
          <FiSearch size={18} className="faq-search-icon" />
          <input placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </section>

      {/* Body */}
      <section className="faq-body">
        {/* Tabs */}
        <div className="faq-cats">
          {categories.map(c => (
            <button key={c} className={`faq-cat-btn${activeCategory === c ? ' active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
          ))}
        </div>

        {/* Accordion */}
        <div className="faq-list">
          {filtered.length === 0 && (
            <div className="faq-empty">
              <p>No questions found for "<strong>{search}</strong>".</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }}>Clear search</button>
            </div>
          )}
          {filtered.map((f, i) => (
            <div className={`faq-item${activeIndex === i ? ' open' : ''}`} key={i}>
              <button className="faq-question" onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                <span className="faq-category-tag">{f.category}</span>
                <span>{f.q}</span>
                <FiChevronDown className="faq-chevron" />
              </button>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Our support team is available 24/7 to assist you.</p>
          <a href="/contact" className="faq-cta-btn">Contact Support →</a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
