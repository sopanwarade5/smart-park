import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./auth/Login";
import Register from "./auth/Register";

/* ADMIN */
import AdminDashboard from "./admin/AdminDashboard";
import AddArea from "./admin/AddArea";
import ViewAreas from "./admin/ViewAreas";
import AddSlot from "./admin/AddSlot";
import ViewSlots from "./admin/ViewSlots";
import ViewPayments from "./admin/ViewPayments";
import AvailableSlots from "./admin/AvailableSlots";
import AdminBookings from "./admin/AdminBookings";

/* USER */
import UserDashboard from "./user/UserDashboard";
import BookSlot from "./user/BookSlot";
import MyBookings from "./user/MyBookings";
import UserPayment from "./user/UserPayment";

/* COMMON */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminNavbar from "./components/AdminNavbar";
import UserNavbar from "./components/UserNavbar";

function App() {
  // CORRECT STORAGE KEY
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>

      {/*ROLE BASED NAVBAR */}
      {user?.role === "ADMIN" && <AdminNavbar />}
      {user?.role === "USER" && <UserNavbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-area"
          element={
            <ProtectedRoute role="ADMIN">
              <AddArea />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/areas"
          element={
            <ProtectedRoute role="ADMIN">
              <ViewAreas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-slot"
          element={
            <ProtectedRoute role="ADMIN">
              <AddSlot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/slots"
          element={
            <ProtectedRoute role="ADMIN">
              <ViewSlots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/available-slots"
          element={
            <ProtectedRoute role="ADMIN">
              <AvailableSlots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute role="ADMIN">
              <ViewPayments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        {/* USER */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute role="USER">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
  path="/user/payment/:bookingId"
  element={
    <ProtectedRoute role="USER">
      <UserPayment />
    </ProtectedRoute>
  }
/>

        <Route
          path="/user/book-slot"
          element={
            <ProtectedRoute role="USER">
              <BookSlot />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<h3 className="text-center mt-5">404 – Page Not Found</h3>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
