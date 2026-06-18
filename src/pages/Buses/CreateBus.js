import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderFooterContext, UserContext } from '../../contexts';
import { DataURLS } from '../../utils/DataURLS';
import { FiArrowLeft, FiPlusCircle } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './createBus.css';

const busTypes = ['AC', 'Delux', 'Normal', 'Suspense AC', 'Suspense Delux'];

const CreateBus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData] = useContext(UserContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [toast, setToast] = useState({ show: false, error: false, message: '' });
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    type: 'Normal',
    busNumber: '',
    fare: '',
    numberOfSeats: '44',
    departure_time: '',
    journeyDate: '',
    boardingPoints: '',
    droppingPoints: '',
    features: '',
    description: '',
    image: '',
    seatsConfiguration: { left: 2, right: 2 },
  });

  useEffect(() => {
    setHeaderFooter(true);
    window.scrollTo(0, 0);
    // Redirect to owner login if not logged in as owner/admin
    if (!userData.loggedIn) {
      navigate('/owner-login', { state: { from: location }, replace: true });
      return;
    }
    const role = userData?.data?.user?.role;
    if (role !== 'owner' && role !== 'superadmin' && role !== 'admin') {
      setToast({ show: true, error: true, message: 'Access denied. Owner or admin account required.' });
      setTimeout(() => navigate('/owner-login'), 2000);
    }
  }, [userData]); // eslint-disable-line

  const autoSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString().slice(-4);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleCreate = () => {
    if (!form.name) { setToast({ show: true, error: true, message: 'Bus name is required.' }); return; }
    if (!form.busNumber) { setToast({ show: true, error: true, message: 'Bus number/plate is required.' }); return; }
    if (!form.fare || isNaN(form.fare)) { setToast({ show: true, error: true, message: 'Enter a valid fare amount.' }); return; }
    if (!form.journeyDate) { setToast({ show: true, error: true, message: 'Journey date is required.' }); return; }
    if (!form.departure_time) { setToast({ show: true, error: true, message: 'Departure time is required.' }); return; }
    if (!form.boardingPoints) { setToast({ show: true, error: true, message: 'Enter at least one boarding point.' }); return; }
    if (!form.droppingPoints) { setToast({ show: true, error: true, message: 'Enter at least one dropping point.' }); return; }

    setLoading(true);
    const token = userData?.data?.token;

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || autoSlug(form.name),
      type: form.type,
      busNumber: form.busNumber.trim(),
      fare: Number(form.fare),
      numberOfSeats: Number(form.numberOfSeats) || 44,
      seatsAvailable: Number(form.numberOfSeats) || 44,
      departure_time: form.departure_time,
      journeyDate: form.journeyDate,
      boardingPoints: form.boardingPoints.split(',').map(s => s.trim()).filter(Boolean),
      droppingPoints: form.droppingPoints.split(',').map(s => s.trim()).filter(Boolean),
      features: form.features.split(',').map(s => s.trim()).filter(Boolean),
      description: form.description.trim(),
      image: form.image.trim(),
      isAvailable: true,
      bookedSeat: [],
      soldSeat: [],
      seatsConfiguration: form.seatsConfiguration,
    };

    fetch(DataURLS.buses, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(r => r.json())
      .then(res => {
        setLoading(false);
        if (res?.error || res?.status === 'FAILED') {
          const msg = res.error || res.message || 'Failed to create bus.';
          if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('auth') || msg.toLowerCase().includes('unauthorized')) {
            navigate('/owner-login', { replace: true });
          } else {
            setToast({ show: true, error: true, message: msg });
          }
        } else {
          setToast({ show: true, error: false, message: `Bus "${payload.name}" created successfully!` });
          setTimeout(() => {
            setForm({ name:'',slug:'',type:'Normal',busNumber:'',fare:'',numberOfSeats:'44',departure_time:'',journeyDate:'',boardingPoints:'',droppingPoints:'',features:'',description:'',image:'',seatsConfiguration:{left:2,right:2} });
          }, 2000);
        }
      })
      .catch(() => {
        setLoading(false);
        setToast({ show: true, error: true, message: 'Connection error. Is the backend running?' });
      });
  };

  return (
    <div className="create-bus-page">
      {/* Toast */}
      {toast.show && (
        <div className={`create-bus-toast ${toast.error ? 'error' : 'success'}`}>
          {toast.error ? '⚠' : '✓'} {toast.message}
          <button onClick={() => setToast({ ...toast, show: false })}>✕</button>
        </div>
      )}

      <div className="create-bus-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FiArrowLeft size={16} /> Back
        </button>
        <div className="create-bus-title">
          <FaBus size={22} color="#16a34a" />
          <div>
            <h2>Add New Bus</h2>
            <p>Logged in as: <strong>{userData?.data?.user?.name}</strong> ({userData?.data?.user?.role})</p>
          </div>
        </div>
      </div>

      <div className="create-bus-form">
        {/* Basic Info */}
        <div className="form-section">
          <h3 className="section-heading">Basic Information</h3>
          <div className="form-grid">
            <div className="form-field">
              <label>Bus Name <span>*</span></label>
              <input type="text" placeholder="e.g. Modern Coast Express"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Bus Number / Plate <span>*</span></label>
              <input type="text" placeholder="e.g. KCB 123A"
                value={form.busNumber}
                onChange={e => handleChange('busNumber', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Bus Type <span>*</span></label>
              <select value={form.type} onChange={e => handleChange('type', e.target.value)}>
                {busTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>Fare (Ksh) <span>*</span></label>
              <input type="number" placeholder="e.g. 1200" min="0"
                value={form.fare}
                onChange={e => handleChange('fare', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Number of Seats</label>
              <input type="number" placeholder="e.g. 44" min="1"
                value={form.numberOfSeats}
                onChange={e => handleChange('numberOfSeats', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Slug (auto-filled if empty)</label>
              <input type="text" placeholder="e.g. modern-coast-express"
                value={form.slug}
                onChange={e => handleChange('slug', e.target.value)}
                onFocus={() => { if (!form.slug && form.name) handleChange('slug', autoSlug(form.name)); }} />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="form-section">
          <h3 className="section-heading">Schedule</h3>
          <div className="form-grid">
            <div className="form-field">
              <label>Journey Date <span>*</span></label>
              <input type="date" min={new Date().toISOString().split('T')[0]}
                value={form.journeyDate}
                onChange={e => handleChange('journeyDate', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Departure Time <span>*</span></label>
              <input type="time"
                value={form.departure_time}
                onChange={e => {
                  // Convert 24h to 12h AM/PM format
                  const [hh, mm] = e.target.value.split(':');
                  const h = parseInt(hh);
                  const ampm = h >= 12 ? 'PM' : 'AM';
                  const h12 = h % 12 || 12;
                  handleChange('departure_time', `${String(h12).padStart(2,'0')}:${mm} ${ampm}`);
                }} />
              {form.departure_time && (
                <small style={{ color: '#16a34a', fontWeight: 600 }}>→ {form.departure_time}</small>
              )}
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="form-section">
          <h3 className="section-heading">Route</h3>
          <div className="form-grid">
            <div className="form-field full">
              <label>Boarding Points <span>*</span> <small>(comma-separated)</small></label>
              <input type="text" placeholder="e.g. Nairobi CBD, Westlands, Thika"
                value={form.boardingPoints}
                onChange={e => handleChange('boardingPoints', e.target.value)} />
            </div>
            <div className="form-field full">
              <label>Dropping Points <span>*</span> <small>(comma-separated)</small></label>
              <input type="text" placeholder="e.g. Voi, Mombasa CBD"
                value={form.droppingPoints}
                onChange={e => handleChange('droppingPoints', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="form-section">
          <h3 className="section-heading">Seat Layout</h3>
          <div className="form-grid">
            <div className="form-field">
              <label>Seats on Left</label>
              <select value={form.seatsConfiguration.left}
                onChange={e => handleChange('seatsConfiguration', { ...form.seatsConfiguration, left: Number(e.target.value) })}>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            <div className="form-field">
              <label>Seats on Right</label>
              <select value={form.seatsConfiguration.right}
                onChange={e => handleChange('seatsConfiguration', { ...form.seatsConfiguration, right: Number(e.target.value) })}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Extras */}
        <div className="form-section">
          <h3 className="section-heading">Amenities & Details</h3>
          <div className="form-grid">
            <div className="form-field full">
              <label>Features / Amenities <small>(comma-separated)</small></label>
              <input type="text" placeholder="e.g. WiFi, AC, USB Charging, Reclining Seats"
                value={form.features}
                onChange={e => handleChange('features', e.target.value)} />
            </div>
            <div className="form-field full">
              <label>Image URL <small>(optional)</small></label>
              <input type="url" placeholder="https://... or leave blank for default"
                value={form.image}
                onChange={e => handleChange('image', e.target.value)} />
            </div>
            <div className="form-field full">
              <label>Description <small>(optional)</small></label>
              <textarea rows={3} placeholder="Brief description of this bus and service..."
                value={form.description}
                onChange={e => handleChange('description', e.target.value)} />
            </div>
          </div>
        </div>

        <button className="create-bus-btn" onClick={handleCreate} disabled={loading}>
          {loading
            ? <><span className="cb-spinner" /> Creating Bus...</>
            : <><FiPlusCircle size={18} /> Create Bus</>}
        </button>
      </div>
    </div>
  );
};

export default CreateBus;

