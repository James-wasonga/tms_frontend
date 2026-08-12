// src/hooks/useAutoLogout.js
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts'; // Adjust import path if needed

const INACTIVITY_LIMIT_MS = 20 * 60 * 1000; // 20 minutes

export const useAutoLogout = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    // Only run when user is logged in
    if (!userData?.loggedIn) return;

    // Update timestamp on user interaction
    const updateActivity = () => {
      lastActivity.current = Date.now();
    };

    // User activity events to monitor
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => 
      window.addEventListener(event, updateActivity, { passive: true })
    );

    // Check inactivity every 10 seconds
    const checkInterval = setInterval(() => {
      const timePassed = Date.now() - lastActivity.current;
      if (timePassed >= INACTIVITY_LIMIT_MS) {
        // Perform logout
        localStorage.removeItem('app_user');
        setUserData({ loggedIn: false, data: {} });
        alert('You have been logged out due to 20 minutes of inactivity.');
        navigate('/login');
      }
    }, 10000);

    // Cleanup listeners and interval on unmount or logout
    return () => {
      clearInterval(checkInterval);
      events.forEach(event => 
        window.removeEventListener(event, updateActivity)
      );
    };
  }, [userData?.loggedIn, setUserData, navigate]);
};