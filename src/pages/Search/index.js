import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { FormCheck, Toast } from "react-bootstrap";
import {
  FiCalendar, FiFilter, FiMapPin, FiNavigation2,
  FiRefreshCw, FiSearch, FiClock, FiAlertCircle
} from "react-icons/fi";
import { FaBus } from "react-icons/fa";
import Select from "react-select";
import { DataURLS } from "../../utils/DataURLS";
import Lottie from "lottie-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HeaderFooterContext, CartContext } from "../../contexts";

const busTypes = ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"];
const seatOptions = [11, 16, 29, 52, 67, 72];

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: 48,
    borderRadius: 12,
    border: state.isFocused
      ? "2px solid #16a34a"
      : "1px solid #d1d5db",
    boxShadow: "none",
    paddingLeft: 20,
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 6,
  }),

  menuList: (provided) => ({
    ...provided,
    maxHeight: 220,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#16a34a"
      : state.isFocused
      ? "#ecfdf5"
      : "#fff",
    color: state.isSelected ? "#fff" : "#111827",
    padding: "14px 18px",
    fontWeight: 500,
    cursor: "pointer",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#6b7280",
  }),

  menuPortal: base => ({
    ...base,
    zIndex: 99999,
  }),

  singleValue: (provided) => ({
    ...provided,
    fontWeight: 600,
    color: "#111827",
  }),
};

const Search = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [, setHeaderFooter] = useContext(HeaderFooterContext);
  const [, setCartContext] = useContext(CartContext);

  const [toastMsg, setToastMsg] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [locations, setLocations] = useState({ results: [], loading: false });
  const [allBuses, setAllBuses] = useState([]);
  const [buses, setBuses] = useState({ results: [], loading: false, error: false, message: "" });
  const [filter, setFilter] = useState({ type: null, price: 5000, seats: null, operators: [] }); //add operators to filter state

  const [ticketInfo, setTicketInfo] = useState({
    pickupPoint: params?.pickupPoint !== "undefined" && params?.pickupPoint !== "all" ? params?.pickupPoint : "",
    destination: params?.destinationPoint !== "undefined" && params?.destinationPoint !== "all" ? params?.destinationPoint : "",
    date: params?.date && params?.date !== "null" && params?.date !== "0"
      ? new Date(Number(params?.date)) : null,
  });

  useEffect(() => {
    setHeaderFooter(true);
    window.scroll(0, 0);
    fetchLocations();
    fetchBuses();
  }, []); // eslint-disable-line

  // Re-filter whenever ticketInfo or filter changes
  useEffect(() => {
    applyLocalFilter(allBuses);
  }, [ticketInfo.pickupPoint, ticketInfo.destination, ticketInfo.date, filter, allBuses]); // eslint-disable-line

  const fetchLocations = () => {
    fetch(DataURLS.locations, { method: "GET" })
      .then(r => r.json())
      .then(res => setLocations({ results: Array.isArray(res) ? res : [], loading: false }))
      .catch(() => setLocations({ results: [], loading: false }));
  };

  const fetchBuses = () => {
    setBuses({ results: [], loading: true, error: false, message: "" });
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), 30000);
    fetch(DataURLS.buses, { method: "GET", signal: controller.signal })
      .then(r => r.json())
      .then(res => {
        clearTimeout(tid);
        const list = Array.isArray(res) ? res : [];
        setAllBuses(list);
      })
      .catch(err => {
        clearTimeout(tid);
        if (err.name === "AbortError") {
          setBuses({ results: [], loading: false, error: true, message: "Request timed out. Please try again." });
        } else {
          setBuses({ results: [], loading: false, error: true, message: "Could not load buses. Check your connection." });
        }
      });
  };

  /// 
  // Extract unique operator names from the bus list
  const operatorOptions = Array.from(new Set(allBuses.map(bus => bus.name).filter(Boolean)));

  // Toggle operator selection
  const handleOperatorToggle = (operatorName) => {
    setFilter(prev => {
      const exists = prev.operators.includes(operatorName);
      const updated = exists
        ? prev.operators.filter(op => op !== operatorName)
        : [...prev.operators, operatorName];
      return { ...prev, operators: updated };
    });
  };
  ///

  const applyLocalFilter = (list) => {
    let filtered = [...list];
    const from = ticketInfo.pickupPoint || params?.pickupPoint || "";
    const to = ticketInfo.destination || params?.destinationPoint || "";

    // 1. Filter by ROUTE
    if (from && from !== "all" && from !== "undefined") {
      filtered = filtered.filter(bus =>
        (bus.boardingPoints || []).some(p =>
          p.toLowerCase().includes(from.toLowerCase()) ||
          from.toLowerCase().includes(p.toLowerCase())
        )
      );
    }
    if (to && to !== "all" && to !== "undefined") {
      filtered = filtered.filter(bus =>
        (bus.droppingPoints || []).some(p =>
          p.toLowerCase().includes(to.toLowerCase()) ||
          to.toLowerCase().includes(p.toLowerCase())
        )
      );
    }

    // 2. Filter by DATE
    const selectedDate = ticketInfo.date ||
      (params?.date && params?.date !== "0" && params?.date !== "null"
        ? new Date(Number(params?.date)) : null);

    if (selectedDate) {
      const y = selectedDate.getFullYear();
      const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const d = String(selectedDate.getDate()).padStart(2, "0");
      const selectedStr = `${y}-${m}-${d}`;

      filtered = filtered.filter(bus => {
        if (!bus.journeyDate) return true;
        const busDate = bus.journeyDate.toString().substring(0, 10);
        return busDate === selectedStr;
      });
    }

    // 3. Filter by OPERATORS (Multi-select)
    if (filter.operators.length > 0) {
      filtered = filtered.filter(bus => filter.operators.includes(bus.name));
    }

    // 4. Filter by bus type
    if (filter.type) {
      filtered = filtered.filter(bus => bus.type === filter.type);
    }

    // 5. Filter by max price
    if (filter.price < 5000) {
      filtered = filtered.filter(bus => (bus.fare || 0) <= filter.price);
    }

    // 6. Filter by seats
    if (filter.seats) {
      filtered = filtered.filter(bus => bus.numberOfSeats === filter.seats);
    }

    // 7. Sort by departure time (earliest first)
    filtered.sort((a, b) => {
      if (!a.departure_time) return 1;
      if (!b.departure_time) return -1;
      return a.departure_time.localeCompare(b.departure_time);
    });

    setBuses({ results: filtered, loading: false, error: false, message: "" });
  };

  const handleSearch = () => {
    const from = ticketInfo.pickupPoint || params?.pickupPoint || "all";
    const to = ticketInfo.destination || params?.destinationPoint || "all";
    const date = ticketInfo.date ? ticketInfo.date.getTime() : Date.now();
    navigate(`/search/${from}/${to}/${date}`);
    fetchBuses();
  };

  const handleSelectSeat = (bus) => {
    const from = ticketInfo.pickupPoint || params?.pickupPoint;
    const to = ticketInfo.destination || params?.destinationPoint;
    if (!from) { setToastMsg("Please select a pickup point."); return; }
    if (!to) { setToastMsg("Please select a destination."); return; }
    setCartContext(prev => ({
      ...prev,
      pickupPoint: from,
      destination: to,
      date: ticketInfo.date,
      busSlug: bus.slug,
      bus: bus.name,
      fare: bus.fare,
    }));
    navigate(`/select-seat/${bus.slug}/${from}/${to}/${ticketInfo.date ? ticketInfo.date.getTime() : Date.now()}`);
  };

  const locOptions = locations.results.map(l => ({ value: l.name, label: l.name }));

  const formatDate = (d) => {
    if (!d || d === "null" || d === "0") return "";
    try {
      return new Date(Number(d)).toLocaleDateString("en-KE", {
        weekday: "short", day: "numeric", month: "short", year: "numeric"
      });
    } catch { return ""; }
  };

  const getBusImage = (bus) => {
    if (bus.image) {
      return bus.image;
    }
    return `/images/buses/${bus.slug}.jpg`;
  };

  const from = ticketInfo.pickupPoint || (params?.pickupPoint !== "all" ? params?.pickupPoint : "");
  const to = ticketInfo.destination || (params?.destinationPoint !== "all" ? params?.destinationPoint : "");

  return (
    <div className="search-page">
      <Toast show={!!toastMsg} onClose={() => setToastMsg("")}
        style={{ position: "fixed", top: 90, right: 16, zIndex: 9999, minWidth: 280 }}
        delay={4000} autohide>
        <Toast.Header style={{ background: "#dc2626", color: "white" }}><strong>⚠ Notice</strong></Toast.Header>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>

      {/* Hero */}
      <div className="search-hero">
        <div className="search-hero-inner">
          <h2 className="search-hero-title">
            {from && to
              ? <><span>{from}</span> <FiNavigation2 size={18} /> <span>{to}</span></>
              : "Search Buses"}
          </h2>
          {formatDate(params?.date) && (
            <p className="search-hero-sub">📅 {formatDate(params.date)}</p>
          )}
        </div>
      </div>

      {/* Search strip */}
      <div className="search-bar-strip">
        <div className="search-bar-strip-inner">
          <div className="sbs-field">
            <FiNavigation2 size={14} className="sbs-icon" />
            <Select
              options={locOptions}
              placeholder={ticketInfo.pickupPoint || "From"}
              className="sbs-select"
              styles={selectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              onChange={e => setTicketInfo({ ...ticketInfo, pickupPoint: e.value })}
            />
          </div>
          <div className="sbs-divider" />
          <div className="sbs-field">
            <FiMapPin size={14} className="sbs-icon" />
            <Select
              options={locOptions}
              placeholder={ticketInfo.destination || "To"}
              className="sbs-select"
              styles={selectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              onChange={e => setTicketInfo({ ...ticketInfo, destination: e.value })}
            />
          </div>
          <div className="sbs-divider" />
          <div className="sbs-field" style={{ minWidth: 180 }}>
            <FiCalendar size={14} className="sbs-icon" />
            <DatePicker
              wrapperClassName="sbs-date"
              placeholderText="Travel date"
              selected={ticketInfo.date}
              minDate={new Date()}
              onChange={date => setTicketInfo({ ...ticketInfo, date })}
              className="sbs-date-input"
            />
          </div>
          <button className="sbs-search-btn" onClick={handleSearch}>
            <FiSearch size={16} /> Search
          </button>
          <button className="sbs-filter-btn" onClick={() => setShowFilter(!showFilter)}>
            <FiFilter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="search-body">
        {/* Sidebar */}
        <aside className={`search-filters-sidebar${showFilter ? " open" : ""}`}>
          <div className="filters-head">
            <strong>Filters</strong>
            <button onClick={() => setFilter({ type: null, price: 5000, seats: null, operators: [] })}>Reset</button>
          </div>
          {/* OPERATORS FILTER */}
          <div className="filter-group">
            <label className="filter-group-label">Operators</label>
            {operatorOptions.length === 0 ? (
              <small style={{ color: "#94a3b8" }}>No operators found</small>
            ) : (
              operatorOptions.map(op => (
                <div key={op} className="filter-check" onClick={() => handleOperatorToggle(op)}>
                  <FormCheck readOnly checked={filter.operators.includes(op)} /> <span>{op}</span>
                </div>
              ))
            )}
          </div>
          <div className="filter-group">
            <label className="filter-group-label">Bus Type</label>
            {busTypes.map(t => (
              <div key={t} className="filter-check"
                onClick={() => setFilter({ ...filter, type: filter.type === t ? null : t })}>
                <FormCheck readOnly checked={filter.type === t} /> <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="filter-group">
            <label className="filter-group-label">Max Price: Ksh {filter.price.toLocaleString()}</label>
            <input type="range" min={100} max={5000} step={100} value={filter.price}
              onChange={e => setFilter({ ...filter, price: Number(e.target.value) })}
              className="price-slider" />
            <div className="price-range-labels"><span>100</span><span>5,000</span></div>
          </div>
          <div className="filter-group">
            <label className="filter-group-label">Number of Seats</label>
            <div className="seat-chips">
              {seatOptions.map(s => (
                <button key={s}
                  className={`seat-chip${filter.seats === s ? " active" : ""}`}
                  onClick={() => setFilter({ ...filter, seats: filter.seats === s ? null : s })}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="search-results-area">
          <div className="results-header">
            <span className="results-count">
              {buses.loading
                ? "Searching..."
                : `${buses.results.length} bus${buses.results.length !== 1 ? "es" : ""} found`}
              {from && to && !buses.loading && (
                <span className="route-filter-badge">
                  {from} → {to}
                </span>
              )}
            </span>
            <button className="results-refresh" onClick={fetchBuses} disabled={buses.loading}>
              <FiRefreshCw size={14} /> Refresh
            </button>
          </div>

          {buses.loading ? (
            <div className="search-loading">
              <div style={{ width: 160, height: 160 }}>
                <Lottie loop animationData={require("../../assets/lottie_animations/progress1.json")} />
              </div>
              <p>Finding available buses...</p>
              <small style={{ color: "#94a3b8", marginTop: -8 }}>
                This may take a moment if the server just started
              </small>
            </div>
          ) : buses.error ? (
            <div className="search-error">
              <FiAlertCircle size={48} color="#fca5a5" />
              <h4>Could Not Load Buses</h4>
              <p>{buses.message}</p>
              <button onClick={fetchBuses}><FiRefreshCw size={14} /> Try Again</button>
            </div>
          ) : buses.results.length === 0 ? (
            <div className="search-empty">
              <div style={{ width: 140, height: 140 }}>
                <Lottie loop={false} animationData={require("../../assets/lottie_animations/empty.json")} />
              </div>
              <h4 Mafia>No Buses Found</h4>
              <p>
                {from && to
                  ? `No buses on ${from} → ${to} for the selected date. Try a different date or route.`
                  : "Try adjusting your filters or searching a different route."}
              </p>
              <button onClick={() => {
                setFilter({ type: null, price: 5000, seats: null, operators: [] });
                fetchBuses();
              }}>
                Clear Filters &amp; Reload
              </button>
            </div>
          ) : (
            <div className="bus-cards">
              {buses.results.map((bus, i) => (
                <div className="bus-card" key={i}>
                  <div className="bus-card-img">
                    <img
                      src={getBusImage(bus)}
                      alt={bus.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/buses/default-bus.jpg";
                      }}
                    />
                    {bus.type && <span className="bus-type-badge">{bus.type}</span>}
                    {bus.departure_time && (
                      <span className="bus-departure-badge">
                        <FiClock size={11} /> {bus.departure_time}
                      </span>
                    )}
                  </div>
                  <div className="bus-card-info">
                    <h3 className="bus-card-name">{bus.name}</h3>
                    {bus.departure_time && (
                      <div className="bus-departure-time">
                        <FiClock size={14} />
                        <span>Departs at <strong>{bus.departure_time}</strong></span>
                      </div>
                    )}
                    <div className="bus-card-route">
                      <span className="route-from">
                        <FiNavigation2 size={13} /> {(bus.boardingPoints || []).join(", ") || "—"}
                      </span>
                      <span className="route-arrow">→</span>
                      <span className="route-to">
                        <FiMapPin size={13} /> {(bus.droppingPoints || []).join(", ") || "—"}
                      </span>
                    </div>
                    {bus.features?.length > 0 && (
                      <div className="bus-card-features">
                        {bus.features.slice(0, 4).map((f, fi) => (
                          <span key={fi} className="feature-tag">{f}</span>
                        ))}
                      </div>
                    )}
                    {bus.journeyDate && (
                      <div className="bus-card-date">
                        <FiCalendar size={12} /> {bus.journeyDate.toString().substring(0, 10)}
                      </div>
                    )}
                  </div>
                  <div className="bus-card-right">
                    <div className="bus-card-fare">
                      <span className="fare-label">From</span>
                      <span className="fare-amount">Ksh {Number(bus.fare || 0).toLocaleString()}</span>
                      <span className="fare-seats">
                        {(bus.seatsAvailable || bus.numberOfSeats || 0)} seats available
                      </span>
                    </div>
                    <button className="select-seat-btn" onClick={() => handleSelectSeat(bus)}>
                      Select Seat →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;