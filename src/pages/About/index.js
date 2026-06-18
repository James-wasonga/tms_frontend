import React, { useContext, useEffect } from 'react';
import { HeaderFooterContext } from '../../contexts';
import { FiBus, FiShield, FiUsers, FiZap, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { FaBus, FaRoute, FaAward } from 'react-icons/fa';
import './index.css';

const stats = [
  { icon: <FaRoute size={22}/>, num: "50+", label: "Active Routes" },
  { icon: <FaAward size={22}/>, num: "100+", label: "Bus Operators" },
  { icon: <FiUsers size={22}/>, num: "50K+", label: "Happy Passengers" },
  { icon: <FaBus size={22}/>, num: "500+", label: "Buses Listed" },
];

const values = [
  { icon: <FiShield size={24}/>, title: "Safety First", desc: "All operators are verified. Every vehicle undergoes inspections. Your safety is non-negotiable." },
  { icon: <FiZap size={24}/>, title: "Speed & Reliability", desc: "Instant booking confirmation, real-time seat availability and immediate e-ticket delivery." },
  { icon: <FiUsers size={24}/>, title: "Passenger First", desc: "We built this platform around the traveller — intuitive, accessible and available 24/7." },
  { icon: <FiCheckCircle size={24}/>, title: "Transparency", desc: "No hidden fees. The price you see is the price you pay. Full cancellation and refund policies." },
];

const team = [
  { name: "David Mwangi", role: "CEO & Co-Founder", initials: "DM" },
  { name: "Aisha Hassan", role: "CTO", initials: "AH" },
  { name: "Kevin Ochieng", role: "Head of Operations", initials: "KO" },
  { name: "Grace Wanjiku", role: "Customer Experience", initials: "GW" },
];

const About = () => {
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  useEffect(() => { setHeaderFooter(true); window.scrollTo(0, 0); }, []);

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="page-label">About MoveLink</span>
          <h1>Africa's Smartest <br/><span className="accent">Transport Platform</span></h1>
          <p>We're on a mission to digitize intercity transport in Africa — making every journey safer, faster, and more comfortable for millions of daily travellers.</p>
          <a href="/tickets" className="about-cta-btn">Start Booking <FiArrowRight /></a>
        </div>
        <div className="about-hero-img">
          <div className="hero-img-inner">
            <FaBus size={80} color="#4ade80" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-bar">
        {stats.map((s, i) => (
          <div className="about-stat" key={i}>
            <div className="about-stat-icon">{s.icon}</div>
            <div className="about-stat-num">{s.num}</div>
            <div className="about-stat-lbl">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story-inner">
          <div className="about-story-text">
            <span className="page-label">Our Story</span>
            <h2>Born from the Frustration of Long Queues</h2>
            <p>In 2023, our founders spent hours in a Nairobi bus park trying to buy a last-minute ticket to Mombasa. The process was chaotic — paper tickets, no seat information, and zero transparency on pricing.</p>
            <p>That day, MoveLink was born. We set out to build the platform we wished existed: one where any Kenyan could book a bus seat from their phone in under 60 seconds — and trust that the information was accurate and the seat was actually theirs.</p>
            <p>Today we serve passengers across Kenya and are expanding rapidly into East Africa, partnering with hundreds of verified transport operators.</p>
          </div>
          <div className="about-story-visual">
            <div className="story-card-stack">
              <div className="story-card sc1">
                <span>✓</span> Instant e-tickets
              </div>
              <div className="story-card sc2">
                <span>✓</span> Real-time seat availability
              </div>
              <div className="story-card sc3">
                <span>✓</span> M-Pesa & card payments
              </div>
              <div className="story-card sc4">
                <span>✓</span> 24/7 customer support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-inner">
          <span className="page-label">Our Values</span>
          <h2>What We Stand For</h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="about-team-inner">
          <span className="page-label">The Team</span>
          <h2>People Behind the Platform</h2>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{m.initials}</div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
