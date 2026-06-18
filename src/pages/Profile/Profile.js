// import React, { useContext, useEffect, useRef, useState } from "react";
// import "./index.css";
// import { Button, Card, CardGroup, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../contexts";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useGet, usePost } from "../../hooks";
// import { DataURLS } from "../../utils/DataURLS";

// const Profile = () => {
//   const [userData, setUserData] = useContext(UserContext);
//   const [activeTab, setActiveTab] = useState(0);
//   const [userInfo,setUserInfo] = useContext(UserContext);

//   const btnsRef = useRef();
  
//   const navigate = useNavigate();
//   const logout = () => {
//     window.localStorage.removeItem("app_user");

//     setUserData({ loggedIn: false, data: {} });
//   };

//   const [refresh, setRfresh] = useState(false);
//   // console.log(userInfo.data.user._id);
//   const bookings = useGet({
//     url: DataURLS.userBookings/*`${DataURLS.userBookings}/${userInfo?.data?.user?._id}`*/,
//     options:{
//       method:"GET",
//       headers: {
//         "Authorization":`Bearer ${userInfo?.data?.token}`,
//       },
//     },
//     dependecies: [refresh],
//   });

//   useEffect(() => {
//     //setUserData({loggedIn:true});
//     if (!userData.loggedIn) {
//       navigate("/");
//     }
//   }, [userData]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div className="content-wrapper profile">
//       <div className="btns" ref={btnsRef}>
//         <FaChevronLeft
//           onClick={() => {
//             btnsRef.current.scrollLeft += /*btnsRef.current.getBoundingClientRect().width+*/ 100;
//           }}
//           className="btns-arrows left"
//         />
//         <FaChevronRight
//           onClick={() => {
//             btnsRef.current.scrollLeft -= /*btnsRef.current.getBoundingClientRect().width+*/ 100;
//           }}
//           className="btns-arrows right"
//         />
//         <Button
//           onClick={() => setActiveTab(0)}
//           style={{
//             backgroundColor: activeTab == 0 ? "var(--app-color)" : "#ffffff",
//             color: activeTab == 0 ? "#ffffff" : "var(--app-color)",
//             borderColor: "transparent",
//           }}
//         >
//           Dashboard
//         </Button>
//         <Button
//           onClick={() => setActiveTab(1)}
//           style={{
//             backgroundColor: activeTab == 1 ? "var(--app-color)" : "#ffffff",
//             color: activeTab == 1 ? "#ffffff" : "var(--app-color)",
//             borderColor: "transparent",
//             width: "fit-content",
//           }}
//         >
//           Bookings
//         </Button>
//         <Button
//           onClick={() => setActiveTab(2)}
//           style={{
//             backgroundColor: activeTab == 2 ? "var(--app-color)" : "#ffffff",
//             color: activeTab == 2 ? "#ffffff" : "var(--app-color)",
//             borderColor: "transparent",
//             width: "fit-content",
//           }}
//         >
//           Update Profile
//         </Button>
//         <Button
//           onClick={() => setActiveTab(3)}
//           style={{
//             backgroundColor: activeTab == 3 ? "var(--app-color)" : "#ffffff",
//             color: activeTab == 3 ? "#ffffff" : "var(--app-color)",
//             borderColor: "transparent",
//             width: "fit-content",
//           }}
//         >
//           Change password
//         </Button>
//         <Button
//           onClick={() => logout()}
//           variant="danger"
//           style={{
//             borderColor: "transparent",
//             width: "fit-content",
//           }}
//         >
//           Logout
//         </Button>
//       </div>

//       <div
//         style={{
//           width: "80%",
//         }}
//       >
//         {activeTab == 0 ? (
//           <Dashboard bookings={bookings} />
//         ) : activeTab == 1 ? (
//           <Bookings bookings={bookings} />
//         ) : activeTab == 2 ? (
//           <EditProfile />
//         ) : (
//           <ChangePassword />
//         )}
//       </div>
//     </div>
//   );
// };

// const Dashboard = ({ bookings }) => {
//   const active = bookings.results.filter((b) => b.canceled == false).length;
//   const canceled = bookings.results.filter((b) => b.canceled == true).length;

//   return (
//     <div className="profile-container">
//       <CardGroup
//         style={{
//           width: "100%",
//           display: "flex",
//           flexDirection: "row",
//           gap: 10,
//           flexWrap: "wrap",
//         }}
//       >
//         <Card className="profile-card">
//           <label>{bookings.results.length}</label>
//           <p>Total Bookings</p>
//         </Card>

//         <Card className="profile-card">
//           <label>{active}</label>
//           <p>Active bookings</p>
//         </Card>

//         <Card className="profile-card">
//           <label>{canceled}</label>
//           <p>Canceled bookings</p>
//         </Card>
//       </CardGroup>
//     </div>
//   );
// };

// const Bookings = () => {
//   const [refresh, setRfresh] = useState(false);
//   const [userInfo,setUserInfo] = useContext(UserContext);
  
//   const bookings = useGet({
//     url:DataURLS.userBookings/*`${DataURLS.userBookings}/${userInfo?.data?.user?._id}`*/,
//     options:{
//       method:"GET",
//       headers: {
//         "Authorization":`Bearer ${userInfo?.data?.token}`,
//       },
//     },
//     dependecies: [refresh],
//   });

//   const editBooking = usePost({
//     url: DataURLS.editBooking,
//     setReload: setRfresh,
//     reload: refresh,
//   });

//   const deleteBooking = usePost({
//     url: DataURLS.deleteBooking,
//     setReload: setRfresh,
//     reload: refresh,
//   });

//   return (
//     <div
//       className="profile-container"
//       style={{
//         width: "100%",
//       }}
//     >
//       {bookings.error ? (
//         <div>{bookings.message}</div>
//       ) : bookings.loading ? (
//         <div>Loading...</div>
//       ) : bookings.results.length < 1 ? (
//         <div>No results found!!</div>
//       ) : (
//         <Table
//           responsive
//           style={{
//             width: "100%",
//             gap: 10,
//           }}
//         >
//           <thead>
//             <th>#</th>
//             <th>Company</th>
//             <th>From</th>
//             <th>To</th>
//             <th>Ticket type</th>
//             <th>Payment type</th>
//             <th>Amount</th>
//             <th>Actions</th>
//           </thead>
//           <tbody>
//             {bookings.results.map((booking, index) => {
//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{booking?.company}</td>
//                   <td>{booking?.from}</td>
//                   <td>{booking?.to}</td>
//                   <td>{booking?.ticket}</td>
//                   <td>{booking?.paymentType ?? "M_PESA"}</td>
//                   <td>{booking?.amount}</td>
//                   <td>
//                     {/* <Button variant='danger' >Update status</Button> */}
//                     <Button
//                       variant="danger"
//                       onClick={() => {
//                         deleteBooking.handleRequest(
//                           `
//                       ${DataURLS.deleteBooking}/${booking._id}
//                       `,
//                           {
//                             method: "DELETE",
//                             headers: {
//                               "Authorization":`Bearer ${userInfo?.data?.token}`,
//                               Accept: "Application/json",
//                               "Content-Type": "Application/json",
//                             },
//                           }
//                         );
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// const EditProfile = () => {
//   const [refresh,setRfresh] = useState(false);
//   const [userInfo,setUserInfo] = useContext(UserContext);
//   const [credentials,setCredentials] = useState({
//     userid:userInfo.data.user._id,
//     name:userInfo.data.user.name,
//     email:userInfo.data.user.email,
//     phone:userInfo.data.user.phone,
//   });
  
  
//   const editProfile = usePost({
//     url: DataURLS.editProfile,
//     setReload: setRfresh,
//     reload: refresh,
//   });


//   return (
//     <div className="profile-container">
//       <div>Edit profile</div>
//       <div>
//         <div className="user-input">
//           <label>Name</label>
//           <input
//           onChange={(e)=>setCredentials({...credentials,name:e.target.value})}
//           value={credentials.name}
//           type="text" required placeholder="name..." />
//         </div>
//         <div className="user-input">
//           <label>Email</label>
//           <input
//           onChange={(e)=>setCredentials({...credentials,email:e.target.value})}
//           value={credentials.email}
//           type="email" required placeholder="email..." />
//         </div>
//         <div className="user-input">
//           <label>Phone number</label>
//           <input
//           onChange={(e)=>setCredentials({...credentials,phone:e.target.value})}
//           value={credentials.phone}
//           type="text" required placeholder="phone..." />
//         </div>
//         <Button variant="success"
//         onClick={()=>{
//           editProfile.handleRequest(null,{
//             method:"PUT",
//             headers:{
//               "Authorization":`Bearer ${userInfo.data.token}`,
//               "Accept":"Application/json",
//               "Content-Type":"Application/json"
//             },
//             body:{...credentials,userid:userInfo.data.user._id}
//           })
//         }}
//         >Update Details</Button>
//       </div>
//     </div>
//   );
// };

// const ChangePassword = () => {
//   const [refresh,setRfresh] = useState(false);
//   const [userInfo,setUserInfo] = useContext(UserContext);


//   const [credentials,setCredentials] = useState({
//     old_password:null,
//     new_password:null
//   });

//   const editPassword = usePost({
//     url: DataURLS.editPassword,
//     setReload: setRfresh,
//     reload: refresh,
//   });
//   return (
//     <div className="profile-container">
//       <div>Change password</div>
//       <div>
//         <div className="user-input">
//           <label>Old password</label>
//           <input onChange={(e)=>setCredentials({...credentials,old_password:e.target.value})} type="password" required placeholder="old password..." />
//         </div>
//         <div className="user-input">
//           <label>New password</label>
//           <input onChange={(e)=>setCredentials({...credentials,new_password:e.target.value})} type="password" required placeholder="new password..." />
//         </div>
//         <div className="user-input">
//           <label>Re-enter password</label>
//           <input type="password" required placeholder="reenter password..." />
//         </div>
//         <Button variant="success"
//         disabled={!credentials.old_password || !credentials.new_password}
//         onClick={()=>{
//           editPassword.handleRequest(null,{
//             method:"PUT",
//             headers:{
//               "Accept":"Application/json",
//               "Content-Type":"Application/json"
//             },
//             body:{...credentials,userid:userInfo.data.user._id}
//           })
//         }}
//         >Update Password</Button>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, HeaderFooterContext } from '../../contexts';
import { useGet, usePost } from '../../hooks';
import { DataURLS } from '../../utils/DataURLS';
import { FiUser, FiCalendar, FiMapPin, FiLogOut, FiEdit2, FiLock, FiList, FiGrid, FiTrash2, FiEye, FiEyeOff, FiCheckCircle, FiXCircle } from 'react-icons/fi';
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
  const navigate = useNavigate();

  const bookings = useGet({
    url: DataURLS.userBookings,
    options: { method: 'GET', headers: { Authorization: `Bearer ${userData?.data?.token}` } },
    dependecies: [],
  });

  useEffect(() => {
    setHeaderFooter(true);
    window.scrollTo(0, 0);
    if (!userData.loggedIn) navigate('/login');
  }, [userData]);

  const logout = () => {
    localStorage.removeItem('app_user');
    setUserData({ loggedIn: false, data: {} });
    navigate('/');
  };

  const user = userData?.data?.user || {};

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-hero">
        <div className="profile-hero-inner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          </div>
          <div className="profile-hero-info">
            <h2>{user?.name || 'Passenger'}</h2>
            <p>{user?.email}</p>
            {user?.phone && <span className="profile-phone">📱 {user.phone}</span>}
          </div>
          <button className="profile-logout-btn" onClick={logout}>
            <FiLogOut size={16}/> Logout
          </button>
        </div>
      </div>

      <div className="profile-body">
        {/* Sidebar tabs */}
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

        {/* Content */}
        <main className="profile-content">
          {activeTab === 0 && <Dashboard bookings={bookings} user={user}/>}
          {activeTab === 1 && <Bookings token={userData?.data?.token}/>}
          {activeTab === 2 && <EditProfile user={user} token={userData?.data?.token} setUserData={setUserData} userData={userData}/>}
          {activeTab === 3 && <ChangePassword token={userData?.data?.token} userId={user?._id}/>}
        </main>
      </div>
    </div>
  );
};

const Dashboard = ({ bookings, user }) => {
  const active = (bookings.results || []).filter(b => !b.canceled).length;
  const canceled = (bookings.results || []).filter(b => b.canceled).length;
  const total = (bookings.results || []).length;

  return (
    <div className="dashboard">
      <h3 className="section-heading">Welcome back, {user?.name?.split(' ')[0] || 'Passenger'} 👋</h3>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon blue"><FaBus size={22}/></div><div className="stat-num">{total}</div><div className="stat-label">Total Bookings</div></div>
        <div className="stat-card"><div className="stat-icon green"><FiCheckCircle size={22}/></div><div className="stat-num">{active}</div><div className="stat-label">Active Tickets</div></div>
        <div className="stat-card"><div className="stat-icon red"><FiXCircle size={22}/></div><div className="stat-num">{canceled}</div><div className="stat-label">Cancelled</div></div>
      </div>

      {/* Quick info */}
      <div className="profile-info-card">
        <h4>Account Details</h4>
        <div className="info-grid">
          <div className="info-item"><span className="info-label">Full Name</span><span className="info-val">{user?.name || '—'}</span></div>
          <div className="info-item"><span className="info-label">Email</span><span className="info-val">{user?.email || '—'}</span></div>
          <div className="info-item"><span className="info-label">Phone</span><span className="info-val">{user?.phone || '—'}</span></div>
          <div className="info-item"><span className="info-label">Location</span><span className="info-val">{user?.address || '—'}</span></div>
        </div>
      </div>

      {/* Recent bookings preview */}
      {total > 0 && (
        <div className="profile-info-card">
          <h4>Recent Bookings</h4>
          <div className="recent-bookings">
            {(bookings.results || []).slice(0, 3).map((b, i) => (
              <div className="recent-booking-item" key={i}>
                <div className="booking-route-icon"><FaBus size={16} color="#16a34a"/></div>
                <div className="booking-route-info">
                  <strong>{b.from} → {b.to}</strong>
                  <span>{b.paymentType || 'M-PESA'} · Ksh {b.amount}</span>
                </div>
                <span className={`booking-badge ${b.canceled ? 'canceled' : 'active'}`}>
                  {b.canceled ? 'Cancelled' : 'Active'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Bookings = ({ token }) => {
  const [refresh, setRefresh] = useState(false);
  const bookings = useGet({
    url: DataURLS.userBookings,
    options: { method: 'GET', headers: { Authorization: `Bearer ${token}` } },
    dependecies: [refresh],
  });

  const handleCancel = (id) => {
    if (!window.confirm('Cancel this booking? This cannot be undone.')) return;
    fetch(`${DataURLS.deleteBooking}${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    }).then(() => setRefresh(r => !r));
  };

  if (bookings.loading) return <div className="profile-loading"><div className="profile-spinner"/><p>Loading bookings...</p></div>;
  if (bookings.error) return <div className="profile-empty"><p>⚠ Could not load bookings. Please try again.</p></div>;
  if (!bookings.results?.length) return (
    <div className="profile-empty">
      <FaBus size={48} color="#e2e8f0"/>
      <h4>No bookings yet</h4>
      <p>When you book a ticket, it will appear here.</p>
      <a href="/tickets" className="profile-empty-btn">Browse Buses</a>
    </div>
  );

  return (
    <div className="bookings-section">
      <h3 className="section-heading">My Bookings ({bookings.results.length})</h3>
      <div className="bookings-list">
        {bookings.results.map((b, i) => (
          <div className={`booking-card ${b.canceled ? 'canceled' : ''}`} key={i}>
            <div className="booking-card-left">
              <div className="booking-bus-icon"><FaBus size={20} color={b.canceled ? '#94a3b8' : '#16a34a'}/></div>
              <div className="booking-info">
                <strong className="booking-route">{b.from || '—'} → {b.to || '—'}</strong>
                <span className="booking-meta">
                  {b.company && <span>🚌 {b.company}</span>}
                  {b.date && <span>📅 {new Date(b.date).toLocaleDateString('en-KE')}</span>}
                  <span>💳 {b.paymentType || 'M-PESA'}</span>
                </span>
              </div>
            </div>
            <div className="booking-card-right">
              <div className="booking-amount">Ksh {b.amount || '—'}</div>
              <span className={`booking-badge ${b.canceled ? 'canceled' : 'active'}`}>
                {b.canceled ? '✕ Cancelled' : '✓ Active'}
              </span>
              {!b.canceled && (
                <button className="booking-cancel-btn" onClick={() => handleCancel(b._id)}>
                  <FiTrash2 size={14}/> Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditProfile = ({ user, token, setUserData, userData }) => {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '' });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleUpdate = () => {
    setStatus({ loading: true, success: '', error: '' });
    fetch(DataURLS.editProfile, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, userid: user?._id }),
    })
      .then(r => r.json())
      .then(res => {
        if (!res.error) {
          const updated = { ...userData, data: { ...userData.data, user: { ...user, ...form } } };
          setUserData(updated);
          localStorage.setItem('app_user', JSON.stringify(updated));
          setStatus({ loading: false, success: 'Profile updated successfully!', error: '' });
        } else {
          setStatus({ loading: false, success: '', error: res.error || 'Update failed.' });
        }
      })
      .catch(() => setStatus({ loading: false, success: '', error: 'An error occurred.' }));
  };

  return (
    <div className="edit-section">
      <h3 className="section-heading">Edit Profile</h3>
      {status.success && <div className="profile-alert success">✓ {status.success}</div>}
      {status.error && <div className="profile-alert error">⚠ {status.error}</div>}
      <div className="edit-form">
        <div className="edit-form-row">
          <div className="edit-field"><label>Full Name</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name..."/></div>
          <div className="edit-field"><label>Email Address</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email..."/></div>
        </div>
        <div className="edit-form-row">
          <div className="edit-field"><label>Phone Number</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+254 7XX XXX XXX"/></div>
          <div className="edit-field"><label>City / Location</label><input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Nairobi..."/></div>
        </div>
        <button className="profile-save-btn" onClick={handleUpdate} disabled={status.loading}>
          {status.loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

const ChangePassword = ({ token, userId }) => {
  const [form, setForm] = useState({ old_password: '', new_password: '', confirm: '' });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleChange = () => {
    if (!form.old_password) { setStatus({ loading: false, error: 'Enter your current password.', success: '' }); return; }
    if (form.new_password.length < 6) { setStatus({ loading: false, error: 'New password must be at least 6 characters.', success: '' }); return; }
    if (form.new_password !== form.confirm) { setStatus({ loading: false, error: 'Passwords do not match.', success: '' }); return; }
    setStatus({ loading: true, success: '', error: '' });
    fetch(DataURLS.editPassword, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ old_password: form.old_password, new_password: form.new_password, userid: userId }),
    })
      .then(r => r.json())
      .then(res => {
        if (!res.error) {
          setStatus({ loading: false, success: 'Password changed successfully!', error: '' });
          setForm({ old_password: '', new_password: '', confirm: '' });
        } else {
          setStatus({ loading: false, success: '', error: res.error || 'Failed to update password.' });
        }
      })
      .catch(() => setStatus({ loading: false, success: '', error: 'An error occurred.' }));
  };

  return (
    <div className="edit-section">
      <h3 className="section-heading">Change Password</h3>
      {status.success && <div className="profile-alert success">✓ {status.success}</div>}
      {status.error && <div className="profile-alert error">⚠ {status.error}</div>}
      <div className="edit-form" style={{ maxWidth: 460 }}>
        <div className="edit-field">
          <label>Current Password</label>
          <div className="pw-field-wrap">
            <input type={showOld ? 'text' : 'password'} value={form.old_password} onChange={e => setForm({...form, old_password: e.target.value})} placeholder="Current password..."/>
            <button className="pw-toggle" onClick={() => setShowOld(!showOld)}>{showOld ? <FiEyeOff size={16}/> : <FiEye size={16}/>}</button>
          </div>
        </div>
        <div className="edit-field">
          <label>New Password</label>
          <div className="pw-field-wrap">
            <input type={showNew ? 'text' : 'password'} value={form.new_password} onChange={e => setForm({...form, new_password: e.target.value})} placeholder="Min 6 characters..."/>
            <button className="pw-toggle" onClick={() => setShowNew(!showNew)}>{showNew ? <FiEyeOff size={16}/> : <FiEye size={16}/>}</button>
          </div>
        </div>
        <div className="edit-field">
          <label>Confirm New Password</label>
          <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} placeholder="Repeat new password..."/>
        </div>
        <button className="profile-save-btn" onClick={handleChange} disabled={status.loading}>
          {status.loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
