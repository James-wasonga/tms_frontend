import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { CartContext, HeaderFooterContext, UserContext } from './contexts';
import { Footer, Header, FloatingComponent, BottomSection } from './components';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Search from './pages/Search';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import SelectSeat from './pages/SelectSeat';
import * as PayMent from './pages/Payment';
import * as BusesPage from './pages/Buses';
import * as Profile from './pages/Profile';
import * as Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import TicketConfirmation from './pages/Ticket';

const App = () => {
  const [cartData, setCartData] = useState({
    seats: [], fare: 0, bus: '', seatsInfo: [],
    pickupPoint: '', destination: '', date: null, busSlug: ''
  });
  const cartDataProvider = useMemo(() => [cartData, setCartData], [cartData, setCartData]);

  const [userData, setUserData] = useState({ loggedIn: false, data: {} });
  const userDataProvider = useMemo(() => [userData, setUserData], [userData, setUserData]);

  const [headerFooter, setHeaderFooter] = useState(true);
  const headerFooterProvider = useMemo(() => [headerFooter, setHeaderFooter], [headerFooter, setHeaderFooter]);

  useEffect(() => {
    try {
      const cart = localStorage.getItem('seatsData');
      if (cart) setCartData(JSON.parse(cart));
      const user = localStorage.getItem('app_user');
      if (user) setUserData(JSON.parse(user));
    } catch (e) {}
  }, []);

  return (
    <CartContext.Provider value={cartDataProvider}>
      <UserContext.Provider value={userDataProvider}>
        <HeaderFooterContext.Provider value={headerFooterProvider}>
          <Router>
            <Header />
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/tickets" element={<Search />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />

              {/* Search & booking flow */}
              <Route path="/search/:pickupPoint/:destinationPoint/:date" element={<Search />} />
              <Route path="/select-seat/:slug/:pickupPoint/:destinationPoint/:date" element={<SelectSeat />} />

              {/* Payment flow */}
              <Route path="/payment-gateway" element={<PayMent.SelectPayment />} />
              <Route path="/pay/:paymentType" element={<PayMent.Pay />} />
              <Route path="/ticket-confirmation" element={<TicketConfirmation />} />

              {/* Auth - Passengers */}
              <Route path="/login" element={<Auth.LoginPage />} />
              <Route path="/register" element={<Auth.RegisterPage />} />
              <Route path="/forgot-password" element={<Auth.ForgotPassword />} />

              {/* Auth - Operators/Admin */}
              <Route path="/owner-login" element={<Auth.OwnerLogin />} />

              {/* Operator pages */}
              <Route path="/create-bus" element={<BusesPage.CreateBus />} />

              {/* User profile */}
              <Route path="/profile" element={<Profile.Profile />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomSection.BottomTabs />
            <Footer />
            <FloatingComponent />
          </Router>
        </HeaderFooterContext.Provider>
      </UserContext.Provider>
    </CartContext.Provider>
  );
};

export default App;

