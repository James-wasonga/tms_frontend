import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, HeaderFooterContext } from '../../contexts';
import { useGet } from '../../hooks';
import { DataURLS } from '../../utils/DataURLS';
import { 
  FiUser, FiCalendar, FiMapPin, FiLogOut, FiEdit2, 
  FiLock, FiList, FiGrid, FiTrash2, FiEye, FiEyeOff, 
  FiCheckCircle, FiXCircle, FiRefreshCw, FiPhone, FiMail 
} from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './profile.css';

const tabs = [
  { id: 0, label: 'Dashboard', icon: <FiGrid size={16}/> },
  { id: 1, label: 'My Bookings', icon: <FiList size={16}/> },
  { id: 2, label: 'Edit Profile', icon: <FiEdit2 size={16}/> },
  { id: 3, label: 'Change Password', icon: <FiLock size={16}/> },
];

const Profile = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [activeTab, setActiveTab] = useState(0);
  const [refreshBookings, setRefreshBookings] = useState(0);
  const navigate = useNavigate();

  // Redirect if unauthenticated
  useEffect(() => {
    setHeaderFooter(true);
    window.scrollTo(0, 0);
    if (!userData?.loggedIn) {
      navigate('/login');
    }
  }, [userData, navigate, setHeaderFooter]);

  const token = userData?.data?.token;
  const user = userData?.data?.user || {};

  // Fetch user bookings with manual/interval trigger
  const bookings = useGet({
    url: DataURLS.userBookings,
    options: { 
      method: 'GET', 
      headers: { Authorization: `Bearer ${token}` } 
    },
    dependecies: [token, refreshBookings],
  });

  // Auto-refresh live bookings every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (userData?.loggedIn && token) {
        setRefreshBookings(prev => prev + 1);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [userData, token]);

  const triggerRefresh = useCallback(() => {
    setRefreshBookings(prev => prev + 1);
  }, []);

  const logout = () => {
    localStorage.removeItem('app_user');
    setUserData({ loggedIn: false, data: {} });
    navigate('/login');
  };

  if (!userData?.loggedIn) return null;

  return (
    <div className="profile-page">
      {/* Profile Hero Header */}
      <div className="profile-hero">
        <div className="profile-hero-inner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              {user?.name?.[0]?.toUpperCase() || <FiUser />}
            </div>
          </div>
          <div className="profile-hero-info">
            <h2>{user?.name || 'Passenger'}</h2>
            <p><FiMail size={13} style={{ marginRight: 4 }}/> {user?.email || 'No email registered'}</p>
            {user?.phone && <span className="profile-phone"><FiPhone size={12}/> {user.phone}</span>}
          </div>
          <button className="profile-logout-btn" onClick={logout}>
            <FiLogOut size={16}/> Logout
          </button>
        </div>
      </div>

      <div className="profile-body">
        {/* Navigation Sidebar */}
        <aside className="profile-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`profile-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <button className="profile-tab danger" onClick={logout}>
            <FiLogOut size={16}/> Logout
          </button>
        </aside>

        {/* Tab Content Area */}
        <main className="profile-content">
          {activeTab === 0 && (
            <Dashboard 
              bookings={bookings} 
              user={user} 
              onNavigateBookings={() => setActiveTab(1)} 
            />
          )}
          {activeTab === 1 && (
            <Bookings 
              bookings={bookings} 
              token={token} 
              onRefresh={triggerRefresh} 
            />
          )}
          {activeTab === 2 && (
            <EditProfile 
              user={user} 
              token={token} 
              setUserData={setUserData} 
              userData={userData} 
            />
          )}
          {activeTab === 3 && (
            <ChangePassword 
              token={token} 
              userId={user?._id || user?.id} 
              onLogout={logout} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

/* ── Dashboard Tab ────────────────────────────────────────── */
const Dashboard = ({ bookings, user, onNavigateBookings }) => {
  const list = bookings?.results || [];
  const active = list.filter(b => !b.canceled && !b.cancelled).length;
  const canceled = list.filter(b => b.canceled || b.cancelled).length;
  const total = list.length;

  return (
    <div className="dashboard">
      <h3 className="section-heading">Welcome back, {user?.name?.split(' ')[0] || 'Passenger'} 👋</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><FaBus size={20}/></div>
          <div className="stat-num">{total}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FiCheckCircle size={20}/></div>
          <div className="stat-num">{active}</div>
          <div className="stat-label">Active Tickets</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><FiXCircle size={20}/></div>
          <div className="stat-num">{canceled}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      {/* Traveler Personal Info */}
      <div className="profile-info-card">
        <h4>Account Overview</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <span className="info-val">{user?.name || '—'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email Address</span>
            <span className="info-val">{user?.email || '—'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone Number</span>
            <span className="info-val">{user?.phone || '—'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">City / Address</span>
            <span className="info-val">{user?.address || '—'}</span>
          </div>
        </div>
      </div>

      {/* Live Recent Bookings Preview */}
      <div className="profile-info-card">
        <div className="card-header-flex">
          <h4>Recent Travel Activity</h4>
          {total > 0 && (
            <button className="view-all-link" onClick={onNavigateBookings}>
              View All ({total}) →
            </button>
          )}
        </div>
        {total === 0 ? (
          <p className="no-data-text">No active bookings found. Book your next bus trip today!</p>
        ) : (
          <div className="recent-bookings">
            {list.slice(0, 3).map((b, i) => {
              const isCancelled = b.canceled || b.cancelled;
              return (
                <div className="recent-booking-item" key={b._id || i}>
                  <div className="booking-route-icon">
                    <FaBus size={16} color={isCancelled ? '#94a3b8' : '#16a34a'}/>
                  </div>
                  <div className="booking-route-info">
                    <strong>{b.from || b.pickupPoint || 'Origin'} → {b.to || b.destination || 'Destination'}</strong>
                    <span>{b.paymentType || 'M-PESA'} · Ksh {Number(b.amount || b.fare || 0).toLocaleString()}</span>
                  </div>
                  <span className={`booking-badge ${isCancelled ? 'canceled' : 'active'}`}>
                    {isCancelled ? 'Cancelled' : 'Active'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Live Bookings Tab ────────────────────────────────────── */
const Bookings = ({ bookings, token, onRefresh }) => {
  const [cancellingId, setCancellingId] = useState(null);
  const [actionError, setActionError] = useState('');

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;
    
    setCancellingId(id);
    setActionError('');

    try {
      const response = await fetch(`${DataURLS.deleteBooking}${id}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`, 
          Accept: 'application/json', 
          'Content-Type': 'application/json' 
        },
      });

      const res = await response.json();
      if (response.ok && !res.error) {
        onRefresh();
      } else {
        setActionError(res.error || 'Failed to cancel booking. Please try again.');
      }
    } catch (err) {
      setActionError('Network error occurred while cancelling.');
    } finally {
      setCancellingId(null);
    }
  };

  const list = bookings?.results || [];

  return (
    <div className="bookings-section">
      <div className="section-header-flex">
        <h3 className="section-heading">My Bookings ({list.length})</h3>
        <button className="refresh-btn" onClick={onRefresh} disabled={bookings.loading}>
          <FiRefreshCw size={14} className={bookings.loading ? 'spin-icon' : ''}/>
          {bookings.loading ? 'Refreshing...' : 'Live Sync'}
        </button>
      </div>

      {actionError && <div className="profile-alert error">⚠ {actionError}</div>}

      {bookings.loading && !list.length ? (
        <div className="profile-loading">
          <div className="profile-spinner"/>
          <p>Fetching your live bookings...</p>
        </div>
      ) : bookings.error ? (
        <div className="profile-empty">
          <FiXCircle size={40} color="#f87171"/>
          <h4>Could Not Load Bookings</h4>
          <p>Please check your internet connection and try refreshing.</p>
          <button className="profile-empty-btn" onClick={onRefresh}>Try Again</button>
        </div>
      ) : !list.length ? (
        <div className="profile-empty">
          <FaBus size={48} color="#cbd5e1"/>
          <h4>No Bookings Found</h4>
          <p>You haven't booked any tickets yet.</p>
          <a href="/search/all/all/0" className="profile-empty-btn">Search &amp; Book Buses</a>
        </div>
      ) : (
        <div className="bookings-list">
          {list.map((b, i) => {
            const isCancelled = b.canceled || b.cancelled;
            const bookingId = b._id || b.id;

            return (
              <div className={`booking-card ${isCancelled ? 'canceled' : ''}`} key={bookingId || i}>
                <div className="booking-card-left">
                  <div className="booking-bus-icon">
                    <FaBus size={20} color={isCancelled ? '#94a3b8' : '#16a34a'}/>
                  </div>
                  <div className="booking-info">
                    <strong className="booking-route">
                      {b.from || b.pickupPoint || 'Origin'} → {b.to || b.destination || 'Destination'}
                    </strong>
                    <div className="booking-meta">
                      {(b.company || b.busName || b.bus) && (
                        <span>🚌 {b.company || b.busName || b.bus}</span>
                      )}
                      {(b.date || b.journeyDate) && (
                        <span>
                          <FiCalendar size={12}/> {new Date(b.date || b.journeyDate).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      {b.seatNumber && <span>💺 Seat {b.seatNumber}</span>}
                      <span>💳 {b.paymentType || 'M-PESA'}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-card-right">
                  <div className="booking-amount">
                    Ksh {Number(b.amount || b.fare || 0).toLocaleString()}
                  </div>
                  <span className={`booking-badge ${isCancelled ? 'canceled' : 'active'}`}>
                    {isCancelled ? '✕ Cancelled' : '✓ Active'}
                  </span>
                  {!isCancelled && bookingId && (
                    <button 
                      className="booking-cancel-btn" 
                      onClick={() => handleCancel(bookingId)}
                      disabled={cancellingId === bookingId}
                    >
                      <FiTrash2 size={13}/> {cancellingId === bookingId ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ── Edit Profile Tab ─────────────────────────────────────── */
const EditProfile = ({ user, token, setUserData, userData }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  // Sync state if user context updates externally
  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus({ loading: false, success: '', error: 'Name and Email are required.' });
      return;
    }

    setStatus({ loading: true, success: '', error: '' });

    try {
      const response = await fetch(DataURLS.editProfile, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`, 
          Accept: 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ ...form, userid: user?._id || user?.id }),
      });

      const res = await response.json();

      if (response.ok && !res.error) {
        // Construct updated state object
        const updatedUser = { ...user, ...form };
        const updatedContext = {
          ...userData,
          data: {
            ...userData.data,
            user: updatedUser
          }
        };

        // Save locally and globally so changes stick across sessions
        setUserData(updatedContext);
        localStorage.setItem('app_user', JSON.stringify(updatedContext));

        setStatus({ 
          loading: false, 
          success: 'Profile details updated successfully!', 
          error: '' 
        });
      } else {
        setStatus({ loading: false, success: '', error: res.error || 'Update failed. Try again.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: '', error: 'Network connection failed.' });
    }
  };

  return (
    <div className="edit-section">
      <h3 className="section-heading">Edit Profile</h3>
      
      {status.success && <div className="profile-alert success">✓ {status.success}</div>}
      {status.error && <div className="profile-alert error">⚠ {status.error}</div>}

      <form className="edit-form" onSubmit={handleUpdate}>
        <div className="edit-form-row">
          <div className="edit-field">
            <label>Full Name *</label>
            <input 
              type="text" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
              placeholder="e.g. John Doe" 
              required
            />
          </div>
          <div className="edit-field">
            <label>Email Address *</label>
            <input 
              type="email" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              placeholder="e.g. john@example.com" 
              required
            />
          </div>
        </div>

        <div className="edit-form-row">
          <div className="edit-field">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={form.phone} 
              onChange={e => setForm({ ...form, phone: e.target.value })} 
              placeholder="+254 7XX XXX XXX"
            />
          </div>
          <div className="edit-field">
            <label>City / Location</label>
            <input 
              type="text" 
              value={form.address} 
              onChange={e => setForm({ ...form, address: e.target.value })} 
              placeholder="e.g. Nairobi, Kenya"
            />
          </div>
        </div>

        <button type="submit" className="profile-save-btn" disabled={status.loading}>
          {status.loading ? 'Saving Changes...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
};

/* ── Change Password Tab ──────────────────────────────────── */
const ChangePassword = ({ token, userId, onLogout }) => {
  const [form, setForm] = useState({ old_password: '', new_password: '', confirm: '' });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!form.old_password) {
      setStatus({ loading: false, error: 'Please enter your current password.', success: '' });
      return;
    }
    if (form.new_password.length < 6) {
      setStatus({ loading: false, error: 'New password must be at least 6 characters long.', success: '' });
      return;
    }
    if (form.new_password !== form.confirm) {
      setStatus({ loading: false, error: 'New passwords do not match.', success: '' });
      return;
    }

    setStatus({ loading: true, success: '', error: '' });

    try {
      const response = await fetch(DataURLS.editPassword, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`, 
          Accept: 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          old_password: form.old_password, 
          new_password: form.new_password, 
          userid: userId 
        }),
      });

      const res = await response.json();

      if (response.ok && !res.error) {
        setStatus({ 
          loading: false, 
          success: 'Password updated successfully! You can use your new password next time you log in.', 
          error: '' 
        });
        setForm({ old_password: '', new_password: '', confirm: '' });
      } else {
        setStatus({ 
          loading: false, 
          success: '', 
          error: res.error || 'Failed to update password. Verify your current password.' 
        });
      }
    } catch (err) {
      setStatus({ loading: false, success: '', error: 'Network error occurred. Try again.' });
    }
  };

  return (
    <div className="edit-section">
      <h3 className="section-heading">Change Security Password</h3>
      
      {status.success && <div className="profile-alert success">✓ {status.success}</div>}
      {status.error && <div className="profile-alert error">⚠ {status.error}</div>}

      <form className="edit-form" style={{ maxWidth: 460 }} onSubmit={handleChangePassword}>
        <div className="edit-field">
          <label>Current Password *</label>
          <div className="pw-field-wrap">
            <input 
              type={showOld ? 'text' : 'password'} 
              value={form.old_password} 
              onChange={e => setForm({ ...form, old_password: e.target.value })} 
              placeholder="Enter current password..."
              required
            />
            <button 
              type="button" 
              className="pw-toggle" 
              onClick={() => setShowOld(!showOld)}
              tabIndex="-1"
            >
              {showOld ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
            </button>
          </div>
        </div>

        <div className="edit-field">
          <label>New Password *</label>
          <div className="pw-field-wrap">
            <input 
              type={showNew ? 'text' : 'password'} 
              value={form.new_password} 
              onChange={e => setForm({ ...form, new_password: e.target.value })} 
              placeholder="Min 6 characters..."
              required
            />
            <button 
              type="button" 
              className="pw-toggle" 
              onClick={() => setShowNew(!showNew)}
              tabIndex="-1"
            >
              {showNew ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
            </button>
          </div>
        </div>

        <div className="edit-field">
          <label>Confirm New Password *</label>
          <input 
            type="password" 
            value={form.confirm} 
            onChange={e => setForm({ ...form, confirm: e.target.value })} 
            placeholder="Repeat new password..."
            required
          />
        </div>

        <button type="submit" className="profile-save-btn" disabled={status.loading}>
          {status.loading ? 'Updating Password...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default Profile;