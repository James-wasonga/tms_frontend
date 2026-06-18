// import React, { useState, useContext, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiCalendar,
//   FiMap,
//   FiMapPin,
//   FiNavigation,
//   FiNavigation2,
// } from "react-icons/fi";
// import "./index.css";
// import {
//   Button,
//   Dropdown,
//   DropdownButton,
//   NavDropdown,
//   Toast,
// } from "react-bootstrap";
// import Testimonials from "../Testimonials";
// import { useEffect } from "react";
// import Blogs from "../Blogs";
// import Amenities from "../Amenities";
// import { HeaderFooterContext } from "../../contexts";
// import Select from "react-select";
// import { DataURLS } from "../../utils/DataURLS";
// import { Loading, HowToUse } from "../../components";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const Home = () => {
//   const dateRef = useRef(null);
//   const [toggle, setToggle] = useState({
//     pickupPoint: false,
//     destinationPoint: false,
//     dateShown: false,
//   });

//   const [points, setPoints] = useState({
//     pickup: [],
//     drop: [],
//   });

//   const [ticketInfo, setTicketInfo] = useState({
//     pickupPoint: "",
//     destination: "",
//     date: null,
//     error: false,
//     message: "",
//   });

//   const [isFocused, setIsFocused] = useState(false);

//   const navigate = useNavigate();
//   const searchTicket = () => {
//     if (ticketInfo.pickupPoint == "") {
//       setTicketInfo({
//         ...ticketInfo,
//         error: true,
//         message: "Select pickup point!",
//       });
//       return false;
//     }
//     if (ticketInfo.pickupPoint == "--------select------") {
//       setTicketInfo({
//         ...ticketInfo,
//         error: true,
//         message: "Select pickup point!",
//       });
//       return false;
//     }
//     if (ticketInfo.destination == "") {
//       setTicketInfo({
//         ...ticketInfo,
//         error: true,
//         message: "Select destination point!",
//       });
//       return false;
//     }
//     if (ticketInfo.destination == "--------select------") {
//       setTicketInfo({
//         ...ticketInfo,
//         error: true,
//         message: "Select destination point!",
//       });
//       return false;
//     }
//     if (ticketInfo.date == null) {
//       setTicketInfo({
//         ...ticketInfo,
//         error: true,
//         message: "Select date of travel first!",
//       });
//       return false;
//     }

//     navigate(
//       `/search/${ticketInfo.pickupPoint}/${ticketInfo.destination}/${ticketInfo.date}`
//     );
//   };
//   const [iconsShown, setIconsShown] = useState(false);
//   const [headerFooter, setHeaderFooter] = useContext(HeaderFooterContext);

//   const [todayDate, setTodayDate] = useState([]);

//   //day use todaysDate/yesterday use todaysDate-24hrs/month ago use todaysDate<=
//   const convertToTimeStamp = (date) => {
//     let d = new Date(date);
//     return Date.parse(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
//   };

//   useEffect(() => {
//     let today = new Date();

//     let d = `${today.getFullYear()}-${
//       parseInt(today.getMonth()) + 1
//     }-${today.getDate()}`;
//     setTodayDate(d);
//     let todayDateTimestamp = Date.parse(d);
//     let output;

//     output = todayDateTimestamp;
//     //console.log('Top tabs', d);
//     if (dateRef.current) {
//       dateRef.current.setAttribute("min", d);
//     }
//   }, []);

//   const [locations, setLocations] = useState({
//     error: false,
//     loading: false,
//     message: "",
//     results: [],
//   });
//   const fetchLocations = () => {
//     setLocations({
//       ...locations,
//       error: false,
//       loading: true,
//       message: "",
//     });
//     fetch(DataURLS.locations, {
//       method: "GET",
//     })
//       .then((req) => req.json())
//       .then((res) => {
//         console.log(res);
//         setLocations({
//           error: false,
//           loading: false,
//           message: "",
//           results: res,
//         });
//         setPoints({
//           pickup: res,
//           drop: res,
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//         setLocations({
//           ...locations,
//           error: true,
//           loading: false,
//           message: "An error occurred, try again later.",
//         });
//       });
//   };

//   const observer = useRef(null);
//   const callbackRef = useCallback((node) => {
//     if (observer.current) {
//       observer.current.disconnect();
//     }
//     observer.current = new IntersectionObserver((entries) => {
//       console.log(entries[0].isIntersecting);
//     });
//     if (node) {
//       observer.current.observe(node);
//     }

//     //console.log(node);
//   }, []);

//   useEffect(() => {
//     fetchLocations();
//     setHeaderFooter(true);

//     window.scroll(0, 0);
//   }, []);
//   return (
//     <div className="home">
//       {/* {
//         locations.loading?
//         <Loading.AppLoading/>
//         : */}
//       <>
//         <Toast
//           show={ticketInfo.error}
//           onClose={() => setTicketInfo({ ...ticketInfo, error: false })}
//           style={{
//             position: "fixed",
//             top: 0,
//             right: 0,
//             zIndex: 102,
//             backgroundColor: "red",
//           }}
//         >
//           <Toast.Header>Error</Toast.Header>
//           <Toast.Body>{ticketInfo.message}</Toast.Body>
//         </Toast>

//         <div
//           className="home-data"
//           style={{
//             backgroundImage: "url('/assets/gifs/bus.gif')",
//             backgroundColor: "transparent",
//             position: "relative",
//           }}
//         >
//           <div className="bg-holder">
//             <div className="one"></div>
//             <div className="two"></div>
//             <div className="three"></div>
//           </div>
//           <div className="home-info">
//             <h1 style={{ fontWeight: "bold" }}>Get Your Ticket Online,</h1>
//             <h1 style={{ fontWeight: "bold" }}>Easy and Safely</h1>
//             <Button
//               className="buy-ticket-button"
//               onClick={() => navigate("/tickets")}
//             >
//               Book a ticket
//             </Button>
//           </div>

//           <div className="search-home">
//             <h5>Choose your ticket</h5>
//             <div className="search-card">
//               <div className="search-holder">
//                 <div
//                   style={{
//                     position: "relative",
//                   }}
//                   className="search-item"
//                 >
//                   <FiNavigation2
//                     color="#47ca7e"
//                     size={23}
//                     style={{
//                       display: iconsShown ? "none" : "flex",
//                       position: "absolute",
//                       zIndex: 10,
//                       top: 13,
//                       left: 5,
//                     }}
//                   />
//                   <Select
//                     options={points.pickup.length < 1
//                         ? [
//                             {
//                               value: "loading locations...",
//                               label: "loading locations...",
//                             },
//                           ]
//                         :points.pickup.map((lo) => {
//                       return { value: lo.name, label: lo.name };
//                     })}
//                     placeholder="Starting point"
//                     styles={{
//                       control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         width: "100%",
//                         paddingLeft: 20,
//                         zIndex: 9,
//                         height: 50,
//                       }),
//                     }}
//                     onBlur={() => setIconsShown(false)}
//                     onFocus={() => setIconsShown(true)}
//                     onChange={(e) => {
//                       let drop = locations.results.filter(
//                         (l) => l.name !== e.value
//                       );
//                       setPoints({ ...points, drop });
//                       setTicketInfo({ ...ticketInfo, pickupPoint: e.value });
//                     }}
//                   />
//                   <div className="route">
//                     <FaArrowLeft />
//                     <FaArrowRight />
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     position: "relative",
//                   }}
//                   className="search-item"
//                 >
//                   <FiMapPin
//                     color="#47ca7e"
//                     size={23}
//                     style={{
//                       display: iconsShown ? "none" : "flex",
//                       position: "absolute",
//                       zIndex: 2,
//                       top: 13,
//                       left: 5,
//                     }}
//                   />
//                   <Select
//                     options={
//                       points.drop.length < 1
//                         ? [
//                             {
//                               value: "loading locations...",
//                               label: "loading locations...",
//                             },
//                           ]
//                         : points.drop.map((lo) => {
//                             return { value: lo.name, label: lo.name };
//                           })
//                     }
//                     placeholder={`Destination Point`}
//                     styles={{
//                       control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         width: "100%",
//                         paddingLeft: 20,
//                         zindex: 3,
//                       }),
//                     }}
//                     onChange={(e) => {
//                       let pickup = locations.results.filter(
//                         (l) => l.name !== e.value
//                       );
//                       setPoints({ ...points, pickup });

//                       setTicketInfo({ ...ticketInfo, destination: e.value });
//                     }}
//                     onBlur={() => setIconsShown(false)}
//                     onFocus={() => setIconsShown(true)}
//                   />
//                 </div>
//               </div>

//               <div
//                 className="search-item"
//                 style={{ position: "relative", width: "98%", margin: "1%" }}
//               >
//                 <FiCalendar
//                   color="#47ca7e"
//                   size={23}
//                   style={{
//                     display: iconsShown ? "none" : "flex",
//                     position: "absolute",
//                     zIndex: 2,
//                     top: 12,
//                     left: 5,
//                   }}
//                 />
//                 {/* <input
//                 ref={dateRef} 
//                 style={{
//                     width:"100%",
//                     height:40,
//                     paddingLeft:28,
//                     borderColor:"grey",
//                     border:"1px solid grey",
//                     borderRadius:5,
//                     outline:"none"
//                 }}
//                 type={isFocused?"date":"text"}  
//                 placeholder='Departure date' 
//                 onFocus={(e)=>{
//                     setIsFocused(true);
//                     setIconsShown(true);
//                 }}
//                 onBlur={(e)=>{
//                     setIsFocused(false);
//                     setIconsShown(false);
//                 }}
//                 min={todayDate}
//                 onChange={(e)=>setTicketInfo({...ticketInfo,date:e.target.value})}
//                 />  */}

//                 <DatePicker
//                   wrapperClassName="input"
//                   showIcon
//                   isClearable
//                   placeholderText="Departure date"
//                   icon={"fa fas calendar"}
//                   minDate={Date.now()}
//                   selected={ticketInfo.date}
//                   onChange={(date) => {
//                     console.log(date);
//                     setTicketInfo({ ...ticketInfo, date: date });
//                   }}
//                   className="input"
//                 />
//               </div>

//               <div
//                 className="search-item"
//                 style={{ position: "relative", width: "98%", margin: "1%" }}
//               >
//                 <FiCalendar
//                   color="#47ca7e"
//                   size={23}
//                   style={{
//                     display: iconsShown ? "none" : "flex",
//                     position: "absolute",
//                     zIndex: 2,
//                     top: 12,
//                     left: 5,
//                   }}
//                 />

//                 <DatePicker
//                   wrapperClassName="input"
//                   showIcon
//                   isClearable
//                   minDate={ticketInfo.date}
//                   placeholderText="Return date (Optional)"
//                   icon={"fa fas calendar"}
//                   selected={ticketInfo.returnDate}
//                   onChange={(date) => {
//                     setTicketInfo({ ...ticketInfo, returnDate: date });
//                   }}
//                   className="input"
//                 />
//               </div>

//               {/* <div 
//                 className='search-item'
//                 style={{position:"relative",width:"98%",margin:"1%",display:"inline-block"}} >
//                 <DatePicker 
//                   showIcon
//                   isClearable
//                   placeholderText='Departure date'
//                   icon={"fa fas calendar"}
//                   selected={ticketInfo.date} 
//                   onChange={(date)=>{
//                     console.log(date);
//                     setTicketInfo({...ticketInfo,date:date})
//                   }}
//                   className='search-item'
//                   /> 

//             </div> */}

//               <button className="search-button" onClick={searchTicket}>
//                 Search ticket
//               </button>
//             </div>
//           </div>
//         </div>

//         <h5 ref={callbackRef} className="title">
//           Get Your Tickets With Just 3 Steps
//         </h5>
//         {/*<Divider/>*/}
//         <div className="description">
//           <p>Lorem ipsum</p>
//         </div>
//         <div className="cards-holder">
//           <HowToUse />
//         </div>

//         <h5 className="title">Our Amenities</h5>
//         <div className="description">
//           <p>Amenities available</p>
//         </div>
//         {/*<Divider/>*/}
//         <Amenities />
//         <h5 className="title">Our Testimonials</h5>
//         {/*<Divider/>*/}
//         <Testimonials />
//         <h5 className="title">Recent Blog Post</h5>
//         <div className="description">
//           <p>Our blogs</p>
//         </div>
//         {/*<Divider/>*/}
//         <Blogs marginTop={0} isShown={false} />
//       </>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiNavigation2, FiSearch, FiArrowRight, FiWifi, FiZap, FiShield, FiCoffee, FiHeadphones, FiStar } from "react-icons/fi";
import { FaBus, FaQuoteLeft, FaUsers, FaRoute, FaSmile } from "react-icons/fa";
import "./index.css";
import { Toast } from "react-bootstrap";
import { HeaderFooterContext } from "../../contexts";
import Select from "react-select";
import { DataURLS } from "../../utils/DataURLS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  {
    icon: <FiSearch size={24} />,
    title: "Search Your Route",
    desc: "Enter your departure city, destination and travel date. We'll instantly show all available buses on that route.",
  },
  {
    icon: <FaBus size={22} />,
    title: "Pick Your Seat",
    desc: "Browse bus options, compare prices and amenities, then select your preferred seat from an interactive seat map.",
  },
  {
    icon: <FiZap size={24} />,
    title: "Pay & Get Ticket",
    desc: "Pay securely via M-Pesa, card or PayPal. Your e-ticket is issued instantly — no printing needed.",
  },
];

const amenities = [
  { icon: <FiWifi size={24} />, name: "Free WiFi" },
  { icon: <FiCoffee size={24} />, name: "Complimentary Drinks" },
  { icon: <FiShield size={24} />, name: "Insured Travel" },
  { icon: <FiHeadphones size={24} />, name: "24/7 Support" },
  { icon: <FiStar size={24} />, name: "Rated Operators" },
  { icon: <FiZap size={24} />, name: "USB Charging" },
  { icon: <FaBus size={22} />, name: "Reclining Seats" },
  { icon: <FiShield size={24} />, name: "CCTV Onboard" },
];

const testimonials = [
  { name: "Amina K.", role: "Frequent Traveler", text: "Booking from Nairobi to Mombasa has never been this seamless. Got my seat confirmed in under 2 minutes!", rating: 5 },
  { name: "James O.", role: "Business Commuter", text: "The M-Pesa integration is fantastic. I travel weekly and this app saves me so much time at the bus park.", rating: 5 },
  { name: "Fatuma M.", role: "University Student", text: "Finally a transport app that actually works! The seat picker is intuitive and the e-ticket is accepted everywhere.", rating: 5 },
];

const blogs = [
  { title: "Fast Ticket Issuance", date: "12 Dec 2023", tag: "Tech", desc: "With our automated system, your ticket gets generated instantly after payment — no queues, no waiting.", image: "/assets/images/image1.jpg" },
  { title: "5 Tips for Comfortable Long Distance Travel", date: "08 Jan 2024", tag: "Travel", desc: "Pack light, book an aisle seat, and make sure your bus has charging ports. Here's how to travel smarter.", image: "" },
  { title: "Why M-Pesa is the Safest Way to Book", date: "15 Feb 2024", tag: "Finance", desc: "M-Pesa payments are instant, traceable and reversible. Here's why we made it our primary payment method.", image: "" },
];

const Home = () => {
  const navigate = useNavigate();
  const [headerFooter, setHeaderFooter] = useContext(HeaderFooterContext);
  const [iconsShown, setIconsShown] = useState(false);
  const [points, setPoints] = useState({ pickup: [], drop: [] });
  const [locations, setLocations] = useState({ error: false, loading: false, results: [] });
  const [ticketInfo, setTicketInfo] = useState({ pickupPoint: "", destination: "", date: null, returnDate: null, error: false, message: "" });

  const fetchLocations = () => {
    fetch(DataURLS.locations, { method: "GET" })
      .then(r => r.json())
      .then(res => {
        setLocations({ error: false, loading: false, results: res });
        setPoints({ pickup: res, drop: res });
      })
      .catch(() => setLocations({ error: true, loading: false, results: [] }));
  };

  useEffect(() => { fetchLocations(); setHeaderFooter(true); window.scroll(0, 0); }, []);

  const searchTicket = () => {
    if (!ticketInfo.pickupPoint) { setTicketInfo({ ...ticketInfo, error: true, message: "Please select a pickup point!" }); return; }
    if (!ticketInfo.destination) { setTicketInfo({ ...ticketInfo, error: true, message: "Please select a destination!" }); return; }
    if (!ticketInfo.date) { setTicketInfo({ ...ticketInfo, error: true, message: "Please select a travel date!" }); return; }
    navigate(`/search/${ticketInfo.pickupPoint}/${ticketInfo.destination}/${ticketInfo.date.getTime()}`);
  };

  const locationOptions = (list) => list.map(lo => ({ value: lo.name, label: lo.name }));
  const loadingOption = [{ value: "", label: "Loading locations..." }];

  return (
    <div className="home">
      <Toast show={ticketInfo.error} onClose={() => setTicketInfo({ ...ticketInfo, error: false })}
        style={{ position: "fixed", top: 80, right: 16, zIndex: 9999, backgroundColor: "#dc2626", color: "white", minWidth: 280 }}>
        <Toast.Header style={{ background: "#dc2626", color: "white" }}><strong>⚠ Missing Info</strong></Toast.Header>
        <Toast.Body style={{ color: "white" }}>{ticketInfo.message}</Toast.Body>
      </Toast>

      {/* ======= HERO ======= */}
      <section className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          {/* Left: Copy */}
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="dot" /> Now serving 50+ routes across Kenya
            </div>
            <h1 className="hero-title">
              Travel Smart,<br />Travel <span className="accent">Safe.</span>
            </h1>
            <p className="hero-subtitle">
              Book intercity bus tickets online in seconds. Real-time seat availability, instant e-tickets, and multiple secure payment options.
            </p>
            <div className="hero-cta-row">
              <button className="btn-primary-hero" onClick={() => navigate("/tickets")}>
                <FiBus /> Browse Buses <FiArrowRight size={16} />
              </button>
              <a href="#how-it-works" className="btn-outline-hero">How it works</a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="num">50K+</span><span className="lbl">Tickets Sold</span></div>
              <div className="hero-stat"><span className="num">100+</span><span className="lbl">Bus Operators</span></div>
              <div className="hero-stat"><span className="num">4.9★</span><span className="lbl">Rating</span></div>
            </div>
          </div>

          {/* Right: Search */}
          <div className="hero-search-panel">
            <div className="search-card">
              <div className="search-card-header">
                <h5>Find Your Ticket</h5>
                <p>Search routes, compare prices and book instantly.</p>
              </div>

              <div className="search-row">
                <div className="search-field">
                  <label>From</label>
                  <div className="search-field-inner">
                    <FiNavigation2 className="field-icon" size={16} />
                    <Select
                      options={points.pickup.length < 1 ? loadingOption : locationOptions(points.pickup)}
                      placeholder="Starting point"
                      styles={{ control: (b) => ({ ...b, paddingLeft: 26, minHeight: 48, borderRadius: 10, fontSize: 14 }) }}
                      onFocus={() => setIconsShown(true)} onBlur={() => setIconsShown(false)}
                      onChange={(e) => {
                        setPoints({ ...points, drop: locations.results.filter(l => l.name !== e.value) });
                        setTicketInfo({ ...ticketInfo, pickupPoint: e.value });
                      }}
                    />
                    <div className="swap-btn" title="Swap">⇄</div>
                  </div>
                </div>
                <div className="search-field">
                  <label>To</label>
                  <div className="search-field-inner">
                    <FiMapPin className="field-icon" size={16} />
                    <Select
                      options={points.drop.length < 1 ? loadingOption : locationOptions(points.drop)}
                      placeholder="Destination"
                      styles={{ control: (b) => ({ ...b, paddingLeft: 26, minHeight: 48, borderRadius: 10, fontSize: 14 }) }}
                      onFocus={() => setIconsShown(true)} onBlur={() => setIconsShown(false)}
                      onChange={(e) => {
                        setPoints({ ...points, pickup: locations.results.filter(l => l.name !== e.value) });
                        setTicketInfo({ ...ticketInfo, destination: e.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="search-field search-date-row">
                <label>Departure Date</label>
                <div className="search-field-inner">
                  <FiCalendar className="field-icon" size={16} />
                  <DatePicker
                    wrapperClassName="input"
                    isClearable
                    placeholderText="Select departure date"
                    minDate={Date.now()}
                    selected={ticketInfo.date}
                    onChange={(date) => setTicketInfo({ ...ticketInfo, date })}
                    className="input"
                  />
                </div>
              </div>

              <div className="search-field" style={{ marginBottom: 16 }}>
                <label>Return Date <span style={{ color: "#94a3b8", fontWeight: 400 }}>(Optional)</span></label>
                <div className="search-field-inner">
                  <FiCalendar className="field-icon" size={16} />
                  <DatePicker
                    wrapperClassName="input"
                    isClearable
                    placeholderText="Select return date"
                    minDate={ticketInfo.date}
                    selected={ticketInfo.returnDate}
                    onChange={(date) => setTicketInfo({ ...ticketInfo, returnDate: date })}
                    className="input"
                  />
                </div>
              </div>

              <button className="search-btn" onClick={searchTicket}>
                <FiSearch size={18} /> Search Tickets
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 14, marginBottom: 0 }}>
                🔒 Secure booking — No hidden fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= HOW IT WORKS ======= */}
      <section className="section" id="how-it-works">
        <div>
          <span className="section-label">How it works</span>
          <h2 className="section-title">Book Your Ticket in 3 Easy Steps</h2>
          <p className="section-subtitle">From search to boarding — the entire process takes under 5 minutes.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <span className="step-number">{i + 1}</span>
              <div className="step-icon-wrap">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= AMENITIES ======= */}
      <section className="amenities-section">
        <div className="amenities-inner">
          <span className="section-label" style={{ color: "#4ade80" }}>What We Offer</span>
          <h2 className="section-title" style={{ color: "white" }}>Travel in Comfort & Style</h2>
          <p className="section-subtitle" style={{ color: "#94a3b8" }}>Every bus on our platform is verified and equipped with modern amenities for a premium experience.</p>
          <div className="amenities-grid">
            {amenities.map((a, i) => (
              <div className="amenity-card" key={i}>
                <div className="icon-wrap">{a.icon}</div>
                <p>{a.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= TESTIMONIALS ======= */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Passengers Say</h2>
          <p className="section-subtitle">Thousands of travellers trust us every day for safe, reliable journeys.</p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="stars">{"★".repeat(t.rating)}</div>
                <FaQuoteLeft className="quote-icon" />
                <p>"{t.text}"</p>
                <div className="testimonial-user">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div className="info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= BLOGS ======= */}
      <section className="blogs-section">
        <div className="blogs-inner">
          <span className="section-label">Our Blog</span>
          <h2 className="section-title">Latest Travel Insights</h2>
          <p className="section-subtitle">Tips, guides and news to help you travel smarter across Kenya.</p>
          <div className="blogs-grid">
            {blogs.map((b, i) => (
              <div className="blog-card" key={i}>
                <div className="blog-img">
                  {b.image
                    ? <img src={b.image} alt={b.title} />
                    : <div style={{ width: "100%", height: 200, background: "linear-gradient(135deg,#dcfce7,#bbf7d0)", display: "flex", alignItems: "center", justifyContent: "center" }}><FaBus size={48} color="#16a34a" /></div>}
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span className="blog-tag">{b.tag}</span>
                    <FiCalendar size={12} /> {b.date}
                  </div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// handle the missing icon
const FiBus = (props) => <FaBus {...props} />;

export default Home;
