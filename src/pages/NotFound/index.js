import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderFooterContext } from '../../contexts';
import { FaBus } from 'react-icons/fa';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import './notfound.css';

const NotFound = () => {
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  useEffect(() => { setHeaderFooter(true); window.scroll(0, 0); }, []);

  return (
    <div className="notfound-page">
      <div className="notfound-inner">
        <div className="notfound-icon"><FaBus size={48} color="#16a34a"/></div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          Looks like this bus route doesn't exist! The page you're looking for may have been moved, deleted, or never existed.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-btn primary"><FiHome size={16}/> Go Home</Link>
          <button className="notfound-btn outline" onClick={() => window.history.back()}>
            <FiArrowLeft size={16}/> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
