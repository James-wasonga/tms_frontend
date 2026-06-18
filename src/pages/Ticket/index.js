import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, HeaderFooterContext, UserContext } from '../../contexts';
import { Button } from 'react-bootstrap';
import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaUser, FaDownload, FaHome } from 'react-icons/fa';
import './index.css';

const TicketConfirmation = () => {
  const [cartContext] = useContext(CartContext);
  const [userData] = useContext(UserContext);
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const navigate = useNavigate();
  const ticketRef = useRef();

  useEffect(() => {
    setHeaderFooter(true);
    window.scroll(0, 0);
  }, []);

  const formatDate = (dateVal) => {
    if (!dateVal) return 'N/A';
    try {
      return new Date(dateVal).toLocaleDateString('en-KE', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return dateVal; }
  };

  const ticketNumber = `TMS-${Date.now().toString().slice(-8)}`;

  return (
    <div className="ticket-page">
      <div className="ticket-container" ref={ticketRef}>
        <div className="ticket-header">
          <FaTicketAlt size={30} />
          <h3>E-Ticket Confirmation</h3>
          <p className="ticket-number">#{ticketNumber}</p>
        </div>

        <div className="ticket-route">
          <div className="route-point">
            <FaMapMarkerAlt color="#27ae60" />
            <div>
              <small>FROM</small>
              <strong>{cartContext?.pickupPoint || 'N/A'}</strong>
            </div>
          </div>
          <div className="route-divider">
            <FaBus size={24} color="#27ae60" />
            <div className="route-line" />
          </div>
          <div className="route-point">
            <FaMapMarkerAlt color="red" />
            <div>
              <small>TO</small>
              <strong>{cartContext?.destination || 'N/A'}</strong>
            </div>
          </div>
        </div>

        <div className="ticket-details">
          <div className="ticket-detail-row">
            <FaCalendarAlt color="#27ae60" />
            <div>
              <small>Travel Date</small>
              <strong>{formatDate(cartContext?.date)}</strong>
            </div>
          </div>
          <div className="ticket-detail-row">
            <FaBus color="#27ae60" />
            <div>
              <small>Bus</small>
              <strong>{cartContext?.bus || 'N/A'}</strong>
            </div>
          </div>
          <div className="ticket-detail-row">
            <FaUser color="#27ae60" />
            <div>
              <small>Passenger</small>
              <strong>{userData?.data?.user?.name || 'N/A'}</strong>
            </div>
          </div>
        </div>

        <div className="ticket-seats">
          <h5>Booked Seats</h5>
          {cartContext?.seatsInfo?.length > 0 ? (
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Seat</th>
                  <th>Passenger Name</th>
                  <th>ID</th>
                  <th>Fare (KES)</th>
                </tr>
              </thead>
              <tbody>
                {cartContext.seatsInfo.map((s, i) => (
                  <tr key={i}>
                    <td><strong>{s.seat}</strong></td>
                    <td>{s.name || '—'}</td>
                    <td>{s.id || '—'}</td>
                    <td>Ksh. {cartContext.fare}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}><strong>Total</strong></td>
                  <td><strong>Ksh. {cartContext.fare * (cartContext?.seatsInfo?.length || 0)}</strong></td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p>No seat information available.</p>
          )}
        </div>

        <div className="ticket-qr">
          <div className="qr-placeholder">
            <div className="qr-inner">
              <span>QR</span>
              <small>{ticketNumber}</small>
            </div>
          </div>
          <p>Show this ticket to the conductor</p>
        </div>

        <div className="ticket-status">
          <span className="badge bg-success fs-6">✓ Payment Confirmed</span>
        </div>
      </div>

      <div className="ticket-actions">
        <Button variant="success" onClick={() => window.print()}>
          <FaDownload /> Print / Download Ticket
        </Button>
        <Button variant="outline-success" onClick={() => navigate('/profile')}>
          View My Bookings
        </Button>
        <Button variant="outline-secondary" onClick={() => navigate('/')}>
          <FaHome /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default TicketConfirmation;
