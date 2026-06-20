// export let BASEURL = "http://localhost:8085";
export let BASEURL = "https://tms-backend-a6kg.onrender.com";

let APPURL = "http://localhost:3002";

export const DataURLS = {
  // Auth - User
  userSignUp: `${BASEURL}/api/auth-user/signup`,
  userSignIn: `${BASEURL}/api/auth-user/signin`,
  userForgotPassword: `${BASEURL}/api/api-user/forgot-password`,
  userResetPassword: `${BASEURL}/api/api-user/reset-password`,
  editProfile: `${BASEURL}/api/api-user/update`,
  editPassword: `${BASEURL}/api/api-user/change-password`,

  // Auth - Owner/Admin
  ownerSignUp: `${BASEURL}/api/auth-owner/signup`,
  ownerSignIn: `${BASEURL}/api/auth-owner/signin`,

  // Buses
  buses: `${BASEURL}/api/bus`,
  allBusesAvailable: `${BASEURL}/api/bus/all-bus-available`,
  search: `${BASEURL}/api/bus/search`,
  filter: `${BASEURL}/api/bus/filter`,

  // Locations
  locations: `${BASEURL}/api/locations`,

  // Travels
  travels: `${BASEURL}/api/travels`,

  // Bookings
  userBookings: `${BASEURL}/api/bookings/my`,
  createBooking: `${BASEURL}/api/bookings`,
  editBooking: `${BASEURL}/api/bookings/`,
  deleteBooking: `${BASEURL}/api/bookings/`,

  // Payments
  mpesaSTK: `${BASEURL}/api/payments/mpesa-stk`,
  mpesaStatus: `${BASEURL}/api/payments/mpesa-status`,  // ← NEW, used for polling
};

export const wakeUpBackend = () => {
  fetch(`${BASEURL}/api/health`, { method: 'GET' })
    .then(() => console.log('[TMS] Backend is awake ✅'))
    .catch(() => console.log('[TMS] Backend offline - check if server is running'));
};

export { APPURL };