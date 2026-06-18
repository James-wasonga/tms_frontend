import React, { useContext, useEffect, useState } from 'react';
import { HeaderFooterContext } from '../../contexts';
import { FiCalendar, FiArrowRight, FiSearch, FiClock } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './blogs.css';

const allBlogs = [
  { title: "Fast Ticket Issuance with MoveLink", date: "12 Dec 2023", tag: "Tech", readTime: "3 min", image: "", description: "With our automated system, your ticket gets generated instantly after payment. No queues, no waiting — just a QR code on your phone." },
  { title: "5 Tips for Comfortable Long Distance Travel", date: "08 Jan 2024", tag: "Travel", readTime: "5 min", image: "", description: "Pack light, book an aisle seat, and make sure your bus has charging ports. Here's how to travel smarter on Kenya's intercity routes." },
  { title: "Why M-Pesa is the Safest Way to Book Transport", date: "15 Feb 2024", tag: "Finance", readTime: "4 min", image: "", description: "M-Pesa payments are instant, traceable and reversible. Here's why we made it our primary payment method and how it protects you." },
  { title: "The Ultimate Guide to Nairobi to Mombasa Buses", date: "20 Mar 2024", tag: "Guide", readTime: "8 min", image: "", description: "Distance, travel time, best operators, what to expect onboard, and how to get the best price — everything in one guide." },
  { title: "How to Cancel and Get a Refund on MoveLink", date: "05 Apr 2024", tag: "Help", readTime: "3 min", image: "", description: "Plans changed? Here's a step-by-step walkthrough of how to cancel your ticket and receive a full or partial refund." },
  { title: "New Routes: Now Serving Western Kenya", date: "01 May 2024", tag: "News", readTime: "2 min", image: "", description: "We've partnered with 12 new operators to bring reliable booking to Kisumu, Eldoret, Kakamega and surrounding areas." },
];

const tagColors = {
  Tech: { bg: '#eff6ff', color: '#1d4ed8' },
  Travel: { bg: '#f0fdf4', color: '#16a34a' },
  Finance: { bg: '#fffbeb', color: '#d97706' },
  Guide: { bg: '#fdf4ff', color: '#a21caf' },
  Help: { bg: '#fff1f2', color: '#e11d48' },
  News: { bg: '#ecfdf5', color: '#059669' },
};

const Blogs = ({ marginTop = 10, isShown = true }) => {
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  useEffect(() => { if (isShown) { setHeaderFooter(true); window.scrollTo(0, 0); } }, []);

  const tags = ['All', ...Array.from(new Set(allBlogs.map(b => b.tag)))];
  const filtered = allBlogs.filter(b => {
    const matchTag = activeTag === 'All' || b.tag === activeTag;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="blogs-page">
      {isShown && (
        <section className="blogs-hero">
          <span className="blogs-label">Our Blog</span>
          <h1>Travel <span className="blogs-accent">Insights</span> & News</h1>
          <p>Tips, guides and updates to help you travel smarter across Kenya and East Africa.</p>
          <div className="blogs-search-wrap">
            <FiSearch size={18} className="blogs-search-icon"/>
            <input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
        </section>
      )}

      <div className="blogs-body" style={{ marginTop }}>
        {isShown && (
          <div className="blogs-tags">
            {tags.map(t => (
              <button key={t} className={`blogs-tag-btn${activeTag === t ? ' active' : ''}`} onClick={() => setActiveTag(t)}>{t}</button>
            ))}
          </div>
        )}

        <div className="blogs-grid">
          {filtered.map((b, i) => (
            <article className="blog-article" key={i}>
              <div className="blog-cover">
                {b.image
                  ? <img src={b.image} alt={b.title}/>
                  : <div className="blog-cover-placeholder"><FaBus size={40} color="rgba(22,163,74,0.5)"/></div>}
                <span className="blog-tag-badge" style={tagColors[b.tag]}>{b.tag}</span>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span><FiCalendar size={12}/> {b.date}</span>
                  <span><FiClock size={12}/> {b.readTime} read</span>
                </div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
                <a href="#" className="blog-read-more">Read more <FiArrowRight size={14}/></a>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="blogs-empty">
              <p>No articles found for "<strong>{search}</strong>".</p>
              <button onClick={() => { setSearch(''); setActiveTag('All'); }}>Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
