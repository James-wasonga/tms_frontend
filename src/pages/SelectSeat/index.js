// import React, { useContext, useEffect, useState } from 'react';
// import "./index.css";
// import { Button, Toast } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FiX, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
// import { FaBus } from 'react-icons/fa';
// import { DataURLS } from '../../utils/DataURLS';
// import Lottie from 'lottie-react';
// import { CartContext, HeaderFooterContext } from '../../contexts';
// import { TopBarImage } from '../../components';

// const SelectSeat = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [cartContext, setCartContext] = useContext(CartContext);
//   const [, setHeaderFooter] = useContext(HeaderFooterContext);

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedSeatsInfo, setSelectedSeatsInfo] = useState([]);
//   const [seats, setSeats] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [fareCost, setFareCost] = useState(0);
//   const [toastMsg, setToastMsg] = useState('');
//   const [bus, setBus] = useState({ error: false, loading: false, results: null });
//   const [vehicle, setVehicle] = useState({ seatsConfiguration: { left: 2, right: 2 }, totalSeats: 0 });

//   const ticketInfo = {
//     pickupPoint: params?.pickupPoint,
//     destination: params?.destinationPoint,
//     date: params?.date,
//   };

//   useEffect(() => {
//     setHeaderFooter(true);
//     window.scroll(0, 0);
//     fetchBus();
//   }, []);

//   useEffect(() => {
//     setCartContext({
//       seats: selectedSeats,
//       fare: fareCost,
//       bus: bus.results?.name || '',
//       busSlug: params.slug,
//       seatsInfo: selectedSeatsInfo,
//       pickupPoint: ticketInfo.pickupPoint,
//       destination: ticketInfo.destination,
//       date: ticketInfo.date,
//     });
//     try {
//       localStorage.setItem('seatsData', JSON.stringify({ seats: selectedSeats, fare: fareCost, seatsInfo: selectedSeatsInfo, pickupPoint: ticketInfo.pickupPoint, destination: ticketInfo.destination, date: ticketInfo.date, busSlug: params.slug }));
//     } catch (e) {}
//   }, [selectedSeats]);

//   const createChunks = (total, left, right) => {
//     const chunk = left + right;
//     if (chunk <= 0) return [];
//     const arr = Array.from({ length: total }, (_, i) => i);
//     const out = [];
//     for (let i = 0; i < arr.length; i += chunk) out.push(arr.slice(i, i + chunk));
//     return out;
//   };

//   const fetchBus = () => {
//     setBus({ error: false, loading: true, results: null });
//     fetch(`${DataURLS.buses}/${params.slug}`, { method: 'GET' })
//       .then(r => r.json())
//       .then(res => {
//         setBus({ error: false, loading: false, results: res });
//         setFareCost(res.fare || 0);
//         setBookedSeats(res.bookedSeat || []);
//         const left = res.seatsConfiguration?.left || 2;
//         const right = res.seatsConfiguration?.right || 2;
//         setVehicle({ seatsConfiguration: { left, right }, totalSeats: res.numberOfSeats || 0 });
//         setSeats(createChunks(res.numberOfSeats || 0, left, right));
//       })
//       .catch(() => setBus({ error: true, loading: false, results: null }));
//   };

//   const isBooked = (seatNum) => bookedSeats.includes(seatNum);
//   const isSelected = (seatNum) => selectedSeats.includes(seatNum);

//   const toggleSeat = (seatNum) => {
//     if (isBooked(seatNum)) return;
//     const idx = selectedSeats.indexOf(seatNum);
//     if (idx >= 0) {
//       setSelectedSeats(selectedSeats.filter((_, i) => i !== idx));
//       setSelectedSeatsInfo(selectedSeatsInfo.filter((_, i) => i !== idx));
//     } else {
//       setSelectedSeats([...selectedSeats, seatNum]);
//       setSelectedSeatsInfo([...selectedSeatsInfo, { seat: seatNum + 1, name: '', id: '' }]);
//     }
//   };

//   const handleProceed = () => {
//     if (selectedSeats.length === 0) { setToastMsg('Please select at least one seat.'); return; }
//     setCartContext({
//       seats: selectedSeats,
//       fare: fareCost,
//       bus: bus.results?.name || '',
//       busSlug: params.slug,
//       seatsInfo: selectedSeatsInfo,
//       pickupPoint: ticketInfo.pickupPoint,
//       destination: ticketInfo.destination,
//       date: ticketInfo.date,
//     });
//     navigate('/payment-gateway');
//   };

//   let globalSeat = 0;

//   return (
//     <div className="select-seat-page">
//       <TopBarImage>
//         <span>{ticketInfo.pickupPoint}</span>
//         <span style={{ color: '#4ade80' }}>→</span>
//         <span>{ticketInfo.destination}</span>
//       </TopBarImage>

//       <Toast show={!!toastMsg} onClose={() => setToastMsg('')} delay={4000} autohide
//         style={{ position: 'fixed', top: 90, right: 16, zIndex: 9999, minWidth: 280 }}>
//         <Toast.Header style={{ background: '#dc2626', color: 'white' }}><strong>⚠ Notice</strong></Toast.Header>
//         <Toast.Body>{toastMsg}</Toast.Body>
//       </Toast>

//       {bus.loading ? (
//         <div className="seat-loading">
//           <div style={{ width: 150, height: 150 }}>
//             <Lottie loop animationData={require('../../assets/lottie_animations/progress1.json')}/>
//           </div>
//           <p>Loading seat map...</p>
//         </div>
//       ) : bus.error ? (
//         <div className="seat-loading">
//           <p style={{ color: '#dc2626' }}>Failed to load bus. Please go back and try again.</p>
//           <button onClick={fetchBus} style={{ marginTop: 12, background: '#16a34a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>Retry</button>
//         </div>
//       ) : (
//         <div className="seat-layout">
//           {/* Left: Seat map */}
//           <div className="seat-map-panel">
//             <div className="bus-info-strip">
//               <FaBus size={20} color="#16a34a"/>
//               <div>
//                 <strong>{bus.results?.name}</strong>
//                 <span>{bus.results?.type} · {bus.results?.numberOfSeats} seats · Ksh {Number(fareCost).toLocaleString()}/seat</span>
//               </div>
//             </div>

//             {/* Legend */}
//             <div className="seat-legend">
//               <div className="legend-item"><div className="legend-box selected"/><span>Selected</span></div>
//               <div className="legend-item"><div className="legend-box booked"/><span>Booked</span></div>
//               <div className="legend-item"><div className="legend-box empty"/><span>Available</span></div>
//             </div>

//             {/* Bus outline */}
//             <div className="bus-outline">
//               <div className="bus-front">
//                 <div className="steering-wheel">🚌</div>
//               </div>
//               <div className="seats-grid">
//                 {seats.map((group, gi) => {
//                   return (
//                     <div className="seat-row" key={gi}>
//                       {group.map((_, si) => {
//                         const seatNum = globalSeat++;
//                         const booked = isBooked(seatNum);
//                         const selected = isSelected(seatNum);
//                         const isAisle = si === vehicle.seatsConfiguration.left - 1;
//                         return (
//                           <div key={si} style={{ marginRight: isAisle ? 24 : 0 }}>
//                             <div
//                               className={`seat-box ${booked ? 'seat-booked' : selected ? 'seat-selected' : 'seat-available'}`}
//                               onClick={() => toggleSeat(seatNum)}
//                               title={booked ? 'Booked' : `Seat ${seatNum + 1}`}
//                             >
//                               <span className="seat-label">{seatNum + 1}</span>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right: Selected seats panel */}
//           <div className="seat-summary-panel">
//             <h4 className="summary-title">
//               Booking Summary
//               {selectedSeats.length > 0 && <span className="seat-count-badge">{selectedSeats.length}</span>}
//             </h4>

//             {selectedSeats.length === 0 ? (
//               <div className="no-seats-selected">
//                 <p>Click on available seats to select them.</p>
//               </div>
//             ) : (
//               <div className="selected-seats-list">
//                 {selectedSeatsInfo.map((info, i) => (
//                   <div key={i} className="selected-seat-card">
//                     <div className="selected-seat-header">
//                       <strong>Seat {info.seat}</strong>
//                       <span className="seat-fare">Ksh {Number(fareCost).toLocaleString()}</span>
//                       <button className="remove-seat-btn" onClick={() => {
//                         setSelectedSeats(selectedSeats.filter((_, idx) => idx !== i));
//                         setSelectedSeatsInfo(selectedSeatsInfo.filter((_, idx) => idx !== i));
//                       }}><FiX size={14}/></button>
//                     </div>
//                     <div className="seat-passenger-fields">
//                       <input type="text" placeholder="Passenger name"
//                         value={info.name || ''}
//                         onChange={e => {
//                           const updated = [...selectedSeatsInfo];
//                           updated[i] = { ...updated[i], name: e.target.value };
//                           setSelectedSeatsInfo(updated);
//                         }}/>
//                       <input type="text" placeholder="ID number (optional)"
//                         value={info.id || ''}
//                         onChange={e => {
//                           const updated = [...selectedSeatsInfo];
//                           updated[i] = { ...updated[i], id: e.target.value };
//                           setSelectedSeatsInfo(updated);
//                         }}/>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="seat-total-bar">
//                   <span>Total ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
//                   <strong>Ksh {(fareCost * selectedSeats.length).toLocaleString()}</strong>
//                 </div>

//                 <button className="proceed-btn" onClick={handleProceed}>
//                   Proceed to Payment →
//                 </button>
//               </div>
//             )}

//             <div className="route-summary">
//               <div className="rs-row"><span>Route</span><strong>{ticketInfo.pickupPoint} → {ticketInfo.destination}</strong></div>
//               <div className="rs-row"><span>Date</span><strong>{ticketInfo.date && ticketInfo.date !== 'null' ? new Date(Number(ticketInfo.date)).toLocaleDateString('en-KE', { weekday:'short', day:'numeric', month:'short', year:'numeric' }) : '—'}</strong></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectSeat;

import React, { useContext, useEffect, useState } from 'react';
import "./index.css";
import { Toast } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import { DataURLS } from '../../utils/DataURLS';
import Lottie from 'lottie-react';
import { CartContext, HeaderFooterContext } from '../../contexts';
import { TopBarImage } from '../../components';

const SelectSeat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cartContext, setCartContext] = useContext(CartContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsInfo, setSelectedSeatsInfo] = useState([]);
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [fareCost, setFareCost] = useState(0);
  const [toastMsg, setToastMsg] = useState('');
  const [toastError, setToastError] = useState(false);
  const [bus, setBus] = useState({ error: false, loading: false, results: null });
  const [vehicle, setVehicle] = useState({ seatsConfiguration: { left: 2, right: 2 }, totalSeats: 0 });

  const ticketInfo = {
    pickupPoint: params?.pickupPoint,
    destination: params?.destinationPoint,
    date: params?.date,
  };

  useEffect(() => {
    setHeaderFooter(true);
    window.scroll(0, 0);
    fetchBus();
  }, []); // eslint-disable-line

  useEffect(() => {
    setCartContext({
      seats: selectedSeats,
      fare: fareCost,
      bus: bus.results?.name || '',
      busSlug: params.slug,
      seatsInfo: selectedSeatsInfo,
      pickupPoint: ticketInfo.pickupPoint,
      destination: ticketInfo.destination,
      date: ticketInfo.date,
    });
    try {
      localStorage.setItem('seatsData', JSON.stringify({
        seats: selectedSeats, fare: fareCost,
        seatsInfo: selectedSeatsInfo,
        pickupPoint: ticketInfo.pickupPoint,
        destination: ticketInfo.destination,
        date: ticketInfo.date,
        busSlug: params.slug
      }));
    } catch (e) {}
  }, [selectedSeats]); // eslint-disable-line

  const createChunks = (total, left, right) => {
    const chunk = left + right;
    if (chunk <= 0) return [];
    const arr = Array.from({ length: total }, (_, i) => i);
    const out = [];
    for (let i = 0; i < arr.length; i += chunk) out.push(arr.slice(i, i + chunk));
    return out;
  };

  const fetchBus = () => {
    setBus({ error: false, loading: true, results: null });
    fetch(`${DataURLS.buses}/${params.slug}`, { method: 'GET' })
      .then(r => r.json())
      .then(res => {
        setBus({ error: false, loading: false, results: res });
        setFareCost(res.fare || 0);
        setBookedSeats(res.bookedSeat || []);
        const left = res.seatsConfiguration?.left || 2;
        const right = res.seatsConfiguration?.right || 2;
        setVehicle({ seatsConfiguration: { left, right }, totalSeats: res.numberOfSeats || 0 });
        setSeats(createChunks(res.numberOfSeats || 0, left, right));
      })
      .catch(() => setBus({ error: true, loading: false, results: null }));
  };

  const isBooked = (seatNum) => bookedSeats.includes(seatNum);
  const isSelected = (seatNum) => selectedSeats.includes(seatNum);

  const toggleSeat = (seatNum) => {
    if (isBooked(seatNum)) return;
    const idx = selectedSeats.indexOf(seatNum);
    if (idx >= 0) {
      setSelectedSeats(selectedSeats.filter((_, i) => i !== idx));
      setSelectedSeatsInfo(selectedSeatsInfo.filter((_, i) => i !== idx));
    } else {
      setSelectedSeats([...selectedSeats, seatNum]);
      setSelectedSeatsInfo([...selectedSeatsInfo, { seat: seatNum + 1, name: '', id: '' }]);
    }
  };

  // ── VALIDATION before proceeding ──────────────────────────────
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      setToastError(true);
      setToastMsg('Please select at least one seat before proceeding.');
      return;
    }

    // Check all passenger names are filled in
    const missingName = selectedSeatsInfo.findIndex(s => !s.name || s.name.trim() === '');
    if (missingName !== -1) {
      setToastError(true);
      setToastMsg(`Please enter the passenger name for Seat ${selectedSeatsInfo[missingName].seat}.`);
      return;
    }

    // All good — save to cart and proceed
    setCartContext({
      seats: selectedSeats,
      fare: fareCost,
      bus: bus.results?.name || '',
      busSlug: params.slug,
      seatsInfo: selectedSeatsInfo,
      pickupPoint: ticketInfo.pickupPoint,
      destination: ticketInfo.destination,
      date: ticketInfo.date,
    });
    navigate('/payment-gateway');
  };

  const formatDate = (d) => {
    if (!d || d === 'null' || d === '0') return '—';
    try {
      return new Date(Number(d)).toLocaleDateString('en-KE', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch { return '—'; }
  };

  let globalSeat = 0;

  return (
    <div className="select-seat-page">
      <TopBarImage>
        <span>{ticketInfo.pickupPoint}</span>
        <span style={{ color: '#4ade80' }}>→</span>
        <span>{ticketInfo.destination}</span>
      </TopBarImage>

      <Toast
        show={!!toastMsg}
        onClose={() => setToastMsg('')}
        delay={5000} autohide
        style={{
          position: 'fixed', top: 90, right: 16, zIndex: 9999, minWidth: 300,
          backgroundColor: toastError ? '#dc2626' : '#16a34a',
        }}
      >
        <Toast.Header style={{ background: toastError ? '#dc2626' : '#16a34a', color: 'white' }}>
          <strong>{toastError ? '⚠ Required' : '✓ Done'}</strong>
        </Toast.Header>
        <Toast.Body style={{ color: 'white' }}>{toastMsg}</Toast.Body>
      </Toast>

      {bus.loading ? (
        <div className="seat-loading">
          <div style={{ width: 150, height: 150 }}>
            <Lottie loop animationData={require('../../assets/lottie_animations/progress1.json')} />
          </div>
          <p>Loading seat map...</p>
        </div>
      ) : bus.error ? (
        <div className="seat-loading">
          <FiAlertCircle size={48} color="#fca5a5" />
          <p style={{ color: '#dc2626' }}>Failed to load bus. Please go back and try again.</p>
          <button onClick={fetchBus} style={{
            marginTop: 12, background: '#16a34a', color: 'white',
            border: 'none', padding: '10px 24px', borderRadius: 10,
            cursor: 'pointer', fontWeight: 700
          }}>Retry</button>
        </div>
      ) : (
        <div className="seat-layout">
          {/* Left: Seat map */}
          <div className="seat-map-panel">
            <div className="bus-info-strip">
              <FaBus size={20} color="#16a34a" />
              <div>
                <strong>{bus.results?.name}</strong>
                <span>
                  {bus.results?.type} · {bus.results?.numberOfSeats} seats ·
                  Ksh {Number(fareCost).toLocaleString()}/seat
                  {bus.results?.departure_time && ` · Departs ${bus.results.departure_time}`}
                </span>
              </div>
            </div>

            <div className="seat-legend">
              <div className="legend-item"><div className="legend-box selected" /><span>Selected</span></div>
              <div className="legend-item"><div className="legend-box booked" /><span>Booked</span></div>
              <div className="legend-item"><div className="legend-box empty" /><span>Available</span></div>
            </div>

            <div className="bus-outline">
              <div className="bus-front">
                <div className="steering-wheel">🚌</div>
              </div>
              <div className="seats-grid">
                {seats.map((group, gi) => (
                  <div className="seat-row" key={gi}>
                    {group.map((_, si) => {
                      const seatNum = globalSeat++;
                      const booked = isBooked(seatNum);
                      const selected = isSelected(seatNum);
                      const isAisle = si === vehicle.seatsConfiguration.left - 1;
                      return (
                        <div key={si} style={{ marginRight: isAisle ? 24 : 0 }}>
                          <div
                            className={`seat-box ${booked ? 'seat-booked' : selected ? 'seat-selected' : 'seat-available'}`}
                            onClick={() => toggleSeat(seatNum)}
                            title={booked ? 'Already booked' : `Seat ${seatNum + 1}`}
                          >
                            <span className="seat-label">{seatNum + 1}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary panel */}
          <div className="seat-summary-panel">
            <h4 className="summary-title">
              Booking Summary
              {selectedSeats.length > 0 && (
                <span className="seat-count-badge">{selectedSeats.length}</span>
              )}
            </h4>

            {selectedSeats.length === 0 ? (
              <div className="no-seats-selected">
                <p>Click on any green seat to select it.</p>
              </div>
            ) : (
              <div className="selected-seats-list">
                {selectedSeatsInfo.map((info, i) => (
                  <div key={i} className={`selected-seat-card ${!info.name || info.name.trim() === '' ? 'seat-card-error' : ''}`}>
                    <div className="selected-seat-header">
                      <strong>Seat {info.seat}</strong>
                      <span className="seat-fare">Ksh {Number(fareCost).toLocaleString()}</span>
                      <button className="remove-seat-btn" onClick={() => {
                        setSelectedSeats(selectedSeats.filter((_, idx) => idx !== i));
                        setSelectedSeatsInfo(selectedSeatsInfo.filter((_, idx) => idx !== i));
                      }}>
                        <FiX size={14} />
                      </button>
                    </div>
                    <div className="seat-passenger-fields">
                      <div className="passenger-field-wrap">
                        <input
                          type="text"
                          placeholder="Passenger name *"
                          value={info.name || ''}
                          onChange={e => {
                            const updated = [...selectedSeatsInfo];
                            updated[i] = { ...updated[i], name: e.target.value };
                            setSelectedSeatsInfo(updated);
                          }}
                          style={{
                            borderColor: !info.name || info.name.trim() === '' ? '#fca5a5' : '#e2e8f0'
                          }}
                        />
                        {(!info.name || info.name.trim() === '') && (
                          <span className="field-required-hint">Name is required</span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="ID/Passport number (optional)"
                        value={info.id || ''}
                        onChange={e => {
                          const updated = [...selectedSeatsInfo];
                          updated[i] = { ...updated[i], id: e.target.value };
                          setSelectedSeatsInfo(updated);
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="seat-total-bar">
                  <span>Total ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
                  <strong>Ksh {(fareCost * selectedSeats.length).toLocaleString()}</strong>
                </div>

                <button className="proceed-btn" onClick={handleProceed}>
                  Proceed to Payment →
                </button>
              </div>
            )}

            <div className="route-summary">
              <div className="rs-row"><span>Route</span><strong>{ticketInfo.pickupPoint} → {ticketInfo.destination}</strong></div>
              <div className="rs-row"><span>Date</span><strong>{formatDate(ticketInfo.date)}</strong></div>
              {bus.results?.departure_time && (
                <div className="rs-row"><span>Departure</span><strong>{bus.results.departure_time}</strong></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSeat;
